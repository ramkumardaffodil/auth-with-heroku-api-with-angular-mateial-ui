import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import DeleteDialogBoxComponent from '../delete-modal/delete-modal.component';
import FormUpdateDialogBoxComponent from '../form-update/form-update.component';

import HomeService from '../home.service';
import PreviewComponent from '../Preview-form/preview-form.component';

export interface PeriodicElement {
  fileName: string;
  id: number;
  formData: any;
  actions: any;
}

@Component({
  selector: 'app-form-table-component',
  templateUrl: './formTable.component.html',
  styles: ['table {width: 80%;}'],
})
export default class FormTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fileName', 'actions'];
  dataSource: any;
  name = ['ram'];
  constructor(private homeService: HomeService, public dialog: MatDialog) {}
  ngOnInit() {
    this.homeService.getFormDataFromJson().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
  deleteRowFromTable(id: number) {
    const data = {
      id,
      isFormFieldDelete: false,
    };
    let dialogRef = this.dialog.open(DeleteDialogBoxComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.homeService.getFormDataFromJson().subscribe((data: any) => {
        this.dataSource = data;
      });
      console.log('The delete dialog was closed');
    });
  }
  handlePreviewInTable(data: any) {
    let dialogRef = this.dialog.open(PreviewComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The preview dialog was closed');
    });
  }
  handleFormRowUpdate(data: any) {
    let dialogRef = this.dialog.open(FormUpdateDialogBoxComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.homeService.getFormDataFromJson().subscribe((data: any) => {
        this.dataSource = data;
      });
      console.log('The row form dialog was closed');
    });
  }
}
