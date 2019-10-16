import { Component, OnInit } from '@angular/core';
import { PatientRecordService} from '../patient-record.service';
import {CustomerService} from '../customer.service';
import {PatientRecord} from '../patient-record';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Customer} from '../customer';
import {Router, ActivatedRoute} from '@angular/router';
import {error} from 'util';

@Component({
  selector: 'app-customer-record',
  templateUrl: './customer-record.component.html',
  styleUrls: ['./customer-record.component.css']
})
export class CustomerRecordComponent implements OnInit {

  constructor(private recordService: PatientRecordService,
              private  customerService: CustomerService,
              private router: Router,
              private route: ActivatedRoute) { }

  get CreateDate() {
    return this.patientRecordSaveForm.get('createDate');
  }
  get PatientRecord() {
    return this.patientRecordSaveForm.get('patientRecord');
  }
  get CustomerId() {
    return this.patientRecordSaveForm.get('customerId');
  }
  record: PatientRecord;
  recordList: Array<PatientRecord>;
  customer: Customer;
  id: number;
  submitted = false;
  isupdated = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
    patientRecordSaveForm = new FormGroup({
    createDate: new FormControl(''),
    patientRecord: new FormControl('' )
  });

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.addRecordForm();
    this.findCustomer();
    this.addPatientRecords();

    this.submitted = false;
  }

  addRecord() {
    this.record = new PatientRecord();
    this.record.createDate = this.CreateDate.value ;
    this.record.patientRecord = this.PatientRecord.value;
    this.submitted = true;
    this.save();
  }


tableOptions() {this.dtOptions = {
  pageLength: 6,
  stateSave: true,
  lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
  processing: true
    };
  }
  save() {
    this.recordService.createRecord(this.record, this.id)
      .subscribe(data => console.log(data), error => console.log(error));
    this.record = new PatientRecord();
  }

  addRecordForm() {
    this.submitted = false;
    this.patientRecordSaveForm.reset();
  }

  findCustomer() {
    this.customer = new Customer();
    this.customerService.getCustomer(this.id).
    subscribe(data => {console.log(data);
                       this.customer = data; },
      // tslint:disable-next-line:no-shadowed-variable
      error => console.log(error));
  }

  addPatientRecords() {
    this.recordList = new Array<PatientRecord>();
    this.recordService.getRecordList(this.id).
      subscribe(data => {console.log(data);
                         this.recordList = data; },
      // tslint:disable-next-line:no-shadowed-variable
      error => console.log(error));
  }

}
