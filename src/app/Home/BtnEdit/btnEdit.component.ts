import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import HomeService from '../home.service';

@Component({
  selector: 'app-home-edit-dialog-box',
  templateUrl: './btnEdit.component.html',
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  handleUpdate() {
    this.homeService
      .patchDataInJsonServer(this.data.id, this.UpdateForm.value)
      .subscribe((response) => {
        console.log('edit btn details successfully!', this.data.id);
      });
  }
}
