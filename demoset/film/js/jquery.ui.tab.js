
/**
*	statusBar 状态进度条
*	@author 李见伟
*	@parameters 
*		width:number; 区域宽度
*		height:number; 区域高度
*		total:number  总数
		value:number 当前值
*		padding:number 填充区域宽度，可适量调整
*/
;(function($){
	function init(target){
		$(target).addClass("uitab");
		
	}
	function bindEvent(target){
		var opts=$.fn.citySelector.methods["getOptions"](target,"tab");
		
		$(target).unbind().bind('click',function(e){
			var tt=e.target;
			if($(tt).hasClass("cityname")){
				//点击了字符
				//loadCinemaByCity(target,$(tt).attr("id"));
			}else if($(tt).closest(".cinema").length){
				//alert($(tt).closest(".cinema").index());
				//var index=$(tt).closest(".cinema").index();
				//var c=opts.cinemaData[index];
				//$.fn.citySelector.defaults.onCinemaSelected(target,c);
			}
		});
	}
	$.extend($.fn,{
		tab:function(options,param){
			if (typeof options == 'string'){
				return $.fn.tab.methods[options](this, param);
			}
			options = options || {};
			return this.each(function(){
				var state = $.data(this,'tab');
				if (state){
					$.data(this,'tab',{
						options:$.extend(state.options, options)
					});
				} else {
					$.data(this, 'tab', {
						options: $.extend({},$.fn.base.defaults,$.fn.tab.defaults,options)
					});
				}
				init(this,param);
				bindEvent(this);
			});
		}
	});
	$.fn.tab.methods = $.extend({},$.fn.base.methods,{
	
	});
	$.fn.tab.defaults =$.extend({},$.fn.base.defaults,{
		uiname:"tab",
		title:[],
		url:[],
		content:[],
		
	});
})(jQuery);