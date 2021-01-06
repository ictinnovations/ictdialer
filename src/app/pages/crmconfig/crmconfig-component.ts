import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { FormsModule, FormGroup, FormBuilder, FormControl, NG_VALIDATORS, Validator, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { AUserService } from '../user/user.service';
import { CRMConfig } from './crmconfig';
import { CrmConfigService } from './crmconfig.service';
import { md5 } from './../../md5';

@Component({
  selector: 'ngx-handler',
  template: `<div class="row">
  <div class="col-md-12">
    <nb-card>
      <nb-card-body>
        <div class="flex-centered col-xl-4 col-lg-6 col-md-8 col-sm-12">
          <h2 class="title">CRM Configuration</h2>
          <br>
          <!--
          <small class="sub-title">The server encountered an internal error or misconfiguration and was unable to complete your request.</small>
          !-->
          <form id="form" #f1="ngForm">
          <div class="form-group">
          <label for="url">REST API URL</label>
  <input type="text" class="form-control" id="url"
  required [(ngModel)]="crmconfig.url" [ngModelOptions]="{standalone: true}">
</div>
<div class="form-group">
  <label for="username">Username</label>
  <input type="text" class="form-control" id="username" [(ngModel)]="crmconfig.username" [ngModelOptions]="{standalone: true}">
</div>
<div class="form-group">
  <label for="password">Password</label>
  <input type="password" class="form-control" id="password" [(ngModel)]="crmconfig.password" [ngModelOptions]="{standalone: true}">
</div>
          </form>  
          <button nbButton fullWidth status="success" (click)="goToHome()">Submit</button>
          </div>
        </nb-card-body>
     </nb-card>
   </div>
</div>`,
  styleUrls: ['./crmconfig-component.scss'],
})
export class CrmConfigComponent implements OnInit {

  constructor(private router: Router, private authService: NbAuthService, private user_service: AUserService
  ,private crm_service: CrmConfigService, private app_service: AppService) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {
      if (token && token.getValue()) {
        this.auser = token.getPayload();
        this.user.user_id = this.auser.user_id;
      }
    })   
  }

  user: User = new User;
  form: FormGroup;
  auser:any;

  crmconfig: CRMConfig = new CRMConfig;

  ngOnInit() {
    // this.get_configuration();
  }

  goToHome() {
    var params_i = {
      user_auth : {
        user_name: this.crmconfig.username,
        password: md5(this.crmconfig.password),
        version: 1
      }
    }
    var json = JSON.stringify(params_i);
    let formdata = new FormData();
    formdata.append('method', 'login');
    formdata.append('input_type', 'JSON');
    formdata.append('response_type', 'JSON');
    formdata.append('rest_data', json);
    this.crm_service.authenticate(this.crmconfig.url, formdata).then(response => {
      if (response.id) {
        localStorage.setItem('session_id', response.id);
        this.app_service.success_message = 'Authenticated Successfully';
        this.clearMsg();

        this.crm_service.update_configuration(this.user.user_id,'crm:url', this.crmconfig.url);
        this.crm_service.update_configuration(this.user.user_id, 'crm:username', this.crmconfig.username);
        this.crm_service.update_configuration(this.user.user_id, 'crm:password', this.crmconfig.password);
      }
      else {
        this.app_service.errors = 'Username and Password don\'t match';
        this.clearMsg();
      }
    })
    .catch(err => {

    })
  }

  clearMsg() {
    setTimeout(() => {
      this.app_service.errors = '';
      this.app_service.success_message = '';
    }, 2000);
  }

  get_configuration() {
    this.crm_service.get_configuration(this.user.user_id, 'crm:username').then(response => {
      // console.log(response);
    })
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
