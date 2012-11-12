<?php
class DummyApi {
    static function reportUsr() {
        $imgId = 0+$_REQUEST['urlId'];
        $strDescr = $_REQUEST['urlAdd'];
        if ($imgId && $strDescr) {
            ?>okay-<div name='ajaxDebug'><ul>
                <li>OutAbstract::setStylePluginTaskUrlId[406]: <b>started</b></li>
                <li>Out.display(): <b>/Applications/xampp/xamppfiles/htdocs/wzw/output/default/ajaxMsg.php in 0.42ms</b></li>
                </ul>
                </div><?            
        } else {
            ?>wrong<div name='ajaxDebug'><ul>
                <li>OutAbstract::setStylePluginTaskUrlId[406]: <b>started</b></li>
                <li>CalcMember::ajaxAddToBlacklist[64]: <b>ERROR: invalid id</b></li>
                </ul>
                </div><?
        }
    }
}

if ($_REQUEST['plugin'] == 'api' || $_REQUEST['plugin'] == 'userarea') {

    if ($_REQUEST['task'] == 'ajaxReportUsr') {
        DummyApi::reportUsr();
    } else {
        ?><div name='ajaxError'><ul name="errList" alt="">
            <li><b>task <?=$_REQUEST['task']?>?</b></li>
            </ul></div><?        
    }
    
} else {
    ?><div name='ajaxError'><ul name="errList" alt="">
        <li><b>plugin?</b></li>
        </ul></div><?
}
?>
