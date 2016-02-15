var Tabs = function(selector,options){
	
	var opts = options;
	
	function init(){
		var domTabBox = document.querySelector(selector);					//tab页容器元素
		var domTabLinkList = domTabBox.querySelectorAll(".tab_link");		//tab头部选项卡
		var linkWidth = 100/domTabLinkList.length+"%";
		//tab选项卡宽度设置
		for(var i=0;i<domTabLinkList.length;i++){
			domTabLinkList[i].style.width=linkWidth;
		}
		//bindEvent("click",selector+" .tab_switch",document,switchTab);
		$(document).off("click",selector+" .tab_switch",switchTab);
		$(document).on("click",selector+" .tab_switch",switchTab);
		switchTab.call(document.querySelector(selector+" .tab_switch"));
	}
	//事件绑定
	function bindEvent(type,targetSelector,proxy,callback){
		if(proxy){ //事件代理
			if(proxy!=window && proxy!=document){
				proxy=document.querySelector(proxy);
			}
			proxy.addEventListener(type,function(){
				triggerProxyEvent(targetSelector,callback);
			},false);
		}else{
			var target = document.querySelectorAll(targetSelector);
			for(var i=0;i<target.length;i++){
				target[i].addEventListener(type,callback,false);
			}
		}
	}
	//触发代理事件
	function triggerProxyEvent(targetSelector,callback){
		var ev = window.event||e;
		var target = document.querySelectorAll(targetSelector);
		for(var i=0;i<target.length;i++){
			if(target[i] == ev.target){
				callback.call(target[i]);
			}
		}
	}
	
	//tab页切换
    function switchTab(){
    	var tabItemList = $(selector+" .tab_item");
        var activeIndex = 0;
        $(selector+" .tab_switch").removeClass("active");
        $(this).addClass("active");
        for(var i=0;i<tabItemList.length;i++) {
            var tabItem = tabItemList[i];
            if(tabItem.getAttribute("data-index")==this.getAttribute("data-index")){
            	activeIndex=this.getAttribute("data-index");
            	tabItemList.hide();
            	$(tabItem).show();          
            	break;
            }
        }
        afterLoad(activeIndex); //tab页展现后回调处理
    }
    //tab页展现后回调处理
	 function afterLoad(activeIndex){
		 if(opts.callback){
			 eval(opts.callback).call(this,activeIndex);
		 }
	 }
	 //tab页加载前处理
	 function beforeLoad(){
		 
	 }
	 init();
};
