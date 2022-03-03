import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import ButtonEditDialogBox from './form-builder/btn-edit/btn-edit.component';
import InputEditDialogBox from './form-builder/input-edit/input-edit.component';
import PreviewComponent from './form-builder/Preview-form/preview-form.component';
import FormTable from './form-builder/form-table/form-table.component';
import SaveFormDialogBox from './form-builder/save-modal/save-modal.component';
import DeleteDialogBoxComponent from './form-builder/delete-modal/delete-modal.component';
import routes from './shared/routing/routes';
import FromBuilder from './form-builder/form-builder.component';
import RegisterForm from './auth/register/register.component';
import LoginForm from './auth/login/login.component';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    FromBuilder,
    RegisterForm,
    LoginForm,
    InputEditDialogBox,
    ButtonEditDialogBox,
    PreviewComponent,
    FormTable,
    SaveFormDialogBox,
    DeleteDialogBoxComponent,
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
