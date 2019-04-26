import { Applications } from './ivr_application';
import { AddIVRComponent } from './ivr-form-component';
import * as $ from 'jquery';

export class transfer_app extends Applications {

  type = 'transfer';
  imgSrc =  'assets/images/ivr/large/transfer.png';
  outNodes = ['no-answer'];
  

  resources = {
    extension: ""
  }

  data =  {
    extension: "[resources:extension:phone]",
    user_id: "[resources:extension:user_id]"
  }  
    
  app_form = AddIVRComponent.call_transfer_form;

  activate_form() {
    if ($['_data']( $('#ct_acc_id')[0], 'events' ) != undefined) {
      $('#ct_acc_id').off('change');
    }
    this.app_form.show();
    $('#ct_acc_id').val(this.resources.extension);
    $('#ct_acc_id').on('change', () => {
      const ddd: any = $('#ct_acc_id').val();
      this.resources.extension = ddd;

      this.update_tooltip();
    });
  }

  update_tooltip() {
    // set tooltip
    let tooltip = this.type;
    tooltip += '\n' + 'Extension' + ': ';
    tooltip += $('#ct_acc_id option:selected').html();
    this.app_img.attr({title: tooltip});
  }


}
