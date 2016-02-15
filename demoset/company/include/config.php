<?php
	$hostname = "localhost"; //定义连接到的MySQL服务器名
	$username = "root"; //定义用于连接的用户名
	$password = "xxyyhjjz"; //定义用于连接的密码
	$conn = mysql_connect($hostname,$username,$password); //打开Mysql连接
	mysql_select_db("enterprise",$conn);
	mysql_query("set names 'utf-8'");
?>