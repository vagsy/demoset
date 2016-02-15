
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
		
		$(target).addClass("ui_status");
		//初始化dom
		
		var $box=$("div._box",target);
		if($box.length<1){
			$box=$('<div class="_box"></div>');
			$box.appendTo(target);
		}
		var $bg=$("div._bg",$box);
		if($bg.length<1){
			$bg=$('<div class="_bg"></div>');
			$bg.appendTo($box);
		}
		var $inBox=$("div._vbox",$box);
		if($inBox.length<1){
			$inBox=$('<div class="_vbox"></div>');
			$inBox.appendTo($box);
		}
		var $inBg=$("div._vbox",$inBox);
		if($inBg.length<1){
			$inBg=$('<div class="_vbg"></div>');
			$inBg.appendTo($inBox);
		}
		var $surplus=$("div._left_value",$inBox);
		if($surplus.length<1){
			$surplus=$('<div class="_left_value" style="height:100%"></div>');
			$surplus.appendTo($inBox);
		}
		var $value=$("div._value",$inBox);
		if($value.length<1){
			$value=$('<div class="_value" style="height:0%;"></div>');
			$value.appendTo($inBox);
		}
		updateView(target);		
	}
	//更新视图
	function updateView(target){
		var opt=getOptions(target);
		if(opt.width){
			$(target).css("width",opt.width-0);
		}
		if(opt.height){
			$(target).css("height",opt.height-0);
		}
		
		if(opt.value && opt.value >= 0){
			var pct=opt.value/opt.total;
			$("._left_value",target).css("height",(1-pct)*100+"%");
			$("._value",target).css("height",pct*100+"%");
		}else{
			$("._left_value",target).css("height","100%");
			$("._value",target).css("height","0%");
		}
		if(opt.padding){
			$("div._box",target).css("padding",opt.padding-0);
		}else if(opt.padding===0){
			$("div._box",target).css("padding",opt.padding-0);
		}
		
	}
	function getOptions(target){
		return $.data(target,'statusBar').options;
	}
	$.extend($.fn,{
		citySelector:function(options,param){
			if (typeof options == 'string'){
				return $.fn.statusBar.methods[options](this, param);
			}
			options = options || {};
			
			return this.each(function(){
				var state = $.data(this, 'statusBar');
				if (state){
					$.data(this, 'statusBar', {
						options:$.extend(state.options, options)
					});
				} else {
					$.data(this, 'statusBar', {
						options: $.extend({},$.fn.statusBar.defaults,options)
					});
				}
				init(this);
			});
			
		}
	});
	$.fn.statusBar.methods = {
		update:function(jq,param){
			return jq.each(function(){
				update(this,param);
			});
		},
		options: function(jq){
			return getOptions(jq[0]);
		}
	}
	$.fn.statusBar.defaults = {
		width:32,
		height:200,
		total:100,
		value:0,
		padding:5
	}
})(jQuery);