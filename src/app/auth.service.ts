import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { logout } from './store/actions/auth.action';

@Injectable({
  providedIn: 'root',
})
export default class AuthService {
  constructor(
    private routes: Router,
    private http: HttpClient,
    private store: Store<{ auth: any }>
  ) {}
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
    console.log(payload);
    return this.http.post('https://pointwork.herokuapp.com/users/auth/login', {
      payload,
    });
  }

  fetchJsonData() {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
  saveDataInLocalDb(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
  }
  logOutUser() {
    localStorage.removeItem('user');
    this.store.dispatch(logout());
    this.routes.navigate(['login']);
  }
}
