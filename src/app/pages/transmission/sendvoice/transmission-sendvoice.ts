import { Component, OnInit, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Transmission, VoiceCallProgram } from '../transmission';
import { TransmissionService } from '../transmission.service';
import { RecordingService } from '../../message/recording/recording.service';
import { Recording } from '../../message/recording/recording';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-transmission-component',
  templateUrl: './transmission-sendvoice.html',
  styleUrls: ['./transmission-sendvoice.scss'],
})

export class AddTransSendRecordingComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private recording_service: RecordingService,
  private transmission_service: TransmissionService, private router: Router) { }


  form1: any= {};
  voiceProgram: VoiceCallProgram = new VoiceCallProgram;
  transmission: Transmission = new Transmission;
  recording: Recording[] = [];
  selectedVoice: Recording;
  trans_id: number;

  ngOnInit(): void {
    this.getRecordinglist();
  }

  addSendRecording(): void {
    this.transmission_service.add_voicecall(this.voiceProgram).then(response => {
      const program_id = response;
      this.transmission.program_id = program_id;
      this.AddTransmission();
      this.router.navigate(['../../transmissions'], {relativeTo: this.route});
    });
  }

  AddTransmission(): void {
    this.transmission_service.add_Transmission(this.transmission).then(response => {
      const transmission_id = response;
      this.trans_id = transmission_id;
      this.AddSend(this.trans_id);
    });
  }

  AddSend(trans_id) {
    this.transmission_service.send_transmission(trans_id).then(response => {
    });
  }

  getRecordinglist() {
    this.recording_service.get_RecordingList().then(data => {
      this.recording = data;
    });
  }

  get SelectedV() {
    return this.selectedVoice;
  }

  set SelectedV(value) {
    this.selectedVoice = value;
    this.voiceProgram.recording_id = this.selectedVoice.recording_id;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
