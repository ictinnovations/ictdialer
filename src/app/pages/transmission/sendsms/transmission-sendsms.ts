import { Component, OnInit, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule, FormGroup } from '@angular/forms';
import { Transmission, SMSProgram } from '../transmission';
import { TransmissionService } from '../transmission.service';
import { TextService } from '../../message/text/text.service';
import { Text } from '../../message/text/text';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-transmission-component',
  templateUrl: './transmission-sendsms.html',
  styleUrls: ['./transmission-sendsms.scss'],
})

export class AddTransSendSMSComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private transmission_service: TransmissionService,
  private text_service: TextService, private router: Router) { }


  form1: any = {};
  smsProgram: SMSProgram = new SMSProgram;
  transmission: Transmission = new Transmission;
  program_id: any = null;
  text: Text[] = [];
  contact_id: any = null;
  selectedText: Text;
  trans_id: number;

  ngOnInit(): void {
    this.getTextlist();
  }

  addSendSms(): void {
    this.transmission_service.add_sendsms(this.smsProgram).then(response => {
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

  AddSend(trans_id): void {
    this.transmission_service.send_transmission(this.trans_id).then(response => {

    });
  }

  getTextlist() {
    this.text_service.get_TextList().then(data => {
      this.text = data;
    });
  }

  get selectedT() {
    return this.selectedText;
  }

  set selectedT(value) {
    this.selectedText = value;
    this.smsProgram.text_id = this.selectedText.text_id;
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
  }
}
