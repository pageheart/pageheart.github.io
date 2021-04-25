let toastInfo = {
    toast_ad_width:0, //광고폭사이즈 (픽셀단위)
    toast_sliding_time:20, //슬라이딩 속도
    toast_open_time:2000, //배너 시작 시간
    toast_close_time:5000, //배너 종료 시간
    toast_sel:1,
    toast_fload:true,
    toast_obj:document.getElementById('banner'),
    saybox_openTimer:undefined
}

let poplocheight = 0;

function saybox_messageClose() {
    toastInfo.toast_obj.style.display = "none";
}

function saybox_init_layout() {
    toastInfo.toast_obj.style.display = '';
    poplocheight = toastInfo.toast_obj.offsetHeight;
    //setInterval("saybox_nowStatic()",toastInfo.toast_sliding_time);
    saybox_nowStatic();
    toastInfo.saybox_openTimer = setTimeout("saybox_messageClose()",toastInfo.toast_close_time); 
}

function saybox_nowStatic() {
    saybox_moveMessage()
    //기본값 210
    toastInfo.toast_obj.style.left = toastInfo.toast_ad_width;
    if(toastInfo.toast_fload == false) {
        toastInfo.toast_obj.style.top = document.body.scrollTop + document.body.clientHeight - poplocheight;
    }
}

function saybox_moveMessage() {
    if(toastInfo.toast_sel <= poplocheight) {
        toastInfo.toast_obj.style.top = document.body.scrollTop + document.body.clientHeight - toastInfo.toast_sel;
        toastInfo.toast_sel += 1;
        toastInfo.saybox_openTimer = setTimeout("saybox_moveMessage()",toastInfo.toast_sliding_time);
    } else {
        clearTimeout(toastInfo.saybox_openTimer);
        saybox_loadChk();
    }
}
 
function saybox_loadChk() {
    if(toastInfo.toast_fload == true) toastInfo.toast_fload = false;
}

toastInfo.saybox_openTimer = setTimeout("saybox_init_layout()",toastInfo.toast_open_time);
