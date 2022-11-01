import { Observable } from 'rxjs';
import { IProjection } from 'src/app/domain/models/projection.model';

export interface IProjectionUseCases {
  /**
   * @description This method returns Observable<IProjection> based on a given projectionId.
   * @param hallId {@link string}
   * @param projectionId {@link string}
   * @returns Observabke<IProjection>
   */
  getProjectionById(
    hallId: string,
    projectionId: string
  ): Observable<IProjection>;
  /**
   * @description This method returns Observable<IProjection[]> of the available projections.
   * @returns Observabke<IProjection[]>
   */
  getAvailableProjections(): Observable<IProjection[]>;
  /**
   * @description This method returns Observable<IProjection[]> of the available projections based on a hallId.
   * @param hallId {@link string}
   * @returns Observabke<IProjection[]>
   */
  getAvailableProjectionsByHallId(hallId: string): Observable<IProjection[]>;
  /**
   * @description This method deletes a given projection by it's ID.
   * @param projectionId {@link string}
   * @param hallId {@link string}
   * @returns Promise<void>
   */
  deleteProjectionById(hallId: string, projectionId: string): Promise<void>;
  /**
   * @description This method updates a given projection by it's ID.
   * @param projection Partial<{@link IProjection}>
   * @param hallId {@link string}
   * @returns Promise<void>
   */
  updateProjection(
    hallId: string,
    projection: Partial<IProjection>
  ): Promise<void>;
  /**
   * @description This method creates a projection.
   * @param projection {@link IProjection}
   * @param hallId {@link string}
   * @returns Promise<void>
   */
  createProjection(projection: IProjection): Promise<void>;
}
