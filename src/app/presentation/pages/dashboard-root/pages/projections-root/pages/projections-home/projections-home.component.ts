import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ProjectionService } from 'src/app/infrastructure/services/use-cases/projection.service';

@Component({
  selector: 'app-projections-home',
  templateUrl: './projections-home.component.html',
  styleUrls: ['./projections-home.component.scss'],
})
export class ProjectionsHomeComponent implements OnInit {
  public projections$!: Observable<IProjection[]>;

  constructor(private readonly projectionService: ProjectionService) {}

  ngOnInit(): void {
    this.projections$ = this.projectionService.getAvailableProjections();
  }

  public logicDeleteProjectionById(hallId: string, projectioId: string): void {
    this.projectionService.deleteProjectionById(hallId, projectioId );
  }
}
