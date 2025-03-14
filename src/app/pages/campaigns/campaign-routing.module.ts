import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignComponent } from './campaign.component';
import { FormsCampaignComponent } from './campaign-component';
import { AddDocCampaignComponent } from './senddocument/campaign-document-component';
import { AddEmailCampaignComponent } from './sendemail/campaign-email-component';
import { AddSMSCampaignComponent } from './sendsms/campaign-form-component';

const routes: Routes = [{
  path: '',
  component: CampaignComponent,
  children: [{
    path: 'campaigns',
    component: FormsCampaignComponent,
  }, {
    path: 'campaigns/sendfax/new',
    component: AddDocCampaignComponent,
  }, {
    path: 'campaigns/sendfax/:id',
    component: AddDocCampaignComponent,
  }, {
    path: 'campaigns/:id/delete',
    component: FormsCampaignComponent,
  }, {
    path: 'campaigns/sendemail/new',
    component: AddEmailCampaignComponent,
  }, {
    path: 'campaigns/sendemail/:id',
    component: AddEmailCampaignComponent,
  }, {
    path: 'campaigns/sendsms/new',
    component: AddSMSCampaignComponent,
  }, {
    path: 'campaigns/sendsms/:id',
    component: AddSMSCampaignComponent,
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
export class CampaignRoutingModule {

}

export const routedComponents = [
  CampaignComponent,
  FormsCampaignComponent,
  AddDocCampaignComponent,
  AddEmailCampaignComponent,
  AddSMSCampaignComponent
];
