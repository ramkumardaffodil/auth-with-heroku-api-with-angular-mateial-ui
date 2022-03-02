import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import HomeService from '../home.service';

@Component({
  selector: 'app-save-form-dialog-box',
  templateUrl: './save-form.component.html',
})
export default class SaveFormDialogBoxComponent {
  saveForm = this.fb.group({
    formName: [''],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SaveFormDialogBoxComponent>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  handleSaveForm() {
    const key = this.saveForm.value.formName;
    this.homeService.getDataFromJsonServer().subscribe((data) => {
      const tempData = {
        formData: data,
        fileName: key,
      };
      this.homeService.saveFormDataInJson(tempData).subscribe(() => {
        this.homeService.getDataFromJsonServer().subscribe((response: any) => {
          Array.from(response).forEach((c: any) => {
            console.log(c.id);
            this.homeService.removeItemFromJson(c.id).subscribe(() => {
              this.openSnackBar('Item saved successfully', 'done');
            });
          });
        });
      });
    });
  }
}
