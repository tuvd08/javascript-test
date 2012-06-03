/**
 * This is about <code>slider-scroll.js</code>.
 * 
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 10:43:00 PM-Jun 3, 2012
 * @depend on <code>timer.js</code>
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

var TYPE = [ 'horizontal', 'vertical' ];
var SLIDER_SCROLL = {
  length : 0,
  items : [],
  
  indexHor : 0,
  idHor : "HorItemContent" + Math.floor((Math.random() * 100) + 1),
  contElmHor : null,
  currentLeft : 17,
  widthIndex : [],
  maxW : 0,
  contW : 0,
  
  indexVer : 0,
  contElmVer : null,
  currentTop : 17,
  heightIndex : [],
  maxH : 0,
  contH : 0,
  
  container : new newItem(),
  builderHor : function(clazz, width, height) {
    this.container.width = width;
    this.container.height = height;
    this.container.clazz = clazz;
    var contElm = this.container.getElm();
    var button = new newItem();
    button.width = 15;
    button.height = height;
    button.clazz = "LeftButton";
    var buttonL = button.getElm();
    buttonL.onclick = this.clickButton;
    contElm.appendChild(buttonL);
    var item = new newItem();
    item.height = height;
    item.clazz = "HorItemContent Clearfix";
    item.id = this.idHor;
    item.width = this.maxW;
    var elmContent = item.getElm();
    contElm.appendChild(elmContent);
    
    item.clazz = "Item";
    for ( var i = 0; i < this.length; i++) {
      item.width = this.items[i].width;
      item.content = this.items[i].content;
      this.widthIndex[i] = this.items[i].width;
      elmContent.appendChild(item.getElm());
    }
    
    button.clazz = "RightButton";
    var buttonR = button.getElm();
    buttonR.onclick = this.clickButton;
    contElm.appendChild(buttonR);
    
    return contElm;
  },
  builderVer : function(clazz, width, height) {
    
  },
  clickButton : function() {
    var clazz = String(this.className);
    if (clazz) {
      if (clazz.indexOf('Left') >= 0 && clazz.indexOf('Disable') < 0) {
        var left = SLIDER_SCROLL.currentLeft - (SLIDER_SCROLL.widthIndex[SLIDER_SCROLL.indexHor] + 2);
        if ((left + SLIDER_SCROLL.maxW) <= SLIDER_SCROLL.contW) {
          left = SLIDER_SCROLL.currentLeft - SLIDER_SCROLL.countFromTo(SLIDER_SCROLL.indexHor, SLIDER_SCROLL.length);
          this.className = clazz + " Disable";
        }
        if (!SLIDER_SCROLL.contElmHor) {
          SLIDER_SCROLL.contElmHor = document.getElementById(SLIDER_SCROLL.idHor);
        }
        SLIDER_SCROLL.posisionElm.setPosision(SLIDER_SCROLL.contElmHor, 'left', SLIDER_SCROLL.currentLeft, left);
        SLIDER_SCROLL.currentLeft = left;
        SLIDER_SCROLL.indexHor += 1;
      }
    }
  },
  countFromTo : function(from, to) {
    var sun = 0;
    for ( var i = from; i < to; i++) {
      sun += (SLIDER_SCROLL.widthIndex[i] + 2);
    }
    return sun - (SLIDER_SCROLL.contW + 17);
  },
  posisionElm : {
    oj : null,
    type : "",
    from : 0,
    to : 0,
    setPosision : function(oj, type, from, to) {
      this.oj = oj;
      this.type = type;
      this.from = from;
      this.to = to;
      this.changePosision();
    },
    changePosision : function() {
      if (this.oj) {
        if (this.type == 'left') {
          if (this.from > this.to) {// 0 -- -200
            this.from = this.from - 10;
            this.oj.style.left = this.from + 'px';
            setTimeout('SLIDER_SCROLL.posisionElm.changePosision()', 10);
          } else {
            this.from = this.to;
            this.oj.style.left = this.from + 'px';
          }
        } else if (this.type == 'right') {
          if (this.from < this.to) {
            this.from = this.from + 10;
            this.oj.style.left = this.from + 'px';
            setTimeout('SLIDER_SCROLL.posisionElm.changePosision()', 10);
          } else {
            this.from = this.to;
            this.oj.style.left = this.from + 'px';
          }
        }
      }
    }
  },
  initExistItem : function(id) {
    var all = document.getElementById(id);
    var items = all.getElementsByTagName('div');
    var ITEM, w, h, mW = 0, mH = 0;
    for ( var i = 0; i < items.length; i++) {
      ITEM = new newItem();
      ITEM.index = i;
      w = (String(items[i].style.width).replace('px', '')) * 1;
      if (w < items[i].offsetWidth) {
        w = items[i].offsetWidth;
      }
      ITEM.width = w;
      mW += w;
      h = (String(items[i].style.height).replace('px', '')) * 1;
      if (h < items[i].offsetHeight) {
        h = items[i].offsetHeight;
      }
      ITEM.height = h;
      mH += h;
      ITEM.content = items[i].innerHTML;
      this.items[i] = ITEM;
    }
    this.length = this.items.length;
    this.maxH = mH;
    this.maxW = mW;
    all.innerHTML = '';
  },
  addTo : function(id, type, width, height) {
    var to = document.getElementById(id);
    if (type == TYPE[0]) {
      this.contW = width;
      to.appendChild(this.builderHor("HorContainer", width, height));
    }
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
  }
};
