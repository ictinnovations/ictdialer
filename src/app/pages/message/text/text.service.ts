import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {Http, Response, HttpModule, RequestOptions} from '@angular/http';
import {Text} from './text';
import {AppService} from '../../../../app/app.service';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class TextService {

  aText: Text[]= [];
  text_id: any= null;
  text: Text= new Text;

  constructor(private http: Http, private app_service: AppService) { }

  get_TextList(): Promise<Text[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    return this.http.get(this.app_service.apiUrlText, options).toPromise()
    .then(response => response.json() as Text[]).catch(response => this.app_service.handleError(response));
  }

  get_TextData(text_id): Promise<Text> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url5 = `${this.app_service.apiUrlText}/${text_id}`;
    return this.http.get(url5, options).toPromise()
    .then(response => response.json() as Text).catch(response => this.app_service.handleError(response));
  }

  add_Text(text: Text): Promise<Text> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(text);
    const addTextUrl = `${this.app_service.apiUrlText}`;
    return this.http.post(addTextUrl, body, options).toPromise().then(response => response.json() as Text)
    .catch(response => this.app_service.handleError(response));
  }

  update_Text(text: Text): Promise<Text> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(text);
    const updateTextUrl = `${this.app_service.apiUrlText}/${text.text_id}`;
    return this.http.put(updateTextUrl, body, options).toPromise().then(response => response.json() as Text)
    .catch(response => this.app_service.handleError(response));
  }

  delete_Text(text_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const deleteTextUrl = `${this.app_service.apiUrlText}/${text_id}`;
    return this.http.delete(deleteTextUrl, options).toPromise().then(response => response.json() as Text)
    .catch(response => this.app_service.handleError(response));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
