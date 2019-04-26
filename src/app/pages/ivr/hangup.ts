import { Applications } from './ivr_application';

export class hangup_app extends Applications {
  type = 'disconnect';

  imgSrc =  'assets/images/ivr/large/hangup.png';
  outNodes = ['success'];
}
