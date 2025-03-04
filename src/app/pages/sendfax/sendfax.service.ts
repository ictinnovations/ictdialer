import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response, HttpModule, RequestOptions} from '@angular/http';
import {SendFax, DocumentProgram} from './sendfax';
import {AppService} from '../../../app/app.service';
import { Faxactivity, Faxlogs } from './faxlogs';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class SendFaxService {
  get_ConatctList() {
    throw new Error('Method not implemented.');
  }

  aSendFax: SendFax[] = [];
  transmission_id: any = null;
  sendfax: SendFax = new SendFax;
  documentProgram: DocumentProgram = new DocumentProgram;
  form: any;

  constructor(private http: Http, private app_service: AppService) {}

  get_OutFaxTransmissionList(): Promise<SendFax[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const getUrl = `${this.app_service.apiUrlTransmission}?direction=outbound&service_flag=2`;
    return this.http.get(getUrl, options).toPromise()
    .then(response => response.json() as SendFax[]).catch(response => this.app_service.handleError(response));
  }

  add_SendFax(sendfax: SendFax): Promise<number> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(sendfax);
    const addTransmissionUrl = `${this.app_service.apiUrlTransmission}`;
    return this.http.post(addTransmissionUrl, body, options).toPromise().then(response => response.json() as Number)
    .catch(response => this.app_service.handleError(response));
  }

  get_AccountList(): Promise<any[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const getUrl = `${this.app_service.apiUrlAccounts}`;
    return this.http.get(getUrl, options).toPromise()
    .then(response => response.json()).catch(response => this.app_service.handleError(response));
  }

  add_senddocument(documentProgram: DocumentProgram): Promise<number> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(documentProgram);
    const addSendFaxUrl = `${this.app_service.apiUrlPrograms}/sendfax`;
    return this.http.post(addSendFaxUrl, body, options).toPromise().then(response => response.json() as Number)
    .catch(response => this.app_service.handleError(response));
  }
  delete_Document(transmission_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const deletetransmissionUrl = `${this.app_service.apiUrlTransmission}/${transmission_id}`;
    return this.http.delete(deletetransmissionUrl, options).toPromise().then(response => response.json() as SendFax)
    .catch(response => this.app_service.handleError(response));
  }

  send_transmission(transmission_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const sendurl = `${this.app_service.apiUrlTransmission}/${transmission_id}/send`;
    return this.http.post(sendurl, '', options).toPromise().then(response => response.json() as SendFax)
    .catch(response => this.app_service.handleError(response));
  }

  getfaxlogs(transmission_id): Promise<any[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const getUrl = `${this.app_service.apiUrlTransmission}/faxlogs/${transmission_id}`;
    return this.http.get(getUrl, options).toPromise()
    .then(response => response.json() as Faxlogs[]).catch(response => this.app_service.handleError(response));
  }
  getfaxactivity(transmission_id): Promise<any[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const getUrl = `${this.app_service.apiUrlTransmission}/faxactivity/${transmission_id}`;
    return this.http.get(getUrl, options).toPromise()
    .then(response => response.json() as Faxactivity[]).catch(response => this.app_service.handleError(response));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
