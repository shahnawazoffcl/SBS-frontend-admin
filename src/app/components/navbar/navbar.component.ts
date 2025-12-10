import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  selectedLabel: string = 'pending';
  isMobileMenuOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    // Set active label on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('pending') || event.url.includes('home')) {
          this.selectedLabel = 'pending';
        } else if (event.url.includes('completed')) {
          this.selectedLabel = 'complete';
        } else if (event.url.includes('expense')) {
          this.selectedLabel = 'expense';
        } else if (event.url.includes('mechanics')) {
          this.selectedLabel = 'mechanics';
        }
      }
    });
  }

  setActiveLabel(label: string) {
    this.selectedLabel = label;
    // Close mobile menu when a link is clicked
    this.isMobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isMobileMenuOpen = false;
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
