import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { clearError, loginRequest } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginForm {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;
  isLoading$ = this.store.select((state) => state.auth?.loading);
  error$ = this.store.select((state) => state.auth?.error);
  constructor(
    private store: Store<{ auth: any }>,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.error$.subscribe((msg) => {
      if (msg) {
        this.openSnackbar(msg);
        this.store.dispatch(clearError());
      }
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  handleLogin() {
    this.loginForm.valid &&
      this.store.dispatch(loginRequest(this.loginForm.value));
  }
  openSnackbar(msg: any) {
    this._snackBar.open(msg, 'Ok', { duration: 3000 });
  }
}
