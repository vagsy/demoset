
/***********************************************************************
*	loading 插件
*	@author 李见伟
*	@parameters:
*		autoOpen:true|false default:true
*		onCloseDestroy:true|false default true
*	@public methods:
*		close:隐藏
*		open:显示
*		destroy:销毁
************************************************************************/

;(function($){
	function init(target){
		$(target).css({position:'relative'});
		var opts=$.fn.loading.methods["getOptions"](target,"loading");
		var panel=("div.loading",target);
		if(!panel.length){
			panel=$('<div class="loading"></div>');
			panel.appendTo(target);
		}
		if($(target).width()<opts.minWidth){
			var tempDiv=$('<div></div>').appendTo(panel);
			tempDiv.css("width",opts.minWidth).css("height",1);
		}
		if($(target).height()<opts.minHeight){
			var tempDiv=$('<div></div>').appendTo(panel);
			tempDiv.css("height",opts.minHeight).css("width",1);
		}
	}
	function open(target){
		var opts=$.fn.loading.methods["getOptions"](target,"loading");
		var panel=$("div.loading",target);
		panel.fadeTo(0,0.6);
		panel.fadeIn(300);
	}
	$.extend($.fn,{
		loading:function(options,param){
			if (typeof options == 'string'){
				var m=$.fn.loading.methods;
				return $.fn.loading.methods[options](this,param);
			}
			options = options || {};
			return this.each(function(){
				var state = $.data(this,'loading');
				if (state){
					$.data(this,'loading',{
						options:$.extend(state.options, options)
					});
				} else {
					$.data(this, 'loading', {
						options: $.extend({},$.fn.base.defaults,$.fn.loading.defaults,options)
					});
				}
				init(this,param);
				open(this);
			});
		}
	});
	$.fn.loading.methods = $.extend({},$.fn.base.methods,{
		close:function(target,param){
			$(target).each(function(){
				var opts=$.fn.loading.methods["getOptions"](this,"loading");
				var panel=$("div.loading",this);
				panel.fadeOut(300,function(){
					if(opts.onCloseDestroy){
						$(this).remove();
					}
				});
			});
		}
	});
	$.fn.loading.defaults =$.extend({},$.fn.base.defaults,{
		uiname:"loading",
		minWidth:48,
		minHeight:36,
		autoOpen:true,
		onCloseDestroy:true
	});
})(jQuery);
/***********************************************************************
*	end loading plugin
*
************************************************************************/
