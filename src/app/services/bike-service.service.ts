import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BikeService } from 'src/app/models/bikeService';
import {environment} from '../../environments/environment.prod'

@Injectable({
  providedIn: 'root'
})
export class BikeServiceService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPendingBikeServices(){
    const headers = new HttpHeaders({
      token:'' + localStorage.getItem('token'),
      'Content-Type': 'application/json'});
    return this.http.get<BikeService[]>(`${this.apiUrl}/pending`, { headers });
  }

  updateBikeServiceStatus(id: String, status: string): Observable<any> {
    const headers = new HttpHeaders({
      token:'' + localStorage.getItem('token'),
      'Content-Type': 'application/json'});
    const body = { serviceStatus: status };
    return this.http.patch(`${this.apiUrl}/bike/${id}`, body, { headers });
  }

  uodateService(bikeService:BikeService){
    const headers = new HttpHeaders({
      token:'' + localStorage.getItem('token'),
      'Content-Type': 'application/json'});
    return this.http.post(`${this.apiUrl}/update`, bikeService, { headers });
  }

  getCompletedBikeServices() {
    const headers = new HttpHeaders({
      token:'' + localStorage.getItem('token'),
      'Content-Type': 'application/json'});
    return this.http.get<BikeService[]>(`${this.apiUrl}/completed`, { headers });
  }

  getAvailableMechanics(){
    const headers = new HttpHeaders({
      token:'' + localStorage.getItem('token'),
      'Content-Type': 'application/json'});
    return this.http.get<String[]>(`${this.apiUrl}/mechanics`, { headers });
  }
  
}
