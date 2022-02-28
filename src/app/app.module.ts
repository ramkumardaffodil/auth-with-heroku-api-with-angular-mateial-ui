import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import routes from './routes';
import Home from './Home/home.component';
import RegisterForm from './Auth/Register/register.component';
import LoginForm from './Auth/Login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import ButtonEditDialogBox from './Home/BtnEdit/btnEdit.component';
import InputEditDialogBox from './Home/inputEdit/inputEdit.component';

@NgModule({
  declarations: [
    AppComponent,
    Home,
    RegisterForm,
    LoginForm,
    InputEditDialogBox,
    ButtonEditDialogBox,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
