import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsTransmissionComponent } from './transmission/transmission-component';
import { ErrorComponent } from './error-handler/error-handler.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'transmission',
    component: FormsTransmissionComponent,
  },
  {
    path: 'Error',
    component: ErrorComponent,
  },
  {
    path: 'contact',
    loadChildren: './contact/contact.module#ContactModule',
  }, {
    path: 'message',
    loadChildren: './message/message.module#MessageModule',
  }, {
    path: 'transmission',
    loadChildren: './transmission/transmission.module#TransmissionModule',
  }, {
    path: 'provider',
    loadChildren: './provider/provider.module#ProviderModule',
  }, {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  }, {
    path: 'extension',
    loadChildren: './extension/extension.module#ExtensionModule',
  }, {
    path: 'campaigns',
    loadChildren: './campaigns/campaign.module#CampaignModule',
  },
   {
    path: '',
    redirectTo: 'transmission',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
