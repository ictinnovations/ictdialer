import { Connections } from './ivr_connection';
import * as d3 from 'd3';
import { Applications } from './ivr_application';
import { AddIVRComponent, total_apps } from './ivr-form-component';

let ox_p;
let oy_p;

export class Pointers {
  pointer_index: any;
  n_type: any;
  is_attached: any;
  app_index: any;
  linked_app_index: any;
  parentNode: any;
  parentApp: any;
  currentApp: any;
  connec_tions: any;
  ptr_link: any;
  ptr_r_set;
  parent_app_index: any;
  data:any;

  constructor(app_index, i, type, node_type, left, top, nodeColor, set, node_rect) {
    this.app_index = app_index;
    this.pointer_index = i;
    this.currentApp = type;
    this.linked_app_index = null;
    this.is_attached = 'no';
    this.n_type = 'output';
    this.parentApp = type;
    this.parentNode = node_type;
    this.parent_app_index = app_index;
    this.data = node_type;

    if (type != 'play_menu') {
      this.ptr_link = AddIVRComponent.r.rect(left + 80, top + (25 + (10*i)), 7, 7).attr({stroke: nodeColor, 'fill-opacity': 100, 'fill': nodeColor, 'opacity': 1, cursor: 'move'});
    }
    else {
      this.ptr_link = AddIVRComponent.r.rect(left + 80, top + (10*i), 7, 7).attr({stroke: nodeColor, 'fill-opacity': 100, 'fill': nodeColor, 'opacity': 1, cursor: 'move'});
    }
    set.push(this.ptr_link);
    this.ptr_link.drag(this.p_move, this.p_dragger, this.p_up);

    this.connec_tions = AddIVRComponent.r.connection(node_rect, this.ptr_link, '#000', '#fff');
  }

  p_dragger = () => {
    ox_p = this.ptr_link.type === 'rect' ? this.ptr_link.attr('x') : this.ptr_link.attr('cx');
    oy_p = this.ptr_link.type === 'rect' ? this.ptr_link.attr('y') : this.ptr_link.attr('cy');
  }

  p_move = (dx, dy) => {
    const att = this.ptr_link.type === 'rect' ? {x: ox_p + dx, y: oy_p + dy} : {cx: ox_p + dx, cy: oy_p + dy};
    this.ptr_link.attr(att);
    AddIVRComponent.r.connection(this.connec_tions);
  }

  p_up = () => {
    if (Applications.currentAppIndex != null && total_apps[Applications.currentAppIndex].isRemoved === 'yes') {
      Applications.currentAppIndex = this.app_index;
    }
    if (Applications.currentAppIndex != null && this.app_index === Applications.currentAppIndex) {
      ox_p = total_apps[Applications.currentAppIndex].out_nod[this.pointer_index].node_rect.attr('x');
      oy_p = total_apps[Applications.currentAppIndex].out_nod[this.pointer_index].node_rect.attr('y');
      this.is_attached = 'no';
      // to remove link of pointer if it is dropped back to its source application
      if (this.linked_app_index != null) {
        const ind = total_apps[this.linked_app_index].in_nod[0].pointers.indexOf(this);
        if (ind > -1) {
          total_apps[this.linked_app_index].in_nod[0].pointers.splice(ind, 1);
          this.linked_app_index = null;
        }
      }
    }
    else {
      if (Applications.currentAppIndex != null && total_apps[Applications.currentAppIndex].in_nod[0] != null) {
        ox_p = total_apps[Applications.currentAppIndex].in_nod[0].node_link.attrs.x;
        oy_p = total_apps[Applications.currentAppIndex].in_nod[0].node_link.attrs.y;
        // to remove link of pointer from previous destination application
        if (this.is_attached === 'yes') {
          if (this.linked_app_index != null) {
            const ind = total_apps[this.linked_app_index].in_nod[0].pointers.indexOf(this);
            if (ind > -1) {
              total_apps[this.linked_app_index].in_nod[0].pointers.splice(ind, 1);
              this.linked_app_index = null;
            }
          }
        }
        this.is_attached = 'yes';
        this.linked_app_index = Applications.currentAppIndex;
        total_apps[Applications.currentAppIndex].in_nod[0].pointers.push(this);
      }
    }
    const att = this.ptr_link.type === 'rect' ? {x: ox_p, y: oy_p} : {cx: ox_p, cy: oy_p};
    this.ptr_link.attr(att);
    AddIVRComponent.r.connection(this.connec_tions);
    this.ptr_link.toFront();
  }

  restorePointer(data) {
    if (data.pointer.linked_app_index != null) {
      this.linked_app_index = data.pointer.linked_app_index;
      this.is_attached = 'yes';
      ox_p = total_apps[this.linked_app_index].in_nod[0].node_link.attrs.x;
      oy_p = total_apps[this.linked_app_index].in_nod[0].node_link.attrs.y;
      const att = this.ptr_link.type === 'rect' ? {x: ox_p, y: oy_p} : {cx: ox_p, cy: oy_p};
      this.ptr_link.attr(att);
      AddIVRComponent.r.connection(this.connec_tions);
      this.ptr_link.toFront();
      total_apps[this.linked_app_index].in_nod[0].pointers.push(this);
    }
  }
}