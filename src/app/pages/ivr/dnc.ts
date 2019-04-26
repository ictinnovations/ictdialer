import { Applications } from './ivr_application';

export class dnc_app extends Applications {
  type = 'dnc';
  imgSrc =  'assets/images/ivr/large/dnc.png';
  outNodes = ['success'];
}
