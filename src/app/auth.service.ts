import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginDTO } from './models/UserResponseDTO';
import { map, Observable, tap } from 'rxjs';
import { UserSignIn } from './models/UserSignIn';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

   private apiUrl = 'http://localhost:8082/admin/auth'; // Backend API URL
  
    constructor(private http: HttpClient) {}

  login(user:UserSignIn){
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<UserLoginDTO>(`${this.apiUrl}/login`,user, { headers }).pipe(
      tap(response =>{
        if(response && response.token){
          localStorage.setItem("token",response.token);
          this.isAuthenticated = true;
        }
      }),
      map(response => !!response.token)
    )
  }

  logout() {
    localStorage.removeItem("token");
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    if(localStorage.getItem("token"))
      this.isAuthenticated = true;
    return this.isAuthenticated;
  }
}
