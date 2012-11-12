<?php
require_once("Rest.inc.php");

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
    if($pass == md5("khongbiet")) {
      $file = file_get_contents('note.txt');
      $json = $this->json(array('content' => $file, 'msg' => 'ok'));
      $repo = $json;
      $callback = $this->_request["callback"];
      if($callback != null && strlen($callback) > 0) {
        $repo = $callback."(".$json.");";
      }
      
      $this->response($repo, 200);
    } else {
      $this->response($this->json(array('msg' => 'error')), 200);
    }
	}
	private function saverest()
	{
		 $data = $this->_request["data"];

     if($data == "dWoom"){
        // save
        $full = file_get_contents('tmp.txt');

        echo $full;
       // $note = fopen("note.txt","w");
     //   fwrite($note, $data);
      //  fclose($note);

        // remove
    //    file_put_contents('tmp.txt', "");

        //response
        $callback = $this->_request["callback"];
        $repo = "var X = 'not';";
        if($callback != null && strlen($callback) > 0) {
          $repo = $callback."(".$this->json(array('status' => "OK")).");";
        }
       // $this->response($repo, 200);

     } else {
      //  file_put_contents('tmp.txt', $data, FILE_APPEND | LOCK_EX);
        echo $data;

        $tmp = fopen("tmp.txt","w");
        fwrite($tmp, $data);
        fclose($tmp);
      
        //$this->response("var X = ".$this->json(array('index' => $this->_request["p"], 'data' => $data)) . ";", 200);
     }
     
	}
	//Encode array into JSON
	private function json($data)
	{
		if(is_array($data)){
			return json_encode($data);
		}
	}
}

// Initiiate Library
$api = new API;
$api->processApi();
?>
