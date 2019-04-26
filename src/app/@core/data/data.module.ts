import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import { ElectricityService } from './electricity.service';
import { StateService } from './state.service';
import { SmartTableService } from './smart-table.service';
import { PlayerService } from './player.service';
import { ContactService } from '../../pages/contact/contact.service';
import { DocumentService } from '../../pages/message/document/document.service';
import { TextService } from '../../pages/message/text/text.service';
import { RecordingService } from '../../pages/message/recording/recording.service';
import { TemplateService } from '../../pages/message/email/email.service';
import { TransmissionService } from '../../pages/transmission/transmission.service';
import { ProviderService } from '../../pages/provider/provider.service';
import { AppService } from '../../../app/app.service';
import { AUserService } from '../../pages/user/user.service';
import { ExtensionService } from '../../pages/extension/extension.service';
import { GroupService } from '../../pages/contact/group/group.service';
import { CampaignService } from '../../pages/campaigns/campaign.service';
import { AuthGuard } from '../../auth-guard.service';
import { DashboardService } from '../../pages/dashboard/dashboard.service';
import { IVRService } from '../../pages/ivr/ivr.service';

const SERVICES = [
  UserService,
  ElectricityService,
  StateService,
  SmartTableService,
  PlayerService,
  ContactService,
  DocumentService,
  TextService,
  RecordingService,
  TemplateService,
  TransmissionService,
  ProviderService,
  AppService,
  GroupService,
  CampaignService,
  AUserService,
  ExtensionService,
  DashboardService,
  IVRService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
