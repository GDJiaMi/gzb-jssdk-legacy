//server
var bridge={};
(function(d) {
	var e = d.c_ || {};
	d.publish = function(a, b) {
		for (var c = e[a], f = c ? c.length: 0; f--;) c[f].apply(d, b || [])
	};
	d.subscribe = function(a, b) {
		e[a] || (e[a] = []);
		e[a].push(b);
		return [a, b]
	};
	d.unsubscribe = function(a) {
		for (var b = e[a[0]], a = a[1], c = b ? b.length: 0; c--;) b[c] === a && b.splice(c, 1)
	};

	//callback list
	var responseCallbacks = {}
	var uniqueId = 1;
	d.addCallbackList = function(responseCallback){
		var callbackId = 'cb_'+(uniqueId++)+'_'+new Date().getTime()
		responseCallbacks[callbackId] = responseCallback;
		return callbackId;
	}
	d.exeCallbackList = function(data, callbackId){
		if(callbackId)
		{
			var responseCallback = responseCallbacks[callbackId];
			if (!responseCallback) { return; }
			responseCallback(data);
			delete responseCallbacks[callbackId];
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

bridge.sregisterHandler("ShowMenu", function(data, responseCallback){

	window.HandleEvent('OnShowMenu','');
});

bridge.sregisterHandler("openMail", function(data, responseCallback){

	window.HandleEvent('OnOpenMail', data.email);
});

bridge.sregisterHandler("openUrl", function(data, responseCallback){
	window.HandleEvent('OnOpenUrl', data.url);
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
	window.HandleEvent('onOpenDialog',data);
});
bridge.sregisterHandler("openWebApp", function(data, responseCallback){
	window.HandleEvent('onOpenWebApp',data.id);
});

function exeCallback(callbackData, callbackId)
{
	console.log(callbackData);
	//var jsonObj = eval('(' + callbackData + ')');

	bridge.exeCallbackList(callbackData, callbackId);
}
