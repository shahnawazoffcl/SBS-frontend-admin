import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

selectedLabel:string = 'pending';
  constructor(private router: Router, private authService:AuthService) {
    // Set active label on route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('pending')) {
          this.selectedLabel = 'pending';
        } else if (event.url.includes('completed')) {
          this.selectedLabel = 'complete';
        } else if (event.url.includes('expenses')) {
          this.selectedLabel = 'expense';
        }
      }
    });
  }

setActiveLabel(arg0: string) {

}
  // Optionally, we can manage the navbar state in TypeScript if needed
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    }
}
