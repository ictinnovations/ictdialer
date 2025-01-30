import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../app.service';
import { Router } from '@angular/router';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Transmission } from '../transmission/transmission';
import { InFaxService } from './infax.service';
import { MatSort,  Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'; 
import { InFaxDataSource } from './infax-datasource.component';
import { InFaxDatabase } from './infax-database.component';
import { DocumentService } from '../message/document/document.service';
import { ModalComponent } from '../../modal.component';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Faxlogs } from '../sendfax/faxlogs';
import { Faxactivity } from '../sendfax/faxlogs';
import { DocumentProgram } from '../campaigns/campaign';
import { SendFaxService } from '../sendfax/sendfax.service';

import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'ngx-infax-component',
  templateUrl: './infax-component.html',
  styleUrls: ['./infax-component.scss'],
})

export class InFaxComponent implements OnInit {

  constructor(private router: Router, private infax_service: InFaxService, private modalService: NgbModal,    private document_service: DocumentService
  ,private app_service: AppService, private http: Http,   private sendfax_service : SendFaxService) { }

  aInFax: InFaxDataSource | null;
  length: number;
  document_id:any;
  documentProgram: DocumentProgram = new DocumentProgram;
  private modalRef: NgbModalRef;
  faxDocumentURL: string;
  totalPages: number = 0;
  page: number = 1;
  isLoaded: boolean = false;
  faxlog : Faxlogs = new Faxlogs;
  faxlogarray : Faxlogs[] = [];
  faxactivity : Faxactivity = new Faxactivity;
  faxactivityarray : Faxactivity[] = [];

  displayedColumns= ['ID','username', 'phone', 'status', 'Timestamp', 'Operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('filter') filter: ElementRef;


  ngOnInit() {
    this.getInFaxList();
  }

  getInFaxList() {
    this.infax_service.get_InFaxTransmissionList().then(data => {
      this.length = data.length;
      data.forEach(element => {
        if (element.contact_phone == null) {
          element.contact_phone = 'N/A';
        }
      })

      this.aInFax = new InFaxDataSource(new InFaxDatabase( data ), this.sort, this.paginator);

      //Sort the data automatically
      const sortState: Sort = {active: 'ID', direction: 'desc'};
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);

      // Observable for the filter
      Observable.fromEvent(this.filter.nativeElement, 'keyup')
     .debounceTime(150)
     .distinctUntilChanged()
     .subscribe(() => {
       if (!this.aInFax) { return; }
       this.aInFax.filter = this.filter.nativeElement.value;
      });
    });    
  }


  downloadDocument(transmission_id) {
    this.infax_service.getTransmissionResult(transmission_id).then(response =>  {
      this.document_id = response[0].data;
      this.document_service.get_Documentdownload(this.document_id, null);
    });
  }
 

  // Send Fax related Form
  open(content, document_id) {
    this.documentProgram.document_id = document_id;
    this.modalRef = this.modalService.open(content,  { size: 'md' });

    this.modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  showPDF(pdfViewer, document_id) {
    this.modalRef = this.modalService.open(pdfViewer,  { size: 'md' });    
    this.viewFaxDocument(document_id);
  }
  // Load PDF document
  viewFaxDocument(document_id) {
    this.totalPages = 0;
    this.isLoaded = false;
    const url = this.document_service.get_ViewFaxDocument(document_id);
    this.faxDocumentURL = url;
  }
  nextPage() {
    this.page += 1;
  }
  previousPage() {
    this.page -= 1;
  }
  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  closeModal() {
    this.modalRef.close();
  }

  onSave() {
    this.modalRef.close();
    this.faxactivityarray = [];
    this.faxlogarray = [];
  }

  showFaxhistory(transmission_id) {
    this.sendfax_service.getfaxlogs(transmission_id).then(response => {
      this.faxlogarray= response;
    });
    this.sendfax_service.getfaxactivity(transmission_id).then(response => {
      this.faxactivityarray= response;
    });
    }

  con(contentt , transmission_id) {
    console.log("THIS IS TRANSMISSION ID SO YOU CAN SEE THAT" , transmission_id);
    this.showFaxhistory(transmission_id);
    this.modalRef = this.modalService.open(contentt,  { size: 'lg' });
    this.modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  async get_ContactData(contact_id) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url5 = `${this.app_service.apiUrlContacts}/${contact_id}`;
    return await this.http.get(url5, options).toPromise().then(response => response.json())
    .catch(err => this.app_service.handleError(err));
  }
}

