import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class say_date_app extends Applications {
  type = 'say_date';
  imgSrc = 'assets/images/ivr/large/say_date.png';
  outNodes = ['success'];
  data = {
    date: 'undefined', say_date_variable: '',
  };
  app_form = AddIVRComponent.say_date_form;

  activate_form() {

    if ($['_data']( $('#say_date_select')[0], 'events' ) != undefined) {
      $('#say_date_select').off('change');
    }

    if ($['_data']( $('#say_date_In')[0], 'events' ) != undefined) {
      $('#say_date_In').off('input');
    }

    this.app_form.show();

    $('#say_date_select').val(this.data.date);
    $('#say_date_In').val(this.data.say_date_variable);

      if (this.data.date == 'undefined') {
        $('#say_date_In').show();
      } else {
        $('#say_date_In').hide();
      }

    $('#say_date_select').on('change', () => {
      const cc: any = $('#say_date_select').val();
      this.data.date = cc;
      if ($('#say_date_select').val() == 'undefined') {
        $('#say_date_In').show();
      } else {
        $('#say_date_In').hide();
      }

      this.update_tooltip();
    });

    $('#say_date_In').on('input', () => {
      if ($('#say_date_In').val() == '') {
        alert('"Please enter some value or select variable"');
        return;
      }
      const cc: any = $('#say_date_In').val();
      this.data.say_date_variable = cc;
      this.update_tooltip();
    });
  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    if ($('#say_date_select').val() != 'undefined') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_date_select').val();
    } else {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_date_In').val();
    }
    this.app_img.attr({title: tooltip});
  }
}
