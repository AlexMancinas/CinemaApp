import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  Subject,
  switchMap,
  takeUntil,
  take,
  of,
} from 'rxjs';
import { IUser } from 'src/app/domain/models/user.model';

const DEFAULT_USER_STATUE: IUser = {
  name: '',
  email: '',
  roles: {
    admin: false,
    employee: false,
  },
  uid: '',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public User$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(
    DEFAULT_USER_STATUE
  );
  private sessionManager$: Subject<void> = new Subject<void>();

  constructor(
    private readonly auth: AngularFireAuth,
    private readonly storage: AngularFirestore,
    private readonly router: Router
  ) {}

  public checkPersistence(): void {
    this.auth.authState
      .pipe(
        take(1),
        switchMap((user) =>
          user ? this.getUserByUid(user.uid) : of(DEFAULT_USER_STATUE)
        ),
        takeUntil(this.sessionManager$),
      )
      .subscribe({
        next: (userData) => this.validateUser(userData),
      });
  }

  private async validateUser(
    userData: IUser,
    isSignIn: boolean = false
  ): Promise<void> {
    const { roles } = userData;
    // Checks if the user has a role, it works as state checking.
    if (roles.admin || roles.employee) {
      this.User$.next(userData);
      try {
        await this.router.navigate(['/dashboard']);
      } catch (error) {
        throw error;
      }
    } else {
      if (isSignIn) {
        window.alert('Pongase en contacto con su administrador.');
        try {
          await this.signOut();
        } catch (error) {
          throw error;
        }
      }
    }
  }

  public signInWithEmail(email: string, password: string) {
    const signInPromise = this.auth.signInWithEmailAndPassword(email, password);
    from(signInPromise)
      .pipe(
        switchMap((userCredentials) =>
          this.getUserByUid(userCredentials.user!.uid)
        ),
        takeUntil(this.sessionManager$)
      )
      .subscribe({
        next: (userData) => this.validateUser(userData, true),
      });
  }

  //! Check bug, after reloading once, the singout button does not redirect to the sign-in page until next reload.
  public async signOut(): Promise<void> {
    try {
      this.sessionManager$.next();
      this.User$.next(DEFAULT_USER_STATUE);
      await this.auth.signOut();
      await this.router.navigate(['/sign-in']);
    } catch (error) {
      throw error;
    }
  }

  public get userState$(): Observable<IUser> {
    return this.User$.asObservable().pipe();
  }

  public get isUserLoggedIn$(): Observable<boolean> {
    return this.User$.asObservable().pipe(
      map(({ roles }) => roles.admin || roles.employee)
    );
  }

  // /users/OCYhuTL0RbgMVtKBN1EcW0NdZzA2
  private getUserByUid(uid: string): Observable<IUser> {
    return this.storage
      .doc<IUser>(`/users/${uid}`)
      .valueChanges({ idField: 'uid' }) as Observable<IUser>;
  }
}
