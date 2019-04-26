import { Component, OnInit, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Campaign, IVRProgram } from '../campaign';
import { CampaignService } from '../campaign.service';
import { IVR } from '../../ivr/ivr';
import { IVRService } from '../../ivr/ivr.service';
import { Group } from '../../contact/group/group';
import { GroupService } from '../../contact/group/group.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-campaign-component',
  templateUrl: './campaign-ivr-component.html',
  styleUrls: ['./campaign-ivr-component.scss'],
})

export class AddIVRCampaignComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private ivr_service: IVRService, private group_service: GroupService, private campaign_service: CampaignService,
  private router: Router) { }


  form1: any= {};
  ivrProgram: IVRProgram = new IVRProgram;
  campaign: Campaign= new Campaign;
  campaign_id: any= null;
  group: Group[] = [];
  selectedGroup: Group;
  ivr: IVR[] = [];
  selectedIVR: IVR;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.campaign_id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        return null;
      } else {
        return this.campaign_service.get_CampaignData(this.campaign_id).then(data => {
          this.campaign = data;
          console.log(this.campaign);
        });
      }
    });
    this.getIVRlist();
    this.getGrouplist();
  }

  addCampaign(): void {
    this.campaign_service.add_Campaign(this.campaign).then(response => {
      this.router.navigate(['../../../campaigns'], {relativeTo: this.route});
    });
  }

  update(): void {
    this.campaign_service.update_Campaign(this.campaign).then(() => {
      this.router.navigate(['../../../campaigns'], {relativeTo: this.route});
    })
    .catch(this.handleError);
  }

  getIVRlist() {
    this.ivr_service.get_ivrList().then(data => {
      this.ivr = data;
    });
  }

  get selectedIvr() {
    return this.selectedIVR;
  }

  set selectedIvr(value) {
    this.selectedIVR = value;
    this.campaign.program_id = this.selectedIVR.program_id;
  }

  getGrouplist() {
    this.group_service.get_GroupList().then(data => {
      this.group = data;
    });
  }

  get selectedGrp() {
    return this.selectedGroup;
  }

  set selectedGrp(value) {
    this.selectedGroup = value;
    this.campaign.group_id = this.selectedGroup.group_id;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
