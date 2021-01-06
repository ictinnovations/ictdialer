import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as Raphael from 'raphael';
import 'jqueryui';
import { RecordingService } from '../message/recording/recording.service';
import { Recording } from '../message/recording/recording';
import { Extension } from '../extension/extension';
import { ExtensionService } from '../extension/extension.service';
import { IVRService } from './ivr.service';
import { start_app } from './start';
import { answer_app } from './answer';
import { hangup_app } from './hangup';
import { input_app } from './input';
import { voicePlay_app } from './voice_play';
import { transfer_app } from './transfer';
import { record_app } from './record';
import { play_menu_app } from './play_menu';
import { amd_app } from './amd';
import { dnc_app } from './dnc';
import { tts_app } from './tts';
import { say_alpha_app } from './say_alpha';
import { say_digit_app } from './say_digit';
import { say_number_app } from './say_number';
import { say_date_app } from './say_date';
import { say_time_app } from './say_time';
import { callerid_set_app } from './callerid_set';
import { IVR } from './ivr';
import { ActivatedRoute, Router } from '@angular/router';

export let total_apps = {};

@Component({
  selector: 'ngx-add-ivr-component',
  styleUrls: ['./ivr-form-component.scss'],
  templateUrl: './ivr-form-component.html',

})

export class AddIVRComponent implements OnInit {

  public static canvasWidth= 9000;
  public static canvasHeight= 360;

  public static r: any;
  public static currEditInd: any;

  //Define Div

  public static voice_play_form: any;
  public static call_transfer_form: any;
  public static record_form: any;
  public static play_ivr_menu_form: any;
  public static tts_form: any;
  public static say_alpha_form: any;
  public static say_digit_form: any;
  public static say_number_form: any;
  public static say_date_form: any;
  public static say_time_form: any;
  public static caller_id_form: any;

  //Define Forms

  all_apps = [];

  //Define edit form data
  recording: Recording[] = [];
  public selectedRec: Recording;

  extension: Extension[] = [];
  SelectedExt: Extension;
  program_id: any = null;

  ivr: IVR = new IVR();

  classesMapping = {
    'start': start_app,
    'answer': answer_app,
    'hangup': hangup_app,
    'disconnect': hangup_app,
    'input': input_app,
    'voice_play': voicePlay_app,
    'transfer': transfer_app,
    'record': record_app,
    'play_menu': play_menu_app,
    'amd': amd_app,
    'dnc': dnc_app,
    'tts': tts_app,
    'say_alpha': say_alpha_app,
    'say_digit': say_digit_app,
    'say_number': say_number_app,
    'say_date': say_date_app,
    'say_time': say_time_app,
    'callerid_set': callerid_set_app,

  };

  menu = [{name : 'Enter Manually'}, {name: '[contact:first_name]' , value: '[contact:first_name]'}, {name: '[contact:last_name]' , value: '[contact:last_name]'}, {name: '[contact:phone]' , value: '[contact:phone]'}, { name: '[contact:email]', value: '[contact:email]'}, { name: '[contact:address]', value: '[contact:address]'}, { name: '[contact:custom1]', value: '[contact:custom1]'}, { name: '[contact:custom2]', value: '[contact:custom2]'}, { name: '[contact:custom3]', value: '[contact:custom3]'}, { name: '[contact:description]', value: '[contact:description]'}];

  constructor(private recording_service: RecordingService , private extension_service: ExtensionService, private ivr_service: IVRService
  , private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {


    AddIVRComponent.r = Raphael('holder', AddIVRComponent.canvasWidth, AddIVRComponent.canvasHeight);

    this.route.params.subscribe(params => {
      this.program_id = +params['id'];
      const test_url = this.router.url.split('/');
      const lastsegment = test_url[test_url.length - 1];
      if (lastsegment === 'new') {
        this.createStartApplication();
        return null;
      } else {
        return this.ivr_service.get_ivrData(this.program_id).then(data => {
          this.ivr = data;
          const ivr_scheme = JSON.parse(this.ivr.ivr_scheme);
          this.load_ivr_data(ivr_scheme);
        });
      }
    });

    this.getRecordinglist();
    this.getExtlist();

  }


  ngAfterContentInit() {


    // Initialize all Divs

    AddIVRComponent.voice_play_form = $('#voice_play_form');
    AddIVRComponent.call_transfer_form = $('#call_transfer_form');
    AddIVRComponent.record_form = $('#record_form');
    AddIVRComponent.play_ivr_menu_form = $('#play_ivr_menu_form');
    AddIVRComponent.tts_form = $('#tts_form');
    AddIVRComponent.say_alpha_form = $('#say_alpha_form');
    AddIVRComponent.say_digit_form = $('#say_digit_form');
    AddIVRComponent.say_number_form = $('#say_number_form');
    AddIVRComponent.say_date_form = $('#say_date_form');
    AddIVRComponent.say_time_form = $('#say_time_form');
    AddIVRComponent.caller_id_form = $('#caller_id_form');


    // Hide all Divs

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

    // Dragging on icon

    $('#answer-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop:  (event, ui) => {
          this.onDraggableStop(event, ui, 'answer');
        },
      },
    );

    $('#hangup-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'hangup');
        },
      },
    );
    $('#input-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'input');
        },
      },
    );
    $('#voice_play-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'voice_play');
        },
      },
    );
    $('#transfer-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'transfer');
        },
      },
    );
    $('#record-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'record');
        },
      },
    );
    $('#play_menu-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'play_menu');
        },
      },
    );
    $('#amd-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'amd');
        },
      },
    );
    $('#dnc-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'dnc');
        },
      },
    );
    $('#tts-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'tts');
        },
      },
    );
    $('#say_alpha-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'say_alpha');
        },
      },
    );
    $('#say_digit-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'say_digit');
        },
      },
    );
    $('#say_number-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'say_number');
        },
      },
    );
    $('#say_date-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'say_date');
        },
      },
    );
    $('#say_time-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'say_time');
        },
      },
    );


    $('#callerid_set-icon').draggable(
      {
        opacity:	0.5,
        helper: 'clone',
        stop: (event, ui) => {
          this.onDraggableStop(event, ui, 'callerid_set');
        },
      },
    );
  }

  createStartApplication() {
    this.createApplication('start', 20, 20);
  }

  onDraggableStop(event, ui, action) {
    const screenX = parseInt( ui.offset.left );
    const screenY = parseInt( ui.offset.top );
    let left = 0;
    let top = 0;
    left = screenX - $('#holder').offset().left + $('#holder').scrollLeft();
    top =  screenY - $('#holder').offset().top + $('#holder').scrollTop();
    if (left > 0 && top > 0 && left < AddIVRComponent.canvasWidth && top < AddIVRComponent.canvasHeight) {
      this.createApplication(action, left, top);
    }
  }

  createApplication(action, left, top) {
    const new_index = 'app_' + this.all_apps.length;
    const newApp = this.loadClass(new_index, action, left, top);
    this.all_apps.push(newApp);
    total_apps[new_index] = newApp;
  }

  // GET all recordings

  getRecordinglist() {
    this.recording_service.get_RecordingList().then(data => {
    this.recording = data;
    });
  }

  getExtlist() {
    this.extension_service.get_ExtensionList().then(data => {
      this.extension = data;
    });
  }

  loadClass(new_index, action, left, top) {
    const app = new this.classesMapping[action](new_index, left, top);
    app.setup();
    return app;
  }


  saveIVRData() {
    const serApps = {};
    for (const i in total_apps) {
      serApps[i] = {};
      serApps[i]['app_index'] = total_apps[i].app_index;
      serApps[i]['type'] = total_apps[i].type;
      serApps[i]['data'] = total_apps[i].data;
      serApps[i]['resources'] = total_apps[i].resources;
      if (total_apps[i].type === 'say_time'
      || total_apps[i].type === 'say_alpha'
      || total_apps[i].type === 'say_digit'
      || total_apps[i].type === 'say_number'
      || total_apps[i].type === 'say_date'
      || total_apps[i].type === 'say_time'
      || total_apps[i].type === 'callerid_set' ) {
        if (total_apps[i].type.includes('say_')) { 
          // Found world
          var trim_type = total_apps[i].type.replace(/say_/g,'');
        }
        else if (total_apps[i].type.includes('_set')) { 
          // Found world
          var trim_type = total_apps[i].type.replace(/_set/g,'');
        }
        const prop_name = trim_type;
        const prop_name_variable = total_apps[i].type + '_variable';
        if (total_apps[i]['data'][prop_name] === 'undefined' || total_apps[i]['data'][prop_name] === undefined) {
          serApps[i]['data'][prop_name] = serApps[i]['data'][prop_name_variable];
          delete serApps[i]['data'][prop_name_variable];
        }
        else {
          delete serApps[i]['data'][prop_name_variable];
        }
      }
      // serialize image
      // NOTE: While unserializing, add imageHandler events for this image
      const node = total_apps[i].app_img;
      if (node && node.type == 'image') {
        var object_1 = {
          type: node.type,
          width: node.attrs['width'],
          height: node.attrs['height'],
          x: node.attrs['x'],
          y: node.attrs['y'],
          src: node.attrs['src'],
          title: node.attrs['title'],
          cursor: node.attrs['cursor'],
          transform: node.transformations ? node.transformations.join(' ') : '',
        };
      }
      serApps[i]['x'] = object_1.x;
      serApps[i]['y'] = object_1.y;
      serApps[i]['img_title'] = object_1.title;

      //////////////////////////////////////////////////////////////
      //serialize nodeIn
      const in_nod = [];
      for (let j = 0; j < total_apps[i].in_nod.length; j++) {
        in_nod[j] = {};
        in_nod[j]['node_type'] = 'input';
        in_nod[j]['app_index'] = total_apps[i].app_index;
        const pointers = [];
        if (total_apps[i].in_nod[j].pointers.length > 0) {
          for (let k = 0; k < total_apps[i].in_nod[j].pointers.length; k++ ) {
            pointers[k] = {};
            pointers[k]['parent_app_index'] = total_apps[i].in_nod[j].pointers[k].parent_app_index;
            pointers[k]['pointer_index'] = total_apps[i].in_nod[j].pointers[k].pointer_index;
            pointers[k]['linked_app_index'] = total_apps[i].in_nod[j].pointers[k].linked_app_index;
            pointers[k]['data'] = total_apps[i].in_nod[j].pointers[k].data;
          }
          in_nod[j].pointers = pointers;
        }
      }

      serApps[i].in_nod = in_nod;
      //end nodeIn

      //////////////////////////////////////////////////////////////
      //serialize nodeOut
      //NOTE: while unserializing, add appConnections with outPointer

      const out_nod = [];
      for (let n = 0; n < total_apps[i].out_nod.length; n++) {

        out_nod[n] = {};
        // nodeOut properties
        out_nod[n]['node_type'] = total_apps[i].out_nod[n].node_type;
        const object_10 = {
          'parent_app_index': total_apps[i].out_nod[n].pointer.parent_app_index,
          'linked_app_index': total_apps[i].out_nod[n].pointer.linked_app_index,
        };
        out_nod[n].pointer = object_10;
      }
      serApps[i].out_nod = out_nod;
      //end nodeOut
    }
    const json = JSON.stringify(serApps);

    this.ivr.ivr_scheme = json;
  }

  postIVRData() {
    this.saveIVRData();
    this.ivr_service.add_IVR(this.ivr).then(response => {
      this.router.navigate(['../../ivr'], {relativeTo: this.route});
    });
  }

  updateIVRData() {
    this.saveIVRData();
    this.ivr_service.update_ivrData(this.ivr).then(response => {
      this.router.navigate(['../../ivr'], {relativeTo: this.route});
    });
  }

  load_ivr_data(ivr_data) {
    const re_app = ivr_data;
    if (re_app != null) {
      for (const k in re_app) {
        const newApp = this.loadClass(re_app[k].app_index, re_app[k].type, re_app[k].x, re_app[k].y);
        this.all_apps.push(newApp);
        total_apps[k] = newApp;
      }
      for (const k in re_app) {

        //Restore data for apps
        if (re_app[k].type == 'say_time'
        || re_app[k].type == 'callerid_set'
        || re_app[k].type == 'say_alpha'
        || re_app[k].type == 'say_date'
        || re_app[k].type == 'say_digit'
        || re_app[k].type == 'say_number') {
          if (re_app[k].type.includes('say_')) { 
            // Found world
            var trim_type = re_app[k].type.replace(/say_/g,'');
          }
          else if (re_app[k].type.includes('_set')) { 
            // Found world
            var trim_type = re_app[k].type.replace(/_set/g,'');
          }          
          const prop_name = trim_type;
          const prop_name_variable = re_app[k].type + '_variable';
          if (re_app[k]['data'][prop_name] != '[contact:first_name]' && re_app[k]['data'][prop_name] != '[contact:last_name]' && re_app[k]['data'][prop_name] != '[contact:phone]' && re_app[k]['data'][prop_name] != '[contact:email]' && re_app[k]['data'][prop_name] != '[contact:address]' && re_app[k]['data'][prop_name] != '[contact:description]' && re_app[k]['data'][prop_name] != '[contact:custom1]' && re_app[k]['data'][prop_name] != '[contact:custom2]' && re_app[k]['data'][prop_name] != '[contact:custom3]') {
            re_app[k]['data'][prop_name_variable] = re_app[k]['data'][prop_name];
            re_app[k]['data'][prop_name] = 'undefined';
          }
          else {
            re_app[k]['data'][prop_name_variable] = '';
          }
        }
        // Restore data
        total_apps[k].restoreData(re_app[k].data);

        total_apps[k].restoreTooltip(re_app[k].img_title);


        //Restore Resources
        if (re_app[k].type == 'voice_play' || re_app[k].type == 'play_menu' || re_app[k].type == 'transfer') {
          total_apps[k].restoreResources(re_app[k].resources);
        }

        // Restore Pointers
        for (let i = 0; i < total_apps[k].out_nod.length; i++) {
          total_apps[k].out_nod[i].pointer.restorePointer(re_app[k].out_nod[i]);
        }

        //Hide all forms

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

        for (const k in total_apps) {
          total_apps[k].image_border.attr({'opacity': 0});
          total_apps[k].removeBtnBack.attr({'fill-opacity': 100, 'fill': 'white', 'opacity': 0});
          total_apps[k].removeBtnText.attr({font: '11px Arial', 'text-anchor': 'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});
        }
        
      }
    }
  }
}