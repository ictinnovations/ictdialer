import { Component, OnInit, Input, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Headers, Response, RequestOptions } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Document } from './document';
import { DocumentService } from './document.service';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../../../app.service';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload/ng2-file-upload';
import { NgClass, NgStyle } from '@angular/common';
import * as Tesseract from 'tesseract.js';

@Component({
  selector: 'ngx-add-document-component',
  templateUrl: './document-form-component.html',
  styleUrls: ['./document-form-component.scss'],
})

export class AddDocumentComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private document_service: DocumentService, private app_service: AppService,
    private router: Router) { }



  selectedFile: File | null = null;
  form1: any = {};
  file: any = [];
  document: Document = new Document;
  document_id: any = null;
  URL = `${this.app_service.apiUrlDocument}/${this.document_id}/media`;
  public uploader: FileUploader = new FileUploader({ url: this.URL, disableMultipart: true });

  unsupportedErr: any = false;
  text: string = '';
  isError = false;
  errorText: any = [];



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.document_id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        this.document.quality = 'standard';
        return null;
      } else {
        return this.document_service.get_DocumentData(this.document_id).then(data => {
          this.document = data;
        });
      }
    });

    this.uploader.onBeforeUploadItem = (item) => {
      item.method = 'POST';
      item.url = this.URL;
      item.withCredentials = false;
    };

    this.uploader.onAfterAddingFile = (response: any) => {
      this.file = response;
      if (response.file.type == 'application/pdf' || response.file.type == 'image/png' || response.file.type == 'image/jpg' || response.file.type == 'image/jpeg' || response.file.type == 'image/tiff' || response.file.type == 'image/tif' || response.file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || response.file.type == 'application/msword' || response.file.type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || response.file.type == 'application/vnd.ms-powerpoint' || response.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || response.file.type == 'application/vnd.ms-excel' || response.file.type == 'application/vnd.oasis.opendocument.text' || response.file.type == 'application/vnd.oasis.opendocument.presentation' ||  response.file.type == 'application/vnd.oasis.opendocument.spreadsheet') {

      }
      else {
        this.unsupportedErr = true;
        this.uploader.removeFromQueue(response);
        setTimeout(() => {
          this.unsupportedErr = false;
        }, 2000);
      }
    };

    const authHeader = this.app_service.upload_Header;
    const uploadOptions = <FileUploaderOptions>{headers : authHeader};
    this.uploader.setOptions(uploadOptions);

    this.uploader.onSuccessItem = (item: any, response: any, status: any, headers: any) => {
    };

  }

  addDocument(): void {
    this.document_service.add_Document(this.document).then(response => {
      const document_id = response;
      this.URL = `${this.app_service.apiUrlDocument}/${document_id}/media`;
      this.upload();
      this.router.navigate(['../../document'], { relativeTo: this.route });
    });
  }

 
  updateDocument(): void {
    this.checkFields();
    if (this.errorText.length === 0) {
      this.document_service.update_Document(this.document).then((response) => {
        this.URL = `${this.app_service.apiUrlDocument}/${this.document_id}/media`;
        if (this.file != null) {
          this.upload();
        }
        this.router.navigate(['../../document'], {relativeTo: this.route});
      })
      .catch(this.handleError);
    }else{
      this.errorHandler(true, this.errorText);
    }
  }

  uploadDocument(): void {
    this.document_service.upload_Document(this.document)
    .then((response) => {
      this.router.navigate(['../../document'], {relativeTo: this.route});
    });
  }

  upload () {
    this.uploader.uploadAll();
  }

  async recognizeImage(path) {
    const { data: { text } } = await Tesseract.recognize(path, 'eng');
    const extractedText = text.trim();
    console.log('Extracted Text:', extractedText);

    this.document.ocr = extractedText;
  }

  async recognizePDF(path) {
    console.log('PDF extraction is not implemented in this example');
  }

  async onFileSelected(event) {
    const file = event.target.files[0];

    if (file) {
      const path = URL.createObjectURL(file);

      if (file.type === 'application/pdf') {
        await this.recognizePDF(path);
      } else if (file.type.startsWith('image/')) {
        await this.recognizeImage(path);
      } else {
        console.log('Unsupported file type');
      }
    }
  }


  private checkFields(status = null):any{
    this.errorHandler(false, [])
    if (!this.document.name) this.errorText.push("Document name is required.");
    // if (this.file == null) this.errorText.push("Document file is required.");
  }

  private errorHandler(status, message):any{
    this.isError = status;
    this.errorText = message;
    if (status) {
      setTimeout(() => {
        this.isError = false;
        this.errorText = [];
      }, 10000);
    }
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
