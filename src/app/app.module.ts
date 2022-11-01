import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PERSISTENCE } from '@angular/fire/compat/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseModule } from './application/firebase/firebase.module';
import { PagesModule } from './application/pages/pages.module';


@NgModule({
  imports: [
    PagesModule,
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'local' }],
  bootstrap: [AppComponent],
  declarations: [

  ],
})
export class AppModule {}
