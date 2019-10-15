import { Component, OnInit } from '@angular/core';
import { PatientRecordService} from '../patient-record.service';
import {PatientRecord} from '../patient-record';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Customer} from '../customer';

@Component({
  selector: 'app-customer-record',
  templateUrl: './customer-record.component.html',
  styleUrls: ['./customer-record.component.css']
})
export class CustomerRecordComponent implements OnInit {

  constructor(private recordService: PatientRecordService) { }

  get CreateDate() {
    return this.patientRecordSaveForm.get('createDate');
  }
  get PatientRecord() {
    return this.patientRecordSaveForm.get('patientRecord');
  }
  get CustomerId() {
    return this.patientRecordSaveForm.get('customerId');
  }
  record: PatientRecord = new PatientRecord();
  submitted = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  customer: Customer = new Customer();

  patientRecordSaveForm = new FormGroup({
    createDate: new FormControl(''),
    patientRecord: new FormControl('' ),
    customerId: new FormControl('' )
  });

  ngOnInit() {
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
      processing: true
    }
    this.submitted = false;
  }

  addRecord() {
    this.record = new PatientRecord();
    this.record.createDate = this.CreateDate.value ;
    this.record.customerId = this.CustomerId.value;
    this.record.patientRecord = this.PatientRecord.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.recordService.createRecord(this.record)
      .subscribe(data => console.log(data), error => console.log(error));
    this.record = new PatientRecord();
  }

  addRecordForm() {
    this.submitted = false;
    this.patientRecordSaveForm.reset();
  }

}
