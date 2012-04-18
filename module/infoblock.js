function infoblock(info, elm){
  var div = document.getElementById('block');
  if(!div) {
    var Pdiv = document.createElement("div");
    div = document.createElement("div");
    div.id = 'block';
    div.setAttribute("style","position: absolute; width: 400px; overflow:auto; top: 50px; left: 30px; border: solid 2px gray; background: #ffffff; padding: 10px");
    div.style.position = "absolute";
    div.style.width = "400px";
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