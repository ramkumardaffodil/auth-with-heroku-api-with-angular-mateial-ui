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
  selector: 'home-edit-dialog-box',
  templateUrl: './inputEdit.component.html',
})
export default class InputEditDialogBox {
  UpdateForm = this.fb.group({
    name: [''],
    label: [''],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InputEditDialogBox>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    console.log(this.data);
  }
  handleUpdate() {
    this.homeService
      .patchDataInJsonServer(this.data.id, this.UpdateForm.value)
      .subscribe((response) => {
        console.log('edit input field details successfully!', this.data.id);
      });
  }
}
