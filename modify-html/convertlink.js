// ==UserScript==
// @Author Vu Duy Tu
// @name Set link HTML by url
// @description Automate replace text content 'http://'  'https://' by HTML link.
// @version 0.3
//
// ==/UserScript==

function HashMap() {
  var MAP = {
    key : [],
    value : [],
    put : function(k, v) {
      var id = this.indexOfKey(k);
      if (id >= 0) {
        this.value[id] = v;
      } else {
        id = this.size();
        this.key[id] = k;
        this.value[id] = v;
      }
    },
    newMap : function() {
      this.key = [];
      this.value = [];
    },
    keys : function() {
      return this.key;
    },
    values : function() {
      return this.value;
    },
    size : function() {
      return this.key.length;
    },
    indexOfKey : function(key) {
      for ( var i = 0; i < this.size(); ++i) {
        if (key === this.key[i]) {
          return i;
        }
      }
      return -1;
    },
    containsKey : function(key) {
      for ( var i = 0; i < this.size(); ++i) {
        if (key === this.key[i]) {
          return true;
        }
      }
      return false;
    },
    get : function(oj) {
      if (typeof oj === "number" && this.indexOfKey(oj) >= 0) {
        return this.value[oj];
      } else if (this.containsKey(oj)) {
        var i = this.indexOfKey(oj);
        if (i >= 0) {
          return this.value[i];
        }
      }
      return "";
    },
    getKey : function(i) {
      if (i < this.size()) {
        return this.key[i];
      }
      return "";
    },
    getValue : function(i) {
      if (i < this.size()) {
        return this.value[i];
      }
      return "";
    }
  };
  return MAP;
}

var ReplaceLink = {
  map : new HashMap(),
  Reference : "http",
  replaceHTMLLinks : function(text) {
    var exp = /\b(https?)(:\/\/)([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/igm;
    return text.replace(exp, "<a target='_blank' href='$1$2$3'>$1&#30;$2$3</a>");
  },
  replaceOnlyLink : function() {
    ReplaceLink.Reference = "@Reference";
    ReplaceLink.replaceLink();
  },
  replaceLink : function() {
    var all = document.body.getElementsByTagName('*');
    var element;
    var textCt = "";
    for ( var i = 0; i < all.length; ++i) {
      element = all[i];
      var textAll = element.innerHTML;
      this.map.newMap();
      var childs = element.childNodes;
      for ( var k = 0; k < childs.length; k++) {
        elm = childs[k];
        if (elm) {
          textCt = String(elm.nodeValue);
          if (textCt && textCt.length > 0 && (textCt.indexOf('http:') >= 0 || textCt.indexOf('https:') >= 0) && textCt.indexOf(ReplaceLink.Reference) >= 0) {
            this.map.put(textCt, ReplaceLink.replaceHTMLLinks(textCt));
          }
        }
      }
      if (this.map.size() > 0) {
        for ( var t = 0; t < this.map.size(); t++) {
          textAll = textAll.replace(this.map.getKey(t), this.map.getValue(t));
        }
        element.innerHTML = textAll;
      }
      
    }
    
    ReplaceLink.Reference = "http";
  }
};

// setTimeout(ReplaceLink.replaceLink, 1000);

