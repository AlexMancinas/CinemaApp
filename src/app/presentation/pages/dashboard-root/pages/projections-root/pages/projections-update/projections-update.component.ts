import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, tap } from 'rxjs';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ProjectionService } from 'src/app/infrastructure/services/use-cases/projection.service';

@Component({
  selector: 'app-projections-update',
  templateUrl: './projections-update.component.html',
  styleUrls: ['./projections-update.component.scss'],
})
export class ProjectionsUpdateComponent implements OnInit {
  public projection$!: Observable<IProjection>;

  constructor(
    private readonly projectionService: ProjectionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projection$ = this.activatedRoute.params.pipe(
      switchMap((routeParams) =>
        this.projectionService.getProjectionById(
          routeParams['hallId'],
          routeParams['projectionId']
        )
      )
    );
  }

  public updateProjection(hallId: string, projection: IProjection): void {
    this.projectionService.updateProjection(hallId, projection);
  }
}
