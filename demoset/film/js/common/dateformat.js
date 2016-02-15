//日期转换成yyyymmdd
function getDateYYYYMMDD(date){
	var tmpMonth = (date.getMonth()+1).toString();
	var month = tmpMonth.length==1?"0"+tmpMonth:tmpMonth;
	var day = date.getDate().toString().length==1?"0"+date.getDate().toString():date.getDate().toString();
	return date.getFullYear().toString()+month+day;
}
//日期转换成hh:mi
function getDateHHCMI(date){
	return (date.getHours().toString().length==1?"0"+date.getHours():date.getHours())+":"+(date.getMinutes().toString().length==1?"0"+date.getMinutes():date.getMinutes());
	
}
//日期转换成mm月dd日
function getLocalDateMMDD(date){
	var month = (date.getMonth()+1).toString();
	var day = date.getDate().toString();
	return month+"月"+day+"日";
}
//获取当前时间n天后的时间  入参Date today, Number n
function getFutureDate(today,n){
	return new Date(today.getTime()+n*24*60*60*1000);
}