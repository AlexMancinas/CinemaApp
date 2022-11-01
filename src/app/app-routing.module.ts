import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CinemaHallCreateComponent,
  CinemaHallHomeComponent,
  CinemaHallUpdateComponent,
  DashboardRootComponent,
  HallRootComponent,
  MoviesCreateComponent,
  MoviesDetailsComponent,
  MoviesHomeComponent,
  MoviesRootComponent,
  MoviesUpdateComponent,
  ProjectionsCreateComponent,
  ProjectionsDetailsComponent,
  ProjectionsHomeComponent,
  ProjectionsRootComponent,
  ProjectionsUpdateComponent,
  SignInComponent,
  TicketGeneratorRootComponent,
} from './application/presentation/presentation.index';
import { AuthorizedUserGuard } from './infrastructure/guardians/authorized-user.guard';
import { ProjectionByMovieComponent } from './presentation/pages/dashboard-root/pages/projections-root/pages/projection-by-movie/projection-by-movie.component';
import { TicketGeneratorHomeComponent } from './presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-generator-home/ticket-generator-home.component';
import { TicketGeneratorProjectionListComponent } from './presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-generator-projection-list/ticket-generator-projection-list.component';
import { TicketGeneratorApartSeatsComponent } from './presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-generator-apart-seats/ticket-generator-apart-seats.component';
import { TicketQrComponent } from './presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-qr/ticket-qr.component';
import { DigitalTicketComponent } from './presentation/pages/digital-ticket/digital-ticket.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'dashboard',
    component: DashboardRootComponent,
    canActivate: [AuthorizedUserGuard],
    canActivateChild: [AuthorizedUserGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'generate-tickets',
        data: {
          name: 'Log In',
          icon: 'bx bx-log-in',
        },
      },
      {
        path: 'generate-tickets',
        data: {
          name: 'Apart tickets',
          icon: "bx bx-qr"
        },
        component: TicketGeneratorRootComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home',
          },
          {
            path: 'home',
            component: TicketGeneratorHomeComponent,
          },
          {
            path: 'projection-list/:movieId',
            component: TicketGeneratorProjectionListComponent,
          },
          {
            path: 'projection-apart-seats/:hallId/:projectionId',
            component: TicketGeneratorApartSeatsComponent,
          },
          {
            path: 'projection-aparted-ticket/:ticketId',
            component: TicketQrComponent,
          }
        ]
      },
      {
        path: 'halls',
        component: HallRootComponent,
        data: {
          name: 'Cinema Halls',
          icon: 'bx bx-film',
        },
        children: [
          { path: '', component: CinemaHallHomeComponent },
          {
            path: 'create-cinema-hall',
            component: CinemaHallCreateComponent,
          },
          {
            path: 'update-cinema-hall/:hallId',
            component: CinemaHallUpdateComponent,
          },
        ],
      },
      {
        path: 'movies',
        component: MoviesRootComponent,
        data: {
          name: 'Movies',
          icon: 'bx bxs-movie-play',
        },
        children: [
          { path: '', component: MoviesHomeComponent },
          {
            path: 'create-movie',
            component: MoviesCreateComponent,
          },
          {
            path: 'update-movie/:movieId',
            component: MoviesUpdateComponent,
          },
          {
            path: 'movie-details/:movieId',
            component: MoviesDetailsComponent,
          },
        ],
      },
      {
        path: 'projections',
        component: ProjectionsRootComponent,
        data: {
          name: 'Projections',
          icon: 'bx bxs-camera-home',
        },
        children: [
          { path: '', component: ProjectionsHomeComponent },
          {
            path: 'create-projection',
            component: ProjectionsCreateComponent,
          },
          {
            path: 'update-projection/:hallId/:projectionId',
            component: ProjectionsUpdateComponent,
          },
          {
            path: 'projection-details/:hallId/:projectioId',
            component: ProjectionsDetailsComponent,
          },
          {
            path: 'projections-by-movie/:hallId',
            component: ProjectionByMovieComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'digital-ticket/:ticketId',
    component: DigitalTicketComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
