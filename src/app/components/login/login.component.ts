import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserSignIn } from 'src/app/models/UserSignIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  userSignIn: UserSignIn = { email: "", password: "" }

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = "Please enter both username and password";
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    
    this.userSignIn.email = this.username;
    this.userSignIn.password = this.password;
    
    this.authService.login(this.userSignIn).subscribe(
      (response) => {
        console.log("resp: ", response);
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = "Invalid credentials. Please try again.";
      }
    );
  }
}