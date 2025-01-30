import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DIDService } from './did.service';
import {MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DIDDatabase } from './did-database.component';
import { DIDDataSource } from './did-datasource.component';
import { ModalComponent } from '../../modal.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AUserService } from '../user/user.service';
import { User } from '../user/user';

@Component({
  selector: 'ngx-did-component',
  templateUrl: './did-component.html',
  styleUrls: ['./did-component.scss'],
})


export class FormsDIDComponent implements OnInit {
  constructor(private did_service: DIDService, private modalService: NgbModal, private user_service: AUserService) { }

  aDID: DIDDataSource | null;
  length: number;
  closeResult: any;
  data: [];


  users: User[] = [];


  displayedColumns= ['phone', 'first_name', 'assinged_to', 'Operations'];

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild('filter', {static: false}) filter: ElementRef;


  ngOnInit() {
    this.getDIDlist();
  }

  getDIDlist() {
    this.did_service.get_DIDList().then(data => {
      this.length = data.length;
      this.data = data;
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



  deleteDID(account_id): void {
    this.did_service.delete_DID(account_id)
    .then(response => {
    })
    .catch(this.handleError);
    this.getDIDlist();
  }

  // Modal related
  showStaticModal(name, account_id) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = `Are you sure you want to delete ${name}?`;
    activeModal.result.then((result) => {
      this.closeResult = result;
      if (this.closeResult === 'yes_click') {
        this.deleteDID(account_id);
      }
    }, (reason) => {
      this.closeResult = this.getDismissReason(reason);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
