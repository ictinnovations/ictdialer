import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response, HttpModule, RequestOptions} from '@angular/http';
import {Transmission, Program, SMSProgram, VoiceCallProgram, DocumentProgram, TemplateProgram} from './transmission';
import {AppService} from '../../../app/app.service';


import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class TransmissionService {

  aTransmission: Transmission[] = [];
  transmission_id: any = null;
  transmission: Transmission = new Transmission;
  progarm: Program = new Program;
  smsProgram: SMSProgram = new SMSProgram;
  documentProgram: DocumentProgram = new DocumentProgram;
  voiceProgram: VoiceCallProgram = new VoiceCallProgram;
  templateProgram: TemplateProgram = new TemplateProgram;
  form: any;

  constructor(private http: Http, private app_service: AppService) {}

  get_OutFaxTransmissionList(): Promise<Transmission[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const getUrl = `${this.app_service.apiUrlTransmission}?service_flag=1&direction=outbound`;
    return this.http.get(getUrl, options).toPromise()
    .then(response => response.json() as Transmission[]).catch(response => this.app_service.handleError(response));
  }

  get_ProgramList(): Promise<Program[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    return this.http.get(this.app_service.apiUrlPrograms, options).toPromise()
    .then(response => response.json() as Program[]).catch(response => this.app_service.handleError(response));
  }

  get_ProgramData(program_id): Promise<Program> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url5 = `${this.app_service.apiUrlPrograms}/${program_id}`;
    return this.http.get(url5, options).toPromise()
    .then(response => response.json() as Program).catch(response => this.app_service.handleError(response));
  }

  add_Transmission(transmission: Transmission): Promise<number> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(transmission);
    const addTransmissionUrl = `${this.app_service.apiUrlTransmission}`;
    return this.http.post(addTransmissionUrl, body, options).toPromise().then(response => response.json() as Number)
    .catch(response => this.app_service.handleError(response));
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

  add_voicecall(voiceProgram: VoiceCallProgram): Promise<number> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(voiceProgram);
    const addSendRecordingUrl = `${this.app_service.apiUrlPrograms}/voicemessage`;
    return this.http.post(addSendRecordingUrl, body, options).toPromise().then(response => response.json() as Number)
    .catch(response => this.app_service.handleError(response));
  }

  delete_Program(program_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const deleteProgramUrl = `${this.app_service.apiUrlPrograms}/${program_id}`;
    return this.http.delete(deleteProgramUrl, options).toPromise().then(response => response.json() as Program)
    .catch(response => this.app_service.handleError(response));
  }

  send_transmission(transmission_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const sendurl = `${this.app_service.apiUrlTransmission}/${transmission_id}/send`;
    return this.http.post(sendurl, '', options).toPromise().then(response => response.json() as Transmission)
    .catch(response => this.app_service.handleError(response));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
