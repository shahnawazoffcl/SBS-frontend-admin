import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { response } from 'express';
import { AuthService } from 'src/app/auth.service';
import {UserSignIn } from 'src/app/models/UserSignIn';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  userSignIn:UserSignIn = {email:"",password:""}

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.userSignIn.email = this.username;
    this.userSignIn.password = this.password;
    this.authService.login(this.userSignIn).subscribe(
      (response)=>{
        console.log("resp: ",response);
        this.router.navigate(['/home']);
      },
      (error)=>{
        console.log(error);
        this.errorMessage = "Invalid Credentials"
      }
    );
  }
}