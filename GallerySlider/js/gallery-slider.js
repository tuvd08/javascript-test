/**
 * This is about <code>gallery-slider.js</code>.
 * 
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 11:43:00 AM-Jun 4, 2012
 */

function newItem() {
  var ITEM = {
    type : "div",
    index : 0,
    width : 0,
    height : 0,
    content : "",
    style : "",
    clazz : "",
    id : "",
    img: null,
    src: "",
    getElm : function() {
      var elm = document.createElement(this.type);
      if (this.width > 0) {
        elm.style.width = this.width + "px";
      }
      if (this.height > 0) {
        elm.style.height = this.height + "px";
      }
      if (String(this.style).length > 0) {
        elm.setAttribute('style', this.style);
      }
      if (String(this.clazz).length > 0) {
        elm.className = this.clazz;
      }
      if (String(this.id).length > 0) {
        elm.id = this.id;
      }
      elm.innerHTML = this.content;
      return elm;
    }
  };
  return ITEM;
}
var GALLERY = {
  length : 0,
  items : [],
  
  indexHor : 0,
  idHor : "HorItemContent" + Math.floor((Math.random() * 100) + 1),
  contElmHor : null,
  currentLeft : 0,
  maxW : 0,
  widthItem : 0,
  
  container : new newItem(),
  builderHor : function(clazz, width, height) {
    this.container.width = width;
    this.container.height = height;
    this.container.clazz = clazz;
    this.widthItem = width;

    var contElm = this.container.getElm();
    var button = new newItem();
    button.clazz = "LeftButton DisableLeft";
    var buttonL = button.getElm();
    buttonL.onclick = this.clickButton;
    buttonL.style.top = ((height - 36)/2) + 'px';
    button.clazz = "LeftBg";
    var buttonBgL = button.getElm();
    buttonL.appendChild(buttonBgL);
    contElm.appendChild(buttonL);

    var item = new newItem();
    item.height = height;
    item.clazz = "HorItemContent Clearfix";
    item.id = this.idHor;
    item.width = this.maxW + 10;
    var elmContent = item.getElm();
    contElm.appendChild(elmContent);
    
    for ( var i = 0; i < this.length; i++) {
      elmContent.appendChild(this.setItem(i, width, height));
    }
    
    button.clazz = "RightButton";
    var buttonR = button.getElm();
    buttonR.onclick = this.clickButton;
    buttonR.style.top = ((height - 36)/2) + 'px';
    button.clazz = "RightBg";
    var buttonBgR = button.getElm();
    buttonR.appendChild(buttonBgR);
    contElm.appendChild(buttonR);
    
    return contElm;
  },
  setItem: function(id, width, height) {
    var item = new newItem();
    item.width = width;
    item.height = height;
    item.clazz = "Item";
    var elm = item.getElm();
    img = new Image();
    img.src = this.items[id].src;
    if(img.widht > width) {
      img.widht = width - 5;
    }
    if(img.height > height) {
      img.height = height - 5;
    }
    img.style.margin = "auto";
    elm.appendChild(img);
    var title = new newItem();
    title.clazz = "TitleImage";
    title.content = "<span>" + ((id*1)+1) + "/" + (this.length) + "</span>";
    title.width = (width - 10);
    elm.appendChild(title.getElm());
    return elm;
  },
  
  clickButton : function() {
    var clazz = String(this.className);
    if (clazz && clazz.indexOf('Disable') < 0) {
      if (clazz.indexOf('Left') >= 0) {
        var left = GALLERY.currentLeft + GALLERY.widthItem;
        if(left > 0 || GALLERY.indexHor == 1) {
          left = 0;
          this.className = clazz + " DisableLeft";
        }
        GALLERY.posisionElm.setPosision(GALLERY.contElmHor, GALLERY.currentLeft, left);
        GALLERY.currentLeft = left;
        GALLERY.indexHor -= 1;
        var rbt = GALLERY.Core.findFriendElementByClassName(this, 'div', 'RightButton', 'Next');
        if(rbt) {
          rbt.className = "RightButton";
        }
      } else if (clazz.indexOf('Right') >= 0) {
         var left = GALLERY.currentLeft - GALLERY.widthItem;
        if (left <= -(GALLERY.maxW - GALLERY.widthItem)) {
          left = -(GALLERY.maxW - GALLERY.widthItem);
          this.className = clazz + " DisableRight";
        }
        if (!GALLERY.contElmHor) {
          GALLERY.contElmHor = document.getElementById(GALLERY.idHor);
        }
        GALLERY.posisionElm.setPosision(GALLERY.contElmHor, GALLERY.currentLeft, left);
        GALLERY.currentLeft = left;
        GALLERY.indexHor += 1;
        var rbt = GALLERY.Core.findFriendElementByClassName(this, 'div', 'LeftButton', 'Previous');
        if(rbt) {
          rbt.className = "LeftButton";
        }
      }
    }
  },

  initExistItem : function(id) {
    var all = document.getElementById(id);
    if(all) {
      var items = all.getElementsByTagName('img');
      var ITEM;
      for ( var i = 0; i < items.length; i++) {
        ITEM = new newItem();
        ITEM.index = i;
        ITEM.src = items[i].src;
        this.items[i] = ITEM;
      }
      this.length = this.items.length;
    }
  },
  addTo : function(id, width, height) {
    var to = document.getElementById(id);
    if(to){
      this.maxW = (width * this.length);
      to.appendChild(this.builderHor("HorContainer", width, height));
    }
  },
  
  posisionElm : {
    oj : null,
    type : "",
    from : 0,
    to : 0,
    setPosision : function(oj, from, to) {
      this.oj = oj;
      this.from = from;
      this.to = to;
      this.changePosision();
    },
    changePosision : function() {
      if (this.oj) {
        var from = this.from, to = this.to;
        var dt = (to-from)/15;
        if(GALLERY.posisionElm.interV) {
          window.clearInterval(GALLERY.posisionElm.interV);
        }
        GALLERY.posisionElm.interV = window.setInterval( function() {
          if(dt > 0 && from > to || dt < 0 && from < to) {
            GALLERY.posisionElm.oj.style.left = to + "px";
            window.clearInterval(GALLERY.posisionElm.interV);
          } else {
            GALLERY.posisionElm.oj.style.left = (from) + "px";
            from += dt;
          }
        }, 10);
      }
    }
  },
  
  Core : {
    hasClass : function(elemt, className) {
      var reg = new RegExp('(^|\\s+)' + className + '(\\s+|$)');
      return reg.test(elemt['className']);
    },
    findAncestorByClass : function(element, clazz) {
      if (element == null)
        return null;
      var parent = element.parentNode;
      while (parent != null) {
        if (GALLERY.Core.hasClass(parent, clazz))
          return parent;
        parent = parent.parentNode;
      }
      return null;
    },
    findFriendElementByTagName : function(element, tagName, type) {
      var previousElement ;
      if(type == 'Previous') {
        previousElement = element.previousSibling ;
      } else {
        previousElement = element.nextSibling;
      }
      while (previousElement != null) {
        var nodeName = previousElement.nodeName ;
        if (nodeName != null) nodeName = nodeName.toLowerCase() ;
        if (nodeName == tagName) return previousElement ;
        if(type == 'Previous') {
          previousElement = previousElement.previousSibling ;
        } else {
          previousElement = previousElement.nextSibling;
        }
      }
      return null ;
    },
    findFriendElementByClassName : function(element, tagName, clazz, type) {
      var previousElement = GALLERY.Core.findFriendElementByTagName(element, tagName, type);;
      while (previousElement != null) {
        if (GALLERY.Core.hasClass(previousElement, clazz))
          return previousElement;
        previousElement = GALLERY.Core.findFriendElementByTagName(previousElement, tagName, type);
      }
      return null ;
    }
  }
  
};
