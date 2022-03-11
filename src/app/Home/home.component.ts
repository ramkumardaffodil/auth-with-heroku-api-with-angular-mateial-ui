import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import AuthService from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [],
})
export default class Home {
  userData$ = this.store.select((state) => state.auth?.userData);
  isLogin = false;

  constructor(public auth: AuthService, private store: Store<{ auth: any }>) {}
}
