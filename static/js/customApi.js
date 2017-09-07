//检测
var JH = {};
	JH.Detector  = {
		getAgent: function() {

			 return navigator.userAgent.toLowerCase();

		},

        isWebKit: function(b) {

			if (this._isWebKit === undefined) {

                var a = b || this.getAgent();

                this._isWebKit = !!a.match(/applewebkit/i);

                this.isWebKit = function() {

                    return this._isWebKit;

                }

			}

			return this._isWebKit;

		},

        Android:function(b) {
             var a = b || this.getAgent();
             return a.match(/android/i);
        },

        BlackBerry: function(b) {

            var a = b || this.getAgent();
            return a.match(/alackaerry/i);

        },

        IOS: function(b) {
            var a = b || this.getAgent();
            return  a.match(/iphone|ipad|ipod/i);
        },

        Opera: function(b) {
             var a = b || this.getAgent();
            return a.match(/opera mini/i);
        },

        Windows: function(b) {
             var a = b || this.getAgent();
            return a.match(/iemobile/i) || a.match(/wpdesktop/i);
        },

        any: function() {

            return (this.Android() || this.BlackBerry() ||  this.IOS() || this.Opera() || this.Windows());

        },

        isiPhone: function(b) {

				var a = b || this.getAgent();

				return !! (this.isWebKit(a) && a.match(/iphone/i));

				},

		isiPad: function(b) {

				var a = b || this.getAgent();

				return !! (this.isWebKit(a) && a.match(/ipad/i));

				},
        isiPod: function(b) {

				var a = b || this.getAgent();

				return !! (this.isWebKit(a) && a.match(/ipod/i));

				},

		_isMobile: function(b) {


				var a = b || this.getAgent();

				return this.isWebKit(a) && ((a.match(/mobile/i) || a.match(/android/i)) && !this.isiPod(a));

		},
        isMobile: function() {


			if (this._isMobileCatch === undefined) {

                this._isMobileCatch = !!(this._isMobile() && this.any());
                this.isMobile = function() {
                    return this._isMobileCatch;

                }

			}
			return this._isMobileCatch;

		}

	}


//PC 接口用
if(!JH.Detector.isMobile()){
var bridge={};

(function(d) {
	var e = d.c_ || {};
	d.publish = function(a, b) {
		for (var c = e[a], f = c ? c.length: 0; f--;) c[f].apply(d, b || []);
	};
	d.subscribe = function(a, b) {
		e[a] || (e[a] = []);
		e[a].push(b);
		return [a, b];
	};
	d.unsubscribe = function(a) {
		for (var b = e[a[0]], a = a[1], c = b ? b.length: 0; c--;) b[c] === a && b.splice(c, 1);
	};

	//callback list
	var responseCallbacks = {};
	var uniqueId = 1;
	d.addCallbackList = function(responseCallback, isSetCbId){
		var callbackId = isSetCbId;
		if(null==callbackId){
			callbackId = 'cb_'+(uniqueId++)+'_'+new Date().getTime();
		}
		responseCallbacks[callbackId] = responseCallback;
		return callbackId;
	}
	d.exeCallbackList = function(data, callbackId){
		if(callbackId)
		{
			var responseCallback = responseCallbacks[callbackId];
			if (!responseCallback) { return; }
			responseCallback(data);
			if(0===callbackId.indexOf('cb_')){
				delete responseCallbacks[callbackId];
			}
		}
	}
	d.sinit = function(register){
		d.subscribe("MESSAGE2S",function(message,responseCallback){
			register(message,responseCallback);
		})
	}
	d.ssend = function(message,responseCallback){
		d.publish("MESSAGE2C",[message,responseCallback]);
	}

	d.scallHandler=function(handlerName, data, responseCallback) {
		d.publish("[c]"+handlerName,[data, responseCallback]);
	}
	d.sregisterHandler=function(handlerName, handler) {
		d.subscribe("[s]"+handlerName,handler);
	}


})(bridge);

function exeCallback(callbackData, callbackId)
{
	// console.log(callbackData);
	//var jsonObj = eval('(' + callbackData + ')');
	bridge.exeCallbackList(callbackData, callbackId);
}

var CBridge;

document.addEventListener('WebViewJavascriptBridgeReady', function onBridgeReady(event) {


		CBridge = event.bridge;
		CBridge.init(function(message, responseCallback) {
			if (responseCallback) {
				responseCallback("This is from client.");
			}
		})

		CBridge.registerHandler("ClientFunctionTest", function(data, responseCallback){
			alert(data);
			responseCallback("ClientFunction:This is from client.");
		})



	}, false);


//user server
bridge.sinit(function(data,responseCallback){
	if(responseCallback){
    	responseCallback("This is from server.");
	}
});

if(typeof(window.HandleEvent)=='undefined'){
    window.HandleEvent =  function(name,data){
    console.log('非正常调用接口：'+ name + '("'+ data +'")');
    }
}

bridge.sregisterHandler("openContactItem", function(data, responseCallback){

	window.HandleEvent('OnOpenContactItem', data.id);
});

bridge.sregisterHandler("makeCallToNumber", function(data, responseCallback){

	window.HandleEvent('OnMakeCallToNumber', data.callNumber);
});

bridge.sregisterHandler("showMenu", function(data, responseCallback){
	window.HandleEvent('OnShowMenu','');
});

bridge.sregisterHandler("openMail", function(data, responseCallback){

	window.HandleEvent('OnOpenMail', data.email);
});

bridge.sregisterHandler("openUrl", function(data, responseCallback){
	window.HandleEvent('OnOpenUrl', data.url, data?JSON.stringify(data):'');
});

bridge.sregisterHandler("setWebTitle", function(data, responseCallback){
	window.HandleEvent('OnSetWebTitle', data.title);
});


bridge.sregisterHandler("openContact", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback);
	var jsonStr = JSON.stringify(data);
	window.HandleEvent('OnOpenContact', jsonStr, callbackId);
});

bridge.sregisterHandler("apiList", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback);
	window.HandleEvent('OnGetApiList', callbackId);
});

bridge.sregisterHandler("webLog", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback);
	window.HandleEvent('OnWebLog',data.text, callbackId);
});


bridge.sregisterHandler("openDialog", function(data, responseCallback){
	var jsonStr = JSON.stringify(data);
	window.HandleEvent('OnOpenDialog',jsonStr);
});


bridge.sregisterHandler("openWebApp", function(data, responseCallback){
	window.HandleEvent('OnOpenWebApp',data.id);
});

bridge.sregisterHandler("windowClose", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback, 'windowClose');
	window.HandleEvent('OnWindowClose','',callbackId);
});

bridge.sregisterHandler("pgGoBack", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback, 'pgGoBack');
	window.HandleEvent('OnPgGoBack','',callbackId);
});

bridge.sregisterHandler("chooseImg", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback);
	window.HandleEvent('OnChooseImg',data?JSON.stringify(data):'',callbackId);
});

bridge.sregisterHandler("selectSession", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback);
	window.HandleEvent('OnSelectSession',data?JSON.stringify(data):'',callbackId);
});

bridge.sregisterHandler("getLanguage", function(data, responseCallback){
	var callbackId = bridge.addCallbackList(responseCallback);
	window.HandleEvent('OnGetLanguage',data?JSON.stringify(data):'',callbackId);
});


//client
(function(bridge){
	function assert(condition, message) {
    	if (!condition) {
        	throw message || "Assertion failed";
    	}
	}

	bridge.init=function(register){
		//assert(register instanceof Function,"init() should has a function as parameter");
		bridge.subscribe("MESSAGE2C",function(message,responseCallback){
			register(message,responseCallback);
		})
	}
	bridge.send=function(message,responseCallback){
		bridge.publish("MESSAGE2S",[message,responseCallback]);
	}
	bridge.callHandler=function(handlerName, data, responseCallback) {
		bridge.publish("[s]"+handlerName,[data, responseCallback]);
	}
	bridge.registerHandler=function(handlerName, handler) {
		bridge.subscribe("[c]"+handlerName,handler);
	}
	//dispatch event
	var event=new CustomEvent('WebViewJavascriptBridgeReady');
	event.bridge=bridge;
	document.dispatchEvent(event);

})(bridge);


}

//客户端接口
var customApi = {

	init: function () {

		var c = {};

		c.call = function (callback) {


			if( JH.Detector.isMobile() || JH.Detector.isiPod() || JH.Detector.isiPad() ){
				//https://github.com/marcuswestin/WebViewJavascriptBridge#usage 6.0 Javascript 有改动

					if (window.WebViewJavascriptBridge) {

						//兼容新版本 WebViewJavascriptBridge ，增加回 init 方法
						if(typeof(WebViewJavascriptBridge.init)==='undefined'){

							WebViewJavascriptBridge.init=function(){}
						}
						callback(WebViewJavascriptBridge);

					} else if(window.WVJBCallbacks){

						window.WVJBCallbacks.push(callback);

					}else{

						window.WVJBCallbacks = [callback];
						var WVJBIframe = document.createElement('iframe');
						WVJBIframe.style.display = 'none';
						WVJBIframe.src = 'https://__bridge_loaded__';
						document.documentElement.appendChild(WVJBIframe);
						setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);

						document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
							callback(WebViewJavascriptBridge);
						}, false)

					}

			}else{

				callback(CBridge);

			}


		}

        c.dataEvel = function(response){

            var re = response;

            if(typeof(re)=='string'){

                switch(re.substr(0,1)){

                    case '{':
                        re = eval("("+re+")");
                    break;
                    case '[':
                        re = eval(re)[0];
                    break;

                    default:

                    break;

                }

            }

            return re;

        }

		c.setTitle = function (title) {

			c.call(function (bridge) {
				bridge.callHandler('setWebTitle', {
					'title': title
				}, function (response) {
					console.log(response)
				});
			});

		}

		c.phone = function (number) {

			c.call(function (bridge) {

				bridge.callHandler('makeCallToNumber', {
					'callNumber': number
				}, function (response) {

					console.log(response)
				});
			});

		}

        c.sms = function (number) {

			c.call(function (bridge) {

				bridge.callHandler('sendSmsToNumber', {
					'callNumber': number
				}, function (response) {

					console.log(response)
				});
			});

		}

        c.mail = function (email) {

			c.call(function (bridge) {

				bridge.callHandler('openMail', {
					'email': email
				}, function (response) {

					console.log(response)
				});
			});

		}

        c.url = function (parm) {
			if("string"==typeof(parm)){
				parm = {url:parm,showMode:'outer'};
			}
			var p = {};
			p.url = parm.url||'';
			p.showMode = parm.showMode||'outer';  //inner内部浏览器, outer系统浏览器(默认值)
			
			c.call(function (bridge) {
				bridge.callHandler('openUrl', p, function (response) {
					console.log(response)
				});
			});

		}

		c.showContact = function (id) {
			//u116115
			c.call(function (bridge) {

				bridge.callHandler('openContactItem', {
					'id': id
				}, function (response) {

					console.log(response);
				});
			});

		}

		c.setBarColor = function (color) {

			c.call(function (bridge) {

				bridge.callHandler('setBarColor', {
					'color': color
				}, function (response) {

					console.log(response)
				});
			});

		}

		c.exitApp = function () {

			c.call(function (bridge) {
				if(JH.Detector.isMobile() || JH.Detector.isiPod() || JH.Detector.isiPad()){
					bridge.callHandler('exitWebApp', {
						'foo': 'bar'
					}, function (response) {
						console.log(response)
					});
				}else{
					window.HandleEvent("exitWebApp");
				}
			});

		}

		c.showBar = function (flag) {

			c.call(function (bridge) {

				bridge.callHandler('showBar', {
					'flag': flag
				}, function (response) {

					console.log(response)
				});
			});

		}

		c.date = function (format,de,fn) {

			var t = 'date';

            if(format.indexOf('h')!=-1 ){

                t = 'time';

                if(format.indexOf('y')!=-1){
                    t = 'dateTime';
                }

            }

			c.call(function (bridge) {

				bridge.callHandler('openDate', {
					'format': format || 'yyyy-MM-dd',
                    'default': de || '',
					'type':t
				}, function (response) {
                    fn(response);
					//console.log(response)
				});
			});

		}

        c.getLoc = function(fn){

            c.call(function (bridge) {

                    bridge.callHandler('getLocation',{},

                        function (response) {

                          fn(response);

                        });

                });

		}

        c.settingBar = function(parm, callback){



            var p = {};

                p.hideMoreBtn     = parm.hideMoreBtn || 'false';

                p.left       = parm.left || ['close','goback'];
				
				p.onlyCallBack = parm.onlyCallBack || [];

                p.gobackUrl  = parm.gobackUrl || '';

                p.right      = parm.right || '';

				if("undefined"==typeof(callback)){
					callback = function(){};
					if(parm.callback && "function"==typeof(parm.callback)){
						callback = parm.callback;
					}
				}
				// p.callback = parm.callback || function(){};
				
				// if(p.right!=''){
					// p.callback = parm.callback || function(){};
				// }

            c.call(function (bridge) {

                    bridge.callHandler('setBar',p,

                        function (response) {
							console.log(response);

                            //返回数据
                            //{buttonName：'保存'，result：'true'}

                          var re = c.dataEvel(response);

                            // if(re.buttonName==p.right && re.result=='true'){

                                // p.callback();

                            // }
							
							 if(re.result=='true'){

                                cbfun(re);

								}

                        });

                });

		}

        c.getList = function (fn) {

			c.call(function (bridge) {

				bridge.callHandler('apiList', {}, function (response) {



                    /*

                    {

                    'plat':'IOS',        //平台:IOS/PC/Android,
                    'version': 'v1.0.0', //工作宝版本号
                    'apilist':['openContact','openUrl','openMail']  //返回当前可用接口名称

                    }

                    */

                    var re = c.dataEvel(response);
                    fn(re);



				});
			});

		}

        c.consoleLog = function (str,fn) {

           var strn = str || '';
               fn = fn || function(){};

			c.call(function (bridge) {

				bridge.callHandler('webLog', {'text':str}, function (response) {

                    /* 返回数据

                        {
                        'result'：'true',              //日志写入状态
                        'time': '2015-12-20 20:10:30'  //日志写入时间
                        }

                    */
                    var re = c.dataEvel(response);
                    fn(re);
				});
			});

		}

		c.QRcode = function (needResult,fn) {


		   var needPasm = needResult;
		   var nfn = fn;

		   if(typeof(needResult) === 'function'){
			   nfn = needResult;
			   needPasm = true;
		   }
			c.call(function (bridge) {

				bridge.callHandler('scanQRCode', {'needResult':needPasm }, function (response) {
                    var re = c.dataEvel(response);
                    nfn(re);
				});
			});

		}

		c.picView = function (pics) {

			c.call(function (bridge) {

				bridge.callHandler('picView', {

					'pics': pics

				}, function (response) {
					console.log(response)
				});
			});

		}

		c.shareTo = function () {

			c.call(function (bridge) {

				bridge.callHandler('shareTo', {}, function (response) {

					console.log(response)
				});
			});

		}

		c.Dialog = function(params,id){
			var parm = {};
			if("object"==typeof(params)){
				parm.type = params.type;
				parm.id = params.id;
				parm.messageId = params.messageId||'';
			}else{
				parm = {
					type: params,
					id: id
				};
			}
			c.call(function (bridge) {
				bridge.callHandler('openDialog', parm, function (response) {

				});
			});
		}

		c.webApp = function (id) {
			var parm = {
				id: id
			};

			c.call(function (bridge) {
				bridge.callHandler('openWebApp', parm, function (response) {

				});
			});
		}

        c.selectContact = function(pars,fn){

            var pam  = {};
                pam.user = pars.user || [];
                pam.type = pars.type || 'unsingle';
                pam.tenementId = pars.tenementId || '';
				pam.unselect = pars.unselect || true;
                pam.limit = pars.limit || 10;


            c.call(function (bridge) {

                    bridge.callHandler('openContact',pam,
                        function (response) {
                          var re = eval(response);
                            fn(re);

                        });

                });

        }
		
		//选择图片（压缩，旋转）
		c.chooseImg = function(parm,callback){
			var p = {};
			p.quality = parm.quality||100; //质量 1表示100% 0.8表示 80% 默认1
			p.targetType = parm.targetType||'default';
			p.target = parm.target||'';
			p.extType = parm.extType||[];//图片扩展类型,值可为[bmp,gif,jpg,png] 为空时表示任何图片类型
			p.maxSizeKb = parm.maxSizeKb||0;
			if("undefined"==typeof(callback)){
				callback = function(){};
				if(parm.callback && "function"==typeof(parm.callback)){
					callback = parm.callback;
				}
			}
			c.call(function (bridge) {
				bridge.callHandler(
					'chooseImg'
					,p
					,function(response){
						//返回数据
						/* response:{	
							result:'true 表示成功，false表示失败', 
							quality:'base64Data图片质量', 
							imgData:'图片base64数据', 
							imgType:'图片扩展类型', 
							imgWidth:'base64Data图片宽',
							imgHeight:'base64Data图片高度'
						} */
						var re = c.dataEvel(response);
						callback(re);
				});
			});
		}
		
		//选择会话
		c.selectSession = function(parm, callback){
			var p = {};
			p.multiple = parm.multiple||false; //true 表示 多选  false 表示单选，默认单选
			p.title = parm.title||''; //选择会话界面标题，为空是使用客户端默认值“选择目标”
			if("undefined"==typeof(callback)){
				callback = function(){};
				if(parm.callback && "function"==typeof(parm.callback)){
					callback = parm.callback;
				}
			}
			c.call(function (bridge) {
				bridge.callHandler(
					'selectSession'
					,p
					,function(response){
						//返回数据
						/* 回调:
						response:{	
							result:"true 表示成功，false表示失败",
							session:[
								{
									sessionType:'会话类型 chatroom 群聊 user单聊',
									sessionId:'会话ID'
								}
								...
							]
							errCode:'错误码,当result为false时才有',
							errMsg:'错误信息,当result为false时才有'
						}*/
						var re = c.dataEvel(response);
						callback(re);
				});
			});
		}
		
		//获取语言
		c.getLanguage = function(parm, callback){
			var p = {};
			if("undefined"==typeof(callback)){
				callback = function(){};
				if(parm.callback && "function"==typeof(parm.callback)){
					callback = parm.callback;
				}
			}
			c.call(function (bridge) {
				bridge.callHandler(
					'getLanguage'
					,p
					,function(response){
						//返回数据
						/* 回调:
						response:{	
							result:"true 表示成功，false表示失败",
							session:[
								{
									sessionType:'会话类型 chatroom 群聊 user单聊',
									sessionId:'会话ID'
								}
								...
							]
							errCode:'错误码,当result为false时才有',
							errMsg:'错误信息,当result为false时才有'
						}*/
						var re = c.dataEvel(response);
						callback(re);
				});
			});
		}

		return c;



	}

}
