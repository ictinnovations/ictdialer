import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Transmission, IVRProgram } from '../transmission';
import { TransmissionService } from '../transmission.service';
import { IVRService } from '../../ivr/ivr.service';
import { ContactService } from '../../contact/contact.service';
import { IVR } from '../../ivr/ivr';
import { Contact } from '../../contact/contact';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-transmission-component',
  templateUrl: './transmission-sendivr.html',
  styleUrls: ['./transmission-sendivr.scss'],
})

export class AddTransSendIVRComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private ivr_service: IVRService, private contact_service: ContactService,
  private transmission_service: TransmissionService, private router: Router) { }


  form1: any= {};
  ivrProgram: IVRProgram= new IVRProgram;
  program_id: any= null;
  transmission: Transmission = new Transmission;
  ivr: IVR[];
  selectedIVR: IVR;
  trans_id: number;

  ngOnInit(): void {
    this.getIVRlist();
  }

  AddTransmission(): void {
    this.transmission_service.add_Transmission(this.transmission).then(response => {
      const transmission_id = response;
      this.trans_id = transmission_id;
      this.AddSend(this.trans_id);
      this.router.navigate(['../../transmissions'], {relativeTo: this.route});
    });
  }

  AddSend(trans_id): void {
    this.transmission_service.send_transmission(this.trans_id).then(response => {

    });
  }

  getIVRlist() {
    this.ivr_service.get_ivrList().then(data => {
      this.ivr = data;
    });
  }

  get selectedIV() {
    return this.selectedIVR;
  }

  set selectedIV(value) {
    this.selectedIVR = value;
    this.transmission.program_id = this.selectedIVR.program_id;
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
