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

    mysql_select_db('svbuichu', $sqlcn); 
    $strQuery = "SELECT * FROM `contact_test`";
    $result= mysql_query($strQuery);

    $table="";
    while($row=mysql_fetch_array($result))  {
      $table .= "<tr valign='top' align='center'>\n";
      $table .= "  <td align='left'>" .  $row['email'] . "</td>\n";
      $table .= "  <td align='left'>" .  $row['message'] . "</td>\n";
      $table .= "</tr>\n\n";
    }

mysql_close($sqlcn);
?>

<table width="90%" cellspacing="0" cellpadding="4" border="1" align="center" id="cpform_table" class="tborder" style="border-collapse: separate;">
  <thead>
    <tr valign="top" align="center">
	    <td class="thead">Email</td>
	    <td class="thead">Messages</td>
    </tr>
  </thead>
  <tbody>
<?php
 echo $table;
?>
  </tbody>
</table>

</body>
</html>
