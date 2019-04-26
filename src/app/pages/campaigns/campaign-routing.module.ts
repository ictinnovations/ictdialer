import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignComponent } from './campaign.component';
import { FormsCampaignComponent } from './campaign-component';
import { AddSMSCampaignComponent } from './sendsms/campaign-form-component';
import { AddEmailCampaignComponent } from './sendemail/campaign-email-component';
import { AddVoiceCampaignComponent } from './sendvoice/campaign-voice-component';
import { AddDocCampaignComponent } from './senddocument/campaign-document-component';
import { AddIVRCampaignComponent } from './sendivr/campaign-ivr-component';
import { Component } from '@angular/core/src/metadata/directives';

const routes: Routes = [{
  path: '',
  component: CampaignComponent,
  children: [{
    path: 'campaigns',
    component: FormsCampaignComponent,
  }, {
    path: 'campaigns/sendsms/new',
    component: AddSMSCampaignComponent,
  }, {
    path: 'campaigns/sendemail/new',
    component: AddEmailCampaignComponent,
  }, {
    path: 'campaigns/voicemessage/new',
    component: AddVoiceCampaignComponent,
  }, {
    path: 'campaigns/sendfax/new',
    component: AddDocCampaignComponent,
  }, {
    path: 'campaigns/ivr/new',
    component: AddIVRCampaignComponent,
  }, {
    path: 'campaigns/sendsms/:id',
    component: AddSMSCampaignComponent,
  }, {
    path: 'campaigns/sendemail/:id',
    component: AddEmailCampaignComponent,
  }, {
    path: 'campaigns/voicemessage/:id',
    component: AddVoiceCampaignComponent,
  }, {
    path: 'campaigns/sendfax/:id',
    component: AddDocCampaignComponent,
  }, {
    path: 'campaigns/ivr/:id',
    component: AddIVRCampaignComponent,
  }, {
    path: 'campaigns/:id/delete',
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
  AddSMSCampaignComponent,
  AddEmailCampaignComponent,
  AddVoiceCampaignComponent,
  AddDocCampaignComponent,
  AddIVRCampaignComponent,
];
