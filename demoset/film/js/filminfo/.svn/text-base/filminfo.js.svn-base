var filmInfoView = (function(){
	//影片信息页面模板
	var filmInfoTem = 	'<section id="filmInfoView" class="page" name="filmInfoPage" >'+
							'<div class="header_nav_box">'+
								'<div class="header_nav">'+
									'<div class="back"><a href="javascript:window.history.back(-1);"><span class="back_img icon24 i400"></span></a></div>'+
									'<span class="title repos fzl">影片详情</span>'+
								'</div>'+
							'</div>'+
							'<div id="filmBasicInfoBox">'+
								'<div id="filmMPosterBox">'+
									'<img src="<#=film.mainposter.url#>" height="140px" width="100px" />'+
									'<#if(film.status==1){ #>'+
										'<#var likescale=film.votecnt==0?"0":(film.likecnt/film.votecnt*100).toFixed() #>'+
										'<div>'+
										'<span class="heart vmiddle"><em class="heart_bg" style="height:<#=likescale#>%;"></em><em class="heart_cover"></em></span>'+
										'<span class="fzs"><#=likescale#>%人喜欢</span>'+
										'</div>'+
									'<#}else{#>'+
										'<#var likescale=(film.followcnt/15000*100).toFixed() #>'+
										'<#if(likescale>100){likescale=100}else if(likescale<5){likescale=5} #>'+
										'<div>'+
										'<div class="film_heat thermometer vmiddle">'+
											'<div class="thermometer_value"><em style="height:<#=likescale#>%;"></em></div>'+
											'<span class="thermometer_cover"></span>'+
										'</div>'+
										'<span class="fzs ml6"><#=film.followcnt>10000?"1万+":film.followcnt#>人想看</span>'+
										'</div>'+
									'<#}#>'+
								'</div>'+
								'<div id="filmBasicDesc">'+
									'<dl>'+
										'<dd class="fzl"><#=film.name#></dd>'+
										'<dd><#=film.type#></dd>'+
										'<dd><#=film.area#></dd>'+
										'<dd><#=film.dimendesc#></dd>'+
										'<dd>片长<#=film.duration#>分钟</dd>'+
										'<dd><#=film.showdate#>上映</dd>'+
									'</dl>'+
									'<#if(film.status==1){ #>'+
									'<div id="buyBtnBox"><a href="<#=basePath#>filmfast/fast.do?filmid=<#=film.fid#>" id="buyBtn">选座购票</a></div>'+
									'<#}#>'+
									'</div>'+
							'</div>'+
							'<div id="filmDetailBox" class="default_tab_box">'+
							'</div>'+
						'</section>';
	var photoZoomTem = 	'<section id="photoSliderPage" class="page photo_page" page-show-type="zoom" >'+
							'<div class="header_nav_box">'+
								'<div class="header_nav">'+
									'<div class="back"><a href="javascript:window.history.back(-1);"><span class="back_img icon24 i400"></span></a></div>'+
									'<span class="title repos fzl"><#=film.name#></span>'+
								'</div>'+
							'</div>'+
							'<div id="filmPhotoBox" class="photo_box">'+
							'</div>'+
						'</section>';
	var hotFilmInfoTabTem = '<div id="filmTabInfo" class="tab_box">'+
								'<div class="tab_header">'+
									'<ul>'+
										'<li class="tab_link"><a class="tab_switch" data-index="0">简介</a></li>'+
										'<li class="tab_link"><a class="tab_switch" data-index="1">剧照</a></li>'+
										'<li class="tab_link"><a class="tab_switch last" data-index="2">评论</a></li>'+
									'</ul>'+
								'</div>'+
								'<div id="fdTabBody" class="tab_body">'+
									'<div id="filmIntro" class="tab_item" data-index="0">'+
										'<dl>'+
											'<dt class="gray_font">导演：</dt>'+
											'<dd><#=film.director#></dd>'+
											'<dt class="gray_font">主演：</dt>'+
											'<dd><span><#=film.starring#></span></dd>'+
										'</dl>'+
										'<div id="filmDesc">'+
											'<p class="gray_font text_indent_2"><#=film.description#></p>'+
										'</div>'+
									'</div>'+
									'<div id="filmPhoto" class="tab_item" data-index="1">'+
										'<div id="filmGallery">'+
											'<#for (var i=0;i<still.length;i++) {#>'+
												'<#var url=still[i].url#>'+
												'<img src="<#=basePath#>images/filminfo/photo_default.jpg" data-src="<#=url#>" index="<#=i#>" width="32%" height="80px;" />'+
											'<#}#>'+
										'</div>'+
									'</div>'+
									'<div id="commentList" class="tab_item" data-index="2">'+
										'<div id="filmCommentList"></div>'+
									'</div>'+
								'</div>'+
							'</div>';	
	var comingFilmInfoTabTem = '<div id="filmTabInfo" class="tab_box">'+
								'<div class="tab_header">'+
									'<ul>'+
										'<li class="tab_link"><a class="tab_switch" data-index="0">简介</a></li>'+
										'<li class="tab_link"><a class="tab_switch last" data-index="1">剧照</a></li>'+
									'</ul>'+
								'</div>'+
								'<div id="fdTabBody" class="tab_body">'+
									'<div id="filmIntro" class="tab_item" data-index="0">'+
										'<dl>'+
											'<dt class="gray_font">导演：</dt>'+
											'<dd><#=film.director#></dd>'+
											'<dt class="gray_font">主演：</dt>'+
											'<dd><span><#=film.starring#></span></dd>'+
										'</dl>'+
										'<div id="filmDesc">'+
											'<p class="gray_font text_indent_2"><#=film.description#></p>'+
										'</div>'+
									'</div>'+
									'<div id="filmPhoto" class="tab_item" data-index="1">'+
										'<div id="filmGallery">'+
											'<#for (var i=0;i<still.length;i++) {#>'+
												'<#var url=still[i].url#>'+
												'<img src="<#=basePath#>images/filminfo/photo_default.jpg" data-src="<#=url#>" index="<#=i#>" width="32%" height="80px;" />'+
											'<#}#>'+
										'</div>'+
									'</div>'+
								'</div>'+
							'</div>';	
	var _filmId="";
	var _bathPath="";
	var _prevPage="";
	var _ifloadComment = 0;//评论是否载入
	var filmInfoModel;     //接口返回的影片信息数据
	function initFilmInfoPage(prevPage,bathPath,filmId){
		_bathPath=bathPath;
		_filmId=filmId;
		_prevPage=prevPage;
		
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
		link.href = _bathPath+"css/filminfo/filminfo.css";
		getFilmInfo();
	};
	//获取影片信息
	function getFilmInfo(){
		$.ajax({
	        url:$("#basePath").val()+"info/filmdetail.do",
	        data:{	
	        	filmid:_filmId
	        },
	        dataType:'json',
	        success:function(result) {
	        	renderFilmInfo(result);
	        },
	        error:function(){
				//alert("获取影片信息失败！");
	        }
	    });    	
    };
    //通过数据渲染影片信息页面
    function renderFilmInfo(result){
    	var date = new Date(result.film.showdate*1000);
    	result.film.showdate = date.format("yyyy-MM-dd");
    	result.film.dimendesc = objDimen[result.film.dimen];
    	result.basePath = document.getElementById("basePath").value;
    	filmInfoModel = result;
    	var render = template.compile(filmInfoTem);
		var html = render(result);
		$("#filmInfoView").remove();
		document.body.innerHTML+=html;
		showFilmInfo();	//显示影片信息页面
        initTabBox();	//影片信息tab页初始化
    }
	function showFilmInfo(){
  		historyRec.pushView({'viewId':'filmInfoView','scrollTop':0},"","");
	}	 
     //剧照处理
     function initFilmGallery(){
         var photoList = document.getElementById("filmGallery").querySelectorAll("img");
         //剧照大图事件绑定
         for(var i=0;i<photoList.length;i++) {
             $(document).off("click",'#filmGallery img',showPhotoZoom);
             $(document).on("click",'#filmGallery img',showPhotoZoom);
         }
     }
     //展现剧照大图
     function showPhotoZoom(){
    	 var render = template.compile(photoZoomTem);
    	 var html = render(filmInfoModel);
    	 var page = document.getElementById("photoSliderPage");
    	 if(page){
    		 page.parentNode.removeChild(page);
    	 }
    	 document.body.innerHTML+=html;
         historyRec.pushView({'viewId':'photoSliderPage'},"","");
         var index = this.getAttribute("index");
         require([_bathPath+'js/common/plugin/photoSlider.js'], function (photoSlider){
        	 var photoColl=[];
        	 for(var i=0;i<filmInfoModel.still.length;i++){
        		 photoColl.push(filmInfoModel.still[i].url);
        	 }
        	 photoSlider.init('filmPhotoBox',photoColl,{"imageWidth":$(window).width(),"cont_line_height":$(window).height(),"index":index},_bathPath);//图片轮播设置
         });
     }
     //影片详情tab页初始化
     function initTabBox(){
    	 var render="";
    	 if(filmInfoModel.film.status==1){
    		 render = template.compile(hotFilmInfoTabTem);
    	 }else{
    		 render = template.compile(comingFilmInfoTabTem);
    	 }
    	 var html = render(filmInfoModel);
		 document.getElementById("filmDetailBox").innerHTML=html; 
		 new Tabs("#filmTabInfo",{"callback":"filmInfoView.filmTabAfterLoad"});
     }
     //tab页展现后回调方法
     function filmTabAfterLoad(tabIndex){
    	if(_ifloadComment==1){
 	 		require([_bathPath+'js/filminfo/filmcomment.js'], function (filmComment){
 	 			window.removeEventListener('scroll', filmComment.loadComment, false);
 			});
 	 	}
 		//点击评论后加载评论
 		if(tabIndex==2){
 			//getComment(1);
 			require([_bathPath+'js/filminfo/filmcomment.js'], function (filmComment){
 				filmComment.init(_bathPath,"filmCommentList",_filmId);
 				_ifloadComment = 1;
 			});
 		}
 		//点击剧照后加载剧照图片
 		if(tabIndex==1){
 			initFilmGallery();	//影片剧照处理
 			$("#filmGallery img").each(function(){
 				$(this).attr("src",$(this).attr("data-src"));
 			});
 			$("#imgSliderContBox img").each(function(){
 				$(this).attr("src",$(this).attr("data-src"));
 			});
 		}
     }
     //影片详情tab页切换
//     function switchTab(){
//         var tabItemList = $("#filmTabInfo .tab_item");
//         var activeIndex = 0;
//         $("#filmTabInfo .tab_link").removeClass("active");
//         $(".tab_link",this).addClass("active");
//         for(var i=0;i<tabItemList.length;i++) {
//             var tabItem = tabItemList[i];
//             if(tabItem.getAttribute("data-index")==this.getAttribute("data-index")){
//             	activeIndex=this.getAttribute("data-index");
//                tabItemList.hide();
//                $(tabItem).show();              
//                break;
//             }
//         }
//         tabCallBack(activeIndex); //tab页展现后回调处理
//     }
     //tab页展现后回调处理
//	 function tabCallBack(activeIndex){
//		 	if(_ifloadComment==1){
//		 		require([_bathPath+'js/filminfo/filmcomment.js'], function (filmComment){
//		 			window.removeEventListener('scroll', filmComment.loadComment, false);
//				});
//		 	}
//			//点击评论后加载评论
//			if(activeIndex==2){
//				//getComment(1);
//				require([_bathPath+'js/filminfo/filmcomment.js'], function (filmComment){
//					filmComment.init(_bathPath,"filmCommentList",_filmId);
//					_ifloadComment = 1;
//				});
//			}
//			//点击剧照后加载剧照图片
//			if(activeIndex==1){
//				$("#filmGallery img").each(function(){
//					$(this).attr("src",$(this).attr("data-src"));
//				});
//				$("#imgSliderContBox img").each(function(){
//					$(this).attr("src",$(this).attr("data-src"));
//				});
//			}
//		}
     function hidePhotoSlider(e){
     	$("#photoSliderPage").hide();
     }
     return {
		"initFilmInfoPage": initFilmInfoPage,
		"filmTabAfterLoad":filmTabAfterLoad
     };
})();
if ( typeof define === "function" && define.amd ) {
	define(filmInfoView);
}
