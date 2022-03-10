import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import AuthService from '../app.service';
import HomeService from './form-builder.service';
import InputEditDialogBox from './input-edit/input-edit.component';
import ButtonEditDialogBox from './btn-edit/btn-edit.component';
import SaveFormDialogBox from './save-modal/save-modal.component';
import PreviewComponent from './Preview-form/preview-form.component';
import DeleteDialogBoxComponent from './delete-modal/delete-modal.component';

interface Controls {
  controls: Control[];
}

interface Control {
  type: string;
  id: number;
  name: string;
  value: string;
  label: string;
  fileName?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export default class HomeComponent implements OnInit {
  user: any;
  todo = [
    'TextField',
    'Email',
    'Password',
    'Telephone',
    'Number',
    'Button',
    'Submit',
  ];

  done = [''];
  data: any;
  isEditMode = false;
  myForm = this.fb.group({});
  formContainerDataForEdit: any;
  fileNameInCaseForEdit: any;
  showJsonData: any;
  fileNameError: boolean = false;
  fileNameForUpdate: any;
  formUpdateId!: number;

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public homeService: HomeService,
    private _snackBar: MatSnackBar,
    private routes: ActivatedRoute
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngOnInit() {
    if (this.auth.isLogin) {
      this.user = JSON.parse(this.auth.getDataFromDb());
    }
    this.routes.queryParams.subscribe((d: any) => {
      console.log(d);
      if (d.id) {
        this.homeService
          .getFormDataWithIdFromJson(d.id)
          .subscribe((response: any) => {
            console.log(response);
            this.homeService.appData = response.formData;
            this.fileNameForUpdate = response.fileName;
            this.formUpdateId = response.id;
          });
      } else {
        this.homeService.appData = [];
        this.fileNameForUpdate = '';
      }
    });
  }

  openDialog(data: any): void {
    let dialogRef: any;
    if (['text', 'email', 'password', 'tel', 'number'].includes(data.type)) {
      dialogRef = this.dialog.open(InputEditDialogBox, { data });
    } else if (data.type === 'button' || data.type === 'submit') {
      dialogRef = this.dialog.open(ButtonEditDialogBox, { data });
    }

    dialogRef.afterClosed().subscribe((result: any) => {
      //this.openSnackBar('Updated successfully', 'done');
    });
  }
  handleSaveFormClick(fileName: any) {
    if (fileName) {
      this.fileNameError = false;
      const isEditMode = this.fileNameForUpdate ? true : false;
      let dialogRef = this.dialog.open(SaveFormDialogBox, {
        data: {
          fileName,
          isEditMode,
          controls: this.homeService.appData,
          formId: this.formUpdateId,
        },
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    } else {
      this.fileNameError = true;
    }
  }
  handlePreviewClick(data: any) {
    let dialogRef = this.dialog.open(PreviewComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }

  getType(type: String) {
    switch (type) {
      case 'TextField':
        return {
          type: 'text',
          name: 'firstName',
          value: '',
          label: 'some text',
        };
      case 'Email':
        return {
          type: 'email',
          name: 'someEmail',
          value: '',
          label: 'Email',
        };
      case 'Password':
        return {
          type: 'password',
          name: 'somepassword',
          value: '',
          label: 'Password',
        };
      case 'Telephone':
        return {
          type: 'tel',
          name: 'someNumber',
          value: '',
          label: 'PhoneNumber',
        };
      case 'Number':
        return {
          type: 'number',
          name: 'someNumber',
          value: '',
          label: 'Number',
        };
      case 'Button':
        return {
          type: 'button',

          value: 'Button',
        };
      case 'Submit':
        return {
          type: 'submit',
          value: 'Submit',
        };
      default:
        return {};
    }
  }
  handleSubmit() {}

  previewFlag = false;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      const previousData = this.homeService.appData[event.previousIndex];
      const currentData = this.homeService.appData[event.currentIndex];
      this.homeService.appData[event.previousIndex] = currentData;
      this.homeService.appData[event.currentIndex] = previousData;
    } else {
      const data = this.getType(
        event.previousContainer.data[event.previousIndex]
      );

      if (this.homeService.appData && this.homeService.appData.length) {
        this.homeService.appData.push({ ...data, id: new Date().getTime() });
      } else {
        this.homeService.appData = [{ ...data, id: new Date().getTime() }];
      }
    }
  }
  handleDeleteDropField(id: number) {
    const data = {
      id,
      isFormFieldDelete: true,
    };
    let dialogRef = this.dialog.open(DeleteDialogBoxComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }
  handleClearForm() {
    this.homeService.appData = [];
  }
}
