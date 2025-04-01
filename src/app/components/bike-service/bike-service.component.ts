import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BikeServiceService } from 'src/app/services/bike-service.service';
import { BikeService } from 'src/app/models/bikeService';
import { ModalComponent } from '../modal/modal.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bike-service',
  templateUrl: './bike-service.component.html',
  styleUrls: ['./bike-service.component.css']
})
export class BikeServiceComponent implements OnInit {
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
    this.getBikeServices();
  }

  filterIncompleteServices(): void {
    this.bikeServices = this.bikeServices.filter(bikeService =>
      (bikeService.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
       bikeService.bikeModel.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  getBikeServices(){
    this.bikeServiceService.getPendingBikeServices().subscribe(
      (response) => {
        this.bikeServices = response;
        this.searchedServices = response;
        console.log("pending : ",this.bikeServices);
        
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

    this.filterIncompleteServices();
// Re-filter when search term changes
  }



  onEdit(bikeService:BikeService) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: bikeService
    });

    dialogRef.afterClosed().subscribe(updatedService => {
      if (updatedService) {
        // Update the list with new employee details
        const index = this.bikeServices.findIndex(serv => serv.id === updatedService.id);
        if (index !== -1) {
          this.bikeServices[index] = updatedService;
        }
        this.bikeServiceService.uodateService(updatedService).subscribe(
        (response)=>{
          console.log("service updated");
          this.toastr.success('Service updated successfully!', 'Success');
          
        },
        (error)=>{
          console.error(error);
          this.toastr.error('Error updating employee.', 'Error');
        }
      );
      }
    });
    }
}
