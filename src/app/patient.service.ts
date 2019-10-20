import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PatientService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getPatientList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + 'patient-list');
  }

  createPatient(patient: object): Observable<object> {
    return this.http.post(`${this.baseUrl}` + 'save-patient', patient);
  }

  deletePatient(patientId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-patient/${patientId}`, { responseType: 'text' });
  }
  getPatient(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/patient/${patientId}`);
  }
  updatePatient( value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-patient/`, value);
  }
  }
