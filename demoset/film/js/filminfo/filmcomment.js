var filmcomment = (function(){
	var filmCommentTem = '<div class="comment_box">'+		
							'<ul>'+
								'<#for (var i=0;i<data.length;i++) {#>'+
								'<#var profileUrl=data[i].comment.profile.photo.url#>'+
								'<#var proNick=data[i].comment.profile.nick?data[i].comment.profile.nick:"万达影迷"#>'+
								'<#var commentTime = fnFormatTime(data[i].comment.submittime*1000)#>'+
								'<li>'+
									'<#if(!profileUrl){profileUrl=basepath+"images/filminfo/default_user_profile.png"}#>'+
									'<img src="<#=profileUrl#>" width="36px" height="36px;" />'+
							        '<div class="comment_info">'+  
							            '<div class="comment_oper_info"><span class="nick"><#=proNick#></span><span class="comment_time"><#=commentTime#></span></div>'+
							            '<p class="comment_content"><#=data[i].comment.content#></p>'+
							        '</div>'+
							    '</li>'+
								'<#}#>'+
							'</ul>'+
						'</div>';
		
	var ifInitComment = 0;//评论是否载入
	var _filmId; //影片id
	var _start=0;
	var _num=5;
	var _boxId;
	var _bathPath;
	var ifLoadingComment = 0;  //是否正在获取评论数据
	function init(bathPath,boxId,filmId){
		_boxId=boxId;
		_filmId=filmId;
		_start=0;
		getComment(1);
		//添加评论滑动到底部加载数据方法监听
    	window.addEventListener('scroll', loadComment, false);
	}
	//获取并处理评论详情
    function getComment(ori){ 
    	$.ajax({
	        url:$("#basePath").val()+"info/filmcomment.do",
	        data:{	
	        	filmid:_filmId,
	        	start:_start,
	        	num:_num
	        },
	        dataType:'json',
	        success:function(result) {
	        	ifLoadingComment=0;
	        	renderComment(result,ori);
	        },
	        error:function(){
	        	ifLoadingComment=0;
				alert("获取影片评论失败！");
	        }
	    }); 
    }
    function renderComment(result,ori){
    	result.fnFormatTime = formatCommentTime;
    	result.basepath=$("#basePath").val();
    	var render = template.compile(filmCommentTem);
		var html = render(result);
    	if(ori==1&&ifInitComment==1){ //评论加载后进入评论
    		
    	}else{
    		if(ori==1&&ifInitComment==0){ //第一次进入评论
    			document.getElementById(_boxId).innerHTML = html;
    			ifInitComment = 1;
        	}else if(ori==2){ //加载更多评论
        		document.getElementById(_boxId).innerHTML += html;
        	}
    	}
    	if(result.data.length>0){
    		_start+=_num;
        	loadComment();
    	}
    }
    //评论滑动到底部加载数据方法
    function loadComment(){
    	if(ifLoadingComment==0){
	    	var bottomHeight = document.getElementById(_boxId).getBoundingClientRect().bottom-$(window).height();//页面距离底部高度
	    	if(bottomHeight<100 ){
	    		ifLoadingComment=1;
	    		getComment(2);
	    	}
    	}
    }
    //评论时间格式处理  入参 距1970毫秒数
    function formatCommentTime(ms){
    	var today=new Date();
    	var d=new Date(ms);
    	var m=today.getTime()-d.getTime();
    	if(m<=0){
    		m=1000;
    	}
    	if(m<60*1000){ //一分钟内
    		return "刚刚";
    	}else if(m<60*60*1000){
    		return Math.floor(m/(1000*60))+"分钟前";
    	}else if(m<60*60*1000*24){
    		return Math.floor(m/(1000*60*60))+"小时前";
//    	}else if(m<60*60*1000*24*7){
//    		return Math.floor(m/(1000*60*60*24))+"天前";
    	}else if(m<60*60*1000*24*365){
    		return d.format("M月d日");
    	}else{
    		return d.format("yyyy年M月d日");
    	}
    }
    return{
    	"init":init,
    	"loadComment":loadComment
    };
})();
if ( typeof define === "function" && define.amd ) {
	define(filmcomment);
}