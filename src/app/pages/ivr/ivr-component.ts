import { Component, OnInit, ViewChild } from '@angular/core';
import { IVRService } from './ivr.service';
import { MatSort, MatPaginator } from '@angular/material';
import { IVRDataSource } from './ivr-datasource.component';
import { IVRDatabase } from './ivr-database.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal.component';


@Component({
  selector: 'ngx-ivr',
  styleUrls: ['./ivr-component.scss'],
  templateUrl: './ivr-component.html',
})

export class FormsIVRComponent implements OnInit {

  constructor(private ivr_service: IVRService, private modalService: NgbModal) {
  }

  aIvr: IVRDataSource | null;
  private _serviceSubscription;
  length: number;
  closeResult: any;

  displayedColumns= ['ID', 'name', 'Operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.get_ivr();
  }

  get_ivr() {
    this.ivr_service.get_ivrList().then(response => {
      this.length = response.length;
      this.aIvr = new IVRDataSource(new IVRDatabase( response ), this.sort, this.paginator);
    });
  }

  deleteIvr(program_id) {
    this.ivr_service.delete_ivr(program_id)
    .then(response => {
      this.get_ivr();
    })
    .catch(this.handleError);
  }

  // Modal related
  showStaticModal(name, program_id) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = `Are you sure you want to delete ${name}?`;
    activeModal.result.then((result) => {
      this.closeResult = result;
      if (this.closeResult === 'yes_click') {
        this.deleteIvr(program_id);
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

