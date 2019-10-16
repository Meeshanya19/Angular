import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getRecordList(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-record-list/${id}`);
  }

  createRecord(record: object, id: number): Observable<object> {
    return this.http.post(`${this.baseUrl}/create-record/${id}`, record);
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-record/${id}`, { responseType: 'text' });
  }

  // tslint:disable-next-line:ban-types
  getRecord(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/record/${id}`);
  }
  // tslint:disable-next-line:ban-types
  updateRecord(id: number, value: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-record/${id}`, value);
  }
}
