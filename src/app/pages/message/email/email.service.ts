import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response, HttpModule, RequestOptions, ResponseContentType} from '@angular/http';
import { Template } from './email';
import { AppService } from '../../../../app/app.service';
import { getFileNameFromResponseContentDisposition, saveFile } from '../../../file-download-helper';


import 'rxjs/add/operator/toPromise';

@Injectable()

export class TemplateService {

  aTemplate: Template[]= [];
  template_id: any= null;
  template: Template= new Template;

  constructor(private http: Http, private app_service: AppService) {}

  get_TemplateList(): Promise<Template[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    return this.http.get(this.app_service.apiUrlTemplate, options).toPromise()
    .then(response => response.json() as Template[]).catch(response => this.app_service.handleError(response));
  }

  get_TemplateData(template_id): Promise<Template> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url5 = `${this.app_service.apiUrlTemplate}/${template_id}`;
    return this.http.get(url5, options).toPromise()
    .then(response => response.json() as Template).catch(response => this.app_service.handleError(response));
  }

  add_Template(template: Template): Promise<Template> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(template);
    const addTemplateUrl = `${this.app_service.apiUrlTemplate}`;
    return this.http.post(addTemplateUrl, body, options).toPromise().then(response => response.json() as Template)
    .catch(response => this.app_service.handleError(response));
  }

  update_Template(template: Template): Promise<Template> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(template);
    const updateTemplateUrl = `${this.app_service.apiUrlTemplate}/${template.template_id}`;
    return this.http.put(updateTemplateUrl, body, options).toPromise().then(response => response.json() as Template)
    .catch(response => this.app_service.handleError(response));
  }

  delete_Template(template_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const deleteTemplateUrl = `${this.app_service.apiUrlTemplate}/${template_id}`;
    return this.http.delete(deleteTemplateUrl, options).toPromise().then(response => response.json() as Template)
    .catch(response => this.app_service.handleError(response));
  }

  get_Templatedownload(template_id): any {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    options.responseType = ResponseContentType.Blob;
    const url = `${this.app_service.apiUrlTemplate}/${template_id}/media`;
    this.http.get(url, options).subscribe(res => {
      const fileName = getFileNameFromResponseContentDisposition(res);
      saveFile(res.blob(), fileName);
    }, error => {
      this.app_service.downloadError(error);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}