	var imageSlider = function(elId,opts){	
		var eventInfo = {
				"startEvent":"touchstart",
				"moveEvent":"touchmove",
				"endEvent":"touchend",
				"eventType":1
		};
		if(!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|ios|SymbianOS|Windows Phone)/i)){
			eventInfo.startEvent = "mousedown";
			eventInfo.moveEvent = "mousemove";
			eventInfo.endEvent = "mouseup";
			eventInfo.eventType = 2;
		}
		var tmpX = 0;				//横向滑动距离     
		var sliderWidth = 0;  		//当前滑动宽度   
		var currIndex = 0;			//当前显示图片序
		var moveable = false;		//是否正在滑动   
		var transitionProList = ["transition","-webkit-transition","-moz-transition","-ms-transition","-o-transition"];
		var transformProList = ["transform","-webkit-transform","-moz-transform","-ms-transform","-o-transform"];
		var defaultOptions = {
				imageWidth : 300, 		//图片宽度       
				sliderTime : 250,  		//滑动时间 毫秒
				doSliderWidth : 100	//滑动多少像素切换图片
		};
		var options = {};
		for(var property in defaultOptions){
			if(opts && opts[property]){
				options[property] = opts[property];
			}else{
				options[property] = defaultOptions[property];
			}
		}
		var wraper = document.getElementById(elId);	//图片轮播容器元素
		var sliderItemList = wraper.querySelectorAll(".slider_cont"); //图片集合
		var imageCount = sliderItemList.length; //图片总数
		for(var i=0;i<imageCount;i++){
			var leftPx = i*-options.imageWidth; //图片距左边框的距离
			sliderItemList[i].style.cssText="left:"+leftPx+"px;width:"+options.imageWidth+"px";
			if(i==imageCount-1){  //最后一张图片
				addCssProperty(sliderItemList[i],transformProList,"translate("+(-options.imageWidth)+"px) translateZ(0px)");
			}else{
				addCssProperty(sliderItemList[i],transformProList,"translate("+(options.imageWidth*i)+"px) translateZ(0px)");
			}
		}
		wraper.addEventListener(eventInfo.startEvent,_start);
		wraper.addEventListener(eventInfo.moveEvent,_move,false);
		//window.addEventListener(eventInfo.endEvent,_end,false);
		function getEv(ev){
			var touch;
			if(eventInfo.eventType==2){
				touch = ev;
			}else{
				touch = ev.touches[0];
			}
			return touch;
		}
		//删除css属性
		function removeCssProperty(el,propertyList){
			for(var i=0;i<propertyList.length;i++){
				el.style.removeProperty(propertyList[i]);
			}
			return el;
		}
		//添加css属性
		function addCssProperty(el,propertyList,styleValue){
			var cssStr=";";
			for(var i=0;i<propertyList.length;i++){
				cssStr += propertyList[i]+":"+styleValue+";";
			}
			el.style.cssText += cssStr;
			return el;
		}
		function setSliderItemPro(el,proList,styleValue){
			el = removeCssProperty(el,proList);
			el = addCssProperty(el,proList,styleValue);
			return el;
		}
		function _start(e){
			var ev = window.event||e;
			var touch = getEv(ev);
			tmpX = touch.pageX-wraper.offsetLeft;
			moveable = true;
			if (ev.preventDefault) {
				ev.preventDefault();
				ev.stopPropagation();
			}
		}
		function _move(e){
			window.addEventListener(eventInfo.endEvent,_end,false);
			var ev = window.event||e;
			ev.stopPropagation();
			var touch = getEv(ev);
			if(moveable){
				var moveX = touch.pageX-tmpX;	//滑动距离
				var nextIndex = currIndex==imageCount-1?0:currIndex+1; //当前图片右侧图片
				var prevIndex = currIndex==0?imageCount-1:currIndex-1; //当前图片左侧图片
				for(var i=0;i<imageCount;i++){
					setSliderItemPro(sliderItemList[i],transitionProList,"0ms");//图片左右滑动时间处理
					//滑动处理
					if(i == currIndex){
						setSliderItemPro(sliderItemList[i],transformProList,"translate("+moveX+"px) translateZ(0px)");
					} else if(i == nextIndex){
						setSliderItemPro(sliderItemList[i],transformProList,"translate("+(options.imageWidth+moveX)+"px) translateZ(0px)");
					}else if(i == prevIndex){
						setSliderItemPro(sliderItemList[i],transformProList,"translate("+(moveX-options.imageWidth)+"px) translateZ(0px)");
					}
				}
				sliderWidth = moveX;
			}
		}
		function _end(e) {
			if(moveable){	
				if(sliderWidth>options.doSliderWidth){ //向右滚动
					sliderRight();
				}else if(sliderWidth<-options.doSliderWidth){ //向左滚动
					sliderLeft();		
				}else{
					var nextIndex = currIndex==imageCount-1?0:currIndex+1;  //当前图片右侧图片
					var prevIndex = currIndex==0?imageCount-1:currIndex-1;  //当前图片左侧图片
					for(var i=0;i<imageCount;i++){
						setSliderItemPro(sliderItemList[i],transitionProList,options.sliderTime+"ms");//图片左右滑动时间处理
						//滑动处理
						if(i == currIndex){
							setSliderItemPro(sliderItemList[i],transformProList,"translate(0px) translateZ(0px)");
						} else if(i == nextIndex){
							setSliderItemPro(sliderItemList[i],transformProList,"translate("+options.imageWidth+"px) translateZ(0px)");
						}else if(i == prevIndex){
							setSliderItemPro(sliderItemList[i],transformProList,"translate("+(-options.imageWidth)+"px) translateZ(0px)");
						}
					}
				}
			}
			window.removeEventListener(eventInfo.endEvent,_end,false);
			moveable = false;
			sliderWidth = 0;
			tmpX = 0;
		}
		//向右滑动
		function sliderRight(){
			var showIndex = currIndex==0?imageCount-1:currIndex-1; //滑动后显示的图片
			var showPrevIndex = showIndex==0?imageCount-1:showIndex-1; //滑动后显示图片的前一个图片
			for(var i=0;i<imageCount;i++){
				setSliderItemPro(sliderItemList[i],transitionProList,options.sliderTime+"ms");//图片左右滑动时间处理
				//滑动处理
				if(i == showIndex){
					setSliderItemPro(sliderItemList[i],transformProList,"translate(0px) translateZ(0px)");
				}else if(i == showPrevIndex){
					setSliderItemPro(sliderItemList[i],transitionProList,"0ms");//图片左右滑动时间处理
					setSliderItemPro(sliderItemList[i],transformProList,"translate("+(-options.imageWidth)+"px) translateZ(0px)");
				}else{ //滑动后显示图片右面的图片
					var eleIndex = parseInt(sliderItemList[i].getAttribute("index")); //图片序号
					var scale= eleIndex>showIndex?eleIndex-showIndex:eleIndex+imageCount-showIndex;//向右偏移倍数	
					setSliderItemPro(sliderItemList[i],transformProList,"translate("+options.imageWidth*scale+"px) translateZ(0px)");
				}
			}
			currIndex = showIndex;
		}
		//向左滑动
		function sliderLeft(){
			var showIndex = currIndex==imageCount-1?0:currIndex+1; //滑动后显示的图片
			for(var i=0;i<imageCount;i++){
				setSliderItemPro(sliderItemList[i],transitionProList,options.sliderTime+"ms");//图片左右滑动时间处理
				//滑动处理
				if(i == currIndex){
					setSliderItemPro(sliderItemList[i],transformProList,"translate("+(-options.imageWidth)+"px) translateZ(0px)");
				}else if(i == showIndex){
					setSliderItemPro(sliderItemList[i],transformProList,"translate(0px) translateZ(0px)");
				}else{ //滑动后显示图片右面的图片
					setSliderItemPro(sliderItemList[i],transitionProList,"0ms");//图片左右滑动时间处理
					var eleIndex =  parseInt(sliderItemList[i].getAttribute("index")); //图片序号
					var scale= eleIndex>showIndex?eleIndex-showIndex:eleIndex+imageCount-showIndex;//向右偏移倍数	
					setSliderItemPro(sliderItemList[i],transformProList,"translate("+(options.imageWidth*scale)+"px) translateZ(0px)");
				}
			}
			currIndex = showIndex;
		}
		function autoSlider(){
			sliderLeft();
			setTimeout(autoSlider,3000);
		}	
		//setTimeout(autoSlider,3000);
};
