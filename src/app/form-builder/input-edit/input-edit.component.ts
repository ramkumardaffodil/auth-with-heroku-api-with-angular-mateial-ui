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
    type: [this.data.type],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<InputEditDialogBoxComponent>,
    private formBuilderService: FormBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  handleUpdate() {
    this.formBuilderService
      .patchDataInJsonServer(this.data.id, this.UpdateForm.value)
      .subscribe(() => {
        this.openSnackBar('updated successfully', 'done');
      });
  }
}
