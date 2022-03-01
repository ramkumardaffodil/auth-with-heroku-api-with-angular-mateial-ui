import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import AuthService from '../auth.service';
import HomeService from './home.service';
import InputEditDialogBox from './inputEdit/inputEdit.component';
import ButtonEditDialogBox from './BtnEdit/btnEdit.component';
import SaveFormDialogBox from './save-form/save-form.component';
import PreviewComponent from './Preview-form/preview-form.component';

interface Controls {
  controls: Control[];
}

interface Control {
  type: string;
  id: number;
  name: string;
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export default class Home {
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
  data!: Control[];

  myForm = this.fb.group({});
  aboutRam = {
    name: 'ram',
    age: 13,
  };
  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private homeService: HomeService
  ) {}
  setDataToLocalArrayFromJson() {
    this.homeService.getDataFromJsonServer().subscribe((response: any) => {
      this.data = response;
      this.generateForm(this.data);
      //console.log('in setdatatolocalsray');
    });
  }
  ngOnInit() {
    if (this.auth.isLogin) {
      this.user = JSON.parse(this.auth.getDataFromDb());
    }
    this.setDataToLocalArrayFromJson();
  }
  ngOnChanges(change: any) {
    console.log('in on chnages', change);
  }
  openDialog(data: any): void {
    let dialogRef: any;
    if (['text', 'email', 'password', 'tel', 'number'].includes(data.type)) {
      dialogRef = this.dialog.open(InputEditDialogBox, { data });
    } else if (data.type === 'button' || data.type === 'submit') {
      dialogRef = this.dialog.open(ButtonEditDialogBox, { data });
    }

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.setDataToLocalArrayFromJson();
    });
  }
  handleSaveFormClick() {
    let dialogRef = this.dialog.open(SaveFormDialogBox);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.setDataToLocalArrayFromJson();
    });
  }
  handlePreviewClick(data: any) {
    let dialogRef = this.dialog.open(PreviewComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The preview dialog was closed');
      this.setDataToLocalArrayFromJson();
    });
  }

  handleEdit(id: number) {
    console.log('u want to edit', id);
  }
  getTypeObject(keyType: String) {
    switch (keyType) {
    }
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
          name: 'someButton',
          value: 'Button',
          label: 'somebutton',
        };
      case 'Submit':
        return {
          type: 'submit',
          name: 'someSubmit',
          value: 'Submit',
          label: 'Submit',
        };
      default:
        return {};
    }
  }
  handleSubmit() {}
  generateForm(controls: any) {
    for (const control of controls) {
      this.myForm.addControl(control.name, this.fb.control(''));
    }
  }
  previewFlag = false;

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      this.homeService.getDataFromJsonServer().subscribe((response: any) => {
        this.data = response;
        const previousData = this.data[event.previousIndex];
        const currentData = this.data[event.currentIndex];
        this.homeService
          .putDataInJsonServer(previousData.id, currentData)
          .subscribe(() => {
            this.homeService
              .putDataInJsonServer(currentData.id, previousData)
              .subscribe(() => {
                this.setDataToLocalArrayFromJson();
              });
          });
      });
    } else {
      const data = this.getType(
        event.previousContainer.data[event.previousIndex]
      );
      this.homeService.postDataInJsonServer(data).subscribe(() => {
        this.setDataToLocalArrayFromJson();
      });
    }
  }
  handleCloseDropField(id: number) {
    this.homeService.removeItemFromJson(id).subscribe(() => {
      this.setDataToLocalArrayFromJson();
    });
  }
}
