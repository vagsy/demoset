/**********************************************
*	citySelector 选择城市控件
*	@author 李见伟
*	@parameters 
*		
**********************************************/
;(function($){
	function init(target){
		$(target).addClass("uicity");
		$(target).show();
		//初始化dom
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		var header=$("div.header",target);
		if(header.length<1){
			header=$('<div class="header pprl3 ptb8" align="center"><a href="#" class="fl icon24 i400"></a><span class="title">选择城市</span></div>');
			header.appendTo(target);
		}
		var allcity=$("div.allcity",target);
		if(allcity.length<1){
			allcity=$('<div class="allcity">');
			allcity.appendTo(target);
		}
		var currentCity=$("div.currentCity",allcity);
		if(currentCity.length<1){
			currentCity=$('<div class="currentCity city"><div class="bar"><span>当前选定城市</span></div><ul><li><span>北京</span></li></ul></div>');
			currentCity.appendTo(allcity);
		}
		var localCity=$("div.localCity",allcity);
		if(localCity.length<1){
			localCity=$('<div class="localCity city"><div class="bar"><span>GPS定位您所在的城市</span></div><ul><li><span>北京</span></li></ul></div>');
			localCity.appendTo(allcity);
		}
		var cityls=$("ul.cityLs",allcity);
		if(!cityls.length){
			cityls=$('<ul class="cityLs"></ul>').appendTo(allcity);
		}
		var quickletter=$("div.quickletter",target);
		if(quickletter.length<1){
			quickletter=$('<div class="quickletter"></div>');
			quickletter.appendTo(target);
		}
		updateView(target);
		updateCurrentCity(target,opts.currentCity);
	}
	/*更新定位位城市，默认北京*/
	function updateLocalCity(target,city){
		
	}
	/*当前选中城市，默认北京*/
	function updateCurrentCity(target,city){
		city=city||{};
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		if(city.city){
			opts.currentCity=city;
		}
		var currentCity=$("div.currentCity",target);
		var li=$("li",currentCity);
		var em=$("<span></span>");
		em.text(opts.currentCity.city.name);
		li.html(em);
	}
	function updateView(target){
		//var tbar=$("div.tbar",target);
		var header=$("div.header",target);
		var allcity=$("div.allcity",target);
		var broserHeight=$(window).height();
		var topHeight=header.height()-0+16;
		var cityLsHeight=broserHeight-topHeight;
		allcity.height(cityLsHeight);
		loadAllCity(target);
	}
	function loadAllCity(target,param){
		var allcity=$("div.allcity",target);
		$("div.rtcity",target).show();
		$("ul.cityLs",allcity).show();
		$(".quickletter",target).show();
		$("div.cinemaBody",target).hide();
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		if(opts.data.length>0){
			updateAllCity(target,opts.data);
		}else if(opts.cityUrl){
			allcity.loading();
			$.ajax({
				url:opts.cityUrl,
				type:"post",
				cache:false,
				contentType:"json",
				success: function(data){
					allcity.loading("close");
					opts.data=data.data;
					updateAllCity(target,data.data);
				},
				error:function(result){alert("网络错误");},
			});
		}
	}
	function getCity(target,cid){
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		if(opts.data.length<1){return {};}
		if(!cid){
			return {};
		}
		for(var i=0;i<opts.data.length;i++){
			if(opts.data[i].city.cid==cid){
				return opts.data[i];
			}
		}
		return {};
	}
	function selectCity(target,cid){
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		//opts.currentCity=getCity(target,cid);
		updateCurrentCity(target,getCity(target,cid));
		$.fn.citySelector.defaults.onSelected(target,opts.currentCity);
	}
	function loadCinemaByCity(target,cid){
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		var allcity=$("div.allcity",target);
		$("div.rtcity",target).hide();
		$("ul.cityLs",allcity).hide();
		$(".quickletter",target).hide();
		$("div.cinemaBody",target).show();
		allcity.loading();
		if(opts.cinemaUrl){
			$.ajax({
				url:opts.cinemaUrl,
				type:"post",
				cache:false,
				data:{cid:cid},
				contentType:"json",
				success: function(data){
					allcity.loading("close");
					updateCinema(target,data.data);
				},
				error:function(result){alert("网络错误");},
			});
		}
	}
	/*
	*插入城市，根据firstletter进行归类插入，
	*如果firstletter不存在插入整个城市区域，已经存在则插入一条列表项，
	*/
	function updateCity(target,json){
		if(!json){
			return;
		}
		var letter=json.city.firstletter;
		var allcity=$("div.allcity",target);
		var cityls=$("ul.cityLs",allcity);
		var cb=$("#"+letter,cityls);
		if(!cb.length){
			cb=$('<li class="city"><div class="titleNode"><div class="bar"><a name="" class="firstletter"></a></div></div><ul></ul></li>');
			cb.attr("id",letter);
			$(".firstletter",cb).text(letter).attr("name",letter);
			cb.appendTo(cityls);
		}
		var ul=$("ul",cb);
		var li=$('<li></li>').appendTo(ul);
		li.attr("id",json.city.cid);
		li.text(json.city.name).addClass("cityname");
	}
	function updateQuickletter(target,json){
		if(!target || !json){return;}
		var quickletter=$("div.quickletter",target);
		var $letter=$("a.letter:contains("+json.city.firstletter+")",quickletter);
		if(!$letter.length){
			$letter=$('<a class="letter"></a>').text(json.city.firstletter).attr("href","#"+json.city.firstletter);
			$letter.appendTo(quickletter);
		}
		var quickletterHeight=quickletter.height()-0;
		var letters=$("a",quickletter);
		if(letters.length){
			letters.css("height",100/letters.length+"%").css("line-height", quickletterHeight/letters.length +"px");
		}
	}
	function updateAllCity(target,data){
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		if(!data){
			data=opts.data;
		}
		data=sortCity(data);
		$("ul.cityLs",target).html("");
		for(var i=0;i<data.length;i++){
			updateCity(target,data[i]);
			updateQuickletter(target,data[i]);
		}
	}
	function bindEvent(target){
		var opts=$.fn.citySelector.methods["getOptions"](target,"citySelector");
		var allcity=$("div.allcity",target);
		var cityls=$("ul.cityLs",allcity);
		allcity.scroll(function(e){
			var cls=cityls.children("li.city");
			var _this=this;
			cls.each(function(){
				var scrollTop=$(_this).scrollTop()-0;
				var top=$(_this).position().top-0;
				var height=$(this).height()-0;
				var ptop=$(this).position().top-0;
				//console.info("id:"+$(this).attr("id")+" cityTop:"+ptop+" cityHeight:"+height+" scrollTop:"+top);
				var bar=$(".bar",this);
				var barHeight=bar.height()-0;
				if(ptop <0 && height+ptop>0){
					if(height+ptop > barHeight){
						bar.css({"position":"fixed","top":top+"px",opacity:.5,background:"#000",color:"#fff"});
					}else{
						bar.css({"position":"absolute",background:"#000",opacity:.5,color:"#fff","top":ptop+height-barHeight+scrollTop+"px"});
					}
				}else{
					bar.removeAttr("style").attr("style","");
				}
			});
		});
		$(target).unbind().bind('click',function(e){
			//如果点击的是：letter
			var tt=e.target;
			if($(tt).hasClass("cityname")){
				//点击了字符
				selectCity(target,$(tt).attr("id"));
				$(target).fadeOut(300);
			}else if($(tt).hasClass("goback")){
				//alert($(tt).closest(".cinema").index());
				//var index=$(tt).closest(".cinema").index();
				//var c=opts.cinemaData[index];
				//$.fn.citySelector.defaults.onCinemaSelected(target,c);
				alert("goback");
			}
		});
	}
	$.extend($.fn,{
		citySelector:function(options,param){
			if (typeof options == 'string'){
				return $.fn.citySelector.methods[options](this, param);
			}
			options = options || {};
			return this.each(function(){
				var state = $.data(this,'citySelector');
				if (state){
					$.data(this,'citySelector',{
						options:$.extend(state.options, options)
					});
				} else {
					$.data(this, 'citySelector', {
						options: $.extend({},$.fn.base.defaults,$.fn.citySelector.defaults,options)
					});
				}
				init(this,param);
				bindEvent(this);
			});
		}
	});
	$.fn.citySelector.methods = $.extend({},$.fn.base.methods,{
		update:function(jq,param){
			return jq.each(function(){
				update(this,param);
			});
		}
	});
	$.fn.citySelector.defaults =$.extend({},$.fn.base.defaults,{
		uiname:"citySelector",
		cityUrl:"city.json",
		currentCity:{"isgroupon":1,"city":{"cid":"8022251040","firstletter":"B","name":"北京"}},
		title:"选择城市",
		data:[],
		cinemaData:[],
		onSelected:function(target,data){alert("选择了："+data.city.name);}
	});
})(jQuery);