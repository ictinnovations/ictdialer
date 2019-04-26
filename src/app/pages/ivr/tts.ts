import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class tts_app extends Applications {

  type = 'tts';
  imgSrc = 'assets/images/ivr/large/tts.png';
  outNodes =  ['success'];
  app_form = AddIVRComponent.tts_form;

  data = {
    text: '',
  };

  activate_form() {
    if ($['_data']( $('#tts_data')[0], 'events' ) != undefined) {
      $('#tts_data').off('input');
    }
    this.app_form.show();
    $('#tts_data').val(this.data.text);
    $('#tts_data').on('input' , () => {
      const cc: any = $('#tts_data').val();
      this.data.text = cc;

      this.update_tooltip();
    });
  }

  update_tooltip() {
    let tooltip = this.type;
    if (this.data.text != '') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#tts_data').val();
    }
    this.app_img.attr({title: tooltip});
  }
}
