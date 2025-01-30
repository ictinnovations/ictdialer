import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { FormsModule, FormGroup, FormBuilder, FormControl, NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ExtensionService } from '../extension/extension.service';
import { Extension } from '../extension/extension';
import { AppService } from '../../app.service';
import { PagesComponent } from '../pages.component';


@Component({
  selector: 'ngx-handler',
  template: `   <nb-card>
  <nb-card-header>
    {{'fax_settings.title' | translate}}
  </nb-card-header>
  <nb-card-body>
      <div class="col-sm-6">
        <div class="form-group">
          <input type="checkbox" [(ngModel)]="sendcover" [ngModelOptions]="{standalone: true}" [checked]="sendcover"> {{'fax_settings.cover' | translate}}<br>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="form-group">
          <input type="checkbox" [(ngModel)]="sendbody" [ngModelOptions]="{standalone: true}" [checked]="sendbody"> {{'fax_settings.body' | translate}}<br>
        </div>
      </div>
      <br>
      <button type="button" class="btn btn-success" (click)="updateExtSettings()">{{'buttons.submit' | translate}}</button>
  </nb-card-body>
</nb-card>`,
  styleUrls: ['./faxsettings-component.scss'],
})
export class FaxSettingsComponent implements OnInit {

  constructor(private account_service: ExtensionService, private app_service: AppService , private pagecomponent:PagesComponent) {
  }

  sendbody:any = false;
  sendcover:any = false;
  extension: Extension = new Extension;

  ngOnInit() {
    this.account_service.get_ExtensionData(-1).then(data => {
        this.extension = data;
        this.fetch_settings();
        this.fetch_coverpagesettings();
    }).catch(err => this.handleError(err));
    
  }

  fetch_settings() {
    this.account_service.get_Settings(this.extension.account_id).then(response => {
      this.sendbody = response;
    })
    .catch(err => this.handleError(err));
  }

  fetch_coverpagesettings() {
    this.account_service.get_coverpageSettings(this.extension.account_id).then(response => {
      this.sendcover = response;
    })
    .catch(err => this.handleError(err));
  }

  updateExtSettings() {
    if (this.sendbody == true) {
      this.updateSettings(this.extension.account_id);
    }
    else {
      this.deleteSettings(this.extension.account_id);
    }
    if (this.sendcover == true) {
      this.update_coverpagesettings(this.extension.account_id);
    }
    else {
      this.delete_coverpagesettings(this.extension.account_id);
    }

  }

  updateSettings(account_id) {
    this.extension.settings.emailtofax_coversheet = 'body';
    this.account_service.update_Settings(account_id,this.extension.settings.emailtofax_coversheet).then(data => {
       this.pagecomponent.messg_val = 'Fax Settings Updated Successfully';
      this.clearMsg();
    })
    .catch(this.handleError);
  }

  deleteSettings(account_id) {
    this.account_service.delete_Settings(account_id).then(data => {
       this.pagecomponent.messg_val = 'Fax Settings Updated Successfully';
      this.clearMsg();
    })
    .catch(this.handleError);
  }

  update_coverpagesettings(account_id) {
    this.extension.settings.coverpage = 'sendcover';
      this.account_service.update_coverpageSettings(account_id, this.extension.settings.coverpage).then(data => {
         this.pagecomponent.messg_val = 'Fax Settings Updated Successfully';
        this.clearMsg();
    }).catch(this.handleError);
  }

  delete_coverpagesettings(account_id) {
    this.account_service.delete_coverpageSettings(account_id).then(data => {
       this.pagecomponent.messg_val = 'Fax Settings Updated Successfully';
      this.clearMsg();
    })
    .catch(this.handleError);
  }

  clearMsg() {
    setTimeout(() => {
      this.pagecomponent.messg_val = '';
      this.app_service.errors = '';
    }, 2000);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
