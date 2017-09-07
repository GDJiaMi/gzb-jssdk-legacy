//user client
var CBridge;
document.addEventListener('WebViewJavascriptBridgeReady', function onBridgeReady(event) {
    CBridge = event.bridge;
    CBridge.init(function(message, responseCallback) {
        if (responseCallback) {
            responseCallback("This is from client.")
        }
    })
	
	CBridge.registerHandler("ClientFunctionTest", function(data, responseCallback){
		alert(data);
		responseCallback("ClientFunction:This is from client.");
	})
}, false);

//client
(function(bridge){
	function assert(condition, message) {
    	if (!condition) {
        	throw message || "Assertion failed";
    	}
	}

	bridge.init=function(register){
		assert(register instanceof Function,"init() should has a function as parameter");
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
	var event=new CustomEvent('WebViewJavascriptBridgeReady')
	event.bridge=bridge;
	document.dispatchEvent(event);
})(bridge);