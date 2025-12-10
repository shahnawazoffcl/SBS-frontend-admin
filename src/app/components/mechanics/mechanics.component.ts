import { Component, OnInit } from '@angular/core';
import { BikeServiceService } from 'src/app/services/bike-service.service';
import { Mechanic } from 'src/app/models/mechanic';
import { BikeService } from 'src/app/models/bikeService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mechanics',
  templateUrl: './mechanics.component.html',
  styleUrls: ['./mechanics.component.css']
})
export class MechanicsComponent implements OnInit {
  mechanics: Mechanic[] = [];
  allServices: BikeService[] = [];
  mechanicServiceCounts: Map<string, number> = new Map();
  isAddModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  selectedMechanic: Mechanic | null = null;
  searchTerm: string = '';
  filteredMechanics: Mechanic[] = [];

  newMechanic: Mechanic = {
    id: '',
    name: '',
    updatedBy: '',
    createdBy: ''
  };

  constructor(
    private bikeService: BikeServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadMechanics();
    this.loadAllServices();
  }

  loadMechanics(): void {
    this.bikeService.getAllMechanics().subscribe(
      (response) => {
        this.mechanics = response;
        this.filteredMechanics = response;
        this.calculateServiceCounts();
      },
      (error) => {
        console.error('Error loading mechanics:', error);
        this.toastr.error('Error loading mechanics', 'Error');
      }
    );
  }

  loadAllServices(): void {
    // Load both pending and completed services
    this.bikeService.getPendingBikeServices().subscribe(
      (pendingServices) => {
        this.bikeService.getCompletedBikeServices().subscribe(
          (completedServices) => {
            this.allServices = [...pendingServices, ...completedServices];
            this.calculateServiceCounts();
          },
          (error) => {
            console.error('Error loading completed services:', error);
            this.allServices = pendingServices;
            this.calculateServiceCounts();
          }
        );
      },
      (error) => {
        console.error('Error loading pending services:', error);
        // Try to load only completed services
        this.bikeService.getCompletedBikeServices().subscribe(
          (completedServices) => {
            this.allServices = completedServices;
            this.calculateServiceCounts();
          },
          (err) => {
            console.error('Error loading services:', err);
            this.allServices = [];
          }
        );
      }
    );
  }

  calculateServiceCounts(): void {
    this.mechanicServiceCounts.clear();
    
    // Count services for each mechanic
    this.allServices.forEach(service => {
      if (service.mechanic && service.mechanic.toString().trim()) {
        const mechanicName = service.mechanic.toString().trim();
        const currentCount = this.mechanicServiceCounts.get(mechanicName) || 0;
        this.mechanicServiceCounts.set(mechanicName, currentCount + 1);
      }
    });
  }

  getServiceCount(mechanic: Mechanic): number {
    const mechanicName = mechanic.name.toString().trim();
    return this.mechanicServiceCounts.get(mechanicName) || 0;
  }

  getTotalServicesAssigned(): number {
    let total = 0;
    this.mechanicServiceCounts.forEach(count => {
      total += count;
    });
    return total;
  }

  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredMechanics = this.mechanics;
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    this.filteredMechanics = this.mechanics.filter(mechanic =>
      mechanic.name.toString().toLowerCase().includes(searchLower)
    );
  }

  openAddModal(): void {
    this.newMechanic = {
      id: '',
      name: '',
      updatedBy: '',
      createdBy: ''
    };
    this.isAddModalOpen = true;
  }

  closeAddModal(): void {
    this.isAddModalOpen = false;
    this.newMechanic = {
      id: '',
      name: '',
      updatedBy: '',
      createdBy: ''
    };
  }

  openEditModal(mechanic: Mechanic): void {
    this.selectedMechanic = { ...mechanic };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedMechanic = null;
  }

  addMechanic(): void {
    if (!this.newMechanic.name || !this.newMechanic.name.trim()) {
      this.toastr.warning('Please enter a mechanic name', 'Warning');
      return;
    }

    this.bikeService.addMechanic(this.newMechanic).subscribe(
      (response) => {
        this.toastr.success('Mechanic added successfully', 'Success');
        this.closeAddModal();
        this.loadMechanics();
      },
      (error) => {
        console.error('Error adding mechanic:', error);
        this.toastr.error('Error adding mechanic', 'Error');
      }
    );
  }

  updateMechanic(): void {
    if (!this.selectedMechanic || !this.selectedMechanic.name || !this.selectedMechanic.name.trim()) {
      this.toastr.warning('Please enter a mechanic name', 'Warning');
      return;
    }

    this.bikeService.updateMechanic(this.selectedMechanic).subscribe(
      (response) => {
        this.toastr.success('Mechanic updated successfully', 'Success');
        this.closeEditModal();
        this.loadMechanics();
      },
      (error) => {
        console.error('Error updating mechanic:', error);
        this.toastr.error('Error updating mechanic', 'Error');
      }
    );
  }

  deleteMechanic(mechanic: Mechanic): void {
    if (!confirm(`Are you sure you want to delete ${mechanic.name}?`)) {
      return;
    }

    this.bikeService.deleteMechanic(mechanic.id).subscribe(
      (response) => {
        this.toastr.success('Mechanic deleted successfully', 'Success');
        this.loadMechanics();
      },
      (error) => {
        console.error('Error deleting mechanic:', error);
        this.toastr.error('Error deleting mechanic', 'Error');
      }
    );
  }

  refreshMechanics(): void {
    this.loadMechanics();
    this.loadAllServices();
    this.toastr.info('Mechanics refreshed', 'Info');
  }
}

