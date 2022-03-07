import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import FormBuilderService from '../form-builder.service';

@Component({
  selector: 'app-save-form-dialog-box',
  templateUrl: './save-modal.component.html',
})
export default class SaveFormDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveFormDialogBoxComponent>,
    private router: Router,
    private formBuilderService: FormBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
  handleSaveForm(isSave: boolean) {
    if (isSave) {
      if (this.data.isEditMode) {
        this.formBuilderService
          .putFormDataArrayInJson(this.data.formId, {
            formData: this.data.controls,
            fileName: this.data.fileName,
          })
          .subscribe((response) => {
            this.openSnackBar('Item updated successfully', 'done');
            this.router.navigate(['/forms']);
            // this.formBuilderService.appData = [];
          });
      } else {
        const tempData = {
          formData: this.data.controls,
          fileName: this.data.fileName,
        };

        this.formBuilderService.saveFormDataInJson(tempData).subscribe(() => {
          this.openSnackBar('Item saved successfully', 'done');
          //this.formBuilderService.appData = [];
          this.router.navigate(['/forms']);
        });
      }
    }
  }
}
