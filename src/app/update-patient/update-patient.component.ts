import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Patient} from '../patient';
import {PatientService} from '../patient.service';

@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {

  patientId: number;
  patient: Patient;
  submitted = false;


  constructor(private route: ActivatedRoute, private router: Router,
              private patientService: PatientService) { }

  ngOnInit() {
    this.patient = new Patient();
    this.patientId = this.route.snapshot.params['patient-id'];

    this.patientService.getPatient(this.patientId)
      .subscribe(data => {
        console.log(data)
        this.patient = data;
      }, error => console.log(error));
  }

  updatePatient() {
    this.patientService.updatePatient( this.patient)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patient = new Patient();
    this.gotoList();
  }

  onSubmit() {
    this.updatePatient();
  }

  gotoList() {
    this.router.navigate(['/view-patient']);
  }
}
