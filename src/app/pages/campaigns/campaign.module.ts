import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { CampaignRoutingModule, routedComponents } from './campaign-routing.module';
import { FormsCampaignComponent } from './campaign-component';
import { MatTableModule } from '@angular/material/table';
import { CdkTableModule } from '@angular/cdk/table';
import { CampaignService } from './campaign.service';
import { MatSortModule } from '@angular/material';
import { StatusComponent } from './status/status-component';
import { MatButtonModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';


@NgModule({
  imports: [
    ThemeModule,
    CampaignRoutingModule,
    MatTableModule,
    CdkTableModule,
    MatSortModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  declarations: [
    ...routedComponents,
    StatusComponent,
  ],
})
export class CampaignModule { }
