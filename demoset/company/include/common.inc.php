<?php
//防止恶意调用
if(!defined('IN_TG')){
	exit('Access Defined!');
}
//设置字符集编码
header('Content-Type:text/html;charset=utf-8');

//创建一个自动转义状态的常量
define('GPC',get_magic_quotes_gpc());
//拒绝PHP低版本
if(PHP_VERSION<'4.1.0'){
	exit('Version is to Low!');	
}
//引入核心函数库
require 'global.function.php';
require 'mysql.function.php';

//执行耗时
define('START_TIME',_runtime());


//数据库连接
define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PWD','xxyyhjjz');
define('DB_NAME','enterprise');

//初始化数据库
_connect();//连接MYSQL数据库
_select_db();//选择指定的数据库
_set_names();//设置字符集

?>