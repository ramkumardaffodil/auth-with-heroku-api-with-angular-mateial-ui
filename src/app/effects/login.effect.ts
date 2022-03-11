import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import AuthService from '../auth.service';
import {
  loginFail,
  loginRequest,
  loginSuccess,
  signUpFail,
  signUpRequest,
  signUpSuccess,
} from '../store/actions/auth.action';

@Injectable()
export default class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}
  loginUpEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginRequest),
      switchMap((res) =>
        this.authService.SignIn(res).pipe(
          map((data) => {
            this.authService.saveDataInLocalDb(data);
            this.router.navigate(['home']);
            //this.authService.isLogin = true;
            return loginSuccess({ data });
          }),
          catchError((error) => {
            // this._snackBar.open(error.error, 'Ok', { duration: 3000 });
            return of(loginFail({ data: error }));
          })
        )
      )
    )
  );
  signUpEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpRequest),
      switchMap((userData) =>
        this.authService.SignUp(userData).pipe(
          map((data) => {
            this.router.navigate(['login']);
            return signUpSuccess({ data });
          }),
          catchError((error) => {
            // this._snackBar.open(error.error, 'Ok', { duration: 3000 });
            return of(signUpFail({ data: error }));
          })
        )
      )
    )
  );
}
