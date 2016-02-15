function code() {
	var code = document.getElementById('code');
	code.onclick = function () {
		this.src='include/code.php?tm='+Math.random();
	};
};