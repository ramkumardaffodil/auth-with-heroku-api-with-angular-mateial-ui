import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import HomeService from '../form-builder.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home-edit-dialog-box',
  templateUrl: './btn-edit.component.html',
})
export default class ButtonEditDialogBoxComponent {
  UpdateForm = this.fb.group({
    value: [''],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ButtonEditDialogBoxComponent>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {
    console.log('in edit btn', this.data);
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleUpdate() {
    this.homeService
      .patchDataInJsonServer(this.data.id, this.UpdateForm.value)
      .subscribe((response) => {
        console.log('edit btn details successfully!', this.data.id);
        this.openSnackBar('Updated successfully', 'done');
      });
  }
}
