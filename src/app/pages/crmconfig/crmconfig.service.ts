import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { AppService } from '../../app.service';

@Injectable()

export class CrmConfigService {
  
  constructor(private http: Http, private app_service: AppService) { }

  authenticate(url, formdata) {
    return this.http.post(url, formdata).toPromise().then(response => response.json());
  }

  update_configuration(user_id, config_name, config_val) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const updateDocumentUrl = `${this.app_service.apiUrlUsers}/${user_id}/config/${config_name}`;
    const body = JSON.stringify(config_val);
    return this.http.put(updateDocumentUrl, body, options).toPromise().then(response => response.json())
    .catch(response => this.app_service.handleError(response));
  }

  get_configuration(user_id, config_name) {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const getUrl = `${this.app_service.apiUrlUsers}/${user_id}/config/${config_name}`;
    return this.http.get(getUrl, options).toPromise().then(response => response.json())
    .catch(response => this.app_service.handleError(response));
  }

}