import {Component, OnInit, Optional} from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { Observable, Subject } from 'rxjs';
import {PatientRecordService} from '../patient-record.service';
import {Router, Routes} from '@angular/router';
import {CustomerRecordComponent} from '../customer-record/customer-record.component';

import {FormControl, FormGroup, Validators} from '@angular/forms';

const appRoutes: Routes = [
  { path: '/add-record/:id', component: CustomerRecordComponent },
  ];

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

 constructor(private customerservice: CustomerService,
             private patientRecordService: PatientRecordService,
             private router: Router) { }
  get CustomerName() {
    return this.customerUpdateForm.get('customerFirstName');
  }
  get CustomerLastName() {
    return this.customerUpdateForm.get('customerLastName');
  }

  get CustomerDateOfBirth() {
    return this.customerUpdateForm.get('customerDateOfBirth');
  }

  get CustomerSex() {
    return this.customerUpdateForm.get('customerSex');
  }

  get CustomerCountry() {
    return this.customerUpdateForm.get('customerCountry');
  }

  get CustomerState() {
    return this.customerUpdateForm.get('customerState');
  }

  get CustomerAddress() {
    return this.customerUpdateForm.get('customerAddress');
  }
  get CustomerId() {
    return this.customerUpdateForm.get('customerId');
  }
  customersArray: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  customers: Observable<Customer[]>;
  customer: Customer = new Customer();
  deleteMessage = false;
  somecustomer: any = Array<Customer>();
  isupdated = false;
  customerUpdateForm = new FormGroup({
    customerId: new FormControl(),
    customerFirstName: new FormControl(),
    customerLastName: new FormControl(),
    customerDateOfBirth: new FormControl(),
    customerSex: new FormControl(),
    customerCountry: new FormControl(),
    customerState: new FormControl(),
    customerAddress: new FormControl()
  });

  ngOnInit() {
    this.isupdated = false;
    this.dtOptions = {
      pageLength: 6,
      stateSave: true,
      lengthMenu: [[6, 16, 20, -1], [6, 16, 20, 'All']],
      processing: true
    };
    this.customerservice.getCustomerList().subscribe(data => {
      this.customers = data;
      this.dtTrigger.next();
    } );   }
  deleteCustomer(id: number) {
    this.customerservice.deleteCustomer(id)
      .subscribe(
        data => {
          console.log(data);
          this.deleteMessage = true;
          // tslint:disable-next-line:no-shadowed-variable
          this.customerservice.getCustomerList().subscribe(data => {
            this.customers = data;
          });
        },
        error => console.log(error));
  }
  getSomeCustomer(id: number) {
    this.customerservice.getCustomer(id)
      .subscribe(data => {
          this.somecustomer = data;
        },
        error => console.log(error));
  }

    changeisUpdate() {
    this.isupdated = false;
  }
  adRecord(id: number) {
    this.router.navigate(['/add-record']);
  }
  customerDetails(id: number) {
    this.router.navigate(['details', id]);
  }
  updateCustomer(id: number ) {
    this.router.navigate(['update-customer', id]);
  }
}
