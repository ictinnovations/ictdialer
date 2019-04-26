import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class record_app extends Applications {
  type = 'record';
  imgSrc =  'assets/images/ivr/large/recording.png';
  outNodes =  ['success'];
  data = {
    max_duration: '',
  };
  app_form = AddIVRComponent.record_form;

  activate_form() {
    if ($['_data']( $('#record_limit')[0], 'events' ) != undefined) {
      $('#record_limit').off('input');
    }
    // TODO, hide active form (from previos active application)
    // TODO, call show form query here
    this.app_form.show();
    $('#record_limit').val(this.data.max_duration);
    $('#record_limit').on('input', () => {
      const abc: any =  $('#record_limit').val();
      this.data.max_duration = abc;

      this.update_tooltip();
    });


  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    if ($('#record_limit').val() != '') {
      tooltip += '\nText: ';
      tooltip += $('#record_limit').val();
    }
    this.app_img.attr({title: tooltip});
  }

}
