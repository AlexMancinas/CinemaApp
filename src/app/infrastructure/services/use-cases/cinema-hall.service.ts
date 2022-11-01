import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ICinemaHall } from 'src/app/domain/models/cinema-hall.model';

export interface ICinemaHallUseCases {
  /**
   * @description This method updates a given cinemaHall.
   * @param cinemaHall {@link ICinemaHall}
   * @returns Promise<void>
   */
  updateCinemaHall(cinemaHall: Partial<ICinemaHall>): Promise<void>;
  /**
   * @description This method updates a given cinemaHall.
   * @param cinemaHallId {@link string}
   * @returns Promise<void>
   */
  deleteCinemaHall(cinemaHallId: string): Promise<void>;
  /**
   * @description This method creates a cinemaHall.
   * @param cinemaHall {@link ICinemaHall}
   * @returns Promise<void>
   */
  createCinemaHall(cinemaHall: ICinemaHall): Promise<void>;
  /**
   * @description This method returns Observable<ICinemaHall[]> of the available cinema halls.
   * @returns Observabke<ICinemaHall[]>
   */
  getAvailableCinemaHalls(): Observable<ICinemaHall[]>;
  /**
   * @description This method returns Observable<ICinemaHall[]> of the available cinema halls based on a hallId.
   * @param cinemaHallId {@link string}
   * @returns Observabke<ICinemaHall[]>
   */
  getCinemaHallById(cinemaHallId: string): Observable<ICinemaHall>;

  getAllCinemaHalls():Observable<ICinemaHall[]>;
}

@Injectable({
  providedIn: 'root',
})
export class CinemaHallService implements ICinemaHallUseCases {
  private readonly mappedId = { idField: 'hallId' };

  constructor(private readonly db: AngularFirestore) {}
  public async updateCinemaHall(
    cinemaHall: Partial<ICinemaHall>
  ): Promise<void> {
    try {
      this.db
        .doc<Partial<ICinemaHall>>(`/cinema-halls/${cinemaHall.hallId}`)
        .set(cinemaHall, { merge: true });
    } catch (error) {
      throw error;
    }
  }
  public async deleteCinemaHall(cinemaHallId: string): Promise<void> {
    try {
      this.db
        .doc<ICinemaHall>(`/cinema-halls/${cinemaHallId}`)
        .update({ deleted: true });
    } catch (error) {
      throw error;
    }
  }
  public async createCinemaHall(cinemaHall: ICinemaHall): Promise<void> {
    try {
      this.db
        .doc<ICinemaHall>(`/cinema-halls/${cinemaHall.hallId}`)
        .set(cinemaHall);
    } catch (error) {
      throw error;
    }
  }
  public getAvailableCinemaHalls(): Observable<ICinemaHall[]> {
    return this.db
      .collection<ICinemaHall>('/cinema-halls/', (QueryFn) =>
        QueryFn.where('deleted', '==', false)
      )
      .valueChanges(this.mappedId);
  }
  public getCinemaHallById(cinemaHallId: string): Observable<ICinemaHall> {
    return this.db
      .doc<ICinemaHall>(`/cinema-halls/${cinemaHallId}`)
      .valueChanges(this.mappedId) as Observable<ICinemaHall>;
  }

  public getAllCinemaHalls():Observable<ICinemaHall[]> {
    return this.db.collection<ICinemaHall>('/cinema-halls/').valueChanges(this.mappedId);
  }
}
