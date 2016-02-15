template.config('openTag','<#');
template.config('closeTag', '#>');

//查询影片排期列表数据
var queryShowData={
		"filmId":"",
		"cinemaId":304,
		"cinemaName":"北京CBD",
		"showDate":getDateYYYYMMDD(new Date()),
		"start":0,
		"num":500,
		"index":0,
		"showDateBox":"todayFilmShowBox" 
};
//查询影院列表配置数据
var showCinemaOpts = {
		'hideEle':['showWraper'],
		'callback':'fastView.getFilmShowByCinema',
		'cityId':'8022251040',
		'cityName':'北京',
		'locCityId':'8022251040',
		'locCityName':'北京'
};
window.onload = function(){
	historyRec.replaceView({'viewId':'showWraper'},"","");
	//查询指定影片场次处理
	var filmId = getParam("filmid");
	if(filmId){
		queryShowData.filmId = filmId;
	}
	var lastCinemaId  = window.localStorage.lastCinemaId;		//上次访问影院id
	var lastCinemaName  = window.localStorage.lastCinemaName; 	//上次访问影院名称
	var lastCityId  = window.localStorage.lastCityId;			//上次访问城市id
	var lastCityName  = window.localStorage.lastCityName;		//上次访问城市名称
	if(lastCinemaId && lastCinemaId!='null'){
		queryShowData.cinemaId  = lastCinemaId;
	}
	if(lastCinemaName && lastCinemaName!='null'){
		queryShowData.cinemaName = lastCinemaName;
	}
	if(lastCityId && lastCityId!='null'){
		showCinemaOpts.cityId = lastCityId;
	}
	if(lastCityName && lastCityName!='null'){
		showCinemaOpts.cityName = lastCityName;
	}
	fastView.initFilmShowHeader();
};
var fastView = (function(exports){
  	//日期按钮事件绑定
    function bindShowDateEvent(){
    	$(document).off("click",'#showDateBtnBox a',getFilmShowByDate);
		$(document).on("click",'#showDateBtnBox a',getFilmShowByDate);
    }
    //影片放映头部处理
    function initFilmShowHeader(){
    	var dateToday = new Date(); //今天
    	var dateTomorrow = getFutureDate(dateToday,1); //明天 
    	var objFilmShowHeader = {"localtoday":dateToday.format("M月d日"),"localtomorrow":dateTomorrow.format("M月d日"),
    								"querytoday":getDateYYYYMMDD(dateToday),"querytomorrow":getDateYYYYMMDD(dateTomorrow),
    								"cinemaName":queryShowData.cinemaName};
    	var html = template('filmShowHeaderTem', objFilmShowHeader);
    	document.getElementById('filmShowHeader').innerHTML = "";
    	document.getElementById('filmShowHeader').innerHTML = html;
    	bindShowDateEvent();
    	//getFilmShowByDate()
    	//alert($('#showDateBtnBox a')[0]);
    	getFilmShowByDate.call($('#showDateBtnBox a')[0]);
    	//$('#showDateBtnBox a')[0].click();
    	getLocationInSl();
    }
    //根据影院获取影片排期
    function getFilmShowByCinema(cinemaId,cinemaName,cityId,cityName,locCityId,locCityName){
    	window.history.back(-1);
    	if(locCityId && locCityId!=queryShowData.locCityId){
        	showCinemaOpts.locCityId = locCityId;
        	showCinemaOpts.locCityName = locCityName;
    	}
    	if(cinemaId && cinemaId!=queryShowData.cinemaId){
        	$("#heaCinemaName").text(cinemaName);
        	queryShowData.cinemaId = cinemaId;
        	queryShowData.cinemaName = cinemaName;
        	showCinemaOpts.cityId = cityId;
        	showCinemaOpts.cityName = cityName;
        	getFilmShow(queryShowData);
        }else{
        	accordion(queryShowData.showDateBox);
        }
    	//bindShowDateEvent();
    }
    //根据日期获取影片排期
    function getFilmShowByDate(){
    	$('#showDateBtnBox a').removeClass("current");
    	$(this).addClass("current");
     	var index = this.getAttribute("data-index");         
		queryShowData.index=index;
		queryShowData.showDate = this.getAttribute("data-date");
    	$(".show_list_box").hide();
    	if(index==0){ 
    		queryShowData.showDateBox="todayFilmShowBox";
    		$("#todayFilmShowBox").show();
    	}else{
    		queryShowData.showDateBox="tomorrowFilmShowBox";
    		$("#tomorrowFilmShowBox").show();
    	}
    	getFilmShow(queryShowData);
	}
  	//获取影片排期
    function getFilmShow(queryShowData){
    	if(queryShowData.index==0){ 
    		document.getElementById('todayFilmShowBox').innerHTML="";
    	}else{
    		document.getElementById('tomorrowFilmShowBox').innerHTML = "";
    	}
    	var url = $("#basePath").val()+"filmfast/showlist.do?filmid="+queryShowData.filmId+
    									"&cinemaid="+queryShowData.cinemaId+
    									"&showdate="+queryShowData.showDate+
    									"&start="+queryShowData.start+
    									"&num="+queryShowData.num;

    	$('#'+queryShowData.showDateBox).html("");
    	$('#'+queryShowData.showDateBox).load(url,null,
    			function(response){
    		console.log(response);
					accordion(queryShowData.showDateBox);
				}
    	);

    	window.localStorage.lastCinemaId=queryShowData.cinemaId;
    	window.localStorage.lastCinemaName=queryShowData.cinemaName;
    	window.localStorage.lastCityId=showCinemaOpts.cityId;
    	window.localStorage.lastCityName=showCinemaOpts.cityName;
// 	        	$.ajax({
// 	    	        url:$("#basePath").val()+"info/filmshow.do",
// 	    	        data:{
// 	    	        	filmid:queryShowData.filmId,
// 	    	        	cinemaid: queryShowData.cinemaId,
// 	    	        	showdate: queryShowData.showDate,
// 	    	        	start: queryShowData.start,
// 	    	        	num: queryShowData.num
// 	    	        },
// 	    	        dataType:'json',
// 	    	        success:function(result) {
// 	    	        	initFilmShowList(result,queryShowData.index);
// 	    	        },
// 	    	        error:function(){
// 	    	        	//alert("系统异常！");
// 	    	        }
// 	    	    });        	
    }
    //生成影片放映列表
// 	        function initFilmShowList(filmShowData,index){
// 	        	window.localStorage.setItem("lastCinemaId",queryShowData.cinemaId);
// 	        	window.localStorage.setItem("lastCinemaName",queryShowData.cinemaName);
// 	        	window.localStorage.setItem("lastCityId",showCinemaOpts.cityId);
// 	        	window.localStorage.setItem("lastCityName",showCinemaOpts.cityName);
// 	        	if(filmShowData && filmShowData.data && filmShowData.data.length>0){
// 		        	var html = getFilmShowListHtml(filmShowData);
// 		        	document.getElementById(queryShowData.showDateBox).innerHTML = html;
// 		        	accordion(queryShowData.showDateBox);//排期列表手风琴样式处理
// 	        	}
// 	        }
    
    //生成影片放映列表
// 	        function getFilmShowListHtml(filmShowData){
// 	        	var filmShowList = {"filmshowlist":[],
// 	        						"basepath":$("#basePath").val(),
// 	        						"cinemaid":queryShowData.cinemaId};
// 		    	var showRecord = {};
// 		    	//放映列表转换成 {"fid":[showinfo,showinfo]}格式
// 		    	for(var i=0;i<filmShowData.data.length;i++){
// 		    		var shwoInfo = filmShowData.data[i].show;
// 		    		if(!showRecord[shwoInfo.fid]){
// 		    			showRecord[shwoInfo.fid] = new Array();
// 		    		}
// 		    		shwoInfo["timestart"] = getDateHHCMI(new Date(shwoInfo.starttime*1000)); //放映开始时间处理
// 		    		shwoInfo["timeend"] = getDateHHCMI(new Date(shwoInfo.endtime*1000)); //放映结束时间处理
// 		    		showRecord[shwoInfo.fid].push(shwoInfo);
// 		    	}
// 		    	//放映列表转换成 数据模板需要格式{"filmshowlist":[{"fid":"1","filmname":"1","showlist":[]}]}
// 				for(e in showRecord){
// 		    		var filmShowInfo = new Object();
// 		    		filmShowInfo["fid"] = e;	//影片id
// 		    		filmShowInfo["filmname"] = showRecord[e][0].filmname;	//影片名称
// 		    		filmShowInfo["showlist"] = showRecord[e];	//影片放映信息
// 		    		filmShowList["filmshowlist"].push(filmShowInfo);
// 		    	}
// 				filmShowData="";
// 				return template('filmShowTem', filmShowList);
// 	        }
    //点击影院名称查询影院列表方法
    function showCinemaListBySl(){
    	cinemaListView.init(showCinemaOpts,$("#basePath").val());
    }
    function chooseShow(showId,filmId,availablechannel,availableseatcnt,starttime){
    	var timeStart = new Date(starttime*1000);//影片开始时间
    	var timeNow = new Date();//当前时间
// 	        	if(timeStart<timeNow){
// 	        		alert("抱歉，该场次已放映！");
// 	        		return false;
// 	        	}
    	if(availablechannel==0){
    		alert("抱歉，该场次不支持网购！");
    		return false;
    	}
    	if(availableseatcnt==0){
    		alert("抱歉，该场次影票已售罄！");
    		return false;
    	}
    	window.location = $("#basePath").val()+"filmseat/seat.do?cinemaid="+queryShowData.cinemaId+"&showid="+showId+"&filmid="+filmId+"&showdate="+queryShowData.showDate+"&sectionid=01";
    }
    
  	//获取定位
    function getLocationInSl(){
    	//updateLocation();
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
//        	 alert(position.coords.latitude);
//        	 alert(position.coords.longitude);
    	 $.ajax({
    	        url:$("#basePath").val()+"util/nearestcinema.do",
    	        data:{
       	        	lon:position.coords.longitude,
       	        	lat:position.coords.latitude
//         	        	lon:"116.46881103515625",
//         	        	lat:"39.91684625681369"
    	        },
    	        dataType:'json',
    	        success:function(result) {
//        	        	alert(result.cinema.city.cid);
//        	        	alert(result.cinema.city.name);
					if(result && result.status==0){
						var locId = result.cinema.city.cid;
						var locName = result.cinema.city.name;
						showCinemaOpts.locCityId = locId;
        	        	showCinemaOpts.locCityName = locName;
        	        	if(locId!=showCinemaOpts.cityId){
							if(confirm("当前定位城市为"+locName+"，是否切换")){
								$("#heaCinemaName").text(result.cinema.appshortname);
					        	queryShowData.cinemaId = result.cinema.cid;
					        	queryShowData.cinemaName = result.cinema.appshortname;
					        	showCinemaOpts.cityId = locId;
					        	showCinemaOpts.cityName = locName;
					        	getFilmShow(queryShowData);
							}else{
								return false;;
							}
						}
					}else{
						alert("抱歉，定位处理失败！");
					}
    	        },
    	        error:function(){

    	        }
    	    }); 
    }
    function locationError(){
    	
    }
    exports.initFilmShowHeader = initFilmShowHeader; 
    exports.getFilmShowByCinema = getFilmShowByCinema;
    exports.getFilmShowByDate = getFilmShowByDate;
    exports.getFilmShow = getFilmShow;
    //exports.initFilmShowList = initFilmShowList;
    //exports.getFilmShowListHtml = getFilmShowListHtml;
    exports.showCinemaListBySl = showCinemaListBySl;
    exports.chooseShow = chooseShow;
    exports.getLocationInSl = getLocationInSl;
    return exports;
})(fastView||{});

//手风琴样式处理
function accordion(elId){
	var accHeader = document.getElementById(elId).querySelectorAll(".accordion_header"); //手风琴头部元素
	var accSign = document.getElementById(elId).querySelectorAll(".acc_sign"); 
    for(var i=0;i<accHeader.length;i++){
		accHeader[i].addEventListener("click",toggleAcc,false);
	}
	//第一个手风琴内容元素展开
	if(accHeader.length>0){
		document.getElementById(elId).querySelectorAll(".accordion_content")[0].style.display="block";
    	$(accSign[0]).removeClass("i006");
		$(accSign[0]).addClass("i007");
	}
    function toggleAcc(){
		var currIndex = 0;
		for(var i=0;i<accHeader.length;i++){
			if(accHeader[i].nextElementSibling!=this.nextElementSibling){
				accHeader[i].nextElementSibling.style.display="none";
				$(accSign[i]).removeClass("i007");
    			$(accSign[i]).addClass("i006");
			}else{
				currIndex = i;
			}
    	}
		var accContentNode = this.nextElementSibling;
		
		if(accContentNode.style.display!="block"){
			accContentNode.style.display="block";
			$(accSign[currIndex]).removeClass("i006");
			$(accSign[currIndex]).addClass("i007");
		}else{
			accContentNode.style.display="none";
			$(accSign[currIndex]).removeClass("i007");
			$(accSign[currIndex]).addClass("i006");
		}
	}
}