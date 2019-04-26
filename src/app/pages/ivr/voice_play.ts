import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class voicePlay_app extends Applications {
  type = 'voice_play';
  imgSrc = 'assets/images/ivr/large/voice_play.png';
  outNodes =  ['success' ];

  resources = {
    recording: ''
  };

  data = {
    message: "[resources:recording:file_name]"
  }
  app_form =  AddIVRComponent.voice_play_form;

  activate_form() {
    if ($['_data']( $('#playAudFrm_recording_id')[0], 'events' ) != undefined) {
      $('#playAudFrm_recording_id').off('change');
    }
    this.app_form.show();
    $('#playAudFrm_recording_id').val(this.resources.recording);
    $('#playAudFrm_recording_id').on('change', () => {
      const rec_id: any =  $('#playAudFrm_recording_id').val();
      this.resources.recording = rec_id;

      this.update_tooltip();

    });
  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    tooltip += '\n' + 'Recording' + ': ';
    tooltip += $('#playAudFrm_recording_id option:selected').html();
    this.app_img.attr({title: tooltip});
  }


}
