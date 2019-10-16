import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import {CustomerRecordComponent} from './customer-record/customer-record.component';
import {UpdateCustomerComponent} from './update-customer/update-customer.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-customer', pathMatch: 'full' },
  { path: 'view-customer', component: CustomerListComponent },
  { path: 'add-customer', component: AddCustomerComponent },
  { path: 'add-record', component: CustomerRecordComponent },
  { path: 'details/:id', component: CustomerRecordComponent },
  { path: 'update-customer/:id', component: UpdateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
