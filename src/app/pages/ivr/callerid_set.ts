import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class callerid_set_app extends Applications {
  type = 'callerid_set';

  imgSrc =  'assets/images/ivr/large/setvar.png';
  outNodes =  ['success'];

  data = {
    callerid: 'undefined', callerid_set_variable: '',
  };
  app_form = AddIVRComponent.caller_id_form;

  activate_form() {

    if ($['_data']( $('#set_caller_select')[0], 'events' ) != undefined) {
      $('#set_caller_select').off('change');
    }

    if ($['_data']( $('#set_caller_In')[0], 'events' ) != undefined) {
      $('#set_caller_In').off('input');
    }

    this.app_form.show();

    $('#set_caller_select').val(this.data.callerid);
    $('#set_caller_In').val(this.data.callerid_set_variable);

    if (this.data.callerid === 'undefined') {
      $('#set_caller_In').show();
    } else {
      $('#set_caller_In').hide();
    }

    $('#set_caller_select').on('change',  () => {
      const gg: any =  $('#set_caller_select').val();
      this.data.callerid = gg;
      if ($('#set_caller_select').val() === 'undefined') {
        $('#set_caller_In').show();
      } else {
        $('#set_caller_In').hide();
      }

      this.updateToolTip();
    });

    $('#set_caller_In').on('input', () => {
      if ($('#set_caller_In').val() === '') {
        alert('"Please enter some value or select variable"');
        return;
      }
      const yy: any = $('#set_caller_In').val();
      this.data.callerid_set_variable = yy;

      this.updateToolTip();
    });

  }

  updateToolTip() {
    // set tooltip
    let tooltip = this.type;
    if ($('#set_caller_select').val() != 'undefined') {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#set_caller_select').val();
    } else {
      tooltip += '\n' + 'Text' + ': ';
      tooltip += $('#set_caller_In').val();
    }
    this.app_img.attr({title: tooltip});
  }
}
