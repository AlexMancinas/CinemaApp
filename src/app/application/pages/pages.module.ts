import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from 'src/app/app.component';
import { LoadingObservablePipe } from 'src/app/infrastructure/pipes/loading-observable.pipe';
import { DashboardRootComponent } from 'src/app/presentation/pages/dashboard-root/dashboard-root.component';
import { HallRootComponent } from 'src/app/presentation/pages/dashboard-root/pages/hall-root/hall-root.component';
import { CinemaHallCreateComponent } from 'src/app/presentation/pages/dashboard-root/pages/hall-root/pages/cinema-hall-create/cinema-hall-create.component';
import { CinemaHallHomeComponent } from 'src/app/presentation/pages/dashboard-root/pages/hall-root/pages/cinema-hall-home/cinema-hall-home.component';
import { CinemaHallUpdateComponent } from 'src/app/presentation/pages/dashboard-root/pages/hall-root/pages/cinema-hall-update/cinema-hall-update.component';
import { MoviesRootComponent } from 'src/app/presentation/pages/dashboard-root/pages/movies-root/movies-root.component';
import { MoviesCreateComponent } from 'src/app/presentation/pages/dashboard-root/pages/movies-root/pages/movies-create/movies-create.component';
import { MoviesDetailsComponent } from 'src/app/presentation/pages/dashboard-root/pages/movies-root/pages/movies-details/movies-details.component';
import { MoviesHomeComponent } from 'src/app/presentation/pages/dashboard-root/pages/movies-root/pages/movies-home/movies-home.component';
import { MoviesUpdateComponent } from 'src/app/presentation/pages/dashboard-root/pages/movies-root/pages/movies-update/movies-update.component';
import { ProjectionsCreateComponent } from 'src/app/presentation/pages/dashboard-root/pages/projections-root/pages/projections-create/projections-create.component';
import { ProjectionsDetailsComponent } from 'src/app/presentation/pages/dashboard-root/pages/projections-root/pages/projections-details/projections-details.component';
import { ProjectionsHomeComponent } from 'src/app/presentation/pages/dashboard-root/pages/projections-root/pages/projections-home/projections-home.component';
import { ProjectionsUpdateComponent } from 'src/app/presentation/pages/dashboard-root/pages/projections-root/pages/projections-update/projections-update.component';
import { ProjectionsRootComponent } from 'src/app/presentation/pages/dashboard-root/pages/projections-root/projections-root.component';
import { SignInComponent } from 'src/app/presentation/pages/sign-in/sign-in.component';
import { TicketGeneratorRootComponent } from 'src/app/presentation/pages/dashboard-root/pages/ticket-generator-root/ticket-generator-root.component';
import { PresentationModule } from '../presentation/presentation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProjectionByMovieComponent } from '../../presentation/pages/dashboard-root/pages/projections-root/pages/projection-by-movie/projection-by-movie.component';
import { QRCodeModule } from 'angularx-qrcode';
import { TicketGeneratorHomeComponent } from 'src/app/presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-generator-home/ticket-generator-home.component';
import { TicketGeneratorProjectionListComponent } from 'src/app/presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-generator-projection-list/ticket-generator-projection-list.component';
import { CountAvailableSeatsPipe } from 'src/app/infrastructure/pipes/projections/count-available-seats.pipe';
import { TicketGeneratorApartSeatsComponent } from '../../presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-generator-apart-seats/ticket-generator-apart-seats.component';
import { MatchSelectionPipe } from 'src/app/infrastructure/pipes/projections/match-selection.pipe';
import { ValidateTicketBuyPipe } from '../../infrastructure/pipes/projections/validate-ticket-buy.pipe';
import { TicketQrComponent } from 'src/app/presentation/pages/dashboard-root/pages/ticket-generator-root/pages/ticket-qr/ticket-qr.component';
import { DigitalTicketComponent } from 'src/app/presentation/pages/digital-ticket/digital-ticket.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardRootComponent,
    SignInComponent,
    TicketGeneratorRootComponent,
    TicketGeneratorHomeComponent,
    TicketGeneratorProjectionListComponent,
    LoadingObservablePipe,
    HallRootComponent,
    MoviesRootComponent,
    CinemaHallHomeComponent,
    CinemaHallUpdateComponent,
    CinemaHallCreateComponent,
    ProjectionsRootComponent,
    ProjectionsHomeComponent,
    ProjectionsCreateComponent,
    ProjectionsUpdateComponent,
    ProjectionsDetailsComponent,
    MoviesHomeComponent,
    MoviesCreateComponent,
    MoviesUpdateComponent,
    MoviesDetailsComponent,
    ProjectionByMovieComponent,
    CountAvailableSeatsPipe,
    TicketGeneratorApartSeatsComponent,
    MatchSelectionPipe,
    ValidateTicketBuyPipe,
    TicketQrComponent,
    DigitalTicketComponent
  ],
  imports: [
    CommonModule,
    PresentationModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    QRCodeModule,
  ],
  exports: [
    AppComponent,
    DashboardRootComponent,
    SignInComponent,
    TicketGeneratorRootComponent,
    TicketGeneratorHomeComponent,
    LoadingObservablePipe,
    HallRootComponent,
    MoviesRootComponent,
    CinemaHallHomeComponent,
    CinemaHallUpdateComponent,
    CinemaHallCreateComponent,
    ProjectionsRootComponent,
    ProjectionsHomeComponent,
    ProjectionsCreateComponent,
    ProjectionsUpdateComponent,
    ProjectionsDetailsComponent,
    MoviesHomeComponent,
    MoviesCreateComponent,
    MoviesUpdateComponent,
    MoviesDetailsComponent,
    ProjectionByMovieComponent,
    TicketGeneratorProjectionListComponent,
    TicketGeneratorApartSeatsComponent,
    ValidateTicketBuyPipe
  ],
})
export class PagesModule {}
