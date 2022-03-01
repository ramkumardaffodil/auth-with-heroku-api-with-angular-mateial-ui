import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import HomeService from '../home.service';
import PreviewComponent from '../Preview-form/preview-form.component';

export interface PeriodicElement {
  fileName: string;
  id: number;
  formData: any;
}

@Component({
  selector: 'form-table-component',
  templateUrl: './formTable.component.html',
  styles: ['table {width: 80%;}'],
})
export default class FormTable {
  displayedColumns: string[] = ['id', 'fileName'];
  dataSource: any;
  constructor(private homeService: HomeService, public dialog: MatDialog) {}
  ngOnInit() {
    this.homeService.getFormDataFromJson().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
  handlePreviewInTable(data: any) {
    let dialogRef = this.dialog.open(PreviewComponent, { data });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The preview dialog was closed');
    });
  }
}
