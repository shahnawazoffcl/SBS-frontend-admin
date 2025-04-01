import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BikeService } from 'src/app/models/bikeService';
import { BikeServiceService } from 'src/app/services/bike-service.service';
import { ViewModalComponent } from '../view-modal/view-modal.component';

@Component({
  selector: 'app-completed-services',
  templateUrl: './completed-services.component.html',
  styleUrls: ['./completed-services.component.css']
})
export class CompletedServicesComponent implements OnInit{

  bikeServices: BikeService[] = [];
  searchTerm: String = '';
  searchedServices:BikeService[] = [];
  bikeService:BikeService | undefined;

  isModalOpen = false;

  handleSave(data: any) {
    console.log('Saved data:', data);
    this.isModalOpen = false; // Close modal after save
  }


  constructor(private bikeServiceService: BikeServiceService,private dialog: MatDialog,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCompletedBikeServices();
  }

  filterCompleteServices(): void {
    this.bikeServices = this.bikeServices.filter(bikeService =>
      (bikeService.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
       bikeService.bikeModel.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  getCompletedBikeServices(){
    this.bikeServiceService.getCompletedBikeServices().subscribe(
      (response) => {
        this.bikeServices = response;
        this.searchedServices = response;
        console.log("Completed : ",this.bikeServices);
        
      },
      (error) => {
        console.error('Error fetching bike Services:', error);
      }
    );

  }

  updateStatus(id: String, status: string): void {
    console.log("id: ",id);
    
    this.bikeServiceService.updateBikeServiceStatus(id, status).subscribe(
      (response) => {
        const bikeService = this.bikeServices.find(bike => bike.id === id);
        if (bikeService) {
          bikeService.serviceStatus = status; // Update status locally
        }
        if (status === 'COMPLETED') {
          this.bikeServices = this.bikeServices.filter(bike => bike.id !== id);
        }
      },
      (error) => {
        console.error('Error updating status:', error);
      }
    );
  }

  onSearchChange(): void {
    this.bikeServices = this.searchedServices;

    this.filterCompleteServices();
// Re-filter when search term changes
  }



  onEdit(bikeService:BikeService) {
    const dialogRef = this.dialog.open(ViewModalComponent, {
      width: '400px',
      data: bikeService
    });
    }
}