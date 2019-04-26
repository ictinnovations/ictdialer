import { Nodes } from './ivr_nodes';
import * as d3 from 'd3';
import { inNodes } from './ivr_in_nodes';
import * as $ from 'jquery';

import { AddIVRComponent, total_apps } from './ivr-form-component';


let oBB_box;
let ox;
let oy;

let d_of_x;
let d_of_y;


export abstract class Applications {
  display_name: string;
  color: any;
  application_name: any;
  in_nod = [];
  out_nod = [];
  app_type: string;
  isRemoved: any;
  app_index: number;
  app_img: any;
  app_icon: any;
  app_link: any;
  inNodes: any;
  text_area: any;
  text_display: any;
  left: any;
  top: any;
  set: any;
  oBB: any;
  r_set: any;
  isActive: any;

  image_border: any;
  removeBtnBack: any;
  removeBtnText: any;

  // Abstract properties to be set in subclass
  // Abstract properties to be set in subclass
  // Use getter syntax
  public type = 'application';
  imgSrc = '';
  outNodes: any = [];

  app_form: any = '';
  data: any;
  resources:any;



  public static currentAppIndex: any;

  constructor(app_index , left, top) {
    this.app_index = app_index;
    this.left = left;
    this.top = top;
  }


  setup () {

    this.build_set();

    this.app_img.drag(this.mover, this.starter, this.upper);

    this.build_Nodes();
    this.setControls();
    this.setActive();


  }

  build_set() {
    this.set = AddIVRComponent.r.set();
    this.app_img = AddIVRComponent.r.image(this.imgSrc , this.left, this.top, 80, 60).attr({title: this.type, index: this.app_index, cursor: 'move'});
    this.app_img.app_index = this.app_index;
    this.set.push(this.app_img);

    this.image_border = AddIVRComponent.r.rect(this.left - 2, this.top - 2, 80 + 4, 60 + 4, 4).attr({'opacity': 0});

    this.removeBtnBack = AddIVRComponent.r.rect(this.left + 2, this.top + 2, 8, 8).attr({'fill-opacity': 100, 'fill': 'white', 'opacity': 0});
    this.removeBtnText = AddIVRComponent.r.text(this.left + 4, this.top + 4, 'x').attr({font: '11px Arial', 'text-anchor': 'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});

    this.set.push(this.image_border);
    this.set.push(this.removeBtnBack);
    this.set.push(this.removeBtnText);


  }

  starter = () => {
    ox = this.app_img.attr('x');
    oy = this.app_img.attr('y');
  }

  mover = (dx, dy) => {
    const att = {x: ox + dx, y: oy + dy};
    this.app_img.attr(att);

    const abc: any = att;

    // moving the outnode
    for (let i = 0; i < this.out_nod.length; i++) {
      if (this.type != 'play_menu') {
        var att2 = { x: abc.x + 80, y: abc.y + (25+(10*i))};
      }
      else {
        var att2 = { x: abc.x + 80, y: abc.y + (10*i)};
      }
      this.out_nod[i].node_rect.attr(att2);
    }

    // moving the unattached pointer
    for (let i = 0; i < this.out_nod.length; i++) {
      if (this.out_nod[i].pointer.is_attached === 'no') {
        if (this.type != 'play_menu') {
          var att3 = { x: abc.x + 80, y: abc.y + (25+(10*i))};
        }
        else {
          var att3 = { x: abc.x + 80, y: abc.y + (10*i)};
        }
        this.out_nod[i].pointer.ptr_link.attr(att3);
      }
    }

    //moving the node text
    for (let i = 0; i < this.out_nod.length; i++) {
      if (this.type != 'play_menu') {
        var att4 = {x: abc.x + 78, y: abc.y + (30+(10*i))};
      } else {
        var att4 = {x: abc.x + 78, y: abc.y + (3+(10 * i))};
      }
      this.out_nod[i].node_text.attr(att4);
    }

    //moving the in node
    for ( let i = 0; i < this.in_nod.length; i++) {
      const att5 = {x: abc.x, y: abc.y + 30};
      this.in_nod[i].node_link.attr(att5);
    }

    //If in node length is greater than also update the attached pointer
    if ( this.in_nod.length > 0 ) {
      for ( let i = 0; i < this.in_nod[0].pointers.length; i++) {
        const att5 = {x: abc.x, y: abc.y + 30};
        this.in_nod[0].pointers[i].ptr_link.attr(att5);
      }
    }


    //Update the connection for out node
    for (let i = 0; i < this.out_nod.length; i++) {
      AddIVRComponent.r.connection(this.out_nod[i].pointer.connec_tions);
    }

    //Update the connection for the in node pointers
    if ( this.in_nod.length > 0 ) {
      for (let i = 0; i < this.in_nod[0].pointers.length; i++) {
        AddIVRComponent.r.connection(this.in_nod[0].pointers[i].connec_tions);
      }
    }

    //Move the image border along with it
    const att6 = { x: abc.x - 2, y: abc.y - 2};
    this.image_border.attr(att6);

    //Move the remove button back
    const att7 = {x: abc.x + 2, y: abc.y + 2};
    this.removeBtnBack.attr(att7);

    // Move the remove button text
    const att8 = {x: abc.x + 4, y: abc.y + 4};
    this.removeBtnText.attr(att8);

    //Move the edit icon
    const att9 = {x: abc.x + 2, y: abc.y + 60 - 14};

  }

  upper = () => {

  }

  app_mouseOver = () => {
    Applications.currentAppIndex = this.app_index;
    this.app_img.attr({ 'opacity': .5 });
  }

  app_mouseOut = () => {
    this.app_img.attr({ 'opacity': 1 });
  }

  app_imgclick = () => {

    for (const i in total_apps) {
      total_apps[i].image_border.attr({'opacity': 0});
      total_apps[i].removeBtnBack.attr({'fill-opacity': 100, 'fill': 'white', 'opacity': 0});
      total_apps[i].removeBtnText.attr({font: '11px Arial', 'text-anchor': 'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});

      // Hide all forms
      AddIVRComponent.voice_play_form.hide();
      AddIVRComponent.call_transfer_form.hide();
      AddIVRComponent.record_form.hide();
      AddIVRComponent.play_ivr_menu_form.hide();
      AddIVRComponent.tts_form.hide();
      AddIVRComponent.say_alpha_form.hide();
      AddIVRComponent.say_digit_form.hide();
      AddIVRComponent.say_number_form.hide();
      AddIVRComponent.say_date_form.hide();
      AddIVRComponent.say_time_form.hide();
      AddIVRComponent.caller_id_form.hide();
    }

    if (this.type != 'start') {
      this.isActive = 'true';
      this.image_border.attr({'opacity': 1, 'stroke': 'red'});
      this.removeBtnBack.attr({'opacity': 1, 'stroke': 'white'});
      this.removeBtnText.attr({'opacity': 1});
      if (total_apps[this.app_index].type != 'voice_play'
         && total_apps[this.app_index].type != 'play_menu'
         && total_apps[this.app_index].type != 'transfer'
         && total_apps[this.app_index].type != 'tts'
         && total_apps[this.app_index].type != 'say_alpha'
         && total_apps[this.app_index].type != 'say_digit'
         && total_apps[this.app_index].type != 'say_number'
         && total_apps[this.app_index].type != 'say_date'
         && total_apps[this.app_index].type != 'say_time'
         && total_apps[this.app_index].type != 'record'
         && total_apps[this.app_index].type != 'callerid_set'
         ) {
          // total_apps[this.app_index].editIcon.attr({'opacity': 0});
      } else {
        this.editIconClickHandler();
        // total_apps[this.app_index].editIcon.attr({'opacity': 1});
      }
    }
  }

  removeBtnClick = () => {
    if (this.type === 'start') {
      return;
    }
    let remove = -1;
    for (let i = 0; i < total_apps[this.app_index].out_nod.length; i++) {
      if (total_apps[this.app_index].out_nod[i].pointer.is_attached === 'yes'){
        remove++;
      }
    }
    if (total_apps[this.app_index].in_nod[0].pointers.length > 0) {
      remove++;
    }
    if (remove === -1) {
      // Remove outPointer
      for (let i = 0; i < total_apps[this.app_index].out_nod.length; i++) {
        total_apps[this.app_index].out_nod[i].pointer.ptr_link.remove();
        total_apps[this.app_index].out_nod[i].pointer.connec_tions.line.remove();
        total_apps[this.app_index].out_nod[i].pointer.connec_tions.bg.remove();
      }

      // FormsIVRComponent.r.safari();
      total_apps[this.app_index].set.hide();
      total_apps[this.app_index].isRemoved = 'yes';
      delete total_apps[this.app_index];

      if (this.type != 'voice_play'
         && this.type != 'play_menu'
         && this.type != 'transfer'
         && this.type != 'tts'
         && this.type != 'say_alpha'
         && this.type != 'say_digit'
         && this.type != 'say_number'
         && this.type != 'say_date'
         && this.type != 'say_time'
         && this.type != 'record'
         && this.type != 'callerid_set'
         ) {
      } else {
        this.app_form.hide();
      }

    }
    else {
      alert('Please remove links before deleting an Application');
    }
  }

  editIconClickHandler = () => {
    this.activate_form();
  }

  activate_form() {
    /* it will be overriden later by child classes */
  }

  setControls() {
    this.app_img.mouseover(this.app_mouseOver);
    this.app_img.mouseout(this.app_mouseOut);
    this.app_img.click(this.app_imgclick);
    if (this.type != 'start') {
      this.removeBtnText.click(this.removeBtnClick);
    }
  }

  setActive() {

    for (const k in total_apps) {
      total_apps[k].image_border.attr({'opacity': 0});
      total_apps[k].removeBtnBack.attr({'fill-opacity': 100, 'fill': 'white', 'opacity': 0});
      total_apps[k].removeBtnText.attr({font: '11px Arial', 'text-anchor': 'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});
    }

    if (this.type != 'start') {
      this.image_border.attr({'opacity': 1, 'stroke': 'red'});
      this.removeBtnBack.attr({'opacity': 1, 'stroke': 'white'});
      this.removeBtnText.attr({'opacity': 1});

       // Hide all forms
       AddIVRComponent.voice_play_form.hide();
       AddIVRComponent.call_transfer_form.hide();
       AddIVRComponent.record_form.hide();
       AddIVRComponent.play_ivr_menu_form.hide();
       AddIVRComponent.tts_form.hide();
       AddIVRComponent.say_alpha_form.hide();
       AddIVRComponent.say_digit_form.hide();
       AddIVRComponent.say_number_form.hide();
       AddIVRComponent.say_date_form.hide();
       AddIVRComponent.say_time_form.hide();
       AddIVRComponent.caller_id_form.hide();

       if (this.type != 'voice_play'
         && this.type != 'play_menu'
         && this.type != 'transfer'
         && this.type != 'tts'
         && this.type != 'say_alpha'
         && this.type != 'say_digit'
         && this.type != 'say_number'
         && this.type != 'say_date'
         && this.type != 'say_time'
         && this.type != 'record'
         && this.type != 'callerid_set'
         ) {
      } else {
        this.activate_form();
      }
    }

  }

  restoreData(data) {
    this.data = data;
  }

  restoreResources(resources) {
    this.resources = resources;
  }

  restoreTooltip(data) {
    this.app_img.attr({title: data});
  }

  build_Nodes() {

    if (this.type != 'start') {
      const i_n = new inNodes(this.type, this.inNodes, this.left, this.top, this.set);
      this.in_nod.push(i_n);
    }
    // Out Nodes

    for (let i = 0; i < this.outNodes.length; i++) {
      const nodeColor = this.outNodes[i] === 'error' ? '#E60876' : this.outNodes[i] === 'success' ? '#4CC417' : '#3C8BE5';

      const o_n = new Nodes(this.outNodes[i], this.type, this.left, this.top, this.set, i, 'white', nodeColor, this.app_index);
      this.out_nod.push(o_n);
    }
  }

}