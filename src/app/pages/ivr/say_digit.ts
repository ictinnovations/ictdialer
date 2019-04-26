import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class say_digit_app extends Applications {
  type = 'say_digit';
  imgSrc = 'assets/images/ivr/large/say_digit.png';
  outNodes = ['success'];
  data = {
    digit: 'undefined',
    say_digit_variable: '',
  };
  app_form = AddIVRComponent.say_digit_form;

  activate_form() {

    if ($['_data']( $('#say_digit_select')[0], 'events' ) != undefined) {
      $('#say_digit_select').off('change');
    }

    if ($['_data']( $('#say_digit_In')[0], 'events' ) != undefined) {
      $('#say_digit_In').off('input');
    }

    this.app_form.show();

    $('#say_digit_select').val(this.data.digit);
    $('#say_digit_In').val(this.data.say_digit_variable);

    if (this.data.digit == 'undefined') {
      $('#say_digit_In').show();
    } else {
      $('#say_digit_In').hide();
    }

    $('#say_digit_select').on('change', () => {
      const cc: any = $('#say_digit_select').val();
      this.data.digit = cc;
      if ($('#say_digit_select').val() == 'undefined') {
        $('#say_digit_In').show();
      } else {
        $('#say_digit_In').hide();
      }

      this.update_tooltip();
    });

    $('#say_digit_In').on('input', () => {

      if ($('#say_digit_In').val() == '') {
        alert('"Please enter some value or select variable"');
        return;
      }
      const cc: any = $('#say_digit_In').val();
      this.data.say_digit_variable = cc;
    });

    this.update_tooltip();

  }


  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    if ($('#say_digit_select').val() != 'undefined') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_digit_select').val();
    } else {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_digit_In').val();
    }
    this.app_img.attr({title: tooltip});
  }
}
