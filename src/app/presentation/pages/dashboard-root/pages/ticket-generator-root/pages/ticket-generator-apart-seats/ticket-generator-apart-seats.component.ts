import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, pairwise, startWith, switchMap, take, tap } from 'rxjs';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ISeat, ISeatRowConfig } from 'src/app/domain/models/seat-config.model';
import { ITicket } from 'src/app/domain/models/ticket.model';
import { RecursivePartial } from 'src/app/domain/models/utils/recursive-partial';
import { filterAvailableSeats } from 'src/app/infrastructure/functions/filter-available-seats';
import { AuthService } from 'src/app/infrastructure/services/state/auth.service';
import { ApartSystemService } from 'src/app/infrastructure/services/use-cases/apart-system.service';
import { ProjectionService } from 'src/app/infrastructure/services/use-cases/projection.service';
import { FirebaseUtilService } from 'src/app/infrastructure/services/utilities/firebase-util.service';

const DEFAULT_INIT_VALUE_FOR_PROJECTION: IProjection = {
  projectionId: null as any,
  movieId: null as any,
  hallId: null as any,
  projectionStart: null as any,
  projectionEnd: null as any,
  deleted: null as any,
  seatSet: [
    {
      name: 'fakeRow',
      seats: []
    }
  ]
}

const PHONE_NUMBER_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

@Component({
  selector: 'app-ticket-generator-apart-seats',
  templateUrl: './ticket-generator-apart-seats.component.html',
  styleUrls: ['./ticket-generator-apart-seats.component.scss']
})
export class TicketGeneratorApartSeatsComponent implements OnInit {
  public selectedSeats$: BehaviorSubject<ISeatRowConfig[]> = new BehaviorSubject<ISeatRowConfig[]>([]);
  public userForm: FormGroup = new FormGroup({
    ticketId: new FormControl('', [Validators.required]),
    hallId: new FormControl('', [Validators.required]),
    sellerId: new FormControl('', [Validators.required]),
    movieId: new FormControl('', [Validators.required]),
    projectionId: new FormControl('', [Validators.required]),
    purchaseDate: new FormControl(this.utilsService.generateServerTimestamp()),
    clientData: new FormGroup({
      userId: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(PHONE_NUMBER_REGEX)]),
      email: new FormControl('', [Validators.required]),
    })
  });
  public projection$!: Observable<IProjection>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectionsService: ProjectionService,
    private utilsService: FirebaseUtilService,
    private auth: AuthService,
    private apartTicketTransactions: ApartSystemService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.projection$ = this.getProjection();
    this.patchSellContext();
  }

  public async apartSeats(partialTicket: RecursivePartial<ITicket>, rows: ISeatRowConfig[]): Promise<void> {
    try {
      partialTicket.seats = rows;
      const FullTicket: ITicket = partialTicket as ITicket;
      await this.apartTicketTransactions.createSeatApartTransaction(FullTicket);
      await this.router.navigate(['/dashboard/generate-tickets/projection-aparted-ticket', FullTicket.ticketId]);
    } catch (error) {
      throw error;
    }
  }


  private patchSellContext(): void {
    this.projection$.pipe(
      take(1),
      map(({ movieId, projectionId, hallId }) => ({ movieId, projectionId, hallId, ...this.sellContext })),
      tap((sellContext: RecursivePartial<ITicket>) => this.userForm.patchValue(sellContext))
    ).subscribe()
  }

  private get sellContext(): RecursivePartial<ITicket> {
    const { uid: sellerId } = this.auth.User$.getValue();
    const userId = this.utilsService.createId();
    const ticketId = this.utilsService.createId();
    return {
      ticketId,
      sellerId,
      clientData: {
        userId
      }
    }
  }

  public addRowAndSeat(rowName: string, seat: number): void {
    this.selectedSeats$.pipe(
      take(1),
      map((currentSelectedSeats) => {
        const { clientData } = this.userForm.value;
        const rowToModify: ISeatRowConfig | undefined = currentSelectedSeats.find(({ name }) => name === rowName);
        const newSelectedSeat = this.createSeatObject(clientData.userId, seat);
        if (rowToModify) {
          rowToModify.seats.push(newSelectedSeat)
        } else {
          const newRow = {
            name: rowName,
            seats: [newSelectedSeat]
          }
          currentSelectedSeats.push(newRow);
        }
        return currentSelectedSeats;
      })
    ).subscribe({
      next: (newSelectedSeats) => {
        this.selectedSeats$.next(newSelectedSeats);
      }
    });

  }

  public removeSeat(rowName: string, seat: number): void {
    this.selectedSeats$.pipe(
      take(1),
      map((currentSelectedSeats) => {
        const rowToRemove: number = currentSelectedSeats.map((row) => row.name).indexOf(rowName);
        const rowSeats = currentSelectedSeats[rowToRemove].seats;
        const needToRemove = rowSeats.length <= 1;
        if (needToRemove) {
          currentSelectedSeats.splice(rowToRemove, 1);
        } else {
          const indexFromSeatToRemove = rowSeats.map((seat) => seat.number).indexOf(seat);
          rowSeats.splice(indexFromSeatToRemove, 1);
        }
        return currentSelectedSeats
      })
    ).subscribe({
      next: (newSelected) => {
        this.selectedSeats$.next(newSelected);
      }
    });

  }

  public createSeatObject = (userId: string, seat: number): ISeat => ({
    number: seat,
    aparted: true,
    userId
  });


  private getProjection(): Observable<IProjection> {
    return this.activatedRoute.params.pipe(
      switchMap((params) => this.projectionsService.getProjectionById(params['hallId'], params['projectionId'])),
      startWith(DEFAULT_INIT_VALUE_FOR_PROJECTION),
      pairwise(),
      filter(([{ seatSet: oldSet }, { seatSet: newSet }]) => filterAvailableSeats(oldSet) !== filterAvailableSeats(newSet)),
      map(([_, newValue]) => newValue)
    );
  }

}
