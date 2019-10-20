import { Component, OnInit } from '@angular/core';
import { PatientDataService} from '../patient-data.service';
import {PatientService} from '../patient.service';
import {PatientData} from '../patient-data';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {Patient} from '../patient';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {

  constructor(private patientDataService: PatientDataService,
              private  patientService: PatientService,
              private router: Router,
              private route: ActivatedRoute) { }

  get createDate() {
    return this.patientDataSaveForm.get('createDate');
  }
  get patientDataText() {
    return this.patientDataSaveForm.get('patientDataText');
  }
  get titleOfData() {
    return this.patientDataSaveForm.get('patientDataTitle');
  }
  get patientId() {
    return this.patientDataSaveForm.get('patientId');
  }

  patientData: PatientData;
  patientDataList: Array<PatientData>;
  patient: Patient;
  submitted = false;
  addFormToPage = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  patientDataSaveForm = new FormGroup({
    createDate: new FormControl(''),
    patientDataTitle: new FormControl(''),
    patientDataText: new FormControl('' )
  });

  ngOnInit() {
    this.patient = new Patient();
    this.patient.patientId = this.route.snapshot.params.patientId;
    this.tableOptions();
    this.findPatient();
    this.findAllPatientData();
    this.submitted = false;
  }

  addPatientData() {
    this.patientData = new PatientData();
    this.patientData.createDate = this.createDate.value ;
    this.patientData.titleOfData = this.titleOfData.value;
    this.patientData.patientDataText = this.patientDataText.value;
    this.patientData.patientId = this.patient.patientId;
    this.submitted = true;
    this.savePatientData();
  }

tableOptions() {
    this.dtOptions = {
    pageLength: 6,
    stateSave: true,
    lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
    processing: true
    };
  }

  savePatientData() {
    this.patientDataService.createPatientData(this.patientData, this.patient.patientId)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patientData = new PatientData();

  }

  reset() {
    this.submitted = false;
    this.patientDataSaveForm.reset();
    this.findAllPatientData();
    this.addFormToPage = true;
  }

  findPatient() {
    /*
    this.patient = new Patient();
    */
    this.patientService.getPatient(this.patient.patientId).
    subscribe(data => {console.log(data);
                       this.patient = data; },
      // tslint:disable-next-line:no-shadowed-variable
      error => console.log(error));
  }

  findAllPatientData() {
    // this.patientDataList = new Array<PatientData>();
    this.patientDataService.getPatientData(this.patient.patientId).
      subscribe(data => {console.log(data);
                         this.patientDataList = data; },
      // tslint:disable-next-line:no-shadowed-variable
      error => console.log(error));
  }

  goToDataList(patientId: number) {
    this.router.navigate(['getPatientData', patientId]);
  }

  deletePatientData(patientDataId: number) {
    this.patientDataService.deletePatientData(patientDataId);
    this.reset();
  }

  editPatientData(patientDataId: number ) {
    this.router.navigate(['edit-patient-data', patientDataId]);
  }
}
