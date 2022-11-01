import { Component, OnInit } from '@angular/core';
import { AuthService } from './infrastructure/services/state/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.auth.checkPersistence();
  }
}
