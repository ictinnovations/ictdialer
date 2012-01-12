/******************************************************************
* Copyright © 2011 ICT Innovations Pakistan All Rights Reserved   *
* Developed By: Falak Nawaz                                       *
*             : Nasir Iqbal                                       *
*             : Tahir Almas                                       *
* Website : http://www.ictinnovations.com/                        *
* Mail : info@ictinnovations.com                                  *
******************************************************************/
///////////////////////////////////////////
// EditHandlers for applications         //
///////////////////////////////////////////
function setEditHandler(editIcon) {
  editIcon.click(function() {
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
}

////////////////////////////////////////////////////////////////////
// Recording Functions
///////////////////////////////////////////////////////////////////
function play_audioProperties(){
  //Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	//Set heigth and width to mask to fill up the whole screen
	$('#mask_pa').css({'width':maskWidth,'height':maskHeight});
	//transition effect		
	$('#mask_pa').fadeIn(1000);	
	$('#mask_pa').fadeTo("slow",0.8);	
	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();
	//Set the popup window to center regardless of the scroll
	$('#dialog_pa').css("top", (($(window).height() - $('#dialog_pa').outerHeight()) / 2) + $(window).scrollTop() + "px");
  $('#dialog_pa').css("left", (($(window).width() - $('#dialog_pa').outerWidth()) / 2) + $(window).scrollLeft() + "px");
	//transition effect
	$('#dialog_pa').fadeIn(2000); 	
	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('.mask').hide();
		$('.window').hide();
	});
	//if mask is clicked
	$('.mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});
}
function saveRecordingData() {
  id = $('#edit-app-id').val();
  recording = $('#edit-recording-id').val();
  applications[id].data.recording_id = recording;
  // set tooltip
  tooltip = applications[id].display_name;
  tooltip += "\nRecording: ";
  tooltip += $("#edit-recording-id option:selected").html();
  applications[id].element.appImage.attr({title:tooltip});
}
////////////////////////////////////////////////////////////////////
// TTS Functions
///////////////////////////////////////////////////////////////////
function ttsProperties(){
  //Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();	
	//Set heigth and width to mask to fill up the whole screen
	$('#mask_tts').css({'width':maskWidth,'height':maskHeight});
	//transition effect		
	$('#mask_tts').fadeIn(1000);	
	$('#mask_tts').fadeTo("slow",0.8);	
	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();
	//Set the popup window to center regardless of the scroll
	$('#dialog_tts').css("top", (($(window).height() - $('#dialog_tts').outerHeight()) / 2) + $(window).scrollTop() + "px");
  $('#dialog_tts').css("left", (($(window).width() - $('#dialog_tts').outerWidth()) / 2) + $(window).scrollLeft() + "px");
	//transition effect
	$('#dialog_tts').fadeIn(2000); 	
	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('.mask').hide();
		$('.window').hide();
	});
	//if mask is clicked
	$('.mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});
}
function saveTTSData() {
  id = $('#edit-app-id').val();
  tts = $('#edit-tts').val();
  applications[id].data.tts = tts;
  // set tooltip
  tooltip = applications[id].display_name;
  if($("#edit-tts").val()!="") {
    tooltip += "\nText: ";
    tooltip += $("#edit-tts").val();
  }
  applications[id].element.appImage.attr({title:tooltip});
}
////////////////////////////////////////////////////////////////////
// Transfer Functions
///////////////////////////////////////////////////////////////////
function transferProperties(){
  //Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	//Set heigth and width to mask to fill up the whole screen
	$('#mask_transfer').css({'width':maskWidth,'height':maskHeight});
	//transition effect		
	$('#mask_transfer').fadeIn(1000);	
	$('#mask_transfer').fadeTo("slow",0.8);	
	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();
	//Set the popup window to center regardless of the scroll
	$('#dialog_transfer').css("top", (($(window).height() - $('#dialog_transfer').outerHeight()) / 2) + $(window).scrollTop() + "px");
  $('#dialog_transfer').css("left", (($(window).width() - $('#dialog_transfer').outerWidth()) / 2) + $(window).scrollLeft() + "px");
	//transition effect
	$('#dialog_transfer').fadeIn(2000); 
	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('.mask').hide();
		$('.window').hide();
	});
	//if mask is clicked
	$('.mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});	
}
function saveTransferData() {
  id = $('#edit-app-id').val();
  extension = $('#edit-extension-id').val();
  applications[id].data.extension_id = extension;
  // set tooltip
  tooltip = applications[id].display_name;
  tooltip += "\nExtension: ";
  tooltip += $("#edit-extension-id option:selected").html();
  applications[id].element.appImage.attr({title:tooltip});
}

////////////////////////////////////////////////////////////////////
// Getdigit Functions
///////////////////////////////////////////////////////////////////
function getdigitProperties(){
  //Get the screen height and width
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	//Set heigth and width to mask to fill up the whole screen
	$('#mask_getdigit').css({'width':maskWidth,'height':maskHeight});
	//transition effect		
	$('#mask_getdigit').fadeIn(1000);	
	$('#mask_getdigit').fadeTo("slow",0.8);	
	//Get the window height and width
	var winH = $(window).height();
	var winW = $(window).width();
	//Set the popup window to center regardless of the scroll
	$('#dialog_getdigit').css("top", (($(window).height() - $('#dialog_getdigit').outerHeight()) / 2) + $(window).scrollTop() + "px");
  $('#dialog_getdigit').css("left", (($(window).width() - $('#dialog_getdigit').outerWidth()) / 2) + $(window).scrollLeft() + "px");
	//transition effect
	$('#dialog_getdigit').fadeIn(2000); 
	//if close button is clicked
	$('.window .close').click(function (e) {
		//Cancel the link behavior
		e.preventDefault();
		$('.mask').hide();
		$('.window').hide();
	});
	//if mask is clicked
	$('.mask').click(function () {
		$(this).hide();
		$('.window').hide();
	});	
}
function saveGetdigitData() {
  id = $('#edit-app-id').val();
  getdigit_recording = $('#edit-getdigit-recording-id').val();
  applications[id].data.getdigit_recording_id = getdigit_recording;
  // set tooltip
  tooltip = applications[id].display_name;
  tooltip += "\nRecording: ";
  tooltip += $("#edit-getdigit-recording-id option:selected").html();
  applications[id].element.appImage.attr({title:tooltip});
}



