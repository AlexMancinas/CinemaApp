import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { IMovie } from 'src/app/domain/models/movie.model';
import { IMovieUseCases } from '../../interfaces/movie-use-cases.interface';
import { FirebaseUtilService } from '../utilities/firebase-util.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements IMovieUseCases {
  private readonly mappedId = { idField: 'movieId' };

  constructor(
    private readonly storage: AngularFirestore,
    private readonly firebaseUtils: FirebaseUtilService
  ) {}
  public async updateMovie(movie: Partial<IMovie>): Promise<void> {
    try {
      this.storage.doc<IMovie>(`/movies/${movie.movieId!}`).update(movie);
    } catch (error) {
      throw error;
    }
  }
  public async createMovie(movie: IMovie): Promise<void> {
    try {
      this.storage.doc<IMovie>(`/movies/${movie.movieId!}`).set(movie);
    } catch (error) {
      throw error;
    }
  }
  public async deleteMovie(movieId: string): Promise<void> {
    try {
      this.storage.doc<IMovie>(`/movies/${movieId}`).update({ disabled: true });
    } catch (error) {
      throw error;
    }
  }
  public getMovieById(movieId: string): Observable<IMovie> {
    return this.storage
      .doc<IMovie>(`/movies/${movieId}`)
      .valueChanges(this.mappedId) as Observable<IMovie>;
  }
  public getAllAvailableMovies(): Observable<IMovie[]> {
    const now = this.firebaseUtils.generateTimestampNow();
    return this.storage
      .collection<IMovie>(`movies`, (queryFunction) =>
        queryFunction
          .where('disabled', '==', false)
          .where('endDate', '>=', this.firebaseUtils.generateTimestampNow())
          .orderBy('endDate', 'desc')
      )
      .valueChanges(this.mappedId);
  }
}
