var historyRec = (function(){
//	var oldHash = "";
//	window.onhashchange=function(){
//		console.log("hashchange");
//		var newHash = window.location.hash.replace(/#/,"");//获取hash更新后的hash值,去掉#号
//		var pageHash = newHash.replace(/\&\S*$/,"");//当前页面锚点
//		var paramStr = newHash.replace(/^\S*\&/,"");//当前页面参数
//		var oldPageHash = oldHash.replace(/\&\S*$/,"");//历史页面锚点
//		var pageView = document.getElementsByName(pageHash)[0];//将展现的页面
//		var oldPageView = document.getElementsByName(oldPageHash)[0];//需要隐藏的页面
//	// 	  		if($(oldPageView).hasClass("first_page")){
//	// 	  			window.location.href=$("#basePath").val()+"index/index.do";
//	// 	  		}
//		var showType = pageView.getAttribute("page-show-type");
//		var transDuration = 500;
//		if(showType){
//			if(showType=="zoom"){
//				$(pageView).css({"-webkit-transition":transDuration+"ms","-webkit-transform":"scale(0) translateZ(0px)","z-index":1});
//				pageView.style.display="block";
//				setTimeout(function(){
//					document.body.scrollTop=0;
//					$(pageView).css({"-webkit-transform":"scale(1) translateZ(0px)"});
//				},1000/60);
//				setTimeout(function(){
//					hideOldPage();
//					$(pageView).css("z-index",0);
//				},transDuration);
//			}
//		}else{
//			hideOldPage();
//			pageView.style.display="block";
//		}
//		if(pageHash){
//			var cbFun = hashCallBack[pageHash];
//			if(cbFun){
//				eval(cbFun).call(this,pageHash,oldPageHash,paramStr);
//			}
//	  		oldHash = newHash;//历史记录
//		}
//		//隐藏页面
//		function hideOldPage(){
//			if(oldPageView){
//	  			oldPageView.style.display="none";
//	  		}else{
//	  			$(".page").hide();
//	  		}
//		}
//	};
	var oldViewId = ""; //当前显示的页面id
	var oldScrollTop = "" //
	/*
	 * data参数
	 * viewId 		string	页面id
	 * callback  	string	回调函数 
	 */
	//添加历史页面记录
	function pushView(data,title,url){
		window.history.pushState(data,title,url);
		showView(data);
	}
	//替换历史页面记录
	function replaceView(data,title,url){
		window.history.replaceState(data,title,url);
		showView(data);
	}
	function showView(data){
		if(data.scrollTop!=undefined){
			document.body.scrollTop=data.scrollTop;
			if(document.documentElement && document.documentElement.scrollTop){
				document.documentElement.scrollTop=data.scrollTop;
			}
		}
		//隐藏旧页面
		if(oldViewId){
			var oldPageView = document.getElementById(oldViewId);
			oldPageView.style.display="none";
		}else{
			$(".page").hide();
		}
		//展现新页面
		if(data.viewId){
			var viewId = data.viewId;
			var pageView = document.getElementById(viewId);
			pageView.style.display="block";
			oldViewId=data.viewId;
		}		
	}
	//前进后退处理
	window.onpopstate=function(e){
		var ev = window.event||e;
		//console.log(ev.state.viewId+";old:"+oldViewId);
		try{
			if(ev.state){
				showView(ev.state);
				if(ev.state.callback){
					eval(ev.state.callback).call(this,ev.state);
				}
			}
		}catch(e1){
			
		}
	};
	return{
		"replaceView":replaceView,
		"pushView":pushView
	};
})();