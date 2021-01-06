import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { CrmConfigComponent } from './crmconfig-component';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule } from '@nebular/theme';
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
    CrmConfigComponent,
  ],
})
export class CrmConfigModule { }
