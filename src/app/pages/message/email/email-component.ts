import { Component, OnInit, ViewChild } from '@angular/core';
import { TemplateService } from './email.service';
import { Template } from './email';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TemplateDatabase } from './email-database.component';
import { TemplateDataSource } from './email-datasource.component';
import { ModalComponent } from '../../../modal.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-email-component',
  templateUrl: './email-component.html',
  styleUrls: ['./email-component.scss'],
})

export class FormsTemplateComponent implements OnInit {
  constructor(private template_service: TemplateService, private modalService: NgbModal) { }

  aTemplate: TemplateDataSource | null;
  length: number;
  closeResult: any;

  displayedColumns= ['ID', 'name', 'type', 'Operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getTemplatelist();
  }

  getTemplatelist() {
    this.template_service.get_TemplateList().then(data => {
      this.length = data.length;
      this.aTemplate = new TemplateDataSource(new TemplateDatabase( data ), this.sort, this.paginator);
    });
  }


  downloadTemplate(template_id): void {
    this.template_service.get_Templatedownload(template_id);
  }


  deleteTemplate(template_id): void {
    this.template_service.delete_Template(template_id)
    .then(response => {
    })
    .catch(this.handleError);
    this.getTemplatelist();
  }

  // Modal related
  showStaticModal(name, template_id) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = `Are you sure you want to delete ${name}?`;
    activeModal.result.then((result) => {
      this.closeResult = result;
      if (this.closeResult === 'yes_click') {
        this.deleteTemplate(template_id);
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