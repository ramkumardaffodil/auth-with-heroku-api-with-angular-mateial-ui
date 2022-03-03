import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import HomeService from '../form-builder.service';

@Component({
  selector: 'app-home-edit-dialog-box',
  templateUrl: './input-edit.component.html',
})
export default class InputEditDialogBoxComponent implements OnInit {
  UpdateForm = this.fb.group({
    name: [this.data.name],
    label: [this.data.label],
    type: [this.data.type],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InputEditDialogBoxComponent>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  ngOnInit() {
    console.log(this.data);
  }
  handleUpdate() {
    this.homeService
      .patchDataInJsonServer(this.data.id, this.UpdateForm.value)
      .subscribe((response) => {
        console.log('edit input field details successfully!', this.data.id);
        this.openSnackBar('updated successfully', 'done');
      });
  }
}
