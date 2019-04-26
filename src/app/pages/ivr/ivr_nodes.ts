import * as Raphael from 'raphael'; 
import { Pointers } from './ivr_pointer';
import * as d3 from 'd3';
import * as $ from 'jquery';

import { AddIVRComponent } from './ivr-form-component';


export class Nodes {
  n_type:any;
  connec_tion:any;
  node_type:any;
  pointer:any;
  node_link:any;
  parentApp:any;
  node_rect:any;
  node_text:any;
  app_index:any;

  constructor(node_type, type, left, top, set, i, color, nodeColor, app_index) {
    this.node_type = node_type;
    this.n_type = 'output';
    this.parentApp = type;
    if (type != 'play_menu') {
      this.node_text =  AddIVRComponent.r.text(left + 78, top + (30 +(10*i)), this.node_type).attr({font:'12px Verdana','font-size':9,'text-anchor':'end', fill: color});
      this.node_rect =  AddIVRComponent.r.rect(left + 80, top + (25 + (10*i)), 7, 7).attr({stroke: nodeColor,"fill-opacity":100, 'fill': nodeColor,'opacity': 1});
    }
    else {
      this.node_text =  AddIVRComponent.r.text(left + 78, top + (3 +(10*i)), this.node_type).attr({font:'12px Verdana','font-size':9,'text-anchor':'end', fill: color});
      this.node_rect =  AddIVRComponent.r.rect(left + 80, top + (10*i), 7, 7).attr({stroke: nodeColor,"fill-opacity":100, 'fill': nodeColor,'opacity': 1});
    }
    
    this.app_index = app_index;

    set.push(this.node_text);
    set.push(this.node_rect);

    this.build_pointer(i, type, left, top, set);

  }

  build_pointer(i, type, left, top, set) {

    let nodeColor = this.node_type === "error" ? "#E60876" : this.node_type === "success" ? "#4CC417" : "#3C8BE5";

    let ptr = new Pointers(this.app_index, i, type, this.node_type, left, top, nodeColor, set, this.node_rect);
    this.pointer = ptr;
  }
 
}

Raphael.fn.connection = (obj1, obj2, line, bg) => {
  if (obj1.line && obj1.from && obj1.to) {
    line = obj1;
    obj1 = line.from;
    obj2 = line.to;
  }
  var bb1 = obj1.getBBox(),
    bb2 = obj2.getBBox(),
    p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
    {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
    {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
    {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
    {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
    {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
    {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
    {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
    d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
      for (var j = 4; j < 8; j++) {
        var dx = Math.abs(p[i].x - p[j].x),
        dy = Math.abs(p[i].y - p[j].y);
        if ((i === j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
          dis.push(dx + dy);
          d[dis[dis.length - 1]] = [i, j];
        }
      }
    }
  if (dis.length === 0) {
    var res = [0, 4];
  } else {
    res = d[Math.min.apply(Math, dis)];
  }
  var x1 = p[res[0]].x,
    y1 = p[res[0]].y,
    x4 = p[res[1]].x,
    y4 = p[res[1]].y;
  dx = Math.max(Math.abs(x1 - x4) / 2, 10);
  dy = Math.max(Math.abs(y1 - y4) / 2, 10);
  var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
    y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
    x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
    y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
  var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
  if (line && line.line) {
    line.bg && line.bg.attr({path: path});
    line.line.attr({path: path});
  } else {
    var color = typeof line === "string" ? line : "#000";
    return {
        bg: bg && bg.split && AddIVRComponent.r.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
        line: AddIVRComponent.r.path(path).attr({stroke: color, fill: "none"}),
        from: obj1,
        to: obj2
    };
  }
}