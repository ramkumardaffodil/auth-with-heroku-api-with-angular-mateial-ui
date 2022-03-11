import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { clearError, signUpRequest } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['../Login/login.component.css'],
})
export default class RegisterForm {
  hide = true;
  passwordNotMatchError = false;
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  });
  error$ = this.store.select((state) => state.auth?.error);
  isLoading$ = this.store.select((state) => state.auth?.loading);

  ngOnInit() {
    this.isBothPassMatch();
    this.error$.subscribe((msg) => {
      if (msg) {
        this.openSnackbar(msg);
        this.store.dispatch(clearError());
      }
    });
  }
  constructor(
    private store: Store<{ auth: any }>,
    private _snackBar: MatSnackBar
  ) {}

  get firstname() {
    return this.registerForm.get('firstname');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get cpassword() {
    return this.registerForm.get('cpassword');
  }

  isBothPassMatch() {
    this.registerForm.get('cpassword')?.valueChanges.subscribe((cpValue) => {
      if (cpValue !== this.password?.value) {
        this.passwordNotMatchError = true;
      } else {
        this.passwordNotMatchError = false;
      }
    });
  }

  handleRegister() {
    if (this.registerForm.valid) {
      if (this.password?.value === this.cpassword?.value) {
        this.store.dispatch(signUpRequest(this.registerForm.value));
      } else {
        this.passwordNotMatchError = true;
      }
    }
  }
  openSnackbar(msg: any) {
    this._snackBar.open(msg, 'Ok', { duration: 3000 });
  }
  handleError() {
    this.error$.subscribe((msg) => {
      if (msg) {
        this.openSnackbar(msg);
        this.store.dispatch(clearError());
      }
    });
  }
}
