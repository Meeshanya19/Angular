import { Component, OnInit } from '@angular/core';
import {Patient} from '../patient';
import {ActivatedRoute, Router} from '@angular/router';
import {PatientService} from '../patient.service';
import {PatientDataService} from '../patient-data.service';
import {PatientData} from '../patient-data';

@Component({
  selector: 'app-update-patients-data',
  templateUrl: './update-patients-data.component.html',
  styleUrls: ['./update-patients-data.component.css']
})
export class UpdatePatientsDataComponent implements OnInit {

  patientData: PatientData;
  patientDataId: number;
  patientId: number;
  submitted = false;
  deleteMessage = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private patientDataService: PatientDataService) { }

  ngOnInit() {
    this.patientDataId = this.route.snapshot.params['patient-data-id'];
    this.patientData = new PatientData();
    this.patientDataService.getRecord(this.patientDataId)
      .subscribe(data => {
        console.log(data)
        this.patientData = data;
      }, error => console.log(error));
    this.patientId = this.patientData.patientId;
  }

  editPatientData() {
    this.patientDataService.editPatientData( this.patientData)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patientData = new PatientData();

  }

  onSubmit() {
    this.editPatientData();
    this.gotoList(this.patientId);
  }

  gotoList(patientId: number) {
    this.router.navigate(['getPatientData', patientId]);
  }

  deletePatientData(patientDataId: number) {
    this.patientDataService.deletePatientData(patientDataId)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
        },
        error => console.log(error));
    this.gotoList(this.patientId);
  }

}
