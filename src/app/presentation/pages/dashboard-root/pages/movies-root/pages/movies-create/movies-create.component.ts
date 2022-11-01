import { Component } from '@angular/core';
import { IMovie } from 'src/app/domain/models/movie.model';
import { MovieService } from 'src/app/infrastructure/services/use-cases/movie.service';

@Component({
  selector: 'app-movies-create',
  templateUrl: './movies-create.component.html',
  styleUrls: ['./movies-create.component.scss'],
})
export class MoviesCreateComponent {
  constructor(private movieService: MovieService) {}

  public createMovie($event: IMovie) {
    this.movieService.createMovie($event);
  }
}
