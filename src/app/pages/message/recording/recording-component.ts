import { Component, OnInit, ViewChild } from '@angular/core';
import { RecordingService } from './recording.service';
import { Recording } from './recording';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { MatSortHeaderIntl } from '@angular/material';
import { MatPaginator, MatSort } from '@angular/material';
import { RecordingDatabase } from './recording-database.component';
import { RecordingDataSource } from './recording-datasource.component';
import { ModalComponent } from '../../../modal.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-recording-component',
  templateUrl: './recording-component.html',
  styleUrls: ['./recording-component.scss'],
})

export class FormsRecordingComponent implements OnInit {
  constructor(private recording_service: RecordingService, private modalService: NgbModal) { }

  aRecording: RecordingDataSource | null;
  length: number;
  recording_id: any;
  closeResult: any;

  displayedColumns= ['ID', 'name', 'type', 'length', 'Operations'];

  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getRecordinglist();
  }

  getRecordinglist() {
    this.recording_service.get_RecordingList().then(data => {
      this.length = data.length;
      this.aRecording = new RecordingDataSource(new RecordingDatabase( data ), this.sort, this.paginator);
    });
  }


  deleteRecording(recording_id): void {
    this.recording_service.delete_Recording(recording_id)
    .then(response => {
    })
    .catch(this.handleError);
    this.getRecordinglist();
  }

  // Modal related
  showStaticModal(name, recording_id) {
    const activeModal = this.modalService.open(ModalComponent, {
      size: 'sm',
      container: 'nb-layout',
    });

    activeModal.componentInstance.modalHeader = 'Alert';
    activeModal.componentInstance.modalContent = `Are you sure you want to delete ${name}?`;
    activeModal.result.then((result) => {
      this.closeResult = result;
      if (this.closeResult === 'yes_click') {
        this.deleteRecording(recording_id);
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

  downloadRecording(recording_id): void {
    this.recording_service.get_Recordingdownload(recording_id);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
