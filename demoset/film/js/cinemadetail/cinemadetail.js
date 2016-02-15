var cinemaDetailView = (function (exports){
	var cinemaDetailTem = 	'<section id="cinemaDetailWraper" class="page" name="cinemaDetailPage" >'+
								'<div class="header_nav_box">'+
									'<div class="header_nav">'+
										'<div class="back"><a href="javascript:window.history.back(-1);"><span class="back_img icon24 i400"></span></a></div>'+
										'<span class="title repos">影院详情</span>'+
									'</div>'+
								'</div>'+
								'<section id="cinemaInfoBox">'+
									'<div class="cinema_info_title"><span class="cd_icon i01 title_icon"></span>基本信息</div>'+
									'<ul class="cinema_info_list">'+
										'<li class="cinema_info_item"><span class="cd_icon i02 info_icon"></span><#=address#></li>'+
											'<li class="cinema_info_item"><span class="cd_icon i03 info_icon"></span>'+
												'<# if(imaxroom==1) {#>'+
													'<span class="hall_remark">IMAX</span>'+
												'<#}#>'+
												'<# if(_3droom==1) {#>'+
													'<span class="hall_remark">3D</span>'+
												'<#}#>'+
												'<# if(viproom==1) {#>'+
													'<span class="hall_remark">VIP</span>'+
												'<#}#>'+
//												'<span class="hall_remark">2D</span>'+
										'</li>'+
										'<li class="cinema_info_item"><span class="cd_icon i04 info_icon"></span><#=seatcnt#></li>'+
										'<li class="cinema_info_item"><span class="cd_icon i05 info_icon"></span><#=cinema.tel#></li>'+
										'<li class="cinema_info_item"><span class="cd_icon i06 info_icon"></span><span id="cdBusinfo"></span></li>'+
										'<li class="cinema_info_item"><span class="cd_icon i07 info_icon"></span><#=parkinginfo#></li>'+
									'</ul>'+
									'<div class="cinema_info_title"><span class="cd_icon i08 title_icon"></span>优惠信息</div>'+
									'<div class="ciname_favour_info" id="cdFavourInfo"></div>'+
								'</section>'+
							'</section>';
	var _bathPath,_cinemaId;
	var pageId = "cinemaDetailWraper";
	function init(bathPath,cinemaId){
		_bathPath = bathPath;
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
//		link.onreadystatechange=function(){
//			alert(4);
//			if(link.readyState=="loaded" || link.readyState=="complete"){
//				alert(333);
//				
//			}
//		}; 
		document.getElementsByTagName("head")[0].appendChild(link);
		link.href = _bathPath+"css/cinemadetail/cinemadetail.css";
		if(_cinemaId==cinemaId){
			show();
		}else{
			_cinemaId = cinemaId;
			get();
		}
		
	}
	
	function get(){
		$.ajax({
	        url:$("#basePath").val()+"info/cinemadetail.do",
	        data:{	
	        	cinemaid:_cinemaId
	        },
	        dataType:'json',
	        success:function(result) {
	        	renderPage(result);
	        },
	        error:function(){
				alert("获取影院详情失败！");
	        }
	    });
	}
	function renderPage(result){
		var render = template.compile(cinemaDetailTem);
		var html = render(result);
		$("#"+pageId).remove();
		document.body.innerHTML+=html;
		$("#cdBusinfo").append(result.businfo);
		$("#cdFavourInfo").append(result.info)
		show();
	}
	function show(){
//		var pageView = document.getElementById("cinemaDetailWraper");
//  		window.location.hash="#"+pageView.getAttribute("name")+"&cinemaid="+_cinemaId;
  		historyRec.pushView({'viewId':'cinemaDetailWraper'},"","");
	}
	function destroy(){
		$("#"+pageId).remove();
	}
	
	exports.init=init;
	exports.destroy=destroy;
	return exports;
	
})(cinemaDetailView||{});
if ( typeof define === "function" && define.amd ) {
	define(cinemaDetailView);
}

