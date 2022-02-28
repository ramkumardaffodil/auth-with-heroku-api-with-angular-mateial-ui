import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export default class HomeService {
  constructor(private routes: Router, private http: HttpClient) {}
  getDataFromJsonServer() {
    return this.http.get('http://localhost:3000/controls');
  }
  postDataInJsonServer(data: any) {
    return this.http.post('http://localhost:3000/controls', data);
  }
  patchDataInJsonServer(id: number, data: any) {
    return this.http.patch(`http://localhost:3000/controls/${id}`, data);
  }
}
