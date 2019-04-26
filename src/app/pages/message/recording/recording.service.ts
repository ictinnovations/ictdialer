import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Http, Response, HttpModule, RequestOptions, ResponseContentType } from '@angular/http';
import { Recording } from './recording';
import { AppService } from '../../../../app/app.service';
import { saveFile , getFileNameFromResponseContentDisposition} from '../../../file-download-helper';

@Injectable()

export class RecordingService {

  aRecording: Recording[]= [];
  recording_id: any= null;
  recording: Recording= new Recording;
  fileName: any;

  constructor(private http: Http, private app_service: AppService) { }

  get_RecordingList(): Promise<Recording[]> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    return this.http.get(this.app_service.apiUrlRecording, options).toPromise()
    .then(response => response.json() as Recording[]).catch(response => this.app_service.handleError(response));
  }

  get_RecordingData(recording_id): Promise<Recording> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    const url5 = `${this.app_service.apiUrlRecording}/${recording_id}`;
    return this.http.get(url5, options).toPromise()
    .then(response => response.json() as Recording)
    .catch(response => this.app_service.handleError(response));
  }

  add_Recording(recording: Recording): Promise<Recording> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(recording);
    const addRecordingUrl = `${this.app_service.apiUrlRecording}`;
    return this.http.post(addRecordingUrl, body, options).toPromise().then(response => response.json() as Recording)
    .catch(response => this.app_service.handleError(response));
  }

  update_Recording(recording: Recording): Promise<Recording> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const body = JSON.stringify(recording);
    const updateRecordingUrl = `${this.app_service.apiUrlRecording}/${recording.recording_id}`;
    return this.http.put(updateRecordingUrl, body, options).toPromise().then(response => response.json() as Recording)
    .catch(response => this.app_service.handleError(response));
  }

  delete_Recording(recording_id): Promise<any> {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({headers: headers});
    const deleteRecordingUrl = `${this.app_service.apiUrlRecording}/${recording_id}`;
    return this.http.delete(deleteRecordingUrl, options).toPromise().then(response => response.json() as Recording)
    .catch(response => this.app_service.handleError(response));
  }

  get_Recordingdownload(recording_id): any {
    const headers = new Headers();
    this.app_service.createAuthorizationHeader(headers);
    const options = new RequestOptions({ headers: headers});
    options.responseType = ResponseContentType.Blob;
    const url = `${this.app_service.apiUrlRecording}/${recording_id}/media`;
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
