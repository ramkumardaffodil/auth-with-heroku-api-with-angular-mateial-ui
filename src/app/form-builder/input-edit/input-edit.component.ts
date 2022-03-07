import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import FormBuilderService from '../form-builder.service';

@Component({
  selector: 'app-home-edit-dialog-box',
  templateUrl: './input-edit.component.html',
})
export default class InputEditDialogBoxComponent {
  UpdateForm = this.fb.group({
    name: [this.data.name],
    label: [this.data.label],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InputEditDialogBoxComponent>,
    private formBuilderService: FormBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,
    public appService: FormBuilderService
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleUpdate() {
    if (this.UpdateForm.valid) {
      const updatedDataIndex = this.appService.appData.findIndex(
        (el: any) => el.id === this.data.id
      );
      this.appService.appData[updatedDataIndex] = {
        ...this.UpdateForm.value,
        type: this.data.type,
        id: new Date().getTime(),
      };
    }
  }
}
