import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ICinemaHall } from 'src/app/domain/models/cinema-hall.model';
import { CinemaHallService } from 'src/app/infrastructure/services/use-cases/cinema-hall.service';

@Component({
  selector: 'app-cinema-hall-update',
  templateUrl: './cinema-hall-update.component.html',
  styleUrls: ['./cinema-hall-update.component.scss'],
})
export class CinemaHallUpdateComponent implements OnInit {
  public cinemaHall$!: Observable<ICinemaHall>;

  constructor(
    private readonly cinemaHallService: CinemaHallService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cinemaHall$ = this.activatedRoute.params.pipe(
      switchMap((routeParams) =>
        this.cinemaHallService.getCinemaHallById(routeParams['hallId'])
      )
    );
  }

  public updateHall(hall: ICinemaHall): void {
    this.cinemaHallService.updateCinemaHall(hall);
  }
}
