<?php
require_once("Rest.inc.php");
$sqlcn = mysql_connect('localhost:3306', 'gxlongchau', 'GodOfLove12');
if (!$sqlcn) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db('gxlongchau_b', $sqlcn); 

class API extends REST 
{
	public $data = "";

	/*
	 * Public method for access api.
	 * This method dynmically call the method based on the query string
	 *
	 */
	public function processApi(){
		$func = strtolower(trim(str_replace("rest/","",$_REQUEST["rquest"])));
		
		if((int)method_exists($this,$func) > 0) {
			$this->$func();
		} else {
			$this->responseType("loi", 200, "text/html");	// If the method not exist with in this class, response would be "Page not found".
    }
	}
//fwrite
	private function getrest()
	{
		$pass = $this->_request["pass"];
		$key = time()."";
		$key = "khongbiet" . substr($key, 0, strlen($key)-3) . "like";
    if($pass == md5($key)) {
      $data = $this->getContent();
      if(count($data) == 0) {
        $data["content"] = "";
        $this->saveContent("", "", "1");
      }
      $this->sendResponse(array('content' => $data["content"], 'msg' => 'ok'), $this->_request["callback"]);
    } else {
      $this->sendResponse(array('msg' => 'error'), $this->_request["callback"]);
    }
    
	}
	
	private function sendResponse($data, $callback) {
		$json = $this->json($data);
		if($callback != null && strlen($callback) > 0) {
      $json = $callback."(".$json.");";
    } else {
		  $json = "var x = ".$json.";";
		}
		$this->response($json, 200);
	}

	private function saverest()
	{
		 $data = $this->_request["data"];
     $save = $this->_request["save"];//

     if($data == "dWoom"){
        // save
        $sdata = $this->getContent();
        if(count($sdata) > 0) {
          $this->updateContent($sdata["tmpcontent"], '1');
        }

        // remove
        $this->updateContentTem("no", "1");

        //response
         $this->sendResponse(array('status' => "OK"), $this->_request["callback"]);

     } else if($save == "save") {
        $this->updateContent($data, "1");
        $this->updateContentTem("save", "1");
        echo "save from template " . $data;
     } else if($data == "check") {
        $sdata = $this->getContent();
        if(count($sdata) > 0 && $sdata["tmpcontent"] == "save") {
          $this->updateContentTem("no", "1");
          $this->sendResponse(array('status' => "OK"), $this->_request["callback"]);
        }
     } else {
        $this->updateContentTem("no", "1");
        $this->sendResponse(array('status' => "OK"), $this->_request["callback"]);
     }
 
	}
	//Encode array into JSON
	private function json($data)
	{
		if(is_array($data)){
			return json_encode($data);
		}
	}

  private function updateContent($value, $index) {
    mysql_query("UPDATE `mynote` n SET `n`.`content` = '".$value."' WHERE `n`.index='".$index."'");
  }
  
  private function updateContentTem($value, $index) {
    mysql_query("UPDATE `mynote` n SET `n`.`tmpcontent` = '".$value."' WHERE `n`.index='".$index."'");
  }
  
  private function saveContent($value, $tvalue, $index) {
    mysql_query("INSERT INTO `mynote` values ('".$value."', '".$tvalue."', '".$index."')");
  }

  private function getContent() {
    $result= mysql_query("SELECT * FROM `mynote` n WHERE `n`.index='1'");
    $data = array();
    while($x=mysql_fetch_array($result))  {
       $data["content"] = $x["content"];
       $data["tmpcontent"] = $x["tmpcontent"];
    }
    return $data;
  }
}

// Initiiate Library
$api = new API;
$api->processApi();
mysql_close($sqlcn);
?>
