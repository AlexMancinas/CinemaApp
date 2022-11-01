import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { IProjection } from 'src/app/domain/models/projection.model';
import { ProjectionService } from 'src/app/infrastructure/services/use-cases/projection.service';

@Component({
  selector: 'app-ticket-generator-projection-list',
  templateUrl: './ticket-generator-projection-list.component.html',
  styleUrls: ['./ticket-generator-projection-list.component.scss']
})
export class TicketGeneratorProjectionListComponent implements OnInit {
  public projections$!: Observable<IProjection[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectionsService: ProjectionService,
  ) { }

  ngOnInit(): void {
    this.projections$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.projectionsService.getAvailableProjectionsByMovieId(params['movieId']))
    );
  }

}
