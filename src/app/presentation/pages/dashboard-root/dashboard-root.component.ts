import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/services/state/auth.service';

interface StrictDataRoute extends Route {
  data: {
    name: string;
    icon: string;
  };
}
type StrictRoutes = StrictDataRoute[];

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.scss'],
})
export class DashboardRootComponent implements OnInit {
  public toggled: boolean = false;
  public routes: StrictRoutes = [];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly auth: AuthService
  ) {}

  public toggle(): void {
    this.toggled = !this.toggled;
  }

  ngOnInit(): void {
    this.activatedRoute.routeConfig!.children as StrictRoutes;
    const newReference = [
      ...this.activatedRoute.routeConfig?.children!,
    ] as StrictRoutes;
    newReference.shift();
    this.routes = newReference;
  }

  public signOut(): void {
    this.auth.signOut();
  }
}
