import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import FormBuilderService from '../form-builder.service';

@Component({
  selector: 'app-delete-dialog-box',
  templateUrl: './delete-modal.component.html',
})
export default class DeleteDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogBoxComponent>,
    private formBuilderService: FormBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  handleDeleteModalYesAndNo(flag: boolean) {
    if (flag) {
      if (this.data.isFormFieldDelete) {
        this.formBuilderService
          .removeItemFromJson(this.data.id)
          .subscribe(() => {
            this.openSnackBar('Item deleted successfully', 'done');
          });
      } else {
        this.formBuilderService
          .removeDataFromFormsArrayInJson(this.data.id)
          .subscribe(() => {
            this.openSnackBar('Item deleted successfully', 'done');
          });
      }
    }
  }
}
