import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent   {
  // Array of background images

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log("token",localStorage.getItem("token"));
    
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']); // Redirect to dashboard if logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if token expired
    }
  }
}
