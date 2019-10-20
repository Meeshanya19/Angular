import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Patient } from '../patient';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor(private patientService: PatientService) { }

  get PatientName() {
    return this.patientSaveForm.get('patientFirstName');
  }
  get PatientLastName() {
    return this.patientSaveForm.get('patientLastName');
  }
  get PatientDateOfBirth() {
    return this.patientSaveForm.get('patientDateOfBirth');
  }
  get PatientSex() {
    return this.patientSaveForm.get('patientSex');
  }
  get PatientCountry() {
    return this.patientSaveForm.get('patientCountry');
  }
  get PatientState() {
    return this.patientSaveForm.get('patientState');
  }
  get PatientAddress() {
    return this.patientSaveForm.get('patientAddress');
  }

  patient: Patient;
  submitted = false;

  patientSaveForm = new FormGroup({
    patientFirstName: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    patientLastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    patientDateOfBirth: new FormControl('' ),
    patientSex: new FormControl('' ),
    patientCountry: new FormControl('', [Validators.required, Validators.minLength(3)]),
    patientState: new FormControl('', [Validators.required, Validators.minLength(3)]),
    patientAddress: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  ngOnInit() {
    this.submitted = false;
  }

  savePatient(savePatient) {
    this.patient = new Patient();
    this.patient.patientFirstName = this.PatientName.value ;
    this.patient.patientLastName = this.PatientLastName.value;
    this.patient.patientDateOfBirth = this.PatientDateOfBirth.value;
    this.patient.patientSex = this.PatientSex.value;
    this.patient.patientCountry = this.PatientCountry.value;
    this.patient.patientState = this.PatientState.value;
    this.patient.patientAddress = this.PatientAddress.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.patientService.createPatient(this.patient)
      .subscribe(data => console.log(data), error => console.log(error));
    this.patient = new Patient();
  }

  addPatientForm() {
    this.submitted = false;
    this.patientSaveForm.reset();
  }
}
