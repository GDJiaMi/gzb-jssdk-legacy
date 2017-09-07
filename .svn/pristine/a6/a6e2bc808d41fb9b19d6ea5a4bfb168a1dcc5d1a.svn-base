! function () {

    var d = document;
    var apiMenu = d.getElementById('apiMenu');
    var beforeA = apiMenu.getElementsByTagName('A')[0];
    var beforeB = d.getElementById(beforeA.rel);

    apiMenu.onclick = function (e) {
        var et = e.target;
		window.location.href = window.location.origin+window.location.pathname+'#'+et.rel;
        if (et.tagName == 'A' && beforeA != et) {
            var id = d.getElementById(et.rel);
            if (!id) return false;
            et.className = "selected";
            id.className = "item cur";
            if (!id.area) {
                id.area = 1;
                var area = id.getElementsByTagName('textarea')[0];
                CodeMirror.fromTextArea(area, {
                    lineNumbers: true,
                    styleActiveLine: false,
                    matchBrackets: true
                });
            }
            beforeA.className = "";
            beforeB.className = "item";
            beforeA = et;
            beforeB = id;
			$(document).scrollTop(0);
        }
    }



    var idone = d.getElementById('makeCallToNumber');
    var areaone = idone.getElementsByTagName('textarea')[0];
    idone.area = 1;
    CodeMirror.fromTextArea(areaone, {
        lineNumbers: true,
        styleActiveLine: false,
        matchBrackets: true
    });


	var TmpLoaction= window.location;
	if(TmpLoaction.hash){
		var tmpHash = TmpLoaction.hash.replace('#', '');
		$('a[rel="'+tmpHash+'"]').click();
		/* var et = d.getElementsByClassName(tmpHash);
		if(et.length){
			et = et[0];
			if(et.getAttribute('rel')==tmpHash){
				if (et.tagName == 'A' && beforeA != et) {
					var id = d.getElementById(et.rel);
					if (!id) return false;
					et.className = "selected";
					id.className = "item cur";
					if (!id.area) {
						id.area = 1;
						var area = id.getElementsByTagName('textarea')[0];
						CodeMirror.fromTextArea(area, {
							lineNumbers: true,
							styleActiveLine: false,
							matchBrackets: true
						});
					}
					beforeA.className = "";
					beforeB.className = "item";
					beforeA = et;
					beforeB = id;
				}
			}
		} */
		// et[0].click();
	}
}();


var api = customApi.init();
api.call(function (bridge) {
	bridge.init();
});

function openMail(mail) {
	api.mail(mail);
}

function showMenu() {
	api.call(function (bridge) {
		bridge.callHandler('showMenu', {}, function (response) {
			console.log("showMenu", response);
		});
		bridge.callHandler('pgGoBack', {}, function (res) {
			if(confirm("返回回调成功，确定关闭？")){
				api.exitApp();
			}
		});
	});
}

function openUrl(url) {
	var param = {url:url,showMode:$('#openurlSel').val()};
	console.log(param);
	api.url(param);
}

function makeCallToNumber(number) {
	api.phone(number);
}

function sendSmsToNumber(number, body) {
	api.sms(number);
}

function openCamera() {
   /*  WebViewJavascriptBridge.callHandler('openCamera', {
        'foo': 'bar'
    }, function (response) {

        log('JS got response', response)
    }); */
}

function openAlbum() {
    /* WebViewJavascriptBridge.callHandler('openAlbum', {
        'foo': 'bar'
    }, function (response) {

        log('JS got response', response)
    }); */
}

function openVideo() {
   /*  WebViewJavascriptBridge.callHandler('openVideo', {
        'foo': 'bar'
    }, function (response) {

        log('JS got response', response)
    }); */
}

function exitWebApp() {
    if(confirm('确定退出应用')){
         api.exitApp();
    }
}

function shareTo() {
	api.shareTo();
}

function showBar(flag) {
	api.showBar(flag);
}

function setBarColor(color) {
	api.setBarColor(color);
}

function setWebTitle(title) {
	api.setTitle(title);
}

function showDate(format) {
   /*  WebViewJavascriptBridge.callHandler('openDate', {
        'format': format,
        'type': 'dateTime',
        'default': '2015-10-01'
    }, function (response) {

        alert('你选择的日期是:' + response)
    }); */
}

function setGps() {

   /*  WebViewJavascriptBridge.callHandler('setGps', {}, function (response) {


    }); */
}

function getLocation() {
   api.getLoc(function(res){
        alert(res);
   });
}


function mainbarRe(pos) {
    //由客户端提供方法
    alert('显示 返回');
    //左边显示，或者右边，中间,
    window.client.retrunBtn(pos);
}

function mainbar(pos) {
    //由客户端提供方法
    alert('显示 关闭');
    //左边显示，或者右边，中间,
    window.client.closeBtn(pos);
}

function contact() {
	var par = {
        'user': [{ 'id': 'u116115','name': '陈天送'}], // 默认选中
        'type': 'unsingle',                           //多选 single为单选,
        'tenementId': 't140050483060650196',          //公司id
        'limit': 4                                    //限制选择人数
	}
    api.selectContact(par,function(res){
        var re = res;
        for (var i = 0, j = re.length; i < j; i++) {
            alert('用户ID:' + re[i].id + '名称:' + re[i].name + 'pic:' + re[i].avatar);

        }
    })
}


//选完人后返回数据
function contactCallback(data) {

    document.getElementById('contactBox').innerHTML = data;

}

function contactItem(id) {
	api.showContact(id);
}

function QRcord(){
    api.QRcode(true,function(d){
         alert(d.content);
	});
}

function Dialog () {
	var type = $('#opendDialogType').val();
	var id = $('#opendDialogId').val();
	var msgId = $('#opendDialogMsgId').val();
	id = $.trim(id);
	if(''==id){
		alert('请填写会话ID');
		return ;
	}
	api.Dialog({
		type:type,
		id:id,
		messageId:msgId
	});
}

function webApp(){
	api.webApp('10001');
}

function setBar(){
	/* var st = {
			hideMoreBtn:'false',      //隐藏右边按钮,默认为false不隐藏,显示更多按钮,
			left: ['close','goback'],	//左边按钮
			onlyCallBack:[], //左边只走回调的按钮
			gobackUrl:'http://www.baidu.com',//点返回时打开url, 为空即为正常返回
			right:'保存',           //右边按钮 替换文字
            callback:function(res){
                alert(res);
            }
	   }
    api.settingBar(st); */
	
	var st = {

			hideMoreBtn:'false',      //隐藏右边按钮,默认为false不隐藏,显示更多按钮,
			
			left: ['close','goback'],	//左边按钮
			
			onlyCallBack:['close', 'goback'], //左边只走回调的按钮

			gobackUrl:'',//点返回时打开url, 为空即为正常返回
			
			right:'保存',           //右边按钮 替换文字

            callback:function(res){
				if(confirm(res.buttonId+" 确认提示框?!")){
					alert("你点击了确定");
					api.exitApp();
				}else{
					alert("你点击了取消");
					if(JH.Detector.IOS){
						console.log("IOS端重新注册");
						regSetBarClose();
					}
				}
            }
	   }
    api.settingBar(st);
	
}

function getApiList(){
	api.getList(function(d){
        alert(d.apilist);
    });
}


function writerLog(str){
	api.consoleLog('测试文本',function(d){
        alert(d.time);
    });
}



function showVideo() {
    var video = document.getElementById("videoElement");
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
        document.getElementById('cambox').style.display = "block";
        navigator.getUserMedia({
            video: true
        }, handleVideo, videoError);
    }
    function handleVideo(stream) {
        video.src = window.URL.createObjectURL(stream);
    }
    function videoError(e) {
        // do something
    }
}

//选择图片
function chooseImg(){
	$('#showConvertImg').hide();
	var ety = [];
	var tmpCsv = $('#chooseImgSel').val();
	if(tmpCsv){
		ety = tmpCsv.split(',');
	}
	var tmpQuality = $('#chooseImgQuanity').val();
	var tmpTgType = $('#chooseImgTargetType').val();
	var tmpTg = $('#chooseImgTarget').val();
	if(tmpTg){
		tmpTg = parseInt(tmpTg);
	}else{
		tmpTg = 0;
	}
	var tmpMaxSize = $('#chooseImgMaxSize').val();
	if(tmpMaxSize){
		tmpMaxSize = parseInt(tmpMaxSize);
	}else{
		tmpMaxSize = 0;
	}
	var reqParam = {
		quality:tmpQuality
	   ,targetType:tmpTgType
	   ,target:tmpTg
	   ,extType:ety
	   ,maxSizeKb:tmpMaxSize
	};
	 var reqArr = [];
	   for(var rpi in reqParam){
		   if('imgData'!=rpi){
			   if('imgType'==rpi){
				   reqArr.push(rpi+'：'+reqParam[rpi].join('、'));
			   }else{
				   reqArr.push(rpi+'：'+reqParam[rpi]); 
			   }
		   }
	   }
	$('#showConvertImg span#convertImgReq').html(reqArr.join('，'));
	api.chooseImg({
	   quality:tmpQuality
	   ,targetType:tmpTgType
	   ,target:tmpTg
	   ,extType:ety
	   ,maxSizeKb:tmpMaxSize
		},function(re){
		   // console.log(re);
		   /* response:{	
				result:'true 表示成功，false表示失败', 
				quality:'base64Data图片质量', 
				imgData:'图片base64数据', 
				imgType:'图片扩展类型', 
				imgWidth:'base64Data图片宽',
				imgHeight:'base64Data图片高度'
			} */
		   
		   if('true'==re.result){
			   var imgObj = new Image();
			   imgObj.onload = function(){
				   var tmpJsLoadArr = [];
				   tmpJsLoadArr.push('width：'+imgObj.width);
				   tmpJsLoadArr.push('height：'+imgObj.height);
					$('#showConvertImg span#convertImgJsLoad').html(tmpJsLoadArr.join('，'));
			   }
			   imgObj.src = re.imgData;
			   $('#showConvertImg img').attr('src', re.imgData);
			   var infoArr = [];
			   for(var ri in re){
				   if('imgData'!=ri){
					   if('imgType'==ri){
						   infoArr.push(ri+'：'+re[ri]);
					   }else{
						   infoArr.push(ri+'：'+re[ri]); 
					   }
				   }
			   }
				/* infoArr.push('quality:'+re.quality);
				infoArr.push('imgType:'+re.imgType);
				infoArr.push('imgWidth:'+re.imgWidth);
				infoArr.push('imgHeight:'+re.imgHeight); */
				$('#showConvertImg span#convertImgResponse').html(infoArr.join('，'));
				$('#showConvertImg').show();
			   alert('选择缩放图片成功');
		   }else{
			   console.log(re);
			   if(re.errCode && re.errMsg){
				   alert(re.errMsg);
			   }else{
					alert('选择缩放图片失败');  
			   }
		   }
   });
}


//选择会话
function selectSession(){
	var reqParam = {
		multiple:$('#selectSessionMultiple').val()?true:false
		,title:$('#selectSessionTitle').val()
	};
	$('#showSelectSession').hide();
	var reqArr = [];
	for(var rqi in reqParam){
		reqArr.push(rqi+'：'+reqParam[rqi]);
	}
	$('#showSelectSession span#selectSessionReq').html(reqArr.join('，'));
	api.selectSession({
		   multiple:reqParam.multiple
		   ,title:reqParam.title
		},function(re){
		   $('#showSelectSession span#selectSessionResponse').html(JSON.stringify(re));
		   $('#showSelectSession').show();
		   if('true'==re.result){
			   alert('选择会话成功');
		   }else{
			   if(re.errCode && re.errMsg){
				   alert(re.errMsg);
			   }else{
					alert('选择会话失败');  
			   }
		   }
	   });
}

//获取语言
function getLanguage(){
	$('#showGetLanguage').hide();
	api.getLanguage({
		callback:function(re){
			   console.log(re);
			   $('#showGetLanguage span#getLanguageResponse').html(JSON.stringify(re));
			   $('#showGetLanguage').show();
			   if('true'==re.result){
				   alert('获取语言成功');
			   }else{
				   if(re.errCode && re.errMsg){
					   alert(re.errMsg);
				   }else{
						alert('获取语言失败');  
				   }
			   }
	   }
	});
}
