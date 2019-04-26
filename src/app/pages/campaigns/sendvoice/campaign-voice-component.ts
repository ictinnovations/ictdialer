import { Component, OnInit, NgModule, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Http, HttpModule, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Campaign, VoiceCallProgram } from '../campaign';
import { CampaignService } from '../campaign.service';
import { Recording } from '../../message/recording/recording';
import { RecordingService } from '../../message/recording/recording.service';
import { Group } from '../../contact/group/group';
import { GroupService } from '../../contact/group/group.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ngx-add-campaign-component',
  templateUrl: './campaign-voice-component.html',
  styleUrls: ['./campaign-voice-component.scss'],
})

export class AddVoiceCampaignComponent implements OnInit {

  constructor(private http: Http, private route: ActivatedRoute, private recording_service: RecordingService, private group_service: GroupService, private campaign_service: CampaignService, private router: Router) { }


  form1: any= {};
  voiceProgram: VoiceCallProgram = new VoiceCallProgram;
  campaign: Campaign= new Campaign;
  campaign_id: any= null;
  group: Group[] = [];
  selectedGroup: Group;
  recording: Recording[] = [];
  selectedVoice: Recording;

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
        });
      }
    });
    this.getRecordinglist();
    this.getGrouplist();
  }

  addSendRecording(): void {
    this.campaign_service.add_voicecall(this.voiceProgram).then(response => {
      const program_id = response;
      this.campaign.program_id = program_id;
      this.addCampaign();
    });
  }


  addCampaign(): void {
    this.campaign_service.add_Campaign(this.campaign).then(response => {
      this.router.navigate(['../../../campaigns'], {relativeTo: this.route});
    });
  }

  updateCampaign(): void {
    this.campaign_service.add_voicecall(this.voiceProgram).then(response => {
      const program_id = response;
      this.campaign.program_id = program_id;
      this.update();
      this.router.navigate(['../../../campaigns'], {relativeTo: this.route});
    });
  }


  update(): void {
    this.campaign_service.update_Campaign(this.campaign).then(() => {
    })
    .catch(this.handleError);
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
