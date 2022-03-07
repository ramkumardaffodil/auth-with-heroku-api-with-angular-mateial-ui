import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import DeleteDialogBoxComponent from '../delete-modal/delete-modal.component';
import FormBuilderService from '../form-builder.service';
import PreviewComponent from '../Preview-form/preview-form.component';

export interface PeriodicElement {
  fileName: string;
  id: number;
  formData: any;
  actions: any;
}

@Component({
  selector: 'app-form-table-component',
  templateUrl: './form-table.component.html',
  styles: ['table {width: 80%;}'],
})
export default class FormTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fileName', 'actions'];
  dataSource: any;
  name = ['ram'];
  constructor(
    private formBuilderService: FormBuilderService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit() {
    this.formBuilderService.getFormDataFromJson().subscribe((data: any) => {
      this.dataSource = data;
    });
  }
  deleteRowFromTable(id: number) {
    const data = {
      id,
      isFormFieldDelete: false,
    };
    let dialogRef = this.dialog.open(DeleteDialogBoxComponent, { data });
    dialogRef.afterClosed().subscribe(() => {
      this.formBuilderService.getFormDataFromJson().subscribe((data: any) => {
        this.dataSource = data;
      });
    });
  }
  handlePreviewInTable(data: any) {
    let dialogRef = this.dialog.open(PreviewComponent, { data });
    dialogRef.afterClosed().subscribe(() => {});
  }
  handleFormRowUpdate(data: any) {
    this.router.navigate(['/home'], { queryParams: { id: data.id } });
  }
}
