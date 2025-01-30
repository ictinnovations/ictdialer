import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { FaxSettingsComponent } from './faxsettings-component';
import { RouterModule } from '@angular/router';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
    RouterModule,
    NbCardModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    TranslateModule
  ],
  declarations: [
    FaxSettingsComponent,
  ],
})
export class FaxSettingsModule { }
