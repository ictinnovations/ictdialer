import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class say_number_app extends Applications {

  type = 'say_number';
  imgSrc = 'assets/images/ivr/large/say_number.png';
  outNodes =  ['success'];
  data = {
    number: 'undefined',
    say_number_variable: '',
  };
  app_form = AddIVRComponent.say_number_form;

  activate_form() {

    if ($['_data']( $('#say_number_select')[0], 'events' ) != undefined) {
      $('#say_number_select').off('change');
    }

    if ($['_data']( $('#say_number_In')[0], 'events' ) != undefined) {
      $('#say_number_In').off('input');
    }

    this.app_form.show();

    $('#say_number_select').val(this.data.number);
    $('#say_number_In').val(this.data.say_number_variable);

    if (this.data.number == 'undefined') {
      $('#say_number_In').show();
    } else {
      $('#say_number_In').hide();
    }

    $('#say_number_select').on('change', () => {
      const cc: any = $('#say_number_select').val();
      this.data.number = cc;
      if ($('#say_number_select').val() == 'undefined') {
        $('#say_number_In').show();
      } else {
        $('#say_number_In').hide();
      }

      this.update_tooltip();
    });

    $('#say_number_In').on('input', () => {
      // total_apps[AddIVRComponent.currEditInd].data.say_number = 'undefined';
      if ($('#say_number_In').val() == '') {
        alert('"Please enter some value or select variable"');
        return;
      }
      const cc: any = $('#say_number_In').val();
      this.data.say_number_variable = cc;

      this.update_tooltip();
    });
  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    if (this.data.number != 'undefined') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += this.data.number;
    } else {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += this.data.say_number_variable;
    }
    this.app_img.attr({title: tooltip});
  }
}
