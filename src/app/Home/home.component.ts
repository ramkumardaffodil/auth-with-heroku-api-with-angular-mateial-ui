import { Component, SimpleChanges, OnChanges, Inject } from '@angular/core';
import AuthService from '../auth.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

import HomeService from './home.service';
import InputEditDialogBox from './inputEdit/inputEdit.component';
import ButtonEditDialogBox from './BtnEdit/btnEdit.component';
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
  todo = ['input', 'button', 'submit'];
  items = [{ label: { id: 1 } }, { input: { id: 2 } }];
  done = [''];
  data!: Control[];

  myForm = this.fb.group({});
  constructor(
    public auth: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private homeService: HomeService
  ) {}

  ngOnInit() {
    if (this.auth.isLogin) {
      this.user = JSON.parse(this.auth.getDataFromDb());
    }
    this.homeService.getDataFromJsonServer().subscribe((response: any) => {
      this.data = response;
      this.generateForm(this.data);
    });
  }
  openDialog(data: any): void {
    let dialogRef: any;
    if (data.type === 'text') {
      dialogRef = this.dialog.open(InputEditDialogBox, { data });
    } else if (data.type === 'button' || data.type === 'submit') {
      dialogRef = this.dialog.open(ButtonEditDialogBox, { data });
    }

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
    });
  }

  getTypeObject(keyType: String) {
    switch (keyType) {
    }
  }
  handleEdit(id: number) {
    console.log('u want to edit', id);
  }
  getType(type: String) {
    switch (type) {
      case 'input':
        return {
          type: 'text',
          name: 'firstName',
          value: '',
          label: 'some text',
        };
      case 'button':
        return {
          type: 'button',
          name: 'btn',
          value: 'B1',
        };
      case 'submit':
        return {
          type: 'submit',
          value: 'Submit',
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

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const data = this.getType(
        event.previousContainer.data[event.previousIndex]
      );
      this.homeService.postDataInJsonServer(data).subscribe(() => {
        this.homeService.getDataFromJsonServer().subscribe((response: any) => {
          this.data = response;
          this.generateForm(this.data);
        });
      });
    }
  }
}
