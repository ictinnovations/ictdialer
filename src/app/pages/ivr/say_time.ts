import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class say_time_app extends Applications {

  type = 'say_time';
  imgSrc =  'assets/images/ivr/large/say_time.png';
  outNodes = ['success'];

  data = {
    time: 'undefined',
    say_time_variable: '00:00',
  };

  app_form =  AddIVRComponent.say_time_form;

  activate_form() {

    this.app_form.show();


    if ($['_data']( $('#say_time_select')[0], 'events' ) != undefined) {
      $('#say_time_select').off('change');
    }

    if ($['_data']( $('#say_time_In')[0], 'events' ) != undefined) {
      $('#say_time_In').off('input');
    }

    this.app_form.show();

    $('#say_time_select').val(this.data.time);
    $('#say_time_In').val(this.data.say_time_variable);

    if (this.data.time == 'undefined') {
      $('#say_time_In').show();
    } else {
      $('#say_time_In').hide();
    }

    $('#say_time_select').on('change', () => {
      const cc: any = $('#say_time_select').val();
	    this.data.time = cc;
	    if ($('#say_time_select').val() == 'undefined') {
	      $('#say_time_In').show();
	    } else {
	      $('#say_time_In').hide();
      }

      this.update_tooltip();
    });

    $('#say_time_In').on('input', () => {
	    // total_apps[AddIVRComponent.currEditInd].data.say_time_Opt = 'undefined';
	    if ( $('#say_time_In').val() == '') {
	      alert('"Please enter some value or select variable"');
	      return;
      }
      const cc: any = $('#say_time_In').val();
      this.data.say_time_variable = cc;

      this.update_tooltip();
    });


  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    if ($('#say_time_select').val() != 'undefined') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_time_select').val();
    } else {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_time_In').val();
    }
    this.app_img.attr({title: tooltip});
  }


}
