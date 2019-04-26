import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';


export class play_menu_app extends Applications {
  type = 'play_menu';
  imgSrc =  'assets/images/ivr/large/options.png';
  outNodes = ['1', '2', '3', '4', 'timeout'];

  
  resources = {
    recording: ""
  };

  data = {
    message: "[resources:recording:file_name]",
    key_timeout: 10
  }

  app_form = AddIVRComponent.play_ivr_menu_form;

  activate_form() {

    if ($['_data']( $('#play_menu_rec_id')[0], 'events' ) != undefined) {
      $('#play_menu_rec_id').off('change');
    }

    if ($['_data']( $('#keytimewait')[0], 'events' ) != undefined) {
      $('#keytimewait').off('input');
    }

    this.app_form.show();

    $('#play_menu_rec_id').val(this.resources.recording);
    $('#keytimewait').val(this.data.key_timeout);

    $('#play_menu_rec_id').on('change', () => {
      const ff: any =  $('#play_menu_rec_id').val();
      this.resources.recording = ff;
    });

    $('#keytimewait').on('input', () => {
      const nn: any = $('#keytimewait').val();
      this.data.key_timeout = nn;
    });

  }


}
