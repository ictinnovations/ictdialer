import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Template } from './email';
import { TemplateService } from './email.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { NgClass, NgStyle } from '@angular/common';
import { AppService} from '../../../app.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-email-component',
  templateUrl: './email-form-component.html',
  styleUrls: ['./email-form-component.scss'],
})

export class AddTemplateComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private app_service: AppService, private template_service: TemplateService,
  private router: Router) { }


  form1: any= {};
  template: Template= new Template;
  template_id: any= null;
  URL = `${this.app_service.apiUrlTemplate}/${this.template_id}/media`;
  public uploader: FileUploader = new FileUploader({url: this.URL, disableMultipart: true});
  attachment: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.template_id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        return null;
      } else {
        return this.template_service.get_TemplateData(this.template_id).then(data => {
          this.template = data;
        });
      }
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.method = 'PUT';
      item.url = this.URL;
      item.withCredentials = false;
    };

    this.uploader.onAfterAddingFile = (response) => {
      this.attachment = response;
    };

    const authHeader = this.app_service.upload_Header;
    const uploadOptions = <FileUploaderOptions>{headers : authHeader};
    this.uploader.setOptions(uploadOptions);

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

  addTemplate(): void {
    this.template_service.add_Template(this.template).then(response => {
      const template_id = response;
      this.URL = `${this.app_service.apiUrlTemplate}/${template_id}/media`;
      this.upload();
      this.router.navigate(['../../template'], {relativeTo: this.route});
    });
  }


  updateTemplate(): void {
  this.template_service.update_Template(this.template).then((response) => {
    this.URL = `${this.app_service.apiUrlTemplate}/${this.template_id}/media`;
    if (this.attachment != null) {
      this.upload();
    }
    this.router.navigate(['../../template'], {relativeTo: this.route});
  })
  .catch(this.handleError);
  }

  upload() {
    this.attachment.upload();
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
