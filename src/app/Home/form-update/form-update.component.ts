import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import HomeService from '../home.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home-edit-dialog-box',
  templateUrl: './form-update.component.html',
})
export default class FormUpdateDialogBoxComponent implements OnInit {
  updateFormRows = this.fb.array([]);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormUpdateDialogBoxComponent>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit() {
    if (this.data) {
      this.data.formData.forEach((fd: any) => {
        const tempForm = this.fb.group({
          label: [fd.label],
          type: [fd.type],
          name: [fd.name],
        });
        this.updateFormRows.push(tempForm);
      });
    }
  }
  handleFormRowUpdate() {
    const formData = this.updateFormRows.value;
    this.homeService
      .patchFormDataArrayInJson(this.data.id, formData)
      .subscribe(() => {
        console.log('table big form updated successfully');
        this.openSnackBar('table row updated successfully', 'done');
      });
  }
}
