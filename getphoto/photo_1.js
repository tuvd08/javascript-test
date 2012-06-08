/**
 * Created by The Sinh Vien Cong Giao Bui Chu Author : Vu Duy Tu
 * donrac@svbuichu.com March 10, 2012 - 1:51:01 AM
 */
String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
};
var FSXML = {
  docXML : document,
  text : "",
  getXhttp : function () {
    var xmlhttp = null;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
  },
  loadXMLDoc : function(fileUrl) {
    if(fileUrl && fileUrl.length > 0) {
      var xhttp = this.getXhttp();
      xhttp.open("GET", fileUrl, false);
      xhttp.send();
      this.docXML = xhttp.responseXML;
    }
    return this.docXML;
  },
  loadXMLString : function() {
    var txt = this.text;
    if (txt) {
      // "<?xml version="1.0" encoding="UTF-8"?>\n"
      if (txt.indexOf('xml version') < 0) {
        txt = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + txt;
      }
      var docXML = null;
      if (window.DOMParser) {
        var parser = new DOMParser();
        docXML = parser.parseFromString(txt, "txt/xml");
      } else { // Internet Explorer
        docXML = new ActiveXObject("Microsoft.XMLDOM");
        docXML.async = false;
        docXML.loadXML(txt);
      }
      this.docXML = docXML;
    }
    return this.docXML;
  },
  buildContentByXML: function() {
    if(this.docXML) {
      // for google rss      
      var medias = docXML.getElementsByTagName('media:group');
      if(medias && medias.length > 0) {
        var parent = document.getElementById("renderData");
        parent.innerHTML = "";
        var item, src, img, key, media;
        for(var i = 0; i < medias.length; ++i) {
          media = medias[i].getElementsByTagName('media:thumbnail')[0];
          item = FS.createElement('div', '', '');
          src = media.getAttribute('url');
          key = FS.getKeyGl(src);
          if(key && key.length > 0) {
            src = src.replace(key, 's144');
          }
          img = new Image();
          img.src = src;
          KEYIMG.IMGS[i] = img;
          img.onclick = PIC.displayPic;
          item.appendChild(img);
          parent.appendChild(item);
        }
        parent.style.display = "block";
        KEYIMG.maxSize = medias.length;
        PIC.hiddenAll();
        FS.button();
      }
    }
  }
};
