import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { CRMSettingsComponent } from './crm-settings-component';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    RouterModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule
  ],
  declarations: [
    CRMSettingsComponent,
  ],
})
export class CRMSettingsModule { }