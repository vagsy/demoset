
/**
*	遮罩插件
*	@Mask 李见伟
*	@parameters 
*		width:number; 消息类型
*		corner:true|false default:true;
*		border:{style:"solid",width:1,color:"#CCC"},
*		position:left|top|right|bottom default:null 消息提示出现的位置
*		
*		
*/
;(function($){
	function show(options){
		options=$.extend({},$.Mask.defaults,options);
		var target=$(options.target);
		if(!target.length){
			target=$("body");
			options.target="body";
		}
		var mask=target.children("."+options.uiname);
		if(!mask.length){
			mask=$('<div></div>').addClass(options.uiname);
			mask.appendTo(target);
		}
		if(options.bgColor){
			mask.css("background",options.bgColor);
		}
		if(options.opacity){
			mask.css("opacity",options.opacity);
		}
		if(options.target=="body"){
			options.scrollTop=$(window).scrollTop();
			$(window).bind("scroll",function(e){e.preventDefault;$(window).scrollTop(options.scrollTop);});
		}else{
			options.scrollTop=$(target).scrollTop();
			mask.css("top",options.scrollTop+"px");
			$(target).bind("scroll",function(e){e.preventDefault;$(target).scrollTop(options.scrollTop);});
		}
		mask.fadeIn(100);
	}
	function close(options){
		options=$.extend({},$.Mask.defaults,options);
		var target=$(options.target);
		if(!target.length){
			target=$("body");
			options.target="body";
		}
		var mask=target.children("."+options.uiname);
		if(options.target=="body"){
			$(window).unbind("scroll").bind("scroll",function(e){});
		}else{
			$(target).unbind("scroll").bind("scroll",function(e){});
		}
		//alert(mask.length);
		mask.remove();
	}
	$.extend({
		Mask:{
			show:function(options){
				return show(options);
			},
			close:function(options){
				return close(options);
			}
		}
	});
	$.Mask.defaults =$.extend({},{
		uiname:"Mask",
		target:"body",
		scrollTop:0,
		bgColor:"black",
		opacity:0.25
	});
})(jQuery);