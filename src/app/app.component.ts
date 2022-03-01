import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthService from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'auth-with-heroku-api';
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.checkIsLogin();
  }
  handleIsLoginEvent() {
    console.log('is login event');
  }
  handleLogut() {
    localStorage.removeItem('user');
    this.authService.checkIsLogin();
    this.router.navigate(['/login']);
  }
}
