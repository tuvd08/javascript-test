/**
 * This is about <code>plugin-zing-mp3.user.js</code>.
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 2:38:16 AM-May 6, 2012
 * @deprecated use <code>zing-mp3-tools.js</code>
 */


// ==UserScript==
// @name           Get files music
// @description    Automate get links from zing.mp3.vn
// @include        http://mp3.zing.vn/*
// @include        https://mp3.zing.vn/*
// @include        http://*mp3.zing.vn/*
// @version        0.1
//
// ==/UserScript==

var script = document.getElementById('tuvd08mp3');
if(!script) {
  script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", "http://svbuichu.com/javascript/zing-mp3/zing-mp3-tools.js");
  script.src = "http://svbuichu.com/javascript/zing-mp3/zing-mp3-tools.js";
  script.id = "tuvd08mp3";
  var body = top.document.body;
  body.appendChild(script);
}
