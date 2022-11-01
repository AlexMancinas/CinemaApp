import { Component, OnInit } from '@angular/core';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ProjectionService } from 'src/app/infrastructure/services/use-cases/projection.service';

@Component({
  selector: 'app-projections-create',
  templateUrl: './projections-create.component.html',
  styleUrls: ['./projections-create.component.scss'],
})
export class ProjectionsCreateComponent implements OnInit {
  constructor(private projectionService: ProjectionService) {}

  ngOnInit(): void {}

  public createProjection($event: IProjection): void {
    this.projectionService.createProjection($event);
  }
}
