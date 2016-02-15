var CINEMA_IMAGE_SERVER_NAME = "http://images.wandafilm.com/uploadServer/";
//var CINEMA_IMAGE_SERVER_NAME = "http://10.199.202.23:20010/uploadServer/";
function getParams(encode) {
	//var str="";
	var url =String(window.location);
	if (url.indexOf('?')>0) {
		//str=url.substring(url.indexOf("?")-0+1);
		return url.substring(url.indexOf("?")-0+1);
	}
	//if(encode){
		//str=decodeURI(str);
	//}
	return "";
}

function getParam(key,encode){
	var params=getParams(encode);
	if(params && params!=null){
		var args=params.split("&");
		for(var i=0;i< args.length;i++){
			var param=args[i].split("=");
			if(param[0] == key){
				return param[1];
			}
		}
		return "";
	}
}
function checkMobile(s){
	/*验证手机号 以1开始的十一位数字 */
	return (/^1[0-9][0-9]\d{8}$/).test(s);
}
function checkNumber(s){
	/*验证数字 以1开始的十一位数字 */
	return (/^[1-9][0-9]*$/).test(s);
}
function countLength(s){
	return s.replace(/[^\x00-\xff]/g, 'xx').length;
}
function required(s){
	if(s){
		return true;
	}
	return false;
}
function checkRealName(name){
	return name.length<20 && name.length>3;
}
function getCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
    	var temp=unescape(arr[2]);
    	if(temp=='""'){
    		temp=null;
    	}
		return temp;
	}
	return null;
}
/*获取URL参数列表*/
function getRequestParams(encode){
	var url = String(window.location);
	if (url.indexOf('?')>0) {
		return url.substring(url.indexOf("?")-0+1);
	}
	return "";
}
/*获取Url参数值，*/
function getRequestParam(key,encode){
	var params=getParams(encode);
	if(params && params!=null){
		var args=params.split("&");
		for(var i=0;i< args.length;i++){
			var param=args[i].split("=");
			if(param[0] == key){
				return param[1];
			}
		}
		return "";
	}
}
//获取用户真实IP 
function get_client_ip() { 
	var $ip="";
    if (getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")){
    	$ip = getenv("HTTP_CLIENT_IP"); 
    }else if (getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"),"unknown")){
    	$ip = getenv("HTTP_X_FORWARDED_FOR"); 
    }else if (getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")){
    	$ip = getenv("REMOTE_ADDR");
    }else if (isset ($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")) {
    	$ip = $_SERVER['REMOTE_ADDR']; 
    }else{
    	$ip = "undefined";
    } 
    return ($ip); 
} 
//获取浏览器地理定位
//enableHighAcuracy: true,指示浏览器获取高精度的位置，默认为false
//timeout: 5000指定获取地理位置的超时时间，默认不限时，单位为毫秒
function getLocation(success,error,options){
	if (navigator.geolocation){
	    navigator.geolocation.getCurrentPosition(success,error,options);
	}
}
/*function getLocation(onSuccess,onError,options){
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(
    		function(position){
				onSuccess(position);
				alert("success latitude:"+position.coords.latitude+" longitude:"+position.coords.longitude);
				return "北京";
			},function(err){
				
				alert("error");
				return "南京";
			},
    		{enableHighAcuracy: true,timeout: 5000}
		);
	}
}*/
function sortCity(data){
	for(var i=0;i<data.length;i++){
		var tempCity = null;	
		for(var j=i+1;j<data.length;j++){
			if(data[i].city.firstletter>data[j].city.firstletter){
				tempCity = data[i];
				data[i] = data[j];
				data[j] = tempCity;
				tempCity = null;
			}
		}
	}
	return data;
}
function sortSeatByCol(data){
	for(var i=0;i<data.length;i++){
		var temp = null;
		for(var j=i+1;j<data.length;j++){
			if(data[i].seat.colindex>data[j].seat.colindex){
				temp = data[i];
				data[i] = data[j];
				data[j] = temp;
				temp = null;
			}
		}
	}
	return data;
}
function sortSeat(data){
	for(var i=0;i<data.length;i++){
		var temp = null;	
		for(var j=i+1;j<data.length;j++){
			if(data[i].seat.rowindex>data[j].seat.rowindex){
				temp = data[i];
				data[i] = data[j];
				data[j] = temp;
				temp = null;
			}
		}
	}
	return data;
}

function seatTo2D(data){
	var temp2d=[];
	var index=0;
	for(var i=0;i<data.length;i++){
		index=data[i].seat.rowindex-1;
		if(temp2d.length<index+1){
			for(var j=temp2d.length;j<index+1;j++){
				temp2d.push([]);
			}
		}
		temp2d[index].push(data[i]);
	}
	for(var i=0;i<temp2d.length;i++){
		temp2d[i]=sortSeatByCol(temp2d[i]);
	}
	return temp2d;
}
/*function sortCity(data){
	var cityList = cityObj.data;
	for(var i=0;i<cityList.length;i++){
		var tempCity = null;	
		for(var j=i+1;j<cityList.length;j++){
			if(cityList[i].city.firstletter>cityList[j].city.firstletter){
				tempCity = cityList[i];
				cityList[i] = cityList[j];
				cityList[j] = tempCity;
				tempCity = null;
			}
		}
	}
	cityObj.data = cityList;
	showCity()
}*/
/*	格式化时间格式，用于评论时间，以分钟为单位的时间
 * 	param format
 * 		yyyy-MM-dd hh:mm:ss
 * 		YYYY年MM月dd日hh小时mm分ss秒
 * 		yyyy年MM月dd日
 * 		MM/dd/yyyy
 * 		yyyyMMdd
 * 		yyyy-MM-dd hh:mm:ss
 * 		yyyy.MM.dd hh:mm
 * */

Date.prototype.format = function(format){
	var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
	};
	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	}
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		}
	}
	return format;
} 
function formatTime(t){
	var today=new Date();
	var d=new Date(t);
	var m=today.getTime()-d.getTime();
	if(m<=0){
		m=1000;
	}
	if(m<60*1000){
		return Math.floor(m/1000)+"秒前";
	}else if(m<60*60*1000){
		return Math.floor(m/(1000*60))+"分前";
	}else if(m<60*60*1000*24){
		return Math.floor(m/(1000*60*60))+"小时前";
	}else if(m<60*60*1000*24*7){
		return Math.floor(m/(1000*60*60*24))+"天前";
	}else if(m<60*60*1000*24*7*56){
		return Math.floor(m/(1000*60*60*24*7))+"周前";
	}else{
		return Math.floor(m/(1000*60*60*24*7*52))+"年前";
	}
}
function UrlEncode(str){
	var ret="";
	var strSpecial="!\"#$%&'()*+,/:;<=>?[]^`{|}~%";
	var tt= "";
	for(var i=0;i<str.length;i++){
		var chr = str.charAt(i);
		var c=str2asc(chr);
		tt += chr+":"+c+"n";
	if(parseInt("0x"+c) > 0x7f){
		ret+="%"+c.slice(0,2)+"%"+c.slice(-2);
	}else{
		if(chr==" ")
			ret+="+";
		else if(strSpecial.indexOf(chr)!=-1)
			ret+="%"+c.toString(16);
		else
			ret+=chr;
		}
	}
	return ret;
}
function UrlDecode(str){
  var ret="";
  for(var i=0;i<str.length;i++){
   var chr = str.charAt(i);
    if(chr == "+"){
      ret+=" ";
    }else if(chr=="%"){
     var asc = str.substring(i+1,i+3);
     if(parseInt("0x"+asc)>0x7f){
      ret+=asc2str(parseInt("0x"+asc+str.substring(i+4,i+6)));
      i+=5;
     }else{
      ret+=asc2str(parseInt("0x"+asc));
      i+=2;
     }
    }else{
      ret+= chr;
    }
  }
  return ret;
}