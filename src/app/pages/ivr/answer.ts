import { Applications } from './ivr_application';

export class answer_app extends Applications {
  type = 'answer';

  imgSrc =  'assets/images/ivr/large/answer.png';
  outNodes = ['success'];

}
