import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class say_alpha_app extends Applications {
  type = 'say_alpha';
  imgSrc =  'assets/images/ivr/large/say_alpha.png';
  outNodes = ['success'];

  data = {
    alpha: 'undefined', say_alpha_variable: '',
  };
  app_form = AddIVRComponent.say_alpha_form;

  activate_form() {

    if ($['_data']( $('#say_alpha_select')[0], 'events' ) != undefined) {
      $('#say_alpha_select').off('change');
    }

    if ($['_data']( $('#say_alpha_In')[0], 'events' ) != undefined) {
      $('#say_alpha_In').off('input');
    }

    this.app_form.show();

    $('#say_alpha_select').val(this.data.alpha);
    $('#say_alpha_In').val(this.data.say_alpha_variable);

    if (this.data.alpha == 'undefined') {
      $('#say_alpha_In').show();
    } else {
      $('#say_alpha_In').hide();
    }

    $('#say_alpha_select').on('change', () => {
      const jj: any = $('#say_alpha_select').val();
      this.data.alpha = jj;
      if ($('#say_alpha_select').val() == 'undefined') {
        $('#say_alpha_In').show();
      } else {
        $('#say_alpha_In').hide();
      }

      this.update_tooltip();
    });

    $('#say_alpha_In').on('input', () => {

      if ( $('#say_alpha_In').val() == '') {
        alert('"Please enter some value or select variable"');
        return;
      }
      const jj: any = $('#say_alpha_In').val();
      this.data.say_alpha_variable = jj;

      this.update_tooltip();
    });
  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    if ($('#say_alpha_select').val() != 'undefined') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_alpha_select').val();
    } else {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#say_alpha_In').val();
    }
    this.app_img.attr({title: tooltip});
  }
}
