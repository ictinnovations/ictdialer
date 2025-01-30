import { Component, OnInit, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IncomingNumber } from './incoming_number';
import { IncomingNumberService } from './incoming_number.service';
import { DID } from '../did/did';
import { DIDService } from '../did/did.service';
import 'rxjs/add/operator/toPromise';
import { User } from '../user/user';
import { AUserService } from '../user/user.service';

@Component({
  selector: 'ngx-assign-incoming-component',
  templateUrl: './assign-incoming_number-component.html',
  styleUrls: ['./assign-incoming_number-component.scss'],
})

export class AssignIncomingNumberComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private in_number_service: IncomingNumberService,
  private router: Router, private user_service: AUserService, private did_service: DIDService) { }

  did: DID = new DID;
  form1: any= {};
  incomingNumber: IncomingNumber= new IncomingNumber;
  id: any= null;
  user: User[] = [];
  selectedUser: User;

  ngOnInit(): void {
    this.getUserList();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        return null;
      } else {
        return this.in_number_service.get_Data(this.id).then(data => {
          this.incomingNumber = data;
        });
      }
    });
  }

  getUserList() {
    this.user_service.get_UserList().then(data => {
      this.user = data;
    });
  }

  get selectedUsr() {
    return this.selectedUser;
  }

  set selectedUsr(value) {
    this.selectedUser = value;
    this.incomingNumber.user_id = this.selectedUser.user_id;
  }

  forwardDID(): void {
    this.did_service.unassign_DID(this.incomingNumber).then(response => {
      this.did_service.assign_DID(this.incomingNumber).then(data => {
        this.router.navigate(['../../../incoming_number'], {relativeTo: this.route});
      });
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
