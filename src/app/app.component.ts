import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import AuthService from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'auth-with-heroku-api';
  userData$ = this.store.select((state) => state.auth?.userData);
  isLogin = false;
  constructor(
    public authService: AuthService,
    private router: Router,
    private store: Store<{ auth: any }>
  ) {}

  ngOnInit() {
    this.authService.checkIsLogin();
    if (localStorage.getItem('user')) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  handleIsLoginEvent() {
    console.log('is login event');
  }
  handleLogut() {
    this.authService.logOutUser();
  }
}
