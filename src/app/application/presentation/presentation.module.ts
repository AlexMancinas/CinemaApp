import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailErrorsPipe } from 'src/app/infrastructure/pipes/forms/email-errors.pipe';
import { PasswordErrorsPipe } from 'src/app/infrastructure/pipes/forms/password-errors.pipe';
import { CinemaHallFormComponent } from 'src/app/presentation/components/cinema-hall-form/cinema-hall-form.component';
import { MovieCardComponent } from 'src/app/presentation/components/movie-card/movie-card.component';
import { MovieFormComponent } from 'src/app/presentation/components/movie-form/movie-form.component';
import { ProjectionFormComponent } from 'src/app/presentation/components/projection-form/projection-form.component';
import { ButtonDirective } from 'src/app/presentation/directives/button.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CinemaHallFormComponent,
    ProjectionFormComponent,
    MovieFormComponent,
    MovieCardComponent,
    ButtonDirective,
    EmailErrorsPipe,
    PasswordErrorsPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    CinemaHallFormComponent,
    ProjectionFormComponent,
    MovieFormComponent,
    MovieCardComponent,
    ButtonDirective,
    EmailErrorsPipe,
    PasswordErrorsPipe,
  ],
})
export class PresentationModule {}
