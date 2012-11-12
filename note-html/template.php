<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

  </head>
  <body>
    <?php
      $data = $_REQUEST['data'];
    ?>
    
    <form id="Nform" name="Nform" method="post" action="http://svbuichu.com/note/rest/saverest?save=save" enctype="application/x-www-form-urlencoded" target="">
      <textarea name="data" id="data" style="border: 1px solid rgb(204, 196, 196); padding: 7px; display: block; font-size: 14px; line-height: 16px; font-family: monospace, Arial; width: 1155px; margin: auto; height: 62px; "><?php  echo $data; ?></textarea>
      <input name="save" value="save" type="text" id="save"/>
    </form>

    <script type="text/javascript">
      var textAre = document.getElementById('data');
      setTimeout(function () {
        document.getElementById('Nform').submit();
      }, 1000);
    </script>
  </body>
</html>
