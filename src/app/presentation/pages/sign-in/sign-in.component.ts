import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { IUserCredential } from 'src/app/domain/models/user-credentials.model';
import { IUser } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/state/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  public LoginForm!: FormGroup;
  public isLoggedIn$: Observable<boolean> = of(false);

  constructor(
    private auth:AuthService,
    ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isUserLoggedIn$;
    this.LoginForm = this.initializeSignInForm();
  }

  private initializeSignInForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('' , [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    })
  }

  public logIn(credentials: IUserCredential): void{
    const {email, password} = credentials;

    this.auth.signInWithEmail(email, password)
  }
}
