// ==UserScript==
// @name           Some js
// @description    no comment
// @version        0.1
//

var arrs = [ 'google_ads_frame', 'google_ads_frame1', 'google_ads_frame2', 'google_image_div', 'adsense_bottom' ];
for ( var i = 0; i < arrs.length; ++i) {
  var script = document.getElementById(arrs[i]);
  if (script) {
    script.style.display = "none";
    script.innerHTML = "";
  }
}

var script = document.getElementById('bogoxyz');
if (!script) {
  script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "http://svbuichu.com/mudim-0.8-r153.js");
  script.src = "http://svbuichu.com/mudim-0.8-r153.js";
  script.id = "bogoxyz";
  var head = top.document.getElementsByTagName("body")[0];
  head.appendChild(script);
}