import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransmissionComponent } from './transmission.component';
import { FormsTransmissionComponent } from './transmission-component';
import { AddTransSendSMSComponent } from './sendsms/transmission-sendsms';
import { AddTransSendEmailComponent } from './sendemail/transmission-sendemail';
import { AddTransSendDocumentComponent } from './senddocument/transmission-senddocument';
import { AddTransSendRecordingComponent } from './sendvoice/transmission-sendvoice';
import { AddTransSendIVRComponent } from './sendivr/transmission-sendivr';


const routes: Routes = [{
  path: '',
  component: TransmissionComponent,
  children: [{
    path: 'transmissions',
    component: FormsTransmissionComponent,
  }, {
    path: 'transsendsms/new',
    component: AddTransSendSMSComponent,
  }, {
    path: 'transsendemail/new',
    component: AddTransSendEmailComponent,
  }, {
    path: 'transsenddocument/new',
    component: AddTransSendDocumentComponent,
  }, {
    path: 'transsendvoice/new',
    component: AddTransSendRecordingComponent,
  }, {
    path: 'transsendivr/new',
    component: AddTransSendIVRComponent,
  }, {
    path: 'transmissions/:id',
    component: AddTransSendSMSComponent,
  }, {
    path: 'transmissions/:id/delete',
    component: AddTransSendSMSComponent,
  }],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TransmissionRoutingModule {

}

export const routedComponents = [
  TransmissionComponent,
  FormsTransmissionComponent,
  AddTransSendSMSComponent,
  AddTransSendEmailComponent,
  AddTransSendDocumentComponent,
  AddTransSendRecordingComponent,
  AddTransSendIVRComponent,
];
