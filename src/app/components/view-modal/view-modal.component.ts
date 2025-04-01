import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.css']
})
export class ViewModalComponent {

  serviceData:any;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.serviceData = { ...data }; // Clone the employee object
  }


  onClose() {
    this.dialogRef.close();// Emit close event
  }

  onSave() {
    this.dialogRef.close(this.serviceData); // Emit save event with updated serviceData
  }
}
