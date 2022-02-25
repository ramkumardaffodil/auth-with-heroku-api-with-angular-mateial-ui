import { Component } from '@angular/core';
import AuthService from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export default class Home {
  user: any;
  constructor(public auth: AuthService) {}
  ngOnInit() {
    if (this.auth.isLogin) {
      this.user = JSON.parse(this.auth.getDataFromDb());
    }
  }
}
