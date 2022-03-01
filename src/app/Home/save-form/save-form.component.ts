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
  selector: 'save-form-dialog-box',
  templateUrl: './save-form.component.html',
})
export default class SaveFormDialogBox {
  saveForm = this.fb.group({
    formName: [''],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<SaveFormDialogBox>,
    private homeService: HomeService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {}
  handleSaveForm() {
    const key = this.saveForm.value.formName;
    this.homeService.getDataFromJsonServer().subscribe((data) => {
      const tempData = {
        formData: data,
        fileName: key,
      };
      this.homeService.saveFormDataInJson(tempData).subscribe(() => {
        this.homeService.getDataFromJsonServer().subscribe((response: any) => {
          Array.from(response).forEach((c: any) => {
            this.homeService.removeItemFromJson(c.id).subscribe(() => {});
          });
        });
      });
    });
  }
}
