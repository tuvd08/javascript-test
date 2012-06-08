<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
					 "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" dir="ltr">
	<head id="head">
		<title>Add db</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link rel="stylesheet" type="text/css" href="style.css"/>
    <script id="Browser" type="text/javascript" src="Browser.js"></script>
    <script id="photo" type="text/javascript" src="photo.js"></script>
    <script id="show-pic" type="text/javascript" src="show-pic.js"></script>
    <script id="photo_1" type="text/javascript" src="photo_1.js"></script>
    <script type="text/javascript">
  function innerContent(id, text) {
    if(document.getElementById(id)) {
      document.getElementById(id).innerHTML = text;
    }
  }
  var b_txt = "", url_b="", URLPT = "", docXML = document ;
// commons function 
  function waitingTime() {
    var img = new Image();
    img.src = "waiting.gif";
    PIC.displayElmPic(img);
  }
  function submitform() {
    URLPT = document.forms['submit_form']['link'].value;
    onSubmit(URLPT);
    FS.local = URLPT;
    //FS.local = "https://picasaweb.google.com/home";
  }

  function searchPhoto() {
    var search = 'https://picasaweb.google.com/data/feed/base/all?kind=photo&hl=vi&q=';
    var key = escape(document.forms['submit_form']['link'].value);
    onSubmit((search+key));
    FS.local = "https://picasaweb.google.com/home";
  }
  
  function onSubmit(url) {
    var post = 'render.php?url='+url;
    eXo.core.Browser.ajaxAsyncGetContent(post, ajaxLoad);
    waitingTime();
  }
  
// callback
  function ajaxLoad(text) {
    if(text.indexOf('xml version') > 0 ) {
      renderXML();
    }else {
      innerContent('renderData', text);
      setTimeout('renderIMG()', 1000);
      PIC.hiddenAll();
    }
  }
// render by xml  
  function renderXML() {
    //waitingTime();
    docXML = FSXML.loadXMLDoc('./data.xml');
    FSXML.buildContentByXML();
  }
// render by html
  function renderIMG() {
    // case 1: picasa
    var txt = "";
    var ns = document.getElementsByTagName('noscript');
    if(ns && ns.length > 1){
      txt = ns[1].innerHTML;
      txt = String(txt).replace(/&lt;/ig, '<').replace(/&gt;/ig, '>');
    }
    // case 2: G+
    
    //calculator 
    var inf = document.getElementById('Info');
    if(inf) {
      url_b = inf.getAttribute('rel');
      document.body.appendChild(inf);
    }
    
    var ct = document.getElementById('renderData');
    ct.innerHTML = unescape(txt);
    ct.style.display = "block";
    document.getElementById('Browser').src = "Browser.js";
    document.getElementById('photo').src = "photo.js";
    document.getElementById('show-pic').src = "show-pic.js";
    setTimeout('initFs()', 1000);
  }
  
  function initFs() {
    FS.local = URLPT;
    FS.button();
    FS.clearA('renderData');
    initOnload();
  }
</script>

  </head>
<body id="body">
  <div id="Info1">Render all photos of picasa by url. <br>
  Ex: https://picasaweb.google.com/107683927616466689286/18May2011WelcomeStevan<br>
  
  </div>
  <form id="submit_form" name="submit_form" action="render.php" method="post">
    <div>
      <input type="hidden" name="url" id="url" value=""/>
      <input type="text" name="link" id="link" size="41" title="Nhap duong dan" value=""/>
      <input type="button" onclick="submitform()" id="submit" title="Display photos by URL" value="Display photos by URL"/>
      
    </div>
  </form>
  
  <div id="renderData" style="display:none"></div>
  
  
</body>
</html>
