import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsTransmissionComponent } from '../../pages/transmission/transmission-component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { TransmissionService } from '../../pages/transmission/transmission.service';
import { MatSortModule, MatIconModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule, MatNativeDateModule } from '@angular/material';
import { IVRRoutingModule, routedComponents } from './ivr-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NbCardModule, NbIconModule } from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    IVRRoutingModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NbCardModule,
    FormsModule, 
    MatIconModule,
    ReactiveFormsModule,
    NbIconModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class IVRModule { }
