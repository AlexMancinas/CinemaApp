import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/domain/models/movie.model';
import { MovieService } from 'src/app/infrastructure/services/use-cases/movie.service';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.scss'],
})
export class MoviesHomeComponent implements OnInit {
  public movies$!: Observable<IMovie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getAllAvailableMovies();
  }

  public logicDeleteHallById(movieId: string): void {
    this.movieService.deleteMovie(movieId);
  }
}
