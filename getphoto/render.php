<?php

  $url = "";
  if(array_key_exists('link',  $_POST)) {
    $url = $_POST['link'];
  }


  if(strlen($url) <= 0 && array_key_exists('url',  $_REQUEST)) {
    $url = $_REQUEST['url'];
  }

function save_new_file($filename, $content) {
  file_put_contents($filename, $content);
}
  
function getContent($url_) {
  $body_ = "";
  if($url_ && strlen($url_) > 0) {
    if(strrpos( $url_, 'http') === false) {
       $url_ = 'http://'.$url_;
    }
    try {
      $body_             = file_get_contents($url_);
      $body_             = preg_replace('<head>','', $body_);
      $body_             = preg_replace('</head>','', $body_);
      $body_             = preg_replace('<body>','', $body_);
      $body_             = preg_replace('</body>','', $body_);
      //$body_ = '<div id="Info" rel="'.$url_.'"></div>' . $body_;
      $file = './data.html';
      if(stripos($body_, "xml version") > 0) {
        $file = './data.xml';
      }
      save_new_file($file, $body_);
    } catch (Exception $e) {
    	echo $e->errorMessage();
    }
  }
  return $body_;
}
  echo getContent($url);
  
?>
