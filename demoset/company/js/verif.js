//等在网页加载完毕再执行
window.onload = function () {
	code();
	//表单验证
	var fm = document.getElementsByTagName('form')[0];
	fm.onsubmit = function(){
		if(fm.title.value.length ==''){
			alert('标题不得为空');
			fm.title.value='';//清空
			fm.title.focus();//将焦点移至表单字段
			return false;
		}
		if(fm.content.value.length ==''){
			alert('内容不得为空');
			fm.content.value='';//清空
			fm.content.focus();//将焦点移至表单字段
			return false;
		}
		if(fm.tel.value.length ==''){
			alert('联系电话不得为空');
			fm.tel.value='';//清空
			fm.tel.focus();//将焦点移至表单字段
			return false;
		}
		if(fm.code.value.length!=4){
			alert('验证码必须是4位');
			fm.code.value='';//清空
			fm.code.focus();//将焦点移至表单字段
			return false;
		}
		return true;		
	};
};