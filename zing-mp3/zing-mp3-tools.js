/**
 * This is about <code>zing-mp3-tools.user.js</code>.
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 10:46:39 AM-May 5, 2012
 * @deprecated use <code>BetterExample.js</code>
 */

if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}

var Core = {
  hasqr : function() {
    if (typeof window.$ === 'function') {
      return true;
    } else {
      return false;
    }
  },
  require : function(url, isFirst) {
    var isAdd = true;
    var isqr = this.hasqr();
    if (isqr) {
      var scrs = $('script[src^=' + url + ']');
      isAdd = (typeof scrs === 'undefined' || scrs.length <= 0);
    } else {
      var scripts = top.document.getElementsByTagName('script');
      for ( var i = 0; i < scripts.length; i++) {
        if (String(scripts[i].src).indexOf(url) >= 0) {
          isAdd = false;
        }
      }
    }
    if (isAdd) {
      var scrElm = top.document.createElement('script');
      scrElm.type = 'text/javascript';
      scrElm.src = url;
      var head = top.document.head;
      if (isFirst) {
        head.insertBefore(scrElm, head.firstChild);
      } else {
        head.appendChild(scrElm);
      }
    }
  },
  createElement : function(type, id, calzz, src, style, inner) {
    var elm = document.createElement(type);
    if(this.hasqr()) {
      var elmqr = $(elm);
      if (id && id != '')
        elm.id = id;
      if (src && src != '')
        elm.src = src;
      if (calzz && calzz != '')
        elmqr.addClass(calzz);
      if (style && style != '')
        elmqr.attr('style', style);
      if (inner && inner != '')
        elmqr.html(inner);
    } else {
      if(id && id != '') elm.id = id;
      if(calzz && calzz != '') elm.className = calzz;
      if(style && style != '') elm.setAttribute('style', style);
      if(inner && inner != '') elm.innerHTML = inner;
    }
    return elm;
  },
  hasClass : function(elemt, className) {
    var reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
    return reg.test(elemt['className']);
  },
  close: function(x) {
    if($(x)) {
      $(x).hide();
    }
  },
  findFirstDescendantByClass : function(root, elementName, clazz) {
    if (!root)
      return null;
    var elements = root.getElementsByTagName(elementName);
    var ln = elements.length;
    for ( var k = 0; k < ln; k++) {
      if (this.hasClass(elements[k], clazz))
        return elements[k];
    }
    return null;
  },
  findAncestorByClass : function(element, clazz) {
    if (element == null)
      return null;
    var parent = element.parentNode;
    while (parent != null) {
      if (this.hasClass(parent, clazz))
        return parent;
      parent = parent.parentNode;
    }
    return null;
  },
  findFirstChildByClass : function(root, elementName, cssClass) {
    if (elementName != null)
      elementName = elementName.toUpperCase();
    var elements = root.childNodes;
    for ( var k = 0; k < elements.length; k++) {
      if (elementName == elements[k].nodeName && this.hasClass(elements[k], cssClass)) {
        return elements[k];
      }
    }
    return null;
  },
  findFirstChildByTagName : function(root, tagName) {
    if (tagName == null) {
      return null;
    }
    var elements = root.childNodes;
    for ( var k = 0; k < elements.length; k++) {
      if (tagName == elements[k].tagName) {
        return elements[k];
      }
    }
    return null;
  },
  getDocumentXML : function(xFile) {
    var xmlDoc = null;
    /**
    * old code
        if (document.implementation && document.implementation.createDocument) {
          // this is the W3C DOM way, supported so far only in NN6+
          xmlDoc = document.implementation.createDocument("", "theXdoc", null);
        } else if (typeof ActiveXObject != "undefined") {
          // make sure real object is supported (sorry, IE5/Mac)
          if (document.getElementById("msxml").async) {
            xmlDoc = new ActiveXObject("Msxml.DOMDocument");
          }
        }
        if (xmlDoc && typeof xmlDoc.load != "undefined") {
          // load external file (from same domain)
          xmlDoc.load(xFile);
        } else {
          var reply = confirm("This example requires a browser with XML support, " + "such as IE5+/Windows or Netscape 6+.\n \nGo back to previous page?");
          if (reply) {
            history.back();
          }
        }
    **/
    var xmlhttp = null;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {// code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", xFile, false);
    xmlhttp.send();
    var txt = String(xmlhttp.responseText);
    //"<?xml version="1.0" encoding="UTF-8"?>\n"
    if(txt.indexOf('xml version') < 0) {
      txt = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" + txt;
    }
    if (window.DOMParser) {
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(txt, "text/xml");
    } else // Internet Explorer
    {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async = false;
      xmlDoc.loadXML(txt);
    }
    
    return xmlDoc;
  }
};

(function initFirst() {
  if(!Core.hasqr()) {
    Core.require("http://code.jquery.com/jquery-1.4.4.min.js", true);
  }
  if(!document.getElementById('msxml')) {
    var object = Core.createElement("object", "msxml");
    object.setAttribute("classid", "CLSID:2933BF90-7B36-11d2-B20E-00C04F983E60");
    top.document.body.appendChild(object);
  }
})();

function MP3() {
  var ojPm3 = {
    title : "",
    type : ".mp3",
    url : ""
  };
  return ojPm3;
};

var ZingMp3 = {
  xlmUrl : "",
  mp3s : [],
  documentXML: null,
  setXlmUrl: function(xmlurl) {
    this.xlmUrl = xmlurl;
  },
  setDocument: function() {
    this.documentXML = Core.getDocumentXML(this.xlmUrl);
  },
  analysisXMl: function() {
    if(this.xlmUrl.length > 0) {
      var documentXML = this.documentXML;
      if(!documentXML) {
        this.setDocument();
        documentXML = this.documentXML;
      }
      var j = 0;
      if(documentXML) {
        var data = documentXML.getElementsByTagName("data")[0];
        var items = data.getElementsByTagName("item");
        for ( var i = 0; i < items.length; i++) {
          var item = items[i];
          if(item) {
            var mp3 = new MP3();
            mp3.type = item.getAttribute("type");
            mp3.title = String(Core.findFirstChildByTagName(item, "title").textContent).trim() + "_" +
                        String(Core.findFirstChildByTagName(item, "performer").textContent).trim();
            mp3.url = String(Core.findFirstChildByTagName(item, "source").textContent).trim();
            this.mp3s[j] = mp3;
            j++;
          }
        }
      }
    }
  },
  blockInfo: function (info) {
    var div = document.getElementById('blockInfo');
    if (!div) {
      var style = "position: absolute;z-index:300000; overflow:auto; top: 100px; left: 30px; border:3px double gray; background: #ffffff; padding: 10px";
      div = Core.createElement('div', 'blockInfo', 'blockInfo', '', style);
      top.document.body.appendChild(div);
    }
    div.style.display = "block";
    var vl = "<a style=\"float:right\" href=\"javascript:void(0);\" onclick=\"Core.close('#blockInfo')\">X</a>----------" + info;
    div.innerHTML = vl;
  },
  getAllLink: function() {
    if(this.mp3s.length > 0) {
      var html = "";
      var txt = "<br/>----------------------";
      for ( var i = 0; i < this.mp3s.length; i++) {
        var mp3 = this.mp3s[i];
        html += "<br/>"+(i+1)+". <a href=\"" + mp3.url + "\">" + mp3.title + "</a> -- <a onclick=\"ZingMp3.play('"+ i +"')\">Play</a><span class=\"vdplay\" id=\"play" + i + "\"></span>";
        txt  += "<br/>" + mp3.url;
      }
      this.blockInfo(html + txt);
    } else {
      this.analysisXMl();
      if(this.mp3s.length > 0) {
        this.getAllLink();
      }
    }
  },
  wgetAllLink : function() {
    if(this.mp3s.length > 0) {
      var txt = "<br/>----------------------";
      for ( var i = 0; i < this.mp3s.length; i++) {
        var mp3 = this.mp3s[i];
        txt += "<br/>wget -O '" + mp3.title + "." + mp3.type + "' '" + mp3.url + "'";
      }
      this.blockInfo(txt);
    } else {
      this.analysisXMl();
      if(this.mp3s.length > 0) {
        this.wgetAllLink();
      }
    }
  },
  renderMenu: function() {
    var div = document.getElementById('dvMenu');
    if(!div) {
      var style = "position: absolute; z-index:290000; overflow:auto; top: 50px; left: 30px; border: 3px double gray; background: #ffffff; padding: 5px";
      div = Core.createElement("div", "dvMenu", "dvMenu", "", style);
      top.document.body.appendChild(div);
    }
    var html = "<a style=\"float:right\" href=\"javascript:void(0);\" onclick=\"Core.close('#dvMenu')\">X</a>";
    html += "<br/><a style=\"border: solid 1px gray; padding: 3px; background: #EEEEEE; display:block\" onclick=\"ZingMp3.getAllLink();\" href=\"javascript:void(0);\">Display all links</a>";
    html += "<br/><a style=\"border: solid 1px gray; padding: 3px; background: #EEEEEE; display:block\" onclick=\"ZingMp3.wgetAllLink();\" href=\"javascript:void(0);\">Download all</a>";
    div.innerHTML = html;
  },
  getURLXML : function() {
    var player = $('embed#player');
    if(player) {
      var data = player.attr('flashvars');
      if(data) {
        data = String(data+'"').replace(/&amp;/g, '",').replace(/&/g, '",').replace(/=/g, ':"');
        data = "var datas = {"+data+"}";
        eval(data);
        if(datas) {
          this.setXlmUrl(datas.xmlURL);
        }
        if(this.xlmUrl && this.xlmUrl.length > 0) {
          this.setDocument();
          this.renderMenu();
        }
      }
    }
  },
  play: function(id) {
    var player = $('#player');
    var flashvars = player.attr('flashvars');
    flashvars = flashvars.substr(0, flashvars.indexOf('&'));
    var newurl = 'songid=' + id;
    var play = $('#oplayer');
    var html = play.html();
    html = html.replace(flashvars, newurl);
    html = html.replace(flashvars, newurl);
    var oj = '<object height="77" width="640" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="oplayer">';
    oj += html + '</object>' ;
    $('.vdplay').html(' ');
    $('#play'+ id).html(oj);
  }
  
};

setTimeout('ZingMp3.getURLXML()', 2000);