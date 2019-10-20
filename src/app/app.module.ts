import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { UpdatePatientsDataComponent } from './update-patients-data/update-patients-data.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    AddPatientComponent,
    PatientDataComponent,
    UpdatePatientComponent,
    UpdatePatientsDataComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
