import { Component, OnInit, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Transmission, TemplateProgram } from '../transmission';
import { TransmissionService } from '../transmission.service';
import { TemplateService } from '../../message/email/email.service';
import { Template } from '../../message/email/email';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-transmission-component',
  templateUrl: './transmission-sendemail.html',
  styleUrls: ['./transmission-sendemail.scss'],
})

export class AddTransSendEmailComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private template_service: TemplateService,
  private transmission_service: TransmissionService, private router: Router) { }

  form1: any= {};
  templateProgram: TemplateProgram= new TemplateProgram;
  program_id: any= null;
  transmission: Transmission = new Transmission;
  template: Template[];
  selectedTemplate: Template;
  trans_id: number;

  ngOnInit(): void {
    this.getTemplatelist();
  }

  addSendEmail(): void {
    this.transmission_service.add_sendemail(this.templateProgram).then(response => {
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

  getTemplatelist() {
    this.template_service.get_TemplateList().then(data => {
      this.template = data;
    });
  }

  get selectedTemp() {
    return this.selectedTemplate;
  }

  set selectedTemp(value) {
    this.selectedTemplate = value;
    this.templateProgram.template_id = this.selectedTemplate.template_id;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
