import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Customer } from '../customer';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  get CustomerName() {
    return this.customerSaveForm.get('customerFirstName');
  }
  get CustomerLastName() {
    return this.customerSaveForm.get('customerLastName');
  }
  get CustomerDateOfBirth() {
    return this.customerSaveForm.get('customerDateOfBirth');
  }
  get CustomerSex() {
    return this.customerSaveForm.get('customerSex');
  }
  get CustomerCountry() {
    return this.customerSaveForm.get('customerCountry');
  }
  get CustomerState() {
    return this.customerSaveForm.get('customerState');
  }
  get CustomerAddress() {
    return this.customerSaveForm.get('customerAddress');
  }

  customer: Customer = new Customer();
  submitted = false;

  customerSaveForm = new FormGroup({
    customerFirstName: new FormControl('' , [Validators.required , Validators.minLength(3) ] ),
    customerLastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    customerDateOfBirth: new FormControl('' ),
    customerSex: new FormControl('' ),
    customerCountry: new FormControl('', [Validators.required, Validators.minLength(3)]),
    customerState: new FormControl('', [Validators.required, Validators.minLength(3)]),
    customerAddress: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  ngOnInit() {
    this.submitted = false;
  }

  saveCustomer(saveCustomer) {
    this.customer = new Customer();
    this.customer.customerFirstName = this.CustomerName.value ;
    this.customer.customerLastName = this.CustomerLastName.value;
    this.customer.customerDateOfBirth = this.CustomerDateOfBirth.value;
    this.customer.customerSex = this.CustomerSex.value;
    this.customer.customerCountry = this.CustomerCountry.value;
    this.customer.customerState = this.CustomerState.value;
    this.customer.customerAddress = this.CustomerAddress.value;
    this.submitted = true;
    this.save();
  }



  save() {
    this.customerService.createCustomer(this.customer)
      .subscribe(data => console.log(data), error => console.log(error));
    this.customer = new Customer();
  }

  addCustomerForm() {
    this.submitted = false;
    this.customerSaveForm.reset();
  }
}
