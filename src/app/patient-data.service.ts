import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PatientData} from './patient-data';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getPatientData(patientId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getPatientData/${patientId}`);
  }

  createPatientData(patientData: object, id: number): Observable<object> {
    return this.http.post(`${this.baseUrl}/create-patient-data/${id}`, patientData);
  }

  deletePatientData(patientDataId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-patient-data/${patientDataId}`, { responseType: 'text' });
  }

  // tslint:disable-next-line:ban-types
  getRecord(patientDataId: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/patient-data-by-id/${patientDataId}`);
  }
  // tslint:disable-next-line:ban-types
  editPatientData(patientData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/edit-patient-data/`, patientData);
  }
}
