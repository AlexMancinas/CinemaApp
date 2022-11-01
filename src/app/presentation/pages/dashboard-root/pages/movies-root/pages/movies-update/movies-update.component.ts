import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IMovie } from 'src/app/domain/models/movie.model';
import { MovieService } from 'src/app/infrastructure/services/use-cases/movie.service';

@Component({
  selector: 'app-movies-update',
  templateUrl: './movies-update.component.html',
  styleUrls: ['./movies-update.component.scss'],
})
export class MoviesUpdateComponent implements OnInit {
  public movie$!: Observable<IMovie>;

  constructor(
    private readonly movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movie$ = this.activatedRoute.params.pipe(
      switchMap((routeParams) =>
        this.movieService.getMovieById(routeParams['movieId'])
      )
    );
  }

  public updateMovie(movie: IMovie): void {
    this.movieService.updateMovie(movie);
  }
}
