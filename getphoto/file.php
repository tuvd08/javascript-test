<?php
/*
 * example:
 * $fp = fopen('data.txt', 'w');
 * fwrite($fp, '1');
 * fwrite($fp, '23');
 * fclose($fp);
 */

function save_new_file($filename, $content) {
  file_put_contents($filename, $content);
}

function save_to_file($filename, $content) {
  
  echo "save file: ". $filename;
  // Let's make sure the file exists and is writable first.
  if(is_writable($filename)) {
    // In our example we're opening $filename in append mode.
    // The file pointer is at the bottom of the file hence
    // that's where $somecontent will go when we fwrite() it.
    if(!$handle = fopen($filename, 'a')) {
      echo "Cannot open file ($filename)";
      exit;
    }
    // Write $somecontent to our opened file.
    if(fwrite($handle, $content) === FALSE) {
      echo "Cannot write to file ($filename)";
      exit;
    }
    fclose($handle);
  } else {
    echo "The file $filename is not writable";
  }
}

function save_array_to_file($filename, $b) {
  if(!is_resource($filename)) {
    if(!$file = fopen($filename, 'w+')) return false;
  } else {
    $file = $filename;
  }
  foreach($b as $key = > $val) {
    fwrite($file, (is_int($key) ? chr(6).(string) $key : chr(5).$key));
    if(is_array($val)) {
      fwrite($file, chr(0)); //array starts
      save_array_to_file($file, $val);
      fwrite($file, chr(1)); //array ends
    }
    elseif(is_int($val)) {
      fwrite($file, chr(2).(string) $val); //int
    }
    elseif(is_string($val)) {
      fwrite($file, chr(3).$val); //string
    }
  }
  if(!is_resource($filename)) fclose($file);
  return true;
}

function read_array_from_file($filename) {
  if(!is_resource($filename)) {
    if(!$file = fopen($filename, 'r')) return false;
  } else {
    $file = $filename;
  }
  $ret = array();
  $key = '';
  $val = null;
  $mod = 0;
  while(!feof($file)) {
    $b = fread($file, 1);
    if(ord($b) < 9) {
      if($val != null) {
        if($mod == 2) $val = (int) $val;
        if($mod == 3) $val = (string) $val;
        $ret[$key] = $val;
        $key = '';
        $val = null;
        $mod = 0;
      } else {
        if(ord($b) == 0) $mod = 0;
        elseif(ord($b) == 1)
        return $ret;
        else {
          if($mod == 5) $key = (string) $key;
          if($mod == 6) $key = (int) $key;
          $mod = ord($b);
        }
      }
    } else {
      if($mod == 5 || $mod == 5) $key. = $b;
      elseif($mod == 0)
      $val = read_array_from_file($file);
      else $val. = $b;
    }
  }
  if(!is_resource($filename)) fclose($file);
  return $ret;
}

?>
