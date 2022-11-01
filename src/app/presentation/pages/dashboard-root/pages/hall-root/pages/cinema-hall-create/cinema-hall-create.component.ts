import { Component } from '@angular/core';
import { ICinemaHall } from 'src/app/domain/models/cinema-hall.model';
import { CinemaHallService } from 'src/app/infrastructure/services/use-cases/cinema-hall.service';

@Component({
  selector: 'app-cinema-hall-create',
  templateUrl: './cinema-hall-create.component.html',
  styleUrls: ['./cinema-hall-create.component.scss'],
})
export class CinemaHallCreateComponent {
  constructor(private cinemaHallService: CinemaHallService) {}

  public createCinemaHall(cinemaHall: ICinemaHall): void {
    this.cinemaHallService.createCinemaHall(cinemaHall);
  }
}
