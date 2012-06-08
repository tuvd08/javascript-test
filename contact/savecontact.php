<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
					 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr">
	<head id="head">
		<title>Save contact</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" type="text/css" href="slider.css"/>
  </head>
<body id="body">

<?php
// we connect to example.com and port 3307
$sqlcn = mysql_connect('localhost:3306', 'gxlongchau', 'hanhphuclc12');
if (!$sqlcn) {
    die('Could not connect: ' . mysql_error());
}


$message = trim($_POST["message"]);
$email = trim($_POST["email"]);
if(strlen($message) > 0 && strlen($email) > 0){
  mysql_select_db('svbuichu', $sqlcn); 
  saveLink($message, $email);
  echo "<script type=\"text/javascript\"> function abc() { alert(\"The contact sent.\"); window.location=\"contactInfo.php\";} abc();</script>";
} else {
  echo "<script type=\"text/javascript\"> function abc() { alert('You must input all information.'); window.location=\"index.php\";} abc();</script>";
}


function saveLink($message, $email) {
  mysql_query("INSERT INTO `contact_test` values ('".$message."', '".$email."')");
}


 function existInArray($x, $arr) {
   if(count($arr) == 0) return "false";
   $y = array($x);
   $c = array_diff($y,$arr);
   if($c == $y) return "true";
   else return "false";
 }

mysql_close($sqlcn);
?>

</body>
</html>
