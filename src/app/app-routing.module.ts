import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import {PatientDataComponent} from './patient-data/patient-data.component';
import {UpdatePatientComponent} from './update-patient/update-patient.component';
import {UpdatePatientsDataComponent} from './update-patients-data/update-patients-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'view-patient', pathMatch: 'full' },
  { path: 'view-patient', component: PatientListComponent },
  { path: 'add-patient', component: AddPatientComponent },
  { path: 'add-patient-data', component: PatientDataComponent },
  { path: 'getPatientData/:patientId', component: PatientDataComponent },
  { path: 'update-patient/:patient-id', component: UpdatePatientComponent},
  { path: 'edit-patient-data/:patient-data-id', component: UpdatePatientsDataComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
