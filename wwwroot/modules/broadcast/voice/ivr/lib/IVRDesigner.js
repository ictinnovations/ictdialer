
/****************************************************************************
* Developed by ICT Innovations                                              *
* info@ictinnovations.com                                                   *
*                                                                           *
* Copyright (c) 2011 ICT Innovations http://www.ictinnovations.com          *
*                                                                           *
* based on Original Work                                                    *
* Copyright (c) 2011 Sagie Maoz, http://sagie.maoz.info/                    *
*                                                                           *
* Permission is hereby granted, free of charge, to any person obtaining     *
* a copy of this software and associated documentation files (the           *
* "Software"), to deal in the Software without restriction, including       *
* without limitation the rights to use, copy, modify, merge, publish,       *
* distribute, sub-license, and/or sell copies of the Software, and to       *
* permit persons to whom the Software is furnished to do so, subject to     *
* the following conditions:                                                 *
* The above copyright notices and this permission notice shall be           *
* included in all copies or substantial portions of the Software.           *
*                                                                           *
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,           *
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF        *
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND                     *
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE    *
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION    *
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION     *
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.           *
****************************************************************************/
Raphael.fn.connection = function (obj1, obj2, line, bg) {
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
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
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
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};
//////////////////////////////////////////////////
// Remove button handler                        //
//////////////////////////////////////////////////
function removeButtonClick(btn) {
  btn.click(function(){
    var remove = -1;
    for(var i=0; i < applications[this.appIndex].element.outPointer.length; i++) {
      if(applications[this.appIndex].element.outPointer[i].isAttached == "yes"){
        remove++;
      }
    }
    if(applications[this.appIndex].element.inPointer.length > 0) {
      remove++;
    }
    if(remove == -1) {
      // Remove outPointer
      for(i = 0; i < applications[this.appIndex].element.outPointer.length; i++) { 
        applications[this.appIndex].element.outPointer[i].remove();
      }
      
      for (var i = connections.length; i--;) {
          r.connection(connections[i]);
      }
      r.safari();
      applications[this.appIndex].hide();
      applications[this.appIndex].isRemoved = "yes";
      
      
    }
    else {
      alert("Please remove links before deleting an Application");
    }
  });
}

/////////////////////////////////////////////////////////////////////
// ImageHandlers for pointer drag and drop on applications         //
/////////////////////////////////////////////////////////////////////
function setImageHandler(appImage) {
  appImage.mouseover(function() {
    this.attr({ 'opacity': .5 });
    gIndex = this.appIndex;
  });
  appImage.mouseout(function() {
    this.attr({ 'opacity': 1 });
  });
  appImage.click(function() {
    //this.attr({ 'opacity': 1});
    for(i = 0; i < applications.length; i++) {
      applications[i].element.imageBorder.attr({'opacity': 0});
      applications[i].element.editIcon.attr({'opacity': 0});
      applications[i].element.removeBtnBack.attr({'fill-opacity':100, 'fill': 'white', 'opacity': 0});
      applications[i].element.removeBtnText.attr({font:'11px Arial','text-anchor':'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});
    }
    if(applications[this.appIndex].appType!="start") {
      applications[this.appIndex].element.imageBorder.attr({'opacity': 1, 'stroke':'red'});
      applications[this.appIndex].element.removeBtnBack.attr({'opacity': 1, 'stroke':'white'});
      applications[this.appIndex].element.removeBtnText.attr({'opacity': 1});
      if(applications[this.appIndex].appType!="play_audio" 
         && applications[this.appIndex].appType!="transfer"
         && applications[this.appIndex].appType!="tts" 
         && applications[this.appIndex].appType!="getdigit" ) {
        applications[this.appIndex].element.editIcon.attr({'opacity': 0});
      } else {
        applications[this.appIndex].element.editIcon.attr({'opacity': 1});
      }
    }
    
  });
  /* Following code is useless after EditIcon on Image
  appImage.dblclick(function() {
    //window.open ("","mywindow");
    if(applications[this.appIndex].appType == "play_audio") {
      $('#edit-app-id').val(this.appIndex);
      $('#edit-recording-id').val(applications[this.appIndex].data.recording_id);
      play_audioProperties();
    }
    if(applications[this.appIndex].appType == "tts") {
      $('#edit-app-id').val(this.appIndex);
      $('#edit-tts').val(applications[this.appIndex].data.tts);
      ttsProperties();
    }
    if(applications[this.appIndex].appType == "transfer") {
      $('#edit-app-id').val(this.appIndex);
      $('#edit-extension-id').val(applications[this.appIndex].data.extension_id);
      transferProperties();
    }
    if(applications[this.appIndex].appType == "getdigit") {
      $('#edit-app-id').val(this.appIndex);
      $('#edit-getdigit-recording-id').val(applications[this.appIndex].data.getdigit_recording_id);
      getdigitProperties();
    }
  });
  */
}

////////////////////////////////////////////////////////////////
// Set Controls on app objects e.g. (setImageHandler,         //
// setEditHandler and removeButtonClick )                     //
////////////////////////////////////////////////////////////////
function setControls(app, appType) {
  setImageHandler(app.element.appImage);
  if(appType!="start") {
    removeButtonClick(app.element.removeBtnText);
    if(   appType!="play_audio" 
       || appType!= "transfer"  
       || appType!= "tts"       
       || appType!= "getdigit"  
      
      ){ 
        setEditHandler(app.element.editIcon);
    }
  }
}
//////////////////////////////////////////////////
// Dragger functions for outPointer             //
//////////////////////////////////////////////////
function dragger() {
  this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
  this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
};
function move(dx, dy) {
  var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};   
  this.attr(att);
  for (var i = connections.length; i--;) {
    r.connection(connections[i]);
  }
  r.safari();
};
function up() {
  if(gIndex != null && applications[gIndex].isRemoved=="yes") {
    gIndex = this.appIndex;
  }
  if(gIndex!=null && this.appIndex == gIndex) {
    this.ox = applications[gIndex].element.nodeOut[this.ptrIndex].attr("x");
    this.oy = applications[gIndex].element.nodeOut[this.ptrIndex].attr("y");
    this.isAttached = "no";
    // to remove link of pointer if it is dropped back to its source application
    if(this.destinationAppIndex!=null) {
      var ind = applications[this.destinationAppIndex].element.inPointer.indexOf(this);
      if(ind > -1) {
        applications[this.destinationAppIndex].element.inPointer.splice(ind,1);
        this.destinationAppIndex = null;
      }
    }
  }
  else {
    if(gIndex != null && applications[gIndex].element.nodeIn[0]!=null) {
      this.ox = applications[gIndex].element.nodeIn[0].attr("x");
      this.oy = applications[gIndex].element.nodeIn[0].attr("y");
      // to remove link of pointer from previous destination application
      if(this.isAttached == "yes") {
        if(this.destinationAppIndex!=null) {
          var ind = applications[this.destinationAppIndex].element.inPointer.indexOf(this);
          if(ind > -1) {
            applications[this.destinationAppIndex].element.inPointer.splice(ind,1);
            this.destinationAppIndex = null;
          }
        }
      }
      this.isAttached = "yes";
      this.destinationAppIndex = gIndex;
      applications[gIndex].element.inPointer.push(this);
    }
  }
  var att = this.type == "rect" ? {x: this.ox, y: this.oy} : {cx: this.ox, cy: this.oy};   
  this.attr(att);
  for (var i = connections.length; i--;) {
    r.connection(connections[i]);
  }
  r.safari();
  this.toFront();
};
//////////////////////////////////////////////////////////////////      
// dragger, move and up for SET (AppImage) Object               //
//////////////////////////////////////////////////////////////////
function starter() {
  this.ox = this.type == "image" ? this.attr("x") : this.attr("cx");
  this.oy = this.type == "image" ? this.attr("y") : this.attr("cy");
  // to get the location of the application and to joint the connection lines
  applications[this.appIndex].oBB = applications[this.appIndex].getBBox();
  //for(var i = 0; i < applications[this.appIndex].element.outPointer.length; i++) {
  //  connections.push(r.connection(applications[this.appIndex].element.nodeOut[i], applications[this.appIndex].element.outPointer[i], "#000", "#fff"));
  //}
};
function mover(dx, dy) {
  var bb;
  // to move application (set) and along with it the outpointers and inpointers 
  var bb = applications[this.appIndex].getBBox();
  applications[this.appIndex].translate(applications[this.appIndex].oBB.x - bb.x + dx, applications[this.appIndex].oBB.y - bb.y + dy);
  // moving the unattached outPointers
  for(var i = 0; i < applications[this.appIndex].element.outPointer.length; i++) {
    if(applications[this.appIndex].element.outPointer[i].isAttached == "no") {
      applications[this.appIndex].element.outPointer[i].translate(applications[this.appIndex].oBB.x - bb.x + dx, applications[this.appIndex].oBB.y - bb.y +dy);
    }
  }
  // moving the attached inPointers
  for(var i = 0; i < applications[this.appIndex].element.inPointer.length; i++) {
    applications[this.appIndex].element.inPointer[i].translate(applications[this.appIndex].oBB.x - bb.x + dx, applications[this.appIndex].oBB.y - bb.y +dy);
  }
  // following code is for movable lines with our applications
  var att = this.type == "image" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};   
  this.attr(att);
  for(var i = 0; i < applications.length; i++){
    for (var j = connections.length; j--;) {
      r.connection(connections[j]);
    }
  }
  r.safari();
};
function upper() {
/*Whatever*/ 
};

//////////////////////////
// Global variables     //
//////////////////////////
var el;
var applications = []; // applications on canvas
var r;            // canvas object
var gIndex;       // represents the index of current object on which mouse is over
var connections = [];
var editImg;
////////////////////////////
// Initializer function   //
////////////////////////////
function init() {
var startImg = document.getElementById("start-image").src;
var answerImg = document.getElementById("answer-image").src;
var hangupImg = document.getElementById("hangup-image").src;
var getdigitImg = document.getElementById("getdigit-image").src;
var play_audioImg = document.getElementById("play_audio-image").src;
var transferImg = document.getElementById("transfer-image").src;
var recordImg = document.getElementById("record-image").src;
var play_menuImg = document.getElementById("play_menu-image").src;
var amdImg = document.getElementById("amd-image").src;
var dncImg = document.getElementById("dnc-image").src;
var ttsImg = document.getElementById("tts-image").src;
editImg = document.getElementById("edit").src;

var canvasWidth=9000;
var canvasHeight=360;
// create the canvas object
r = Raphael("holder", canvasWidth, canvasHeight);

// To create start application
if($('#edit-data').val()=="" || $('#edit-data').val()==null) {
  newApp = r.set();
  applications.push(newApp);
  applications[applications.length-1]["index"] = applications.length-1;
  applications[applications.length-1]["nodes"] = new Object();
  applications[applications.length-1]["element"] = new Object();
  createApplication(newApp, startImg, "start", 20, 20);
}

///////////////////////////////////////////////////////
// Testing for getting Raphael Object as DOM object  //
///////////////////////////////////////////////////////
/*
var rec = r.image(play,100,100,50,50);
//rec.attr({'opacity':.5});
//var s = r.set();
//s.node.id = "myset";
rec.node.id = "myimg";
rec.node.onclick=function()
{
//alert("hello");
//$(document.getElementById("myimg")).hide();
//this.animate({"fill-opacity": .5}, 500);
};
//$(document.getElementById("myimg")).animate({"left": "+=50px"}, "slow");
//$(this.node.id).hide();
*/
/////////////////////////////////////////////////////////////////////////
// Toolbar elements, event handlers and their required functions       //
/////////////////////////////////////////////////////////////////////////
$('#answer-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "answer", answerImg);
		},
	}
);
$('#hangup-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "hangup", hangupImg);
		},
	}
);
$('#getdigit-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "getdigit", getdigitImg);
		},
	}
);
$('#play_audio-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "play_audio", play_audioImg);
		},
	}
);
$('#transfer-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "transfer", transferImg);
		},
	}
);
$('#record-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "record", recordImg);
		},
	}
);
$('#play_menu-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "play_menu", play_menuImg);
		},
	}
);
$('#amd-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "amd", amdImg);
		},
	}
);
$('#dnc-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "dnc", dncImg);
		},
	}
);
$('#tts-icon').draggable(
	{
		ghosting:	true,
		opacity:	0.5,
		fx:			300,
		helper: 'clone',
		stop: function (event, ui){
		  onDraggableStop(event, ui, "tts", ttsImg);
		},
	}
);

function onDraggableStop(event, ui, action, actionImg){
  //alert($('#edit-data').val());
  var screenX = parseInt( ui.offset.left );
  var screenY = parseInt( ui.offset.top );
  var left=0;
  var top=0;
  left = screenX - $('#holder').offset().left + $('#holder').scrollLeft();
  top =  screenY - $('#holder').offset().top + $('#holder').scrollTop();
  if(left > 0 && top > 0 && left < canvasWidth && top < canvasHeight) {
    newApp = r.set();
    applications.push(newApp);
    applications[applications.length-1]["index"] = applications.length-1;
    applications[applications.length-1]["nodes"] = new Object();
    applications[applications.length-1]["element"] = new Object();
    createApplication(newApp, actionImg, action, left, top);
    if(applications[applications.length-1].appType == "play_audio") {
      $('#edit-app-id').val(applications.length-1);
      $('#edit-recording-id').val(applications[applications.length-1].data.recording_id);
      play_audioProperties();
    }
    if(applications[applications.length-1].appType == "tts") {
      $('#edit-app-id').val(applications.length-1);
      $('#edit-tts').val(applications[applications.length-1].data.tts);
      ttsProperties();
    }
    if(applications[applications.length-1].appType == "transfer") {
      $('#edit-app-id').val(applications.length-1);
      $('#edit-extension-id').val(applications[applications.length-1].data.extension_id);
      transferProperties();
    }
    if(applications[applications.length-1].appType == "getdigit") {
      $('#edit-app-id').val(applications.length-1);
      $('#edit-getdigit-recording-id').val(applications[applications.length-1].data.getdigit_recording_id);
      getdigitProperties();
    }
  }
  //else {
  //  alert('Please drop application in the drawing area');
  //}
}

}; // end init()

/////////////////////////////////////////////
// generalized application function        //
/////////////////////////////////////////////

function createApplication(app, imagesrc, appType, xPos, yPos)
{
  var textArea = [];
  var textDisplay = [];
  var nodeOut = [];
  var nodeIn = [];
  var outPointer = [];
  var inPointer = [];
  color = Raphael.getColor();
  //////////////////////////////////////////////////
  // getNodes gets number of nodes, pointers       //
  // and their location for each Application      //
  //////////////////////////////////////////////////
  app["appType"] = appType;
  app["isRemoved"] = "no";
  getNodes(app, appType);
  ////////////////////////////////////////////////////
  // getData gets data field for this application   //
  ////////////////////////////////////////////////////
  getData(app, appType);
  
  ///////////////////////////////////////////////////////////////////
  // create required objects for the application                   //
  // e.g. Image (appHandle), nodeIn, nodeOut, outpointers, inpointers //
  ///////////////////////////////////////////////////////////////////
  imgx = 80;
  imgy = 60;
  // create image object here
  appImage = r.image(imagesrc ,xPos, yPos, imgx, imgy).attr({title: app["display_name"], cursor: 'move'});
  
  appImage["appIndex"] = app.index;
  appImage["nodeType"]="image";
  
  //edit pencil icon
  editIcon = r.image(editImg, xPos+2, yPos + imgy - 14, 12, 12).attr({cursor: 'pointer', opacity:0, title: 'Click to edit this application'});
  editIcon["appIndex"] = app.index;
  
  // image border
  imageBorder = r.rect(xPos-2, yPos-2, imgx+4, imgy+4, 4).attr({'opacity': 0});
  
  removeBtnBack = r.rect(xPos + 2, yPos + 2, 8, 8).attr({'fill-opacity':100, 'fill': 'white', 'opacity': 0});
  removeBtnText = r.text(xPos + 4, yPos + 4, 'x').attr({font:'11px Arial','text-anchor':'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});
  
  // set nodes on the application
  for(i = 0; i < app.nodes.input.length; i++) {
    nodeIn.push(r.rect(xPos, yPos + 30, 5, 5).attr({stroke: 'red',"fill-opacity":100, 'fill': 'red','opacity': 1}));
  }
  for(i = 0; i < app.nodes.output.length; i++) {
    textArea.push(r.rect(xPos + 50, yPos + (10*i), 40, 5).attr({stroke: 'white',"fill-opacity":100, 'fill': 'white','opacity': 0}));
  }
  
  for(i = 0; i < app.nodes.output.length; i++) {
    textDisplay.push(r.text(xPos + 78, yPos + (3 +(10*i)), app.nodes.output[i]).attr({font:'12px Verdana','font-size':9,'text-anchor':'end', fill: app.color}));
  }
  
  for(i = 0; i < app.nodes.output.length; i++) {
    nodeColor = app.nodes.output[i] == "error" ? "#E60876" : app.nodes.output[i] == "success" ? "#4CC417" : "#3C8BE5";
    nodeOut.push(r.rect(xPos + 80, yPos + (10*i), 5, 5).attr({stroke: nodeColor,"fill-opacity":100, 'fill': nodeColor,'opacity': 1}));
  }
  
  for(i = 0; i < app.nodes.output.length; i++) {
    nodeColor = app.nodes.output[i] == "error" ? "#E60876" : app.nodes.output[i] == "success" ? "#4CC417" : "#3C8BE5"
    outPointer.push(r.rect(xPos + 80, yPos + (10*i), 5, 5).attr({stroke: nodeColor,"fill-opacity":100, 'fill': nodeColor,'opacity': 1, cursor: 'move'}));
  }
  inPointer = [];  // its empty for new application
  
  /////////////////////////////////////////////////////
  // set properties of created objects               //
  /////////////////////////////////////////////////////
  
  // set pointers properties
  var conns = [];
  for(var i = 0; i < outPointer.length; i++) {
    outPointer[i]["ptrIndex"] = i;
    outPointer[i]["nodeType"] = "outPointer";
    outPointer[i]["isAttached"] = "no";
    outPointer[i]["appIndex"] = app.index;
    outPointer[i]["destinationAppIndex"] = null;
    outPointer[i].drag(move, dragger, up);
    connections.push(r.connection(nodeOut[i], outPointer[i], "#000", "#fff"));
  }
  // set nodeOut properties
  for(var i = 0; i < nodeOut.length; i++) {
    nodeOut[i]["nodeOutIndex"] = i;
    nodeOut[i]["nodeType"] = "nodeOut";
    nodeOut[i]["appIndex"] = app.index;
  }
  // set nodeIn properties
  for(var i = 0; i < nodeIn.length; i++) {
    nodeIn[i]["nodeInIndex"] = i;
    nodeIn[i]["nodeType"] = "nodeIn";
    nodeIn[i]["appIndex"] = app.index;
  }
  
  imageBorder["nodeType"] = "imageBorder";
  imageBorder["appIndex"] = app.index;
  removeBtnBack["nodeType"] = "removeBtnBack";
  removeBtnBack["appIndex"] = app.index;
  removeBtnText["nodeType"] = "removeBtnText";
  removeBtnText["appIndex"] = app.index;
        
  //set pointers, nodeIn and nodeOut to application object
  app.element["appImage"] = appImage;
  app.element["editIcon"] = editIcon;
  app.element["imageBorder"] = imageBorder;
  app.element["removeBtnBack"] = removeBtnBack;
  app.element["removeBtnText"] = removeBtnText;
  app.element["nodeIn"] = nodeIn;   
  app.element["nodeOut"] = nodeOut; 
  app.element["textArea"] = textArea;
  app.element["textDisplay"] = textDisplay;
  app.element["outPointer"] = outPointer;
  app.element["inPointer"] = inPointer;
  
  //set controls on the application (e.g. setImageHandler(), setEditHandler() and removeButtonClicke())
  setControls(app, appType);
  
  // make elements part of the raphael set 
  for(var i = 0; i <= nodeIn.length; i++) {
    app.push(nodeIn[i]);
  }
  
  for(var i = 0; i <= nodeOut.length; i++) {
    app.push(nodeOut[i]);
  }
  for(var i = 0; i <= textArea.length; i++) {
    app.push(textArea[i]);
  }
  for(var i = 0; i <= textDisplay.length; i++) {
    app.push(textDisplay[i]);
  }
  app.push(appImage);
  app.push(editIcon);
  app.push(imageBorder);
  app.push(removeBtnBack);
  app.push(removeBtnText);
  app.drag(mover, starter, upper); 
}

function getData(app, appType) {
  if(appType == "play_audio") {
    var objData = { recording_id: ""};
    app["data"] = objData;
  }
  if(appType == "tts") {
    var objData = { tts: ""};
    app["data"] = objData;
  }
  if(appType == "transfer") {
    var objData = { exension_id: ""};
    app["data"] = objData;
  }
  if(appType == "getdigit") {
    var objData = { getdigit_recording_id: ""};
    app["data"] = objData;
  }
}

function getNodes(app, appType) {
  input = [];
  output = [];
  switch(appType) {
  case "answer": 
    app["display_name"] = "Call Answer";
    app["color"] = "white";
    input.push("incoming call");
    /////////////////
    output.push(new String("success"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "hangup":
    app["display_name"] = "Call Hangup";    
    app["color"] = "white";
    input.push("channel");
    /////////////////
    output.push(new String("success"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "getdigit":
    app["display_name"] = "Get Digits (input)";
    app["color"] = "white";
    input.push("play_audio");
    /////////////////
    output.push(new String("success"));
    output.push(new String("invalid"));
    output.push(new String("timeout"));
    output.push(new String("repeat"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "play_audio":
    app["display_name"] = "Play Audio";
    app["color"] = "white";
    input.push("channel");
    /////////////////
    output.push(new String("success"));
    output.push(new String("invalid"));
    output.push(new String("timeout"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "transfer":
    app["display_name"] = "Call Transfer";
    app["color"] = "white";
    input.push("channel");
    /////////////////
    output.push(new String("success"));
    output.push(new String("busy"));
    output.push(new String("timeout"));
    output.push(new String("no-route"));
    output.push(new String("no-reply"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "record":
    app["display_name"] = "Call Record";
    app["color"] = "white";
    input.push("channel");
    /////////////////
    output.push(new String("success"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "play_menu":
    app["display_name"] = "Options Menu";
    app["color"] = "white";
    input.push("input");
    /////////////////
    output.push(new String("1"));
    output.push(new String("2"));
    output.push(new String("3"));
    output.push(new String("4"));
    output.push(new String("invalid"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "amd":
    app["display_name"] = "Answering Maching Detection (AMD)";
    app["color"] = "white";
    input.push("channel");
    /////////////////
    output.push(new String("machine"));
    output.push(new String("human"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "dnc":
    app["display_name"] = "Do Not Call (DNC)";
    app["color"] = "white";
    input.push("placecall");
    /////////////////
    output.push(new String("success"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  case "tts":
    app["display_name"] = "Text To Speech (TTS)";
    app["color"] = "white";
    input.push("channel");
    /////////////////
    output.push(new String("success"));
    output.push(new String("error"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
    break;
  default:
    app["display_name"] = "Start";
    app["color"] = "white";
    //input.push("nill");
    output.push(new String("Start"));
    app.nodes["input"] = input;
    app.nodes["output"] = output;
  }//close switch
}

function serializeArray() { 
  var paper = this;
  var svgdata = [];
  var serApps = [];
  var apps = applications;
  // create shadow object
  for(i = 0; i < apps.length; i++) {
    serApps.push(new Object());
    serApps[i]["index"] = i;
    serApps[i]["nodes"] = new Object();
    serApps[i]["element"] = new Object();
    serApps[i]["appType"] = apps[i].appType;
    serApps[i]["isRemoved"] = apps[i].isRemoved;
    getNodes(serApps[i], serApps[i].appType);
    /////////////////////////////////////////////////////////////////
    // serialize data for this application
    /////////////////////////////////////////////////////////////////
    // for play_audio
    if(apps[i].appType == "play_audio") {
      var objData = {
        recording_id: apps[i].data.recording_id,
      }
      serApps[i].data = objData;
    }
    // for tts
    if(apps[i].appType == "tts") {
      var objData = {
        tts: apps[i].data.tts,
      }
      serApps[i].data = objData;
    }
    // for transfer
    if(apps[i].appType == "transfer") {
      var objData = {
        extension_id: apps[i].data.extension_id,
      }
      serApps[i].data = objData;
    }
    // for getdigit
    if(apps[i].appType == "getdigit") {
      var objData = {
        getdigit_recording_id: apps[i].data.getdigit_recording_id,
      }
      serApps[i].data = objData;
    }
    /////////////////////////////////////////////////////////////////
    // serialize image
    // NOTE: While unserializing, add imageHandler events for this image
    node = apps[i].element.appImage;
    if(node && node.type=="image") {
      var object = {
        type: node.type,
        width: node.attrs['width'],
        height: node.attrs['height'],
        x: node.attrs['x'],
        y: node.attrs['y'],
        src: node.attrs['src'],
        title: node.attrs['title'],
        cursor: node.attrs['cursor'],
        transform: node.transformations ? node.transformations.join(' ') : ''
      }
    }
    serApps[i].element.appImage = object;
    // image properties
    serApps[i].element.appImage["appIndex"] = serApps[i].index;
    serApps[i].element.appImage["nodeType"]="image";
    //end image
    /////////////////////////////////////////////////////////////
    //serialize editIcon
    // NOTE: While unserializing, add editIconHandler events for this image
    node = apps[i].element.editIcon;
    if(node && node.type=="image") {
      var object = {
        type: node.type,
        width: node.attrs['width'],
        height: node.attrs['height'],
        x: node.attrs['x'],
        y: node.attrs['y'],
        src: node.attrs['src'],
        title: node.attrs['title'],
        cursor: node.attrs['cursor'],
        transform: node.transformations ? node.transformations.join(' ') : ''
      }
    }
    serApps[i].element.editIcon = object;
    // editIcon properties
    serApps[i].element.editIcon["appIndex"] = serApps[i].index;
    serApps[i].element.editIcon["nodeType"]="editIcon";
    //end editIcon
    /////////////////////////////////////////////////////////////
    //serialize imageBorder
    node = apps[i].element.imageBorder;
    if(node && node.type=="rect") {
      var object = {
        type: node.type,
        x: node.attrs['x'],
        y: node.attrs['y'],
        width: node.attrs['width'],
        height: node.attrs['height'],
        stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
        'stroke-width': node.attrs['stroke-width'],
        fill: node.attrs['fill'],
        opacity: node.attrs['opacity']
      }
    }
    serApps[i].element.imageBorder = object;
    // imageBorder properties
    serApps[i].element.imageBorder["appIndex"] = serApps[i].index;
    serApps[i].element.imageBorder["nodeType"]="imageBorder";
    //end imageBorder
    
    /////////////////////////////////////////////////////////////
    //serialize removeBtnBack
    node = apps[i].element.removeBtnBack;
    if(node && node.type=="rect") {
      var object = {
        type: node.type,
        x: node.attrs['x'],
        y: node.attrs['y'],
        width: node.attrs['width'],
        height: node.attrs['height'],
        stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
        'stroke-width': node.attrs['stroke-width'],
        fill: node.attrs['fill'],
        'fill-opacity': node.attrs['fill-opacity'],
        opacity: node.attrs['opacity']
      }
    }
    serApps[i].element.removeBtnBack = object;
    // removeBtnBack properties
    serApps[i].element.removeBtnBack["appIndex"] = serApps[i].index;
    serApps[i].element.removeBtnBack["nodeType"]="removeBtnBack";
    //end removeBtnBack
    
    /////////////////////////////////////////////////////////////
    //serialize removeBtnText
    node = apps[i].element.removeBtnText;
    if(node && node.type=="text") {
      var object = {
        type: node.type,
        font: node.attrs['font'],
        'font-family': node.attrs['font-family'],
        'font-size': node.attrs['font-size'],
        stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
        fill: node.attrs['fill'] === 0 ? 'none' : node.attrs['fill'],
        'stroke-width': node.attrs['stroke-width'],
        x: node.attrs['x'],
        y: node.attrs['y'],
        text: node.attrs['text'],
        'text-anchor': node.attrs['text-anchor'],
        cursor: node.attrs['cursor'],
        opacity: node.attrs['opacity']
      }
    }
    serApps[i].element.removeBtnText = object;
    // removeBtnText properties
    serApps[i].element.removeBtnText["appIndex"] = serApps[i].index;
    serApps[i].element.removeBtnText["nodeType"]="removeBtnText";
    //end removeBtnText
    
    //////////////////////////////////////////////////////////////
    //serialize nodeIn
    nodeIn = [];
    for(var j = 0; j < apps[i].element.nodeIn.length; j++) {
      node = apps[i].element.nodeIn[j];
      if(node && node.type == "rect") {
        var object = {
          type: node.type,
          x: node.attrs['x'],
          y: node.attrs['y'],
          width: node.attrs['width'],
          height: node.attrs['height'],
          stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
          'stroke-width': node.attrs['stroke-width'],
          fill: node.attrs['fill']
        }
      }
      nodeIn.push(object);
      // nodeIn properties
      nodeIn[j]["nodeInIndex"] = j;
      nodeIn[j]["nodeType"] = "nodeIn";
      nodeIn[j]["appIndex"] = serApps[i].index;
    }
    serApps[i].element["nodeIn"] = nodeIn;
    //end nodeIn
    
    //////////////////////////////////////////////////////////////
    //serialize textArea
    textArea = [];
    for(var j = 0; j < apps[i].element.textArea.length; j++) {
      node = apps[i].element.textArea[j];
      if(node && node.type == "rect") {
        var object = {
          type: node.type,
          x: node.attrs['x'],
          y: node.attrs['y'],
          width: node.attrs['width'],
          height: node.attrs['height'],
          stroke: node.attrs['stroke'],
          'stroke-width': node.attrs['stroke-width'],
          fill: node.attrs['fill'],
          opacity: node.attrs['opacity'],
          'fill-opacity': node.attrs['fill-opacity'],
          font: node.attrs['font']
        }
      }
      textArea.push(object);
    }
    serApps[i].element["textArea"] = textArea;
    //end textArea
    
    //////////////////////////////////////////////////////////////
    //serialize textDisplay
    textDisplay = [];
    for(var j = 0; j < apps[i].element.textDisplay.length; j++) {
      node = apps[i].element.textDisplay[j];
      if(node && node.type=="text") {
        var object = {
          type: node.type,
          font: node.attrs['font'],
          'font-family': node.attrs['font-family'],
          'font-size': node.attrs['font-size'],
          stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
          fill: node.attrs['fill'] === 0 ? 'none' : node.attrs['fill'],
          'stroke-width': node.attrs['stroke-width'],
          x: node.attrs['x'],
          y: node.attrs['y'],
          text: node.attrs['text'],
          'text-anchor': node.attrs['text-anchor'],
          fill: node.attrs['fill'],
          'fill-opacity': node.attrs['fill-opacity'],
          opacity: node.attrs['opacity']
        }
      }
      textDisplay.push(object);
    }
    serApps[i].element["textDisplay"] = textDisplay;
    //end textDisplay
    
    //////////////////////////////////////////////////////////////
    //serialize nodeOut
    //NOTE: while unserializing, add appConnections with outPointer
    nodeOut = [];
    for(var j = 0; j < apps[i].element.nodeOut.length; j++) {
      node = apps[i].element.nodeOut[j];
      if(node && node.type == "rect") {
        var object = {
          type: node.type,
          x: node.attrs['x'],
          y: node.attrs['y'],
          width: node.attrs['width'],
          height: node.attrs['height'],
          stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
          'stroke-width': node.attrs['stroke-width'],
          fill: node.attrs['fill']
        }
      }
      nodeOut.push(object);
      // nodeOut properties
      nodeOut[j]["nodeOutIndex"] = j;
      nodeOut[j]["nodeType"] = "nodeOut";
      nodeOut[j]["appIndex"] = serApps[i].index;
    }
    serApps[i].element["nodeOut"] = nodeOut;
    //end nodeOut
    
    ////////////////////////////////////////////////////////////
    //serialize outPointer
    //NOTE: while unserializing, 
    // (1) add appConnections with nodeOut 
    // (2) set drag(move,dragger,up)
    // (3) outPointer that are attached, push them to inPointer of destinationAppIndex Application
    outPointer = [];
    for(var j = 0; j < apps[i].element.outPointer.length; j++) {
      node = apps[i].element.outPointer[j];
      if(node && node.type == "rect") {
        var object = {
          type: node.type,
          x: node.attrs['x'],
          y: node.attrs['y'],
          width: node.attrs['width'],
          height: node.attrs['height'],
          stroke: node.attrs['stroke'] === 0 ? 'none': node.attrs['stroke'],
          'stroke-width': node.attrs['stroke-width'],
          fill: node.attrs['fill'],
          cursor: "move"
        }
      }
      outPointer.push(object);
      // outPointer properties
      outPointer[j]["ptrIndex"] = j;
      outPointer[j]["nodeType"] = "outPointer";
      outPointer[j]["isAttached"] = apps[i].element.outPointer[j].isAttached;
      outPointer[j]["appIndex"] = serApps[i].index; //same as apps[i].index
      outPointer[j]["destinationAppIndex"] = apps[i].element.outPointer[j].destinationAppIndex;
    }
    serApps[i].element["outPointer"] = outPointer;
    //end outPointer
    
    ///////////////////////////////////////////////////////////////////////////////////////////
    // serialize inPointer
    // NOTE: inPointers are just reference of outPointer that is attached to some Application. 
    //       So we don't need to serialize these objects. They are already serialized.
    ///////////////////////////////////////////////////////////////////////////////////////////
    // Following loop added for information required in campaign_actions table:
    // We need information like which outPointer of other applications are 
    // attached to inPointer of this (current) application. we need IDs or 
    // indexes of attched outPointers
    ///////////////////////////////////////////////////////////////////////////////////////////
    inPointer = [];
    //alert(apps[i].element.inPointer[0].appIndex);
    for(var j = 0; j < apps[i].element.inPointer.length; j++) {
      node = apps[i].element.inPointer[j];
      //alert(node.ptrIndex);
      var object = {};
      if(node != null) {
        object = {
          ptrIndex: node.ptrIndex,
          sourceAppIndex: node.appIndex,
        }
      }
      inPointer.push(object);
    }
    serApps[i].element["inPointer"] = inPointer;
    //end inPointer
    
  }//end for
  var json = JSON.stringify(serApps);
  $('#edit-data').val(json);
  
}

function ivr_load_data() {
  var json = $('#edit-data').val();
  var apps = JSON.parse(json);
  if(apps!=null) {
    for(i = 0; i < apps.length; i++) {
      // restore application object
      var set = r.set();
      applications.push(set);
      applications[i]["index"] = i;
      applications[i]["nodes"] = new Object();
      applications[i]["element"] = new Object();
      applications[i]["appType"] = apps[i].appType;
      applications[i]["isRemoved"] = apps[i].isRemoved;
      getNodes(applications[i], applications[i].appType);
      /////////////////////////////////////////////////////////////
      // restore data for this application
      /////////////////////////////////////////////////////////////
      if(apps[i].appType == "play_audio") {
        var objData = { recording_id: ""};
        applications[i]["data"] = objData;
        applications[i].data.recording_id = apps[i].data.recording_id;
      }
      // for tts
      if(applications[i].appType == "tts") {
        var objData = { tts: ""};
        applications[i]["data"] = objData;
        applications[i].data.tts = apps[i].data.tts;
      }
      // for transfer call
      if(applications[i].appType == "transfer") {
        var objData = { extension_id: ""};
        applications[i]["data"] = objData;
        applications[i].data.extension_id = apps[i].data.extension_id;
      }
      // for getdigit
      if(applications[i].appType == "getdigit") {
        var objData = { getdigit_recording_id: ""};
        applications[i]["data"] = objData;
        applications[i].data.getdigit_recording_id = apps[i].data.getdigit_recording_id;
      }
      //end restoring data
      //////////////////////////////////////////////////////////////
      
      // restore image
      node = apps[i].element.appImage;
      var appImage = r[node.type]().attr(node);
      applications[i].element["appImage"] = appImage;
      applications[i].element["appImage"]["appIndex"] = i;
      applications[i].element["appImage"]["nodeType"] = "image";
      applications[i].push(appImage);
      //setImageHandler(appImage);
      
      // restore editIcon
      node = apps[i].element.editIcon;
      var editIcon = r[node.type]().attr(node);
      applications[i].element["editIcon"] = editIcon;
      applications[i].element["editIcon"]["appIndex"] = i;
      applications[i].element["editIcon"]["nodeType"] = "image";
      applications[i].push(editIcon);
      //setEditHandler(editIcon);
      
      // restore imageBorder
      node = apps[i].element.imageBorder;
      var imageBorder = r[node.type]().attr(node);
      applications[i].element["imageBorder"] = imageBorder;
      applications[i].element["imageBorder"]["appIndex"] = applications[i].index;
      applications[i].element["imageBorder"]["nodeType"] = "imageBorder";
      applications[i].push(imageBorder);
      // restore RemoveBtnBack
      node = apps[i].element.removeBtnBack;
      var removeBtnBack = r[node.type]().attr(node);
      applications[i].element["removeBtnBack"] = removeBtnBack;
      applications[i].element["removeBtnBack"]["appIndex"] = applications[i].index;
      applications[i].element["removeBtnBack"]["nodeType"] = "removeBtnBack";
      applications[i].push(removeBtnBack);
      // restore RemoveBtnText
      node = apps[i].element.removeBtnText;
      var removeBtnText = r[node.type]().attr(node);
      applications[i].element["removeBtnText"] = removeBtnText;
      applications[i].element["removeBtnText"]["appIndex"] = applications[i].index;
      applications[i].element["removeBtnText"]["nodeType"] = "removeBtnText";
      applications[i].push(removeBtnText);
      //removeButtonClick(removeBtnText);
      
      // set Application Controls
      setControls(applications[i], applications[i].appType);
      
      // restore nodeIn
      nodeIn = [];
      j = 0;
      $.each(apps[i].element.nodeIn, function(index, node) {
        try {
          var el = r[node.type]().attr(node);
          nodeIn.push(el);         //make element part of the array
          nodeIn[j]["appIndex"] = applications[i].index;
          nodeIn[j]["nodeType"] = "nodeIn";
          applications[i].push(el);   //make element part of the raphael set
          j++;
        } catch(e) {}
      });
      applications[i].element["nodeIn"] = nodeIn; // make array part of the application object
      // restore textArea
      textArea = [];
      j = 0;
      $.each(apps[i].element.textArea, function(index, node) {
        try {
          var el = r[node.type]().attr(node);
          textArea.push(el);
          applications[i].push(el);
          j++;
        } catch(e) {}
      });
      applications[i].element["textArea"] = textArea;
      applications[i].element["textArea"]["appIndex"] = applications[i].index;
      applications[i].element["textArea"]["nodeType"] = "textArea";
      // restore textDisplay
      textDisplay = [];
      j = 0;
      $.each(apps[i].element.textDisplay, function(index, node) {
        try {
          var el = r[node.type]().attr(node);
          textDisplay.push(el);
          applications[i].push(el);
          j++;
        } catch(e) {}
      });
      applications[i].element["textDisplay"] = textDisplay;
      applications[i].element["textDisplay"]["appIndex"] = applications[i].index;
      applications[i].element["textDisplay"]["nodeType"] = "textDisplay";
      // restore nodeOut
      nodeOut = [];
      j = 0;
      $.each(apps[i].element.nodeOut, function(index, node) {
        try {
          var el = r[node.type]().attr(node);
          nodeOut.push(el);
          nodeOut[j]["nodeOutIndex"] = j;
          nodeOut[j]["appIndex"] = applications[i].index;
          nodeOut[j]["nodeType"] = "nodeOut";
          applications[i].push(el);
          j++;
        } catch(e) {}
      });
      applications[i].element["nodeOut"] = nodeOut;
      // inPointer 
      inPointer = [];
      applications[i].element["inPointer"] = inPointer;
      // restore outPointer
      outPointer = [];
      j = 0;
      $.each(apps[i].element.outPointer, function(index, node) {
        try {
          var el = r[node.type]().attr(node);
          outPointer.push(el);
          outPointer[j]["ptrIndex"] = j;
          outPointer[j]["nodeType"] = "outPointer";
          outPointer[j]["appIndex"] = applications[i].index;
          outPointer[j]["isAttached"] = apps[i].element.outPointer[j].isAttached;
          outPointer[j]["destinationAppIndex"] = apps[i].element.outPointer[j].destinationAppIndex;
          outPointer[j].drag(move, dragger, up);
          j++;
        } catch(e) {}
      });
      applications[i].element["outPointer"] = outPointer;
      // restore connections
      for(var k = 0; k < applications[i].element.outPointer.length; k++) {
        if(applications[i].isRemoved == "yes") continue;
        connections.push(r.connection(applications[i].element.nodeOut[k], applications[i].element.outPointer[k], "#000", "#fff"));
      }
      applications[i].drag(mover,starter, upper);
      
    }//endfor
    
    // set the connected pointers to their destination applications
    for (i = 0; i < applications.length; i++) {
      for (j = 0; j < applications[i].element.outPointer.length; j++) {
        if(applications[i].element.outPointer[j].isAttached == "yes") {
            destIndex = applications[i].element.outPointer[j].destinationAppIndex;
            applications[destIndex].element.inPointer.push(applications[i].element.outPointer[j]);
            applications[i].element.outPointer[j].toFront();
        }
      }
    }
    
    // reset all connections
    for (var i = connections.length; i--;) {
      r.connection(connections[i]);
    }
    r.safari();
    // reset all items and their display to default
    for(i = 0; i < applications.length; i++) {
      applications[i].element.imageBorder.attr({'opacity': 0});
      applications[i].element.editIcon.attr({'opacity': 0});
      applications[i].element.removeBtnBack.attr({'fill-opacity':100, 'fill': 'white', 'opacity': 0});
      applications[i].element.removeBtnText.attr({font:'11px Arial','text-anchor':'start', 'fill': 'black', 'cursor': 'pointer', 'opacity': 0});
      // remove the removed application
      if(applications[i].isRemoved == "yes") {
        applications[i].hide();
        for(j = 0; j < applications[i].element.outPointer.length; j++) {
          applications[i].element.outPointer[j].hide();
        }
      }
      
    }
  }//endif
  
  
};



