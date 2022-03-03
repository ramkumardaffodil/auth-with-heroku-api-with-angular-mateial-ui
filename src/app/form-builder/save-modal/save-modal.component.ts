import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import HomeService from '../form-builder.service';

@Component({
  selector: 'app-save-form-dialog-box',
  templateUrl: './save-modal.component.html',
})
export default class SaveFormDialogBoxComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SaveFormDialogBoxComponent>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  handleSaveForm(isSave: boolean) {
    if (isSave) {
      if (this.data.isEditMode) {
        this.homeService.getDataFromJsonServer().subscribe((data: any) => {
          const tempDataForIdOnly = JSON.parse(JSON.stringify(data));
          data = data.map((d: any) => {
            delete d.formId;
            delete d.fileName;
            return d;
          });
          const tempData = {
            formData: data,
            fileName: this.data.fileName,
          };
          console.log('before upading tempData is ', tempData);
          this.homeService
            .patchFormDataArrayInJson(tempDataForIdOnly[0].formId, tempData)
            .subscribe(() => {
              this.homeService
                .getDataFromJsonServer()
                .subscribe((response: any) => {
                  Array.from(response).forEach((c: any) => {
                    console.log(c.id);
                    this.homeService.removeItemFromJson(c.id).subscribe(() => {
                      this.openSnackBar('Item updated successfully', 'done');
                    });
                  });
                });
            });
        });
      } else {
        this.homeService.getDataFromJsonServer().subscribe((data) => {
          const tempData = {
            formData: data,
            fileName: this.data.fileName,
          };

          this.homeService.saveFormDataInJson(tempData).subscribe(() => {
            this.homeService
              .getDataFromJsonServer()
              .subscribe((response: any) => {
                Array.from(response).forEach((c: any) => {
                  console.log(c.id);
                  this.homeService.removeItemFromJson(c.id).subscribe(() => {
                    this.openSnackBar('Item saved successfully', 'done');
                  });
                });
              });
          });
        });
      }
    }
  }
}
