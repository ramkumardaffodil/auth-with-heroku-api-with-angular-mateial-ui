import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import FormBuilderService from '../form-builder.service';

@Component({
  selector: 'app-save-form-dialog-box',
  templateUrl: './save-modal.component.html',
})
export default class SaveFormDialogBoxComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveFormDialogBoxComponent>,
    private formBuilderService: FormBuilderService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  handleSaveForm(isSave: boolean) {
    if (isSave) {
      if (this.data.isEditMode) {
        this.formBuilderService
          .getDataFromJsonServer()
          .subscribe((data: any) => {
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

            this.formBuilderService
              .putFormDataArrayInJson(tempDataForIdOnly[0].formId, tempData)
              .subscribe(() => {
                this.formBuilderService
                  .getDataFromJsonServer()
                  .subscribe((response: any) => {
                    Array.from(response).forEach((c: any) => {
                      this.formBuilderService
                        .removeItemFromJson(c.id)
                        .subscribe(() => {
                          this.openSnackBar(
                            'Item updated successfully',
                            'done'
                          );
                        });
                    });
                  });
              });
          });
      } else {
        this.formBuilderService.getDataFromJsonServer().subscribe((data) => {
          const tempData = {
            formData: data,
            fileName: this.data.fileName,
          };

          this.formBuilderService.saveFormDataInJson(tempData).subscribe(() => {
            this.formBuilderService
              .getDataFromJsonServer()
              .subscribe((response: any) => {
                Array.from(response).forEach((c: any) => {
                  this.formBuilderService
                    .removeItemFromJson(c.id)
                    .subscribe(() => {
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
