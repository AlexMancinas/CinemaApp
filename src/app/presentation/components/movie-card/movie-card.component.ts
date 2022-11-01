import { Component, Input } from '@angular/core';
import { PLACEHOLDER_PICTURE } from 'src/app/application/resources/external-files';
import { IMovie } from 'src/app/domain/models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent{
  public readonly defaultCover = PLACEHOLDER_PICTURE;
  @Input() movie!:IMovie;
}
