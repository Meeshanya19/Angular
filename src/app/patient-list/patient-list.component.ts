import {Component, OnInit, Optional} from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { Observable, Subject } from 'rxjs';
import {PatientDataService} from '../patient-data.service';
import {Router, Routes} from '@angular/router';
import {PatientDataComponent} from '../patient-data/patient-data.component';

import {FormControl, FormGroup, Validators} from '@angular/forms';

const appRoutes: Routes = [
  { path: '/add-record/:id', component: PatientDataComponent },
  ];

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

 constructor(private patientservice: PatientService,
             private patientRecordService: PatientDataService,
             private router: Router) { }

  get PatientName() {
    return this.patientUpdateForm.get('patientFirstName');
  }

  get PatientLastName() {
    return this.patientUpdateForm.get('patientLastName');
  }

  get PatientDateOfBirth() {
    return this.patientUpdateForm.get('patientDateOfBirth');
  }

  get PatientSex() {
    return this.patientUpdateForm.get('patientSex');
  }

  get PatientCountry() {
    return this.patientUpdateForm.get('patientCountry');
  }

  get PatientState() {
    return this.patientUpdateForm.get('patientState');
  }

  get PatientAddress() {
    return this.patientUpdateForm.get('patientAddress');
  }

  get PatientId() {
    return this.patientUpdateForm.get('patientId');
  }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  patients: Observable<Patient[]>;
  patient: Patient = new Patient();
  deleteMessage = false;
  somePatient: any = Array<Patient>();
  isUpdated = false;
  formatsDate = 'dd/MM/yyyy';

  patientUpdateForm = new FormGroup({
    patientId: new FormControl(),
    patientFirstName: new FormControl(),
    patientLastName: new FormControl(),
    patientDateOfBirth: new FormControl(),
    patientSex: new FormControl(),
    patientCountry: new FormControl(),
    patientState: new FormControl(),
    patientAddress: new FormControl()
  });

  ngOnInit() {
    this.isUpdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
      processing: true
    };

    this.patientservice.getPatientList().subscribe(data => {
      this.patients = data;
      this.dtTrigger.next(); });
  }

  deletePatient(id: number) {
    this.patientservice.deletePatient(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          // tslint:disable-next-line:no-shadowed-variable
          this.patientservice.getPatientList().subscribe(data => {
            this.patients = data;
          });
        },
        error => console.log(error));
  }

  getSomePatient(id: number) {
    this.patientservice.getPatient(id)
      .subscribe(data => {
          this.somePatient = data;
        },
        error => console.log(error));
  }

    changeisUpdate() {
    this.isUpdated = false;
  }

  adRecord(id: number) {
    this.router.navigate(['/add-record']);
  }

  patientDetails(patientId: number) {
    this.router.navigate(['getPatientData', patientId]);
  }

  updatePatient(patientId: number ) {
    this.router.navigate(['update-patient', patientId]);
  }
}
