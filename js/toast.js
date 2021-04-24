var toast_ad_width = 230; //광고폭사이즈 (픽셀단위)
var toast_sliding_time = 20; //슬라이딩 속도
var toast_open_time = 2000; //배너 시작 시간
var toast_close_time = 15000; //배너 종료 시간
var toast_sel = 1
var toast_fload = true;
var toast_obj = document.getElementById('banner');

function saybox_messageClose() {
 toast_obj.style.visibility = "hidden";
}

function saybox_init_layout() {
 document.getElementById('toast_ad').style.display = '';
 if(document.all) {
  poplocwidth = toast_obj.offsetWidth;
  poplocheight = toast_obj.offsetHeight;
  setInterval("saybox_nowStatic()",toast_sliding_time);
 }
 var saybox_openTimer = setTimeout("saybox_messageClose()",toast_close_time); 
}

function saybox_nowStatic() {
 saybox_moveMessage()
 //기본값 210
 toast_obj.style.pixelLeft = document.body.clientWidth - 50 - toast_ad_width;
 if(toast_fload == false) {
  toast_obj.style.pixelTop = document.body.scrollTop + document.body.clientHeight - poplocheight
 }
}

function saybox_moveMessage() {
 if(toast_sel <= poplocheight) {
  toast_obj.style.pixelTop = document.body.scrollTop + document.body.clientHeight - toast_sel;
  toast_sel += 1;
  var saybox_openTimer = setTimeout("saybox_moveMessage()",toast_sliding_time);
 } else {
  clearTimeout(saybox_openTimer);
  saybox_loadChk();
 }
}
 
function saybox_loadChk() {
 if(toast_fload == false) return;
 toast_fload = false;
}

saybox_openTimer = setTimeout("saybox_init_layout()",toast_open_time);
