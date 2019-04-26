import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { AppService } from '../../app.service';

@Injectable()

export class IVRService {

  constructor(private http: Http, private app_service: AppService) {}

  add_IVR(ivr) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(ivr);
    const addRecordingUrl = `${this.app_service.apiUrlPrograms}/ivr`;
    return this.http.post(addRecordingUrl, body, options).toPromise().then(response => response.json())
    .catch(response => this.app_service.handleError(response));
  }

  get_ivrList() {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url = `${this.app_service.apiUrlPrograms}/ivr`;
    return this.http.get(url, options).toPromise()
    .then(response => response.json() ).catch(response => this.app_service.handleError(response));
  }

  get_ivrData(program_id) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url = `${this.app_service.apiUrlPrograms}/${program_id}`;
    return this.http.get(url, options).toPromise()
    .then(response => response.json() ).catch(response => this.app_service.handleError(response));
  }

  update_ivrData(ivr) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url = `${this.app_service.apiUrlPrograms}/${ivr.program_id}`;
    const body = JSON.stringify(ivr);
    return this.http.put(url, body, options).toPromise().then(response => response.json())
    .catch(response => this.app_service.handleError(response));
  }

  delete_ivr(program_id) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const deleteUrl = `${this.app_service.apiUrlPrograms}/${program_id}`;
    return this.http.delete(deleteUrl, options).toPromise().then(response => response.json())
    .catch(response => this.app_service.handleError(response));
  }
}
