import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ICinemaHall } from 'src/app/domain/models/cinema-hall.model';
import { IMovie } from 'src/app/domain/models/movie.model';
import { IProjection } from 'src/app/domain/models/projection.model';
import { CinemaHallService } from 'src/app/infrastructure/services/use-cases/cinema-hall.service';
import { MovieService } from 'src/app/infrastructure/services/use-cases/movie.service';
import { FirebaseUtilService } from 'src/app/infrastructure/services/utilities/firebase-util.service';

@Component({
  selector: 'app-projection-form',
  templateUrl: './projection-form.component.html',
  styleUrls: ['./projection-form.component.scss'],
})
export class ProjectionFormComponent implements OnInit, OnDestroy {
  @ViewChild('startDateInput', { static: true }) startDateInput!: ElementRef<HTMLInputElement>;
  @ViewChild('endDateInput', { static: true }) endDateInput!: ElementRef<HTMLInputElement>;
  @Input() projectionInitValue?: IProjection;
  @Output() projectionCurrentValue: EventEmitter<IProjection> =
    new EventEmitter<IProjection>();

  public ProjectionForm: FormGroup = new FormGroup({
    projectionId: new FormControl('', [Validators.required]),
    movieId: new FormControl('', [Validators.required]),
    hallId: new FormControl('', [Validators.required]),
    projectionStart: new FormControl(null, [Validators.required]),
    projectionEnd: new FormControl(null, [Validators.required]),
    deleted: new FormControl(false),
    seatSet: new FormControl(null),
  });

  public availableHalls$!: Observable<ICinemaHall[]>;
  public availableMovies$!: Observable<IMovie[]>;
  private valueSubscription$!: Subscription;

  constructor(
    private readonly hallService: CinemaHallService,
    private readonly movieService: MovieService,
    private readonly firebaseUtils: FirebaseUtilService
  ) { }

  ngOnInit(): void {
    this.availableHalls$ = this.hallService.getAllCinemaHalls();
    this.availableMovies$ = this.movieService.getAllAvailableMovies();
    this.checkPatchValue();
    this.watchHallId();
  }

  ngOnDestroy(): void {
    this.valueSubscription$.unsubscribe();
  }

  private watchHallId(): void {
    const formControlToWatch = this.ProjectionForm.get('hallId') as FormControl;
    const seatSetFormControl = this.ProjectionForm.get(
      'seatSet'
    ) as FormControl;
    this.valueSubscription$ = formControlToWatch.valueChanges
      .pipe(
        switchMap((hallId: string) =>
          this.availableHalls$.pipe(
            map(
              (availableHalls) =>
                availableHalls.filter((hall) => hall.hallId === hallId)[0]
            )
          )
        )
      )
      .subscribe({
        next: (hall) => {
          seatSetFormControl.patchValue(hall.seatSet);
        },
      });
  }

  private checkPatchValue(): void {
    if (this.projectionInitValue) {
      this.ProjectionForm.patchValue(this.projectionInitValue);
      const { nativeElement: startDateNode } = this.startDateInput;
      const { nativeElement: endDateNode } = this.endDateInput;
      const startParsedValue = this.firebaseUtils.convertToDateTimeLocal(
        this.projectionInitValue.projectionStart
      );
      const endParsedValue = this.firebaseUtils.convertToDateTimeLocal(
        this.projectionInitValue.projectionEnd
      );
      startDateNode.value = startParsedValue;
      endDateNode.value = endParsedValue;
    } else {
      this.ProjectionForm.patchValue({
        projectionId: this.firebaseUtils.createId(),
      });
    }
  }

  public convertDateFromInput($event: Event, fieldPath: string): void {
    const formControl = this.ProjectionForm.get(fieldPath) as FormControl;
    const { value } = $event.target as HTMLInputElement;
    const dateToConvert = new Date(value);
    const timestamp =
      this.firebaseUtils.generateTimestampFromDate(dateToConvert);
    formControl.patchValue(timestamp);
  }

  public fakeSubmit(projectionForm: FormGroup): void {
    this.projectionCurrentValue.next(projectionForm.value);
  }
}
