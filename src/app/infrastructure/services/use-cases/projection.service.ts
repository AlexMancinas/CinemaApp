import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { combineLatest, map, Observable, of, switchMap } from 'rxjs';

import { IProjection } from 'src/app/domain/models/projection.model';
import { IProjectionUseCases } from '../../interfaces/projection-use-cases.interface';
import { FirebaseUtilService } from '../utilities/firebase-util.service';
import { CinemaHallService } from './cinema-hall.service';
import { MovieService } from './movie.service';
@Injectable({
  providedIn: 'root',
})
export class ProjectionService implements IProjectionUseCases {
  private readonly mappedId = { idField: 'projectionId' };
  constructor(
    private readonly afs: AngularFirestore,
    private readonly firebaseUtils: FirebaseUtilService,
    private readonly hallService: CinemaHallService,
    private readonly movieService: MovieService
  ) { }

  private composeProjection(projection: IProjection): Observable<IProjection> {
    return this.hallService.getCinemaHallById(projection.hallId).pipe(
      switchMap((cinemaHallData) =>
        this.movieService.getMovieById(projection.movieId).pipe(
          map(
            (movieData) =>
            ({
              ...projection,
              movie: movieData,
              cinemaHall: cinemaHallData,
            } as IProjection)
          )
        )
      )
    );
  }

  public getProjectionById(
    hallId: string,
    projectionId: string
  ): Observable<IProjection> {
    return this.afs
      .doc<IProjection>(`/cinema-halls/${hallId}/projections/${projectionId}`)
      .valueChanges(this.mappedId)
      .pipe(
        switchMap((projection) => this.composeProjection(projection!))
      ) as Observable<IProjection>;
  }

  public getAvailableProjections(): Observable<IProjection[]> {
    return this.afs
      .collectionGroup<IProjection>('projections', (queryFn) =>
        queryFn
          .where('deleted', '==', false)
          .where(
            'projectionEnd',
            '>=',
            this.firebaseUtils.generateTimestampNow()
          )
          .orderBy('projectionEnd', 'asc')
      )
      .valueChanges(this.mappedId)
      .pipe(
        map((projectionList) =>
          projectionList.map((projection) => this.composeProjection(projection))
        ),
        switchMap((projectionListObservables) => {
          return projectionListObservables.length > 0 ? combineLatest(projectionListObservables) : of([]);
        })
      );
  }
  public getAvailableProjectionsByMovieId(movieId: string): Observable<IProjection[]> {
    return this.afs
      .collectionGroup<IProjection>('projections', (queryFn) =>
        queryFn
          .where('deleted', '==', false)
          .where('movieId', '==', movieId)
          .where(
            'projectionEnd',
            '>=',
            this.firebaseUtils.generateTimestampNow()
          )
          .orderBy('projectionEnd', 'asc')
      )
      .valueChanges(this.mappedId)
      .pipe(
        map((projectionList) =>
          projectionList.map((projection) => this.composeProjection(projection))
        ),
        switchMap((projectionListObservables) => {
          return projectionListObservables.length > 0 ? combineLatest(projectionListObservables) : of([]);
        })
      );
  }


  public getAvailableProjectionsByHallId(
    hallId: string
  ): Observable<IProjection[]> {
    return this.afs
      .collection<IProjection>(
        `/cinema-halls/${hallId}/projections`,
      )
      .valueChanges(this.mappedId)
      .pipe(
        map((projectionList) => projectionList.map((projection) => this.composeProjection(projection))),
        switchMap((projectionListObservables) => {
          return projectionListObservables.length > 0 ? combineLatest(projectionListObservables) : of([])
        })
      );
  }

  public async deleteProjectionById(
    hallId: string,
    projectionId: string
  ): Promise<void> {
    try {
      await this.afs
        .doc<IProjection>(`/cinema-halls/${hallId}/projections/${projectionId}`)
        .update({ deleted: true });
    } catch (error) {
      throw error;
    }
  }
  public async updateProjection(
    hallId: string,
    projection: Partial<IProjection>
  ): Promise<void> {
    try {
      await this.afs
        .doc<IProjection>(
          `/cinema-halls/${hallId}/projections/${projection.hallId}`
        )
        .update(projection);
    } catch (error) {
      throw error;
    }
  }
  public async createProjection(projection: IProjection): Promise<void> {
    try {
      await this.afs
        .doc<IProjection>(
          `/cinema-halls/${projection.hallId}/projections/${projection.projectionId}`
        )
        .set(projection);
    } catch (error) {
      throw error;
    }
  }
}
