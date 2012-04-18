/**
 * This is about <code>image-slider.js</code>.
 * 
 * @author Vu Duy Tu
 * @email duytucntt@gmail.com
 * @date 11:58:49 PM-Apr 17, 2012
 * @deprecated use <code>jquery-1.4.4.js</code>
 */

var SLIDER = {
  imgElm : {
    elm : [],
    width : [],
    height : [],
    add : []
  },
  row : 0,
  imgs : [],
  imgThum : [],
  rview : [],
  current : 0,
  size : 0,
  createElement : function(type, id, calzz, src, style, inner) {
    var elm = document.createElement(type);
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
    return elm;
  },
  init : function() {
    var data = $('div .data-img');
    SLIDER.size = data.size();
    for ( var i = 0; i < SLIDER.size; i++) {
      SLIDER.imgs[i] = data.eq(i).attr('full');
      SLIDER.imgThum[i] = data.eq(i).text();
    }
    infoblock('<br/>');
    var bef = new Date().getTime();
    SLIDER.initContainer();
    var now = new Date().getTime();
    infoblock("initContainer: " + (now-bef));
    bef = now;
    SLIDER.initImg();
    now = new Date().getTime();
    infoblock("initImg: " + (now-bef));
    bef = now;
    SLIDER.renderborder();
    now = new Date().getTime();
    infoblock("renderborder: " + (now-bef));
    bef = now;
    SLIDER.setFromTo();
    now = new Date().getTime();
    infoblock("setFromTo: " + (now-bef));
  },
  initContainer : function() {
    var container = $('#set-view');
    container.html('');
    SLIDER.row = Math.round(container.width() / 310);
    for ( var i = 0; i < SLIDER.row; i++) {
      SLIDER.rview[i] = SLIDER.createElement('div', '', 'row-view');
      $(SLIDER.rview[i]).appendTo(container);
    }
  },
  initImg : function() {
    for ( var i = 0; i < SLIDER.size; i++) {
      img = SLIDER.createElement('img', '', 'ImgThum', SLIDER.imgThum[i], 'max-width:300px');
      $(img).load(SLIDER.loadImg(this));
      SLIDER.imgElm.elm[i] = img;
      SLIDER.imgElm.width[i] = img.width;
      SLIDER.imgElm.height[i] = img.height;
      SLIDER.imgElm.add[i] = false;
    }
  },
  renderborder : function() {
    var j = 0;
    for ( var i = 0; i < SLIDER.size; i++) {
      var div = SLIDER.createElement('div', 'id' + i, 'ImgItem', '', 'min-height:' + SLIDER.imgElm.height[i] + 'px');
      $(div).click(SLIDER.showSlider(this));
      $(div).appendTo(SLIDER.rview[j]);
      j = j + 1;
      if (j == SLIDER.row) {
        j = 0;
      }
    }
  },
  setFromTo : function() {
//    SLIDER.displayImg(t, t+ 20);
  },
  displayImg : function(from, to) {
    for ( var i = from; i < to; i++) {
      if (SLIDER.imgElm.add[i] == false) {
        $(SLIDER.imgElm.elm[i]).appendTo($('#id' + i));
        SLIDER.imgElm.add[i] = true;
      }
    }
  },
  setCurrent : function(elm) {
    SLIDER.current = $(elm).attr(id).replace('id', '');
  },
  loadImg : function(elm) {
    
  },
  showSlider : function(elm) {
    
  }
};

$(document).ready(SLIDER.init());
$(window).scroll(SLIDER.setFromTo());
var t=0;
(function A(t) {
  if (!t) {
    t = 0;
  }
  if (t >= SLIDER.size) {
    t = SLIDER.size - 1;
  } else if (t < SLIDER.size) {
    SLIDER.displayImg(t, t + 20);
    t = t + 20;
    if (t - 19 != SLIDER.size) {
      setTimeout(A(t), 1000);
    }
  }
})();









