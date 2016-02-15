
/**
*	base 公用的基础方法
*	@author 李见伟
*/
;(function($){
	$.extend($.fn,{
		base:function(options,param){
			if (typeof options == 'string'){
				return $.fn.base.methods[options](this, param);
			}
			options = options || {};
			return this.each(function(){
				var state = $.fn.base.methods["getOptions"](this,'base');
				if (state){
					$.fn.base.methods["setOptions"](this,'base',$.extend(state.options, options));
				} else {
					$.fn.base.methods["setOptions"](this,'base',$.extend({},$.fn.base.defaults,options));
				}
			});
		}
	});
	$.fn.base.methods = {
		getOptions:function(jq,param){
			/*param 控件的名称非空*/
			return $.data(jq,param).options;
		},
		setOptions:function(jq,param,options){
			/*param 保存参数*/
			$.data(jq,param,{options:options});
		},
		close:function(jq,param){
			$(jq).each(function(){
				$(this).hide();
			});
		}
	}
	$.fn.base.defaults = {
		uiname:"base"
	};
})(jQuery);