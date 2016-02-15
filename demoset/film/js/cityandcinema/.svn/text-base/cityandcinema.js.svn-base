template.config('openTag','<#');
template.config('closeTag', '#>');

//城市列表页面模板
var cityPageTem = '<section id="cityListWraper" class="city_list_wraper page">'+
						'<div id="cityHeader" class="header_nav_box">'+
							'<div class="header_nav">'+
								'<div class="back"><a href="javascript:window.history.back(-1);"><span class="back_img icon24 i400"></span></a></div>'+
								'<span class="title repos fzl">城市列表</span>'+
								//'<span id="test1"></span>'+
							'</div>'+
						'</div>'+ 
						'<div id="cityBox" onscroll="topStop(this)" class="speedup">'+
							'<div class="city_list">'+
								'<div class="city_bar"><span class="bar_title">当前选定城市</span></div>'+
								'<div class="city_item" onclick="cityListView.chooseCity(\'<#=cityId#>\',\'<#=cityName#>\')"><#=cityName#></div>'+
							'</div>'+
							'<div class="city_list">'+
								'<div class="city_bar"><span class="bar_title">定位城市</span></div>'+
								'<div class="city_item" onclick="cityListView.clickLoctionCity()"><span id="locCity"><#=locCityName#></span><input type="button" onclick="cityListView.getCityByLocation()" class="ref_city_btn fzs" value="刷新"/></div>'+
							'</div>'+
							'<div id="cityListBox" class="city_list_box">'+
							'</div>'+
						'</div>'+	
						'<div id="stopBar" class="stop_bar">'+  
							'<span id="stopBarText"></span>'+
						'</div>'+
					'</section>';
//城市列表数据模板
var cityListTem = 	'<ul class="city_list">'+
						'<#for(e in citylist){ #>'+
							'<#if(citylist[e].length>0){#>'+
							'<li class="city_letter_list top_stop_ele_box" name=<#=e#> >'+
								'<div class="top_stop_ele" data-letter=<#=e#> >'+
										'<div class="city_bar">'+  
											'<span class="bar_title letter"><#=e#></span>'+
										'</div>'+
								'</div>'+
								'<ul>'+
								'<#for(var i=0;i<citylist[e].length;i++){ #>'+
									'<#var cityInfo = citylist[e][i]; #>'+
									'<li class="city_item" onclick="cityListView.chooseCity(\'<#=cityInfo.city.cid#>\',\'<#=cityInfo.city.name#>\')" >'+
										'<span class="city_name"><#=cityInfo.city.name#></span>'+
									'</li>'+
								'<#}#>'+
								'</ul>'+
							'</li>'+
							'<#}#>'+
						'<#}#>'+
					'</ul>';
//城市首字母选择条模板
var citySliderTem = '<ul id="citySliderBar" sytle="height:<#=boxheight#>px;" >'+
						'<#for(var i=0;i<firstLetterList.length;i++){ #>'+
							'<li onclick="cityListView.srollToCity(\'<#=firstLetterList[i]#>\');" style="height:<#=elheight#>px;line-height:<#=elheight#>px;" ><#=firstLetterList[i]#></li>'+
						'<#}#>'+
					'</ul>'+
					'<div id="cityLetterAlt"></div>';
/*
 * 影院列表处理对象
 * opts参数说明
 * opts.hideEle 数组		显示影院列表时需要隐藏的元素列表
 * opts.callback 选择影院的回调函数
 * opts.cityId  当前城市id
 * opts.cityName 当前城市名称
 */
var cinemaListView = (function(){
	//影院列表页面模板
	var cinemaPageTem = '<section id="cinameListWraper" class="cimane_list_wraper page">'+
							'<div class="header_nav_box">'+
								'<div class="header_nav">'+
									'<div class="back"><a href="javascript:window.history.back(-1);"><span class="back_img icon24 i400"></span></a></div>'+
									'<span class="title fzl">选择影院</span>'+
									'<div class="oper fzs" onclick="cinemaListView.showCityList()"><span class="oper_img icon24 i200"></span><span id="cityName" class="fzs"></span></div>'+
								'</div>'+
							'</div>'+
							'<div id="cinameListBox" class="cinema_list_box">'+
							'</div>'+
						'</section>';
	//影院列表数据模板
	var cinemaListTem = '<ul class="cinema_list">'+
							'<#for(var i=0;i<data.length;i++){ #>'+
								'<#var cinemaInfo = data[i]; #>'+
								'<li class="cinema_item" onclick="cinemaListView.chooseCinema(\'<#=cinemaInfo.cinema.cid#>\',\'<#=cinemaInfo.cinema.appshortname#>\')" >'+
									'<p class="cinema_name fzl"><#=cinemaInfo.cinema.name#></p>'+
									'<p class="cinema_address fzs"><#=cinemaInfo.address#></p>'+
									'<img src="<#=basePath#>images/cinema_info/cinema_link.png" class="oper_arrow" />'+
								'</li>'+
							'<#}#>'+
						'</ul>';
	var opts={};
	var _bathPath;
	//影院列表页面初始化
	function init(options,bathPath){
		_bathPath=bathPath;
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css"; 
		document.getElementsByTagName("head")[0].appendChild(link);
		link.href = bathPath+"css/cityandcinema/cityandcinema.css";
		
		opts=options||{};
		var cinemaPageRender = template.compile(cinemaPageTem);
		var cinemaPageHtml = cinemaPageRender();
		$("#cinameListWraper").remove();
		document.body.innerHTML+=cinemaPageHtml;
		historyRec.pushView({'viewId':'cinameListWraper'},"","");
		get(opts.cityId,opts.cityName);
	}
	//获取影院列表数据
	function get(cityId){
		$.ajax({
	        url:_bathPath+"info/cinema.do",
	        data:{
	        	cityid:cityId
	        },
	        dataType:'json',
	        success:function(result) {
	        	renderView(result);
	        },
	        error:function(){
	        	alert("系统异常！");
	        }
	    });
	}
	//生成影院列表
	function renderView(cinemaList){
		var cinemaListRender = template.compile(cinemaListTem);
		cinemaList.basePath = _bathPath;
		var cinemaListHtml = cinemaListRender(cinemaList);
		document.getElementById("cinameListBox").innerHTML=cinemaListHtml;
		document.getElementById("cityName").innerHTML=cinemaList.data[0].cinema.city.name;//选择城市设置
		show();
	}
	//展现影院列表页面
	function show(){
		if(opts&&opts.hideEle){
			for(var i=0;i<opts.hideEle.length;i++){
				var eleId = opts.hideEle[i];
				document.getElementById(eleId).style.display="none";
			}
		}
  	}
	function chooseCinema(cinemaId,cinemaName){
		if(opts&&opts.hideEle){
			for(var i=0;i<opts.hideEle.length;i++){
				var eleId = opts.hideEle[i];
				document.getElementById(eleId).style.display="block";
			}
		}
		var cityOpts = cityListView.getOpts();
		eval(opts.callback).call(this,cinemaId,cinemaName,opts.cityId,opts.cityName,cityOpts.locCityId,cityOpts.locCityName);
		document.getElementById("cinameListWraper").style.display="none";
	}
	//点击影院列表展现城市列表方法
	function showCityList(){
		var cityOpts = {'hideEle':['cinameListWraper'],
							'callback':'cinemaListView.getCinemaListByCity',
							'cityId':opts.cityId,
							'cityName':opts.cityName,
							'locCityId':opts.locCityId,
							'locCityName':opts.locCityName};
		cityListView.init(cityOpts,_bathPath);
	}
	//选择城市后查询影院列表方法
	function getCinemaListByCity(cityId,cityName){
		window.history.back(-1);
		opts.cityId = cityId;	//设置当前城市编号
		opts.cityName = cityName; //设置当前城市名称
		get(cityId);
	}
	return{
		"init":init,
		"chooseCinema":chooseCinema,
		"getCinemaListByCity":getCinemaListByCity,
		"showCityList":showCityList
	};
})();

/*
 * 城市列表处理对象
 * opts参数说明
 * opts.hideEle 数组		显示城市列表时需要隐藏的元素列表
 * opts.callback 选择城市的回调函数
 * opts.cityId 		当前城市编号
 * opts.cityName 	当前城名称
 * opts.locCityId	定位城市编号
 * opts.locCityName 定位城市名称
 */
var cityListView = (function(){ 
	var opts={};
	var citySliderColl=[];
	var cityListHeight=0;
	var _bathPath;

	function init(options,bathPath){
		_bathPath=bathPath;
		opts=options||{};
		var cityPageRender = template.compile(cityPageTem);
		var cityPageHtml = cityPageRender(opts);
		$("#cityListWraper").remove();
		document.body.innerHTML+=cityPageHtml;
		historyRec.pushView({'viewId':'cityListWraper'},"","");
		get();
	}
	function get(){
		$.ajax({
	        url:_bathPath+"info/city.do",
	        data:{},
	        dataType:'json',
	        success:function(result) {
	        	renderView(result);
	        },
	        error:function(){

	        }
	    }); 
	}
	function renderView(cityResult){
		var cityColl = {'A':[],'B':[],'C':[],'D':[],'E':[],'F':[],'G':[],
                'H':[],'I':[],'J':[],'K':[],'L':[],'M':[],'N':[],
                'O':[],'P':[],'Q':[],'R':[],'S':[],'T':[],
                'U':[],'V':[],'W':[],'X':[],'Y':[],'Z':[]};
		for(var i=0;i<cityResult.data.length;i++){
			var cityInfo = cityResult.data[i];
			cityColl[cityInfo.city.firstletter].push(cityInfo);
		}
		citySliderColl=[];
		for(e in cityColl){
			if(cityColl[e].length>0){
				citySliderColl.push(e);
			}
		}
		var cityList = {"citylist":cityColl};
		var cityListRender = template.compile(cityListTem);
		var cityListHtml = cityListRender(cityList);
		document.getElementById("cityListBox").innerHTML=cityListHtml;
		show();
	}
	function show(){
		if(opts&&opts.hideEle){
			for(var i=0;i<opts.hideEle.length;i++){
				var eleId = opts.hideEle[i];
				document.getElementById(eleId).style.display="none";
			}
		}
		//城市列表高度处理
		var listHeight = $("#cityListWraper").height()-$("#cityHeader").height();
		cityListHeight = listHeight;
		$("#cityBox").height(listHeight);		
		initCitySlider();
	}
	var itemHeight;				//城市选择栏城市名称首字母元素高度
	var citySliderBorderTop;
	var citySliderLetter;
	var domCityLetterAlt;		//显示选择的城市选择栏城市名称首字母元素
	function initCitySlider(){
		var sliderHeight = Math.floor(cityListHeight-40);
		itemHeight = Math.floor(sliderHeight/citySliderColl.length); 
		var citySliderRender = template.compile(citySliderTem); 
		var citySliderHtml = citySliderRender({"firstLetterList":citySliderColl,"boxheight":sliderHeight,"elheight":itemHeight});
		document.getElementById("cityListWraper").innerHTML+=citySliderHtml;
		//城市索引事件处理
		var domCitySlider = document.getElementById("citySliderBar");
		domCitySlider.addEventListener("touchstart", citySliderStart, false);
		//domCitySlider.addEventListener("touchmove", citySliderMove, false);
		//domCityLetterAlt = document.getElementById("cityLetterAlt");
	}
	//城市索引触摸处理
	function citySliderStart(e){
		document.addEventListener("touchmove", citySliderMove, false);
		document.addEventListener("touchend", citySliderEnd, false);
		$("#citySliderBar").addClass("highlight");
		citySliderBorderTop = this.getBoundingClientRect().top;
		var ev = window.event || e;
		ev.preventDefault();
		ev.stopPropagation();
		var citySliderLetter = getCitySliderLetter(ev);
		document.getElementById("cityLetterAlt").innerHTML=citySliderLetter;
		document.getElementById("cityLetterAlt").style.display="block";
	}
	//城市索引触摸滑动处理
	function citySliderMove(e){
		var ev = window.event || e;
		ev.preventDefault();
		ev.stopPropagation();
		setTimeout(function(){
			var citySliderLetter = getCitySliderLetter(ev);
			if(citySliderLetter){
				document.getElementById("cityLetterAlt").innerHTML=citySliderLetter;
				srollToCity(citySliderLetter);
			}
		},100);
		
	}
	function citySliderEnd(){
		document.removeEventListener("touchend", citySliderEnd, false);
		document.removeEventListener("touchmove", citySliderMove, false);
		$("#citySliderBar").removeClass("highlight");
		document.getElementById("cityLetterAlt").style.display="none";
		srollToCity(citySliderLetter);
	}
	//获取滑动城市选择边栏的首字母
	function getCitySliderLetter(ev){
		var touch = ev.touches[0];
		var offsetY = touch.pageY-citySliderBorderTop;
		if(offsetY<0){
			offsetY=0;
		}
		var index = Math.floor(offsetY/itemHeight);
		citySliderLetter = citySliderColl[index];
		//console.log(citySliderLetter);
		return citySliderLetter;
	}
	function chooseCity(cityId,cityName){
		if(opts&&opts.hideEle){
			for(var i=0;i<opts.hideEle.length;i++){
				var eleId = opts.hideEle[i];
				document.getElementById(eleId).style.display="block";
			}
		}
		eval(opts.callback).call(this,cityId,cityName);
		document.getElementById("cityListWraper").style.display="none";
	}
	function clickLoctionCity(e){
		var ev = window.event||e;
		ev.stopPropagation();
		chooseCity(opts.locCityId, opts.locCityName);
	}
	//获取定位
	function getCityByLocation(e){
		var ev = window.event||e;
		ev.stopPropagation();
//		updateLocation();
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(updateLocation, locationError,{
		        // 指示浏览器获取高精度的位置，默认为false
		        enableHighAcuracy: true,
		        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
		        timeout: 5000
		    });
		}	
	}
	//定位成功后回调方法
	function updateLocation(position){
//		 alert(position.coords.latitude);
//		 alert(position.coords.longitude);
		 $.ajax({
		        url:_bathPath+"util/nearestcinema.do",
		        data:{
		        	lon:position.coords.longitude,
		        	lat:position.coords.latitude
//		        	lon:"116.46881103515625",
//		        	lat:"39.91684625681369"
		        },
		        dataType:'json',
		        success:function(result) {
		        	opts["locCityId"] = result.cinema.city.cid;
		        	opts["locCityName"] = result.cinema.city.name;
		        	$("#locCity").text(result.cinema.city.name);
		        },
		        error:function(){

		        }
		    }); 
	}
	function locationError(){

	}
	//滚动到选择的城市首字母城市列表
	function srollToCity(letter){
		var cityLetter = document.getElementsByName(letter)[0];
		var domCityBox = document.getElementById("cityBox");
		setTimeout(function(){
			domCityBox.scrollTop=0;
			var scTop = getAbsTop(cityLetter)-$("#cityHeader").height();
			domCityBox.scrollTop=scTop;
		},100);
		

	}
	function getOpts(){
		return opts;
	}
	return {
		"init":init,
		"chooseCity":chooseCity,
		"clickLoctionCity":clickLoctionCity,
		"getCityByLocation":getCityByLocation,
		"getOpts":getOpts,
		"srollToCity":srollToCity
	};
})();
var exports = {
	"initCinema":cinemaListView.init
};

if ( typeof define === "function" && define.amd ) {
	define(exports);
}



//元素停留在容器顶部方法
function topStop(obj){
	//$("#test1").text(getAbsTop(($(".top_stop_ele_box")[0]),obj));
	var eleBox = obj.querySelectorAll(".top_stop_ele_box");
	for(var i=0;i<eleBox.length;i++){
		var _this = eleBox[i];
		var eleBoxTop = getAbsTop(_this); //停留元素容器距外部容器顶部距离
		var stopTopEle =  _this.querySelector(".top_stop_ele");  //需要停留元素
		var eleBoxHeight = _this.getBoundingClientRect().height; //需要停留元素容器高度
		var stopTop = $("#cityHeader").height();//停留位置距屏幕顶部距离
		if(getAbsTop(($(".top_stop_ele_box")[0]))>stopTop){
			$("#stopBar").hide();
		}else{
			if(eleBoxTop<=stopTop && eleBoxHeight+eleBoxTop>stopTop){
				var letter = stopTopEle.getAttribute("data-letter");
				$("#stopBarText").text(letter);
				$("#stopBar").show();
			}
		}
	}
}
//obj定位元素  target比较元素
function getAbsTop(obj,target){
	var  top=obj.getBoundingClientRect().top;
	return top;
} 

