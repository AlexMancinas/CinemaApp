import { timestamp } from '../utils/timestamp.interface';
import { ICinemaHall } from './cinema-hall.model';
import { IMovie } from './movie.model';
import { ISeatRowConfig } from './seat-config.model';

export interface IProjection {
  projectionId: string;
  movieId: string;
  hallId: string;
  projectionStart: timestamp;
  projectionEnd: timestamp;
  deleted: boolean;
  seatSet: ISeatRowConfig[];
  cinemaHall?: ICinemaHall;
  movie?: IMovie;
}
