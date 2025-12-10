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
  searchTerm: string = '';
  searchedServices: BikeService[] = [];
  bikeService: BikeService | undefined;

  isModalOpen = false;

  handleSave(data: any) {
    console.log('Saved data:', data);
    this.isModalOpen = false; // Close modal after save
  }

  constructor(private bikeServiceService: BikeServiceService, private dialog: MatDialog, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getBikeServices();
  }

  filterIncompleteServices(): void {
    this.bikeServices = this.searchedServices.filter(bikeService =>
      (bikeService.name.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) || 
       bikeService.bikeModel.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  getBikeServices() {
    this.bikeServiceService.getPendingBikeServices().subscribe(
      (response) => {
        this.bikeServices = response;
        this.searchedServices = response;
        console.log("pending : ", this.bikeServices);
      },
      (error) => {
        console.error('Error fetching bike Services:', error);
        this.toastr.error('Error fetching services', 'Error');
      }
    );
  }

  refreshServices(): void {
    this.getBikeServices();
    this.toastr.info('Services refreshed', 'Info');
  }

  getPendingCount(): number {
    return this.bikeServices.filter(service => service.serviceStatus.toString() === 'PENDING').length;
  }

  getInProgressCount(): number {
    return this.bikeServices.filter(service => service.serviceStatus.toString() === 'INPROGRESS').length;
  }

  getStatusClass(status: String | string): string {
    const statusStr = status?.toString().toUpperCase();
    switch (statusStr) {
      case 'PENDING':
        return 'pending';
      case 'INPROGRESS':
        return 'inprogress';
      case 'COMPLETED':
        return 'completed';
      default:
        return 'pending';
    }
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    
    try {
      const dateStr = date.toString();
      const dateObj = new Date(dateStr);
      
      // Check if date is valid
      if (isNaN(dateObj.getTime())) {
        return 'N/A';
      }
      
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'N/A';
    }
  }

  formatPreferredTime(time: String | string): string {
    if (!time) return 'N/A';
    
    const timeStr = time.toString().trim();
    
    // If it's already a formatted time string, return it as is
    if (timeStr.match(/^\d{1,2}:\d{2}\s*(AM|PM|am|pm)$/i)) {
      return timeStr;
    }
    
    // If it's a date-time string, try to extract and format the time
    try {
      const dateObj = new Date(timeStr);
      if (!isNaN(dateObj.getTime())) {
        return dateObj.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      }
    } catch (error) {
      // If parsing fails, return the original string
    }
    
    // Return the original string if it's not a valid date/time
    return timeStr || 'N/A';
  }

  updateStatus(id: string, status: string): void {
    console.log("id: ", id);
    
    this.bikeServiceService.updateBikeServiceStatus(id, status).subscribe(
      (response) => {
        const bikeService = this.bikeServices.find(bike => bike.id === id);
        if (bikeService) {
          bikeService.serviceStatus = status; // Update status locally
        }
        if (status === 'COMPLETED') {
          this.bikeServices = this.bikeServices.filter(bike => bike.id !== id);
        }
        this.toastr.success('Status updated successfully', 'Success');
      },
      (error) => {
        console.error('Error updating status:', error);
        this.toastr.error('Error updating status', 'Error');
      }
    );
  }

  onSearchChange(): void {
    this.filterIncompleteServices();
  }

  onEdit(bikeService: BikeService) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: bikeService
    });

    dialogRef.afterClosed().subscribe(updatedService => {
      if (updatedService) {
        // Update the list with new service details
        const index = this.bikeServices.findIndex(serv => serv.id === updatedService.id);
        if (index !== -1) {
          this.bikeServices[index] = updatedService;
        }
        console.log("updated: ", updatedService);
        
        this.bikeServiceService.uodateService(updatedService).subscribe(
          (response) => {
          console.log("service updated");
          this.toastr.success('Service updated successfully!', 'Success');
        },
          (error) => {
          console.error(error);
            this.toastr.error('Error updating service.', 'Error');
        }
      );
      }
    });
    }
}
