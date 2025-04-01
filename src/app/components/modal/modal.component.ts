import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BikeServiceService } from 'src/app/services/bike-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent { // Event to notify the parent about saving the edited data

  serviceData:any;
  statuses: string[] = ['COMPLETED', 'PENDING', 'CANCELED'];
  selectedStatus:string='';
  mechanics: String[]=[];

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private bikeService:BikeServiceService,private toastr:ToastrService
  ) {
    this.serviceData = { ...data }; // Clone the employee object
    this.bikeService.getAvailableMechanics().subscribe(
      response =>{
        this.mechanics = response;
      },
      error =>{
        console.log(error);
        this.toastr.error("Error fetching mecahnics.")
        
      }
    )
  }


  onClose() {
    this.dialogRef.close();// Emit close event
  }

  onSave() {
    this.dialogRef.close(this.serviceData); // Emit save event with updated serviceData
  }
}
