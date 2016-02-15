<?php
//防止恶意调用
if(!defined('IN_TG')){
	exit('Access Defined!');
}

/**
*_connect()连接MYSQL数据库
*@access public
*@ return void 没有返回值
*/
function _connect(){
	//global 表示全局变量的意思,意图是将此变量在函数外部也能访问
	global $_conn;
	if(!$_conn = mysql_connect(DB_HOST,DB_USER,DB_PWD)){
		exit('数据库连接失败!');
	}
}


/**
*_select_db选择一款数据库
*@access public
*@ return void 没有返回值
*/
function _select_db(){
	if(!mysql_select_db(DB_NAME)){
		exit('找不到指定的数据库!');
	}
}

/**
*_set_names设置字符集
*@access public
*@ return void 没有返回值
*/

function _set_names(){
	if(!mysql_query('SET NAMES UTF8')){
		exit('字符集错误!');
	}
}

/**
*_query
*@access public
*@ return $result
*/
function _query($_sql){
	if(!$_result = mysql_query($_sql)){
		exit('SQL执行失败');
	}
	return $_result;
}


/**
*_fetch_array 只能获取一条数据组
*@param $_sql
*/
function _fetch_array($_sql){
	return mysql_fetch_array(_query($_sql),MYSQL_ASSOC);
}
/**
*_fetch_array_list可以返回指定数据集的所有数据
*@param $_result
*/
function _fetch_array_list($_result){
	return mysql_fetch_array($_result,MYSQL_ASSOC);
}

function _num_rows($_result){
	return mysql_num_rows($_result); 
}

/**
*_affected_rows表示影响到的记录数
*/

function _affected_rows(){
	return mysql_affected_rows();
}

/**
*_free_result销毁结果集
*@param $result
*/

function _free_result($_result){
	mysql_free_result($_result);
}
/**
*_is_repeat 判断是否有重复值出现
*@param $_sql
*@param $_info
*/
function _is_repeat($_sql,$_info){
	if(_fetch_array($_sql)){
		_alert_back($_info);
	}
}


/**
*_close 关闭数据库
*/
function _close(){
	if(!mysql_close()){
		exit('关闭异常');
	}
}

?>