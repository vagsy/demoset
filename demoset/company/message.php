<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>无标题文档</title>
<link href="css/index.css" rel="stylesheet" type="text/css" />
<link href="css/flash.css" rel="stylesheet" type="text/css" />
<script src="js/flash.js" type="text/javascript" language="javascript"></script>
<script src="js/code.js" type="text/javascript" language="javascript"></script>
<script src="js/verif.js" type="text/javascript" language="javascript"></script>
</head>
<body>
<?php include 'include/header.inc.php';?>
<div class="center">
	<?php include 'include/left.inc.php';?>
    <div class="column_page_right">
          <div class="column_page_right_1"><span>客户留言</span></div>
          <div class="column_page_right_2"></div>
          <div class="column_page_right_3"></div>
          <div class="column_page_right_content">
          		<div class="content_amount">
                <p align="center"><a href="#">>>查看留言</a></p>
                <p align="center">尊敬的客户:如果您对我们的服务有任何意见和建议请及时通知我们,我们将尽快给您满意的答复。</p>
                
                
                        <div id="message">
                            <form action="" method="post" enctype="multipart/form-data" name="form" id="form" onSubmit="return check()">
                                <table width="100%" border="0" cellpadding="0" cellspacing="1" align="center" class="NewsBody">
                            <tr height="28px" >
                                <td  align="left">主   题:</td>
                                <td><input type="text" name="title" class="text"/>(*必填)</td>
                            </tr>
                            <tr height="60px" >
                                <td  align="left">留言内容:</td>
                                <td><textarea name="content" class="text"></textarea>(*必填)</td>
                            </tr>
                                                        <tr height="28px" >
                                <td  align="left">公司名称:</td>
                                <td><input type="text" name="name" class="text"></td>
                            </tr>
                            <tr height="28px" >
                                <td  align="left">公司地址:</td>
                                <td><input type="text" name="address" class="text"></td>
                            </tr>     
                            <tr height="28px" >
                                <td  align="left">邮编:</td>
                                <td><input type="text" name="zipcode" class="text"></td>
                            </tr>
                            <tr height="28px" >
                                <td  align="left">联系人:</td>
                                <td><input type="text" name="person" class="text"/>(*必填)</td>
                            </tr>
                            <tr height="28px" >
                                <td  align="left">联系电话:</td>
                                <td><input type="text" name="tel" class="text">(*必填)</td>
                            </tr>
                            <tr height="28px" >
                                <td align="left">手机:</td>
                                <td><input type="text" name="mtel" class="text"></td>
                            </tr>

                            <tr height="28px" >
                                <td  align="left">联系传真:</td>
                                <td><input type="text" name="fax" class="text"></td>
                            </tr>
                            <tr height="28px" >
                                <td  align="left">E-mail:</td>
                                <td><input type="text" name="email" class="text"></td>
                            </tr>
                            <tr height="28px" >
                                <td  align="left">验证码:</td>
                                <td><input type="text" name="code" class="text code"><img src="include/code.php" id="code"/></td>
                            </tr>
                            <tr height="50px">
                                <td></td>
                                <td><input type="submit" name="submit" value="提交留言"> <input type="reset" value="重写"></td>
                            </tr>
                            </table>
                            </form>
                        </div>
                
                
                
                
                
                </div>
          </div>
    </div>
</div>
<?php include 'include/footer.inc.php';?>
</body>
</html>