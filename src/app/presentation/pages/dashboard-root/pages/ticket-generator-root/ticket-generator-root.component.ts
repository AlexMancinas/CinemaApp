import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/domain/models/movie.model';
import { MovieService } from 'src/app/infrastructure/services/use-cases/movie.service';

@Component({
  selector: 'app-ticket-generator-root',
  templateUrl: './ticket-generator-root.component.html',
  styleUrls: ['./ticket-generator-root.component.scss'],
})
export class TicketGeneratorRootComponent implements OnInit {
  public movies$!: Observable<IMovie[]>;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movies$ = this.movieService.getAllAvailableMovies();
  }
}
