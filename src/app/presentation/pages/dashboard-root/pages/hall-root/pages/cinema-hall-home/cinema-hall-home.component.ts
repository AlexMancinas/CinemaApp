import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICinemaHall } from 'src/app/domain/models/cinema-hall.model';
import { CinemaHallService } from 'src/app/infrastructure/services/use-cases/cinema-hall.service';
@Component({
  selector: 'app-cinema-hall-home',
  templateUrl: './cinema-hall-home.component.html',
  styleUrls: ['./cinema-hall-home.component.scss'],
})
export class CinemaHallHomeComponent implements OnInit {
  public cinemaHalls$!: Observable<ICinemaHall[]>;

  constructor(private readonly cinemaHallService: CinemaHallService) {}

  ngOnInit(): void {
    this.cinemaHalls$ = this.cinemaHallService.getAvailableCinemaHalls();
  }

  public logicDeleteHallById(hallId: string): void {
    this.cinemaHallService.deleteCinemaHall(hallId);
  }
}
