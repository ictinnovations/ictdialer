import { Applications } from './ivr_application';

export class amd_app extends Applications {
  type = 'amd';

  imgSrc =  'assets/images/ivr/large/amd.png';
  outNodes =  ['machine', 'human' ];

}
