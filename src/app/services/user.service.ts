import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserSignIn } from '../models/UserSignIn';
import { UserLoginDTO } from '../models/UserResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  [x: string]: any;
  
  private apiServerUrl = 'http://localhost:8081/admin';

  constructor(private http: HttpClient) {}


  public signIn(user: UserSignIn): Observable<HttpResponse<UserLoginDTO>> {
    return this.http.post<UserLoginDTO>(`${this.apiServerUrl}/auth/login`, user, {observe:'response'});
  }

  // public logout(token:string):void {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'token': ''+token
  //   });
  //   console.log('logout token:', token);
  //   console.log('logout headers:', headers);
  //   this.isLoggedInSubject.next(false);
  
    
  //   this.http.get<string>(`${this.apiServerUrl}/auth/logout`, {headers: headers}).subscribe((data:any) => {
  //     console.log(data.message);
  //     })
  //     ;
  // }

}
