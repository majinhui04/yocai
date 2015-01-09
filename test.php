<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no" />
    <title>test-哟菜青年</title>
   
</head>
<body>
<h2>链接地址测试</h2>
<?php 
  $hostdir=dirname(__FILE__);

//获取本文件目录的文件夹地址

  $filesnames = scandir($hostdir);

//获取也就是扫描文件夹内的文件及文件夹名存入数组 $filesnames

  //print_r ($filesnames);

foreach ($filesnames as $name) {

//echo $name; 

$url="".$name;
$count = substr_count($name,'html');
if($count>0){
    $aurl = "<p><a href=\"".$url."\" target='_blank'>".$url."</a></p>";
    echo $aurl . "";
}else {

}




}

?>
</body>
</html>
