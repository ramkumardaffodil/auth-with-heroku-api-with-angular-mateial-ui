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
  selector: 'app-delete-dialog-box',
  templateUrl: './delete-modal.component.html',
})
export default class DeleteDialogBoxComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DeleteDialogBoxComponent>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  handleDeleteModalYesAndNo(flag: boolean) {
    if (flag) {
      if (this.data.isFormFieldDelete) {
        this.homeService.removeItemFromJson(this.data.id).subscribe(() => {
          console.log('form field remove successfully!');
          this.openSnackBar('Item deleted successfully', 'done');
        });
      } else {
        this.homeService
          .removeDataFromFormsArrayInJson(this.data.id)
          .subscribe(() => {
            console.log('form row remove successfully!');
            this.openSnackBar('Item deleted successfully', 'done');
          });
      }
    }
  }
}
