import { Component, OnInit, ViewChild } from '@angular/core';
import { IncomingNumberService } from './incoming_number.service';
import { IncomingNumber } from './incoming_number';
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { IncomingNumberDatabase } from './incoming_number-database.component';
import { IncomingNumberDataSource } from './incoming_number-datasource.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { DIDService } from '../did/did.service';
import { AUserService } from '../user/user.service';
import { User } from '../user/user';
import { DIDDatabase } from '../did/did-database.component';
import { DIDDataSource } from '../did/did-datasource.component';
import { DID } from '../did/did';


@Component({
  selector: 'ngx-incomingnumber-component',
  templateUrl: './incoming_number-component.html',
  styleUrls: ['./incoming_number-component.scss'],
})


export class FormsIncomingNumberComponent implements OnInit {

  auser: any
  constructor(private in_number_service: IncomingNumberService, private authService: NbAuthService
  , private did_service: DIDService, private user_service: AUserService ) {
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken,
    ) => {
      if (token && token.getValue()) {
        this.auser = token.getPayload();
      }
    });
  }
  aDID: DIDDataSource | null;
  aNumbers: IncomingNumberDataSource | null;
  length: number;
  closeResult: any;
  data = [];

  users: User[] = [];


  displayedColumns= ['phone', 'first_name', 'forward_to' ,'Operations'];

  @ViewChild(MatSort, { static: false}) sort: MatSort;

  @ViewChild(MatPaginator, { static: false}) paginator: MatPaginator;

  ngOnInit() {
    if (this.auser.is_admin == 0) {
      this.getIncomingNumberlist();
    } else {
      this.getAllList();
    }
  }

  getIncomingNumberlist() {
    this.in_number_service.get_List(this.auser.user_id).then(data => {
      this.length = data.length;
      this.aNumbers = new IncomingNumberDataSource(new IncomingNumberDatabase( data ), this.sort, this.paginator);
      this.getUserlist();
    })
    .catch(this.handleError);
  }

  getAllList() {
    this.did_service.get_DIDList().then(response => {
      this.length = response.length;
      this.aNumbers = new IncomingNumberDataSource(new IncomingNumberDatabase( response ), this.sort, this.paginator);
      this.getUserlist();
    });
  }


  getUserlist() {
    this.user_service.get_UserList().then(response => {
      this.users = response;
      this.getUsername(this.data);
    })
  }

  getUsername(data) {
    let requests = data.map((item) => {
      return new Promise((resolve) => {
        let foundelemet = this.users.find(x => x.user_id === item.created_by);
        item.name = foundelemet ? foundelemet.username : null;
        console.log(item);
        
        this.asyncFunction(item, resolve);
      });
    })
  
    Promise.all(requests).then(() => {
      this.aDID = new DIDDataSource(new DIDDatabase( data ), this.sort, this.paginator);
    });
  }

  asyncFunction (item, cb) {
    setTimeout(() => {
      // console.log('done with', item);
      cb();
    }, 300);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
