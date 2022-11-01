import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/state/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizedUserGuard implements CanActivate, CanActivateChild {
  constructor(private readonly auth: AuthService, private router: Router) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserAuthorization();
  }
  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserAuthorization();
  }

  private checkUserAuthorization(): Observable<boolean | UrlTree> {
    return this.auth.userState$.pipe(
      map(
        ({ roles }) =>
          roles.admin ||
          roles.employee ||
          this.router.createUrlTree(['/sign-in'])
      )
    );
  }
}
