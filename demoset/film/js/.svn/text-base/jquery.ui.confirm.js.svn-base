
/**
*	Confirm 提示消息插件
*	@author 李见伟
*	@parameters 
*		width:number; 消息类型
*		corner:true|false default:true;
*		border:{style:"solid",width:1,color:"#CCC"},
*		position:left|top|right|bottom default:null 消息提示出现的位置
*		
*		
*/
;(function($){
	$.extend({
		Confirm:function(options,callback){
			var options = $.extend({
				width:"80%",
				height:"",
				modle:true,
				id:"CONFIRM",
				class:"confirm",
				buttons:{" ok ":function(){},"cancel":function(){}},
				closable:true,
				corner:5,
				type:"",
				title:"",
				html:"",
				textAlign:"center",
				opacity:1
			},options);
			var $cf,$cfbg,$cfBody,$close,$cfContent,$cfText,$fBar,$okBtn,$cancelBtn,$mask;
			Initialization();
			show();
			function Initialization(){
				if(!options.id){
					return;
				}
				if(!options.html){
					return;
				}
				$cf=$("#"+options.id);
				/*if(options.modle){
					$mask=$(".confirmMask");
					if($mask.length<1){
						$mask=$('<div class="confirmMask"></div>');
						$mask.appendTo($("body"));
					}
				}*/
				if($cf.length<1){
					$cf=$('<div id="'+options.id+'" class="confirm"><div class="body"></div></div>');
					$cf.appendTo($("body"));
				}
				$cfbg=$("div.background",$cf);
				if($cfbg.length<1){
					$cfbg=$('<div class="background"></div>');
					$cfbg.appendTo($cf);
				}
				$cfBody=$(".body",$cf);
				if($cfBody.length<1){
					$cfBody=$('<div class="body"></div>');
					$cfBody.appendTo($cf);
				}
				var $msgContent=$(".msgCnt",$cfBody);
				if($msgContent.length<1){
					$msgContent=$('<div class="msgCnt"></div>');
					$msgContent.appendTo($cfBody);
				}
				if(options.textAlign){
					$msgContent.attr("align",options.textAlign);
				}
				if(options.title){
					$title=$("h2.title",$msgContent);
					if($title.length<1){
						$title=$('<h2 class="title"></h2>');
						$title.appendTo($msgContent);
					}
					$title.text(options.title);
				}
				if(options.html){
					$cfContent=$("div.text",$msgContent);
					if($cfContent.length<1){
						$cfContent=$('<div class="text"></div>');
						$cfContent.appendTo($msgContent);
					}
					$cfContent.html(options.html);
				}
				$fBar=$("div.fBar",$cfBody);
				if($fBar.length<1){
					$fBar=$('<div class="fBar"></div>');
					$fBar.appendTo($cfBody);
				}
				$buttonGroup=$("ul.buttonGroup",$fBar);
				if($buttonGroup.length<1){
					$buttonGroup=$('<ul class="buttonGroup"></ul>');
					$buttonGroup.appendTo($fBar);
				}
				if(options.corner){
					$cfbg.addClass("corner-"+options.corner);
					$cfBody.addClass("corner-"+options.corner);
					$cfContent.addClass("corner-"+options.corner);
				}
				if(options.width){
					$cf.css("width",options.width);
				}
				if(options.opacity){
					$cfbg.fadeTo(0,0.25);
					$cfBody.fadeTo(100,options.opacity);
				}else{
					$cfbg.fadeTo(0,0.25);
				}
				if(options.buttons){
					var i=0;
					var btn=[];
					var fun=[];
					for(var key in options.buttons){
						fun[i]=options.buttons[key];
						btn[i]=$('<li><span></span></li>').appendTo($buttonGroup);
						$("span",btn[i]).text(key);
						btn[i].click(function(){
							hide();
							var j=$(this).index();
							if(fun[j]){
								fun[j].call();
							}
						});
						i++;
					}
				}				
				$(window).resize(function(){
					InitializationPosition();
				});
			}
			function InitializationPosition(){
				var width=$cf.width();
				var height=$cf.height();
				var browserWidth=$(window).width();
				var browserHeight=$(window).height();
				if(browserWidth>width){
					$cf.css("left",browserWidth/2-width/2);
				}
				if(browserHeight>height){
					$cf.css("top",(browserHeight/2-height/2)*2/3);
				}
			}
			function show(){
				InitializationPosition();
				if(options.modle){
					$.Mask.show();
				}
				$cf.fadeIn(300);
			}
			function hide(){
				if(options.modle){
					$.Mask.close();
				}
				$cf.stop(true,true).fadeOut(300,function(){$(this).remove();});
			}
		}
	});
})(jQuery);