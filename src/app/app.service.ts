import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(private routes: Router, private http: HttpClient) {}
  isLogin = false;
  data: any;
  getDataFromDb() {
    this.data = localStorage.getItem('user');
    return this.data;
  }
  checkIsLogin() {
    if (localStorage.getItem('user')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  SignUp(data: any) {
    const payload = data;
    return this.http.post('https://pointwork.herokuapp.com/users/signup', {
      payload,
    });
  }

  SignIn(data: any) {
    let payload = data;
    return this.http.post('https://pointwork.herokuapp.com/users/auth/login', {
      payload,
    });
  }
}
