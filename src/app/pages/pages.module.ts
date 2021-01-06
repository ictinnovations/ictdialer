import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ChangePasswordModule } from './changepassword/changepassword.module';
import { CrmConfigModule } from './crmconfig/crmconfig.module';
import { CRMSettingsModule } from './crm-settings/crm-settings.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    ChangePasswordModule,
    CrmConfigModule,
    CRMSettingsModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
