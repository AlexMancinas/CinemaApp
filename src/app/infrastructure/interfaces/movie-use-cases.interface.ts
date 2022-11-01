import { Observable } from 'rxjs';
import { IMovie } from 'src/app/domain/models/movie.model';

export interface IMovieUseCases {
  /**
   * @description This method updates a given movie.
   * @param movie {@link IMovie}
   * @returns Promise<void>
   */
  updateMovie(movie: Partial<IMovie>): Promise<void>;
  /**
   * @description This method creates a given movie.
   * @param movie {@link IMovie}
   * @returns Promise<void>
   */
  createMovie(movie: IMovie): Promise<void>;
  /**
   * @description This method deletes a given movie by it's ID.
   * @param movieId {@link string}
   * @returns Promise<void>
   */
  deleteMovie(movieId: string): Promise<void>;
  /**
   * @description This method returns Observable<IMovie> based on a given movieId.
   * @param movieId {@link string}
   * @returns Promise<void>
   */
  getMovieById(movieId: string): Observable<IMovie>;
  /**
   * @description This method returns Observable<IMovie[]> of the available movies.
   * @returns Observable<IMovie[]>
   */
  getAllAvailableMovies(): Observable<IMovie[]>;
}
