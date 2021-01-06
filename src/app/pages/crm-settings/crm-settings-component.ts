import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../extension/extension.service';
import { Extension } from '../extension/extension';
import { AppService } from '../../app.service';

@Component({
  selector: 'ngx-handler',
  template: `   <nb-card>
  <nb-card-header>
    CRM Settings
  </nb-card-header>
  <nb-card-body>
      <div class="col-sm-6">
        <div class="form-group">
          <input [(ngModel)]="crmselected" [ngModelOptions]="{standalone: true}" type="radio" name="rad1" [value]="true"> Fetch Groups from CRM<br>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <input [(ngModel)]="crmselected" [ngModelOptions]="{standalone: true}" type="radio" name="rad1" [value]="false"> Use ICTCore Group management<br>
        </div>
      </div>
      <br>
      <button type="button" class="btn btn-success" (click)="updateExtSettings()">Submit</button>
  </nb-card-body>
</nb-card>`,
  styleUrls: ['./crm-settings-component.scss'],
})
export class CRMSettingsComponent implements OnInit {

  constructor(private account_service: ExtensionService, private app_service: AppService) {
  }

  crmselected: any = false;
  extension: Extension = new Extension;

  ngOnInit() {
    this.account_service.get_ExtensionData(-1).then(data => {
      this.extension = data;
      this.fetch_settings();
    }).catch(err => this.handleError(err));  
  }

  fetch_settings() {
    this.account_service.get_Settings(this.extension.account_id).then(response => {
      this.crmselected = response;
    })
    .catch(err => this.handleError(err));
  }

  updateExtSettings() {
    if (this.crmselected) {
      this.updateSettings(this.extension.account_id);
    }
    else {
      this.deleteSettings(this.extension.account_id);
    }
  }

  updateSettings(account_id) {
    this.extension.settings.crmsettings = 'ictcrm';
    this.account_service.update_Settings(account_id,this.extension.settings.crmsettings).then(data => {
      this.app_service.success_message = 'CRM Settings Updated Successfully';
      this.clearMsg();
    })
    .catch(this.handleError);
  }

  deleteSettings(account_id) {
    this.account_service.delete_Settings(account_id).then(data => {
      this.app_service.success_message = 'CRM Settings Updated Successfully';
      this.clearMsg();
    })
    .catch(this.handleError);
  }

  clearMsg() {
    setTimeout(() => {
      this.app_service.errors = '';
      this.app_service.success_message = '';
    }, 2000);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}