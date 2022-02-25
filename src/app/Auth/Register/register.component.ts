import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import AuthService from 'src/app/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register.component.html',
  styleUrls: ['../Login/login.component.css'],
})
export default class RegisterForm {
  hide = true;
  emailAlreadyError = false;
  passwordNotMatchError = false;
  ngOnInit() {
    this.isBothPassMatch();
    this.isEmailAlreadyErrorClear();
  }
  registerForm = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}
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
      console.log(cpValue);
      if (cpValue !== this.password?.value) {
        this.passwordNotMatchError = true;
      } else {
        this.passwordNotMatchError = false;
      }
    });
  }
  isEmailAlreadyErrorClear() {
    this.registerForm.get('email')?.valueChanges.subscribe((cpValue) => {
      this.emailAlreadyError = false;
    });
  }
  response(res: any) {
    console.log('in response', res);
    this.router.navigate(['/login']);
  }
  error(err: any) {
    console.log('error while', err);
    console.log(err.error.includes('Email id already registered'));
    if (err.error.includes('Email id already registered')) {
      this.emailAlreadyError = true;
    }
  }
  complete() {
    console.log('in complete');
  }
  handleRegister() {
    if (this.registerForm.valid) {
      if (this.password?.value === this.cpassword?.value) {
        this.passwordNotMatchError = false;
        this.emailAlreadyError = false;
        this.authService.SignUp(this.registerForm.value).subscribe(
          (res) => this.response(res),
          (err) => this.error(err),
          () => this.complete()
        );
      } else {
        console.log(this.passwordNotMatchError);
        this.passwordNotMatchError = true;
      }
    }
  }
}
