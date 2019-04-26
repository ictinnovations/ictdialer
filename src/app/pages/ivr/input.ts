import { Applications } from './ivr_application';

export class input_app extends Applications {

  type = 'input';

  imgSrc =  'assets/images/ivr/large/getdigits.png';
  outNodes = ['success', 'timeout'];

}
