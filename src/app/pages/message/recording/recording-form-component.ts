import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Recording } from './recording';
import { RecordingService } from './recording.service';
import 'rxjs/add/operator/toPromise';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { NgClass, NgStyle } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../../app/app.service';

@Component({
  selector: 'ngx-add-recording-component',
  templateUrl: './recording-form-component.html',
  styleUrls: ['./recording-form-component.scss'],
})

export class AddRecordingComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private app_service: AppService, private recording_service: RecordingService,
  private router: Router) { }


  form1: any= {};
  recording: Recording= new Recording;
  recording_id: any = null;
  file: any;
  URL = `${this.app_service.apiUrlRecording}/${this.recording_id}/media`;
  public uploader: FileUploader = new FileUploader({url: this.URL, disableMultipart: true });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.recording_id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        return null;
      } else {
        return this.recording_service.get_RecordingData(this.recording_id).then(data => {
          this.recording = data;
        });
      }   
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.method = 'PUT';
      item.url = this.URL;
      item.withCredentials = false;
    };

    this.uploader.onAfterAddingFile = (response: any) => {
      this.file = response;
    };

    const authHeader = this.app_service.upload_Header;
    const uploadOptions = <FileUploaderOptions>{headers : authHeader};
    this.uploader.setOptions(uploadOptions);

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

  addRecording(): void {
    this.recording_service.add_Recording(this.recording).then(response => {
      const recording_id = response;
      this.URL = `${this.app_service.apiUrlRecording}/${recording_id}/media`;
      this.upload();
      this.router.navigate(['../../recording'], {relativeTo: this.route});
    });
  }

  updateRecording(): void {
    this.recording_service.update_Recording(this.recording).then((response) => {
      this.URL = `${this.app_service.apiUrlRecording}/${this.recording_id}/media`;
      if (this.file != null) {
        this.upload();
      }
      this.router.navigate(['../../recording'], {relativeTo: this.route});
    })
    .catch(this.handleError);
  }

  upload () {
    this.file.upload();
  }

  private hasBaseDropZoneOver = false;
  private hasAnotherDropZoneOver = false;

  private fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  private fileOverAnother(e: any) {
    this.hasAnotherDropZoneOver = e;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
