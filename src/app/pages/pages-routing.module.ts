import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ChangePasswordComponent } from './changepassword/changepassword-component';
import { CrmConfigComponent } from './crmconfig/crmconfig-component';
import { CRMSettingsComponent } from './crm-settings/crm-settings-component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'Changepass',
      component: ChangePasswordComponent
    },
    {
      path: 'Crmconfig',
      component: CrmConfigComponent
    },
    {
      path: 'crmsettings',
      component: CRMSettingsComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'contact',
      loadChildren: () => import('./contact/contact.module')
        .then(m => m.ContactModule),
    },
    {
      path: 'message',
      loadChildren: () => import('./message/message.module')
        .then(m => m.MessageModule),
    },
    {
      path: 'transmission',
      loadChildren: () => import('./transmission/transmission.module')
        .then(m => m.TransmissionModule),
    },
    {
      path: 'provider',
      loadChildren: () => import('./provider/provider.module')
        .then(m => m.ProviderModule),
    },
    {
      path: 'user',
      loadChildren: () => import('./user/user.module')
        .then(m => m.UserModule),
    },
    {
      path: 'extension',
      loadChildren: () => import('./extension/extension.module')
        .then(m => m.ExtensionModule),
    },
    {
      path: 'campaigns',
      loadChildren: () => import('./campaigns/campaign.module')
        .then(m => m.CampaignModule),
    },
    {
      path: 'ivr',
      loadChildren: () => import('./ivr/ivr.module')
        .then(m => m.IVRModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
