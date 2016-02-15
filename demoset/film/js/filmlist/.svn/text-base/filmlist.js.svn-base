var hashCallBack = {};

//查询影片排期列表数据
var queryFilmListData={
		"cinemaId":304,
		"cinemaName":"北京CBD",
		"index":0,
};
//查询影院列表配置数据
var showCinemaOpts = {
		'hideEle':["filmListWraper"],
		'callback':'filmListView.getFilmListByCinema',
		'cityId':'8022251040',
		'cityName':'北京',
		'locCityId':'8022251040',
		'locCityName':'北京'
};

template.config('openTag','<#');
template.config('closeTag', '#>');
var objDimen = {
		"0":"2D",
		"1":"3D",
		"4":"2D/3D",
		"5":"2D/IMAX-2D",
		"6":"3D/IMAX-3D",
		"7":"2D/3D/IMAX-3D"
};
window.onload = function(){
	filmListView.initPage();
};
var cinemaLineTem = '<div>'+
						'<a id="cinemaLineBox">'+
						'<img src="<#=basePath#>images/cinema_info/cinema_logo.png" class="cinema_logo" height="40px" width="40px" />'+
						'<div class="cinema_line_desc">'+
							'<p class="name"><#=cinema.name#></p>'+
							'<p class="address fzs"><#=address#></p>'+
						'</div>'+
						'<img src="<#=basePath#>images/cinema_info/cinema_link.png" class="cinema_link" />'+
						'</a>'+
					'</div>';
var filmListView = (function(){
	function initPage(){
		historyRec.replaceView({'viewId':'filmListWraper'},"","");
		var lastCinemaId  = window.localStorage.lastCinemaId;		//上次访问影院id
		var lastCinemaName  = window.localStorage.lastCinemaName; 	//上次访问影院名称
		var lastCityId  = window.localStorage.lastCityId;			//上次访问城市id
		var lastCityName  = window.localStorage.lastCityName;		//上次访问城市名称
		if(lastCinemaId && lastCinemaId!='null'){
			queryFilmListData.cinemaId  = lastCinemaId;
		}
		if(lastCinemaName && lastCinemaName!='null'){
			queryFilmListData.cinemaName = lastCinemaName;
		}
		if(lastCityId && lastCityId!='null'){
			showCinemaOpts.cityId = lastCityId;
		}
		if(lastCityName && lastCityName!='null'){
			showCinemaOpts.cityName = lastCityName;
		}
		$("#heaCinemaName").text(queryFilmListData.cinemaName);
		bindEvent();
		getCinemaInfo();
    	getFilmList.call($('#showTypeBtnBox a')[0]);
    	document.getElementById("filmListWraper").style.display="block";
	}
	function bindEvent(){
		$(document).off("click",'#showTypeBtnBox a',getFilmList);
		$(document).on("click",'#showTypeBtnBox a',getFilmList);
	}       	
    //根据影院获取影片列表
	function getFilmListByCinema(cinemaId,cinemaName,cityId,cityName,locCityId,locCityName){
		window.history.back(-1);
		//定位城市处理
		if(locCityId && locCityId!=queryFilmListData.locCityId){
        	showCinemaOpts.locCityId = locCityId;
        	showCinemaOpts.locCityName = locCityName;
    	}
		//判断影城是否有变化
    	if(cinemaId && cinemaId!=queryFilmListData.cinemaId){
    		$("#heaCinemaName").text(cinemaName);
    		queryFilmListData.cinemaId = cinemaId;
        	queryFilmListData.cinemaName = cinemaName;
        	showCinemaOpts.cityId = cityId;
        	showCinemaOpts.cityName = cityName;
        	//window.localStorage.setItem("lastCinemaId",queryFilmListData.cinemaId);
        	window.localStorage.lastCinemaId=queryFilmListData.cinemaId;
        	window.localStorage.lastCinemaName=queryFilmListData.cinemaName;
        	window.localStorage.lastCityId=showCinemaOpts.cityId;
        	window.localStorage.lastCityName=showCinemaOpts.cityName;		        	
        	var index = queryFilmListData.index;		        	
        	getCinemaInfo();
        	if(index==0){
        		getHotFilmList();
        	}else{
        		getComingFilmList();
        	}
        }
    	//bindEvent();
	}
    function getFilmList(){
    	$('#showTypeBtnBox a').removeClass("current");
    	$(this).addClass("current");
    	$(".film_list_box").hide();
    	var index = this.getAttribute("data-index");
    	queryFilmListData.index = index;
    	if(index==0){
    		getHotFilmList();
    	}else{
    		getComingFilmList();
    	}
    }
    //获取正在 热映影片列表 
    function getHotFilmList(){
    	$.ajax({
	        url:$("#basePath").val()+"info/hotfilm.do",
	        data:{	
	        	cityid:showCinemaOpts.cityId,
	        	cinemaid:queryFilmListData.cinemaId 
	        },
	        dataType:'json',
	        success:function(result) {
		    	result.dimendesc = objDimen;
		    	result.basePath = document.getElementById("basePath").value;
		    	result.listtype = 0;//正在热映
		    	result.Date = Date;
		    	var html = template('filmListTem', result);
		    	document.getElementById('hotFilmListBox').innerHTML = html; 
		    	showFilmList("hotFilmListBox");
			},
	        error:function(){
				alert("获取影片列表失败！");
	        }
	    }); 
    }
  	//获取即将上映影片列表	   
    function getComingFilmList(){
    	$.ajax({
	        url:$("#basePath").val()+"info/comingsoonfilm.do",
	        data:{	
	        	cityid:showCinemaOpts.cityId,
	        	cinemaid:queryFilmListData.cinemaId 
	        },
	        dataType:'json',
	        success:function(result) {
		    	result.dimendesc = objDimen;
		    	result.listtype = 1;//即将上映
		    	result.Date = Date;
		    	result.basePath = document.getElementById("basePath").value;
		    	var html = template('filmListTem', result);
		    	document.getElementById('comingFilmListBox').innerHTML = html; 
		    	showFilmList("comingFilmListBox");
	        },
	        error:function(){
				alert("获取影片列表失败！");
	        }
	    }); 
    }
  	function showFilmList(elId){
  		//影片列表切换处理
    	$(".film_list_box").each(function(){
    		if(this.getAttribute("data-index")==queryFilmListData.index){
    			$(this).show();
    			$(document).off("click",'.film_link',showFilmInfoPage);
    			$(document).on("click",'.film_link',showFilmInfoPage);
    			
    			$(document).off("click",'.film_detail_link',showFilmInfoPage);
    			$(document).on("click",'.film_detail_link',showFilmInfoPage);
// 	        			$(".film_list").on("click",showFilmInfoPage);
    		}
    	});
    	var posterLoad = new imgLazyLoad(".film_poster img");
    	window.addEventListener("scroll", posterLoad.loadListener, false);
  	}
  	//点击影院名称查询影院列表方法
    function showCinemaList(){
    	var bathPath = $("#basePath").val();
		require([bathPath+'js/cityandcinema/cityandcinema.js'], function (cityandcinema){
			cityandcinema.initCinema(showCinemaOpts,bathPath);
		});
    }
  	//点击影片项显示影片详情方法
  	function showFilmInfoPage(){
  		var bathPath = $("#basePath").val();
  		var filmId = this.getAttribute("data-filmId");
		require([bathPath+'js/filminfo/filminfo.js'], function (filmInfo){
			filmInfo.initFilmInfoPage("filmListWraper",bathPath,filmId);
		});
  	}
  	function getCinemaInfo(){
  		$.ajax({
	        url:$("#basePath").val()+"info/cinemadetail.do",
	        data:{	
	        	cinemaid:queryFilmListData.cinemaId
	        },
	        dataType:'json',
	        success:function(result) {
	        	if(result.cinema){
	        		result.basePath = document.getElementById("basePath").value;
		        	var render = template.compile(cinemaLineTem);
		    		var html = render(result);
		    		document.getElementById("cinemaLine").innerHTML=html;
		    		$(document).off("click",'#cinemaLineBox',showCinemaDetail);
		    		$(document).on("click",'#cinemaLineBox' ,showCinemaDetail);
	        	}
	        },
	        error:function(){
				alert("获取影院详情失败！");
	        }
	    });
  	}
  	//查看影院详情
  	function showCinemaDetail(){
  		var bathPath = $("#basePath").val();
  		require([bathPath+'js/cinemadetail/cinemadetail.js'], function (cinemaDetail){
  			cinemaDetail.init(bathPath,queryFilmListData.cinemaId);
		});
  	}
	  	function hashChangeCallBack(newHash,oldHash){
	  		
	  	}
	  	return{
	  		"initPage":initPage,
	  		"getFilmListByCinema":getFilmListByCinema,
	  		"getFilmList":getFilmList,
	  		"getHotFilmList":getHotFilmList,
	  		"getComingFilmList":getComingFilmList,
	  		"showCinemaList":showCinemaList
	  		//"hashChangeCallBack":hashChangeCallBack
	  	};
    })();
    
    var imgLazyLoad = function(selector){
    	var windowHeight = $(window).height();	//可视窗口高度
    	var eleList = document.querySelectorAll(selector); //需加载元素集合
    	var eleArray = new Array();
		for(var i=0;i<eleList.length;i++){
			eleArray.push(eleList[i]);
		}
		//滚动检测
    	var loadListener = this.loadListener = function(){
    		if(eleArray.length>0){
    			var el = eleArray[0];
    			if(el.getBoundingClientRect().top<windowHeight){
    				setTimeout(loadImg(el),500);
    			}
    		}
    	};
    	//加载图片
    	function loadImg(el){
    		el.src=el.getAttribute("data-src");
    		el.setAttribute("data-loaded",1);
    		eleArray.shift();
    		loadListener();
    	}
    	this.loadListener();
	};