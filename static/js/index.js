var api = customApi.init();
       api.call(function (bridge) {
            bridge.init();
        });

/*
* 电话接口
* 参数：电话号码
*/


document.getElementById('makeCallToNumberBtn').onclick = function(){

     api.phone('15989874678');

}

/*
* 信息接口
* 参数：电话号码
*/


document.getElementById('sendSmsToNumberBtn').onclick = function(){

    api.sms('15989874678');

}




/*
* 名片接口
* 参数：id
*/


document.getElementById('openContactItemBtn').onclick = function(){

    api.showContact('u116115');


}

document.getElementById('pcWinodwCloseBtn').onclick = function(){
	api.call(function (bridge) {
		bridge.callHandler('windowClose', {}, function (response) {
			console.log("windowClose", response);
			if(confirm("关闭回调成功，确定关闭？")){
				api.exitApp();
			}
		});
	});
}

document.getElementById('pgGoBackBtn').onclick = function(){
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




/*
*  选择联系人接口
*
*  user:[{'id':'userId1','name':'用户名1'},{'id':'userId2','name':'用户名2'}],
*
* 'tenementId': '公司ID',
*
* 'limit':选人限制,
*
* type:'single'单选,其它为多选

* 回调:
*
* [{'id':'userId1','name':'用户名1','avatar':'头像'},{'id':'userId2','name':'用户名2','avatar':'头像'}]
*/


document.getElementById('openContactBtn').onclick = function(){



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

/*
*  日期选择接口
*
* 参数:

* {'format':'yyyy-MM-dd hh:mm','type':'dateTime/date/time'}

* 返回:
* 按format返回格式
*/


document.getElementById('openDateBtn').onclick = function(){

    // 日期格式，默认日期，回调
    api.date('yyyy-MM-dd','',function(res){

        alert('你选择的日期是:' + res)

    })


}

/*
*  取地理位置
*
* 参数:无

* 返回: {'longitude':'经度','latitude':'纬度','address':'中文地址'}
*/


document.getElementById('getLocationBtn').onclick = function(){

    api.getLoc(function(res){

        alert(res);

    })

}



/*
*  退出web应用
*
* 参数:无

* 返回: 无
*/


/* document.getElementById('shareToAppBtn').onclick = function(){

	  api.shareTo();


} */

/*
*  退出web应用
*
* 参数:无

* 返回: 无
*/


document.getElementById('exitWebAppBtn').onclick = function(){


    if(confirm('确定退出应用')){

         api.exitApp();

    }


}


/*
*  打开URL
*
* 参数:URL

* 返回: 无
*/


document.getElementById('openUrlBtn').onclick = function(){

    api.url('http://www.mygzb.com');

}


/*
*  打开Email
*
* 参数:e-mail

* 返回: 无
*/


document.getElementById('openMailBtn').onclick = function(){

    api.mail('ts-chen@mygzb.com');

}


/*
*  设置标题
*
* 参数:标题

* 返回: 无
*/


document.getElementById('setWebTitleBtn').onclick = function(){

    api.setTitle('new title');

}

/*
*  设置标题颜色
*
* 参数:颜色

* 返回: 无
*/


document.getElementById('setBarColorBtn').onclick = function(){

    api.setBarColor('#f5f5f5');

}

/*
*  显示/隐藏bar
*
* 参数:false/true

* 返回: 无
*/

 var a = true;

document.getElementById('showBarBtn').onclick = function(){

    a = a ? false : true;

    api.showBar(a);

}



/*
*  设置bar
*
* 参数:
{

    hidden:'false',          //默认为false不隐藏,

    centerText:'标题',        //中间文字部分

    color:'#000000',         //颜色

    left:['close','goback'], //左边按钮,关闭 or 返回

    gobackUrl:'',            //点返回时打开url,为空即为正常返回,

    right:'保存',           //右边按钮文字


    callback:function(){   //回调

        alert('保存')

    }

}

* 返回: {buttonName：'保存'，result：'true'}
*/



document.getElementById('setBarBtn').onclick = function(){



    var st = {

			hideMoreBtn:'false',      //隐藏右边按钮,默认为false不隐藏,显示更多按钮,

			left: ['close','goback'],	//左边按钮
			
			onlyCallBack:[], //左边只走回调的按钮

			gobackUrl:'http://www.baidu.com',//点返回时打开url, 为空即为正常返回

			right:'保存',           //右边按钮 替换文字

            callback:function(res){
                alert(res);
            }
	   }
    api.settingBar(st);

}

var regSetBarClose = function(){
	console.log("setBarCloseBtn init");
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

document.getElementById('setBarCloseBtn').onclick = function(){
    regSetBarClose();
}






 /*
*  页面支持下拉刷新
*
* 参数:无

* 返回: 无
*/



document.getElementById('pullDownRefreshBtn').onclick = function(){


   api.pullDownRefresh({

   open:'true'  //页面支持下拉刷新，默认为false

   },function(d){

        alert(d.time);

    });

}


/*
*  取可用接口名称
*
* 参数:无

* 返回: 无
*/



document.getElementById('apiListBtn').onclick = function(){


    api.getList(function(d){

        alert(d.apilist);

    });

}


/*
*  写入日志
*
* 参数:{
    '字符串',
    fn(res){

     //回调结果
        {
        'result'：'true',              //日志写入成功
        'time': '2015-12-20 20:10:30'  //日志写入时间
        }

    }
}

* 返回: 无
*/



document.getElementById('webLogBtn').onclick = function(){


    api.consoleLog('测试文本',function(d){

        alert(d.time);

    });

}

/*
* 扫一扫
* QR(parm,fn) parm //默认为true,即将二维码内容直接返回，false则表示扫描结果由工作宝直接处理,
 */
 document.getElementById('scanQRcodeBtn').onclick = function(){

	// alert(JH.Detector.getAgent())
     api.QRcode(true,function(d){


         alert(d.content);

		 // api.url(d.content);

     });

 }

 /*
 *  会话框
 * Dialog(type,id)  //type:1为群，2为用户,
  */
  document.getElementById('openDialogBtn').onclick = function(){

      api.Dialog(2,'u116115');

  }
  /*
  * 打开应用
  * webApp(id)
   */
   document.getElementById('openWebAppBtn').onclick = function(){

       api.webApp('10001');

   }
   
	/*
	* 图片选择
	* chooseImg
	*/
	document.getElementById('chooseImgBtn').onclick = function(){
		api.chooseImg({
		   quality:80
		   ,targetType:'default'
		   ,target:400
		   ,extType:[]
		   ,maxSizeKb:0
		   ,callback:function(re){
			   console.log(re);
			   if('true'==re.result){
				   alert('选择缩放图片成功');
			   }else{
				   if(re.errCode && re.errMsg){
					   alert(re.errMsg);
				   }else{
						alert('选择缩放图片失败');  
				   }
			   }
		   }
		});
	}

	/*
	* 图片选择
	* chooseImg
	*/
	document.getElementById('selectSessionBtn').onclick = function(){
		api.chooseImg({
		   multiple:false
		   ,title:''
		   ,callback:function(re){
			   console.log(re);
			   if('true'==re.result){
				   alert('选择会话成功');
			   }else{
				   if(re.errCode && re.errMsg){
					   alert(re.errMsg);
				   }else{
						alert('选择会话失败');  
				   }
			   }
		   }
		});
	}
	
	/*
	* 获取语言
	* getLanguage
	*/
	document.getElementById('getLanguageBtn').onclick = function(){
		api.getLanguage({
		   callback:function(re){
			   if('true'==re.result){
				   alert('当前语言为：'+re.language);
			   }else{
				   if(re.errCode && re.errMsg){
					   alert(re.errMsg);
				   }else{
						alert('选择会话失败');  
				   }
			   }
		   }
		});
	}
	
	