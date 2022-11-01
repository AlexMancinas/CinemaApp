import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ProjectionService } from 'src/app/infrastructure/services/use-cases/projection.service';

@Component({
  selector: 'app-projection-by-movie',
  templateUrl: './projection-by-movie.component.html',
  styleUrls: ['./projection-by-movie.component.scss'],
})
export class ProjectionByMovieComponent implements OnInit {
  public projections$!: Observable<IProjection[]>;

  constructor(
    private projectionService: ProjectionService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.projections$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.getProjections(params['hallId'])),
    )
  }

  public getProjections(hallId: string): Observable<IProjection[]> {
    return this.projectionService.getAvailableProjectionsByHallId(hallId);
  }
}
