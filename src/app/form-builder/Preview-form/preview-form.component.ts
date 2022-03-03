import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-component',
  templateUrl: './preview-form.component.html',
  styles: [],
})
export default class PreviewComponent implements OnInit {
  formData: any;
  previewForm = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit() {
    this.createPreviewForm(this.data);
  }
  createPreviewForm(controls: any) {
    for (const control of controls) {
      this.previewForm.addControl(control.name, this.fb.control(''));
    }
  }
  handlePreviewSubmit() {}
}
