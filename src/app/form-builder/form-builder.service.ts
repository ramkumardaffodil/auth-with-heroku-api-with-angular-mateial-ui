import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export default class FormBuilderService {
  endPoint = environment.apiEndPoint;
  constructor(private http: HttpClient) {}
  getDataFromJsonServer() {
    return this.http.get(`${this.endPoint}/controls`);
  }
  postDataInJsonServer(data: any) {
    return this.http.post(`${this.endPoint}/controls`, data);
  }
  patchDataInJsonServer(id: number, data: any) {
    return this.http.patch(`${this.endPoint}/controls/${id}`, data);
  }
  putDataInJsonServer(id: number, data: any) {
    return this.http.put(`${this.endPoint}/controls/${id}`, data);
  }
  removeItemFromJson(id: number) {
    return this.http.delete(`${this.endPoint}/controls/${id}`);
  }
  saveFormDataInJson(data: any) {
    console.log('data in savedatainjson', data);
    return this.http.post(`${this.endPoint}/forms`, data);
  }
  getFormDataFromJson() {
    return this.http.get(`${this.endPoint}/forms`);
  }
  removeDataFromFormsArrayInJson(id: number) {
    return this.http.delete(`${this.endPoint}/forms/${id}`);
  }
  putFormDataArrayInJson(id: number, formData: any) {
    return this.http.put(`${this.endPoint}/forms/${id}`, formData);
  }
}
