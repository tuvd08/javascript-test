function infoblock(info, elm){
  var div = document.getElementById('block');
  if(!div) {
    var Pdiv = document.createElement("div");
    div = document.createElement("div");
    div.id = 'block';
    div.setAttribute("style","position: absolute; width: 300px; overflow:auto; top: 50px; right: 30px; border: solid 2px gray; background: #ffffff; padding: 10px");
    div.style.position = "absolute";
    div.style.width = "300px";
    div.style.overflow = "auto";
    div.style.top = "50px";
    div.style.left = "30px";
    div.style.border = "solid 2px gray";
    div.style.background = "#ffffff";
    div.style.padding = "10px";
    Pdiv.appendChild(div);
    var myBody = top.document.getElementsByTagName("body")[0];
    myBody.appendChild(Pdiv);
  }
  
  var vl = "<br/>" + info;
  if(elm) {
    for (x in elm){
      vl += "<br/>" + x;
    }
  }
  div.innerHTML += vl;
}


(function(jQuery) {
  if(jQuery && jQuery.noConflict()) {
    var jq = jQuery.noConflict();
    function printLog(val) {
      var pr = "";
      if(jq.isArray(val)) {
         pr = '[';
         jq.each(val, function(i, it){
            pr += printLog(it) + ', ';         
         });
         pr += ']';
         pr = pr.replace(/, \]/, ']');
      }
      else if( typeof val === 'string') pr = "'"+val+"'";
      else if( typeof val === 'number') pr = String(val);
      else if( typeof val === 'object') {
        pr = '{';
        if(jq(val).length > 0) {
          if(jq(val).length > 1) {
            jq.each(jq(val), function(i, it) {
               pr += jq(it)[0].toString() + ', '
            });
            pr += 'END';
            pr = pr.replace(/\], END/, '');
          } else {
            pr += '[' + jq(val)[0] + ']';
          }
        } else {
          for(var i in val) {
            eval('var p = val.'+i+';');
            pr += i + ':' + printLog(p) + ', ';
          }
        }
        pr += '}';
        pr = pr.replace(/, \}/, '}');
      } else {
        pr = String(val);
      }
      return pr;
    }
    window.printLog = printLog;
  }
})(jQuery);
