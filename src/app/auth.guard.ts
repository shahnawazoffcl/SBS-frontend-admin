import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // If the user is authenticated, allow navigation to the route
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // If not authenticated, redirect to the login page
    console.log("not logged in");
    
    this.router.navigate(['/login']);
    return false;
  }
}
