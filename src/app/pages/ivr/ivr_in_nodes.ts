import { AddIVRComponent } from './ivr-form-component';

export class inNodes {
  x_axis: any;
  y_axis: any;
  pointers = [];
  n_type: any;
  node_rect: any;
  node_type: any;
  parentApp: any;
  node_link: any;

  constructor(type, inNodes, left, top, set) {
    this.n_type = 'input';
    this.node_type = 'input';
    this.parentApp =  type;
    this.node_link = AddIVRComponent.r.rect(left, top + 30, 7, 7).attr({stroke: 'red', 'fill-opacity': 100, 'fill': 'red', 'opacity': 1});
    set.push(this.node_link);
    this.pointers = [];
  }

}

