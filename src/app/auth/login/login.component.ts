import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import AuthService from 'src/app/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginFormComponent implements OnInit {
  notFoundError = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  hide = true;
  ngOnInit() {
    this.clearNotFoundError();
  }
  constructor(private authService: AuthService, private router: Router) {}
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  clearNotFoundError() {
    this.loginForm.get('email')?.valueChanges.subscribe((v) => {
      this.notFoundError = false;
    });
    this.loginForm.get('password')?.valueChanges.subscribe((v) => {
      this.notFoundError = false;
    });
  }
  response(res: any) {
    console.log('in response', res);
    localStorage.setItem('user', JSON.stringify(res));
    this.authService.checkIsLogin();
    this.router.navigate(['/home']);
  }
  error(err: any) {
    console.log(err, err.statusText.includes('Not Found'));
    if (err.statusText.includes('Not Found')) {
      this.notFoundError = true;
    }
  }
  complete() {
    console.log('in complete');
  }
  handleLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.SignIn(this.loginForm.value).subscribe(
        (resp) => this.response(resp),
        (err) => this.error(err),
        () => this.complete()
      );
    }
  }
}
