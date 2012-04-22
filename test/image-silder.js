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
    SLIDER.initContainer();
    SLIDER.initImg();
    SLIDER.renderborder();
    SLIDER.setFromTo();
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
    var url = '_.gif';
    for ( var i = 0; i < SLIDER.size; i++) {
      img = SLIDER.createElement('img', 'img'+i, 'ImgThum', url, 'max-width:300px');
      SLIDER.imgElm.elm[i] = img;
      SLIDER.imgElm.add[i] = false;
    }
  },
  renderborder : function() {
    var j = 0;
    for ( var i = 0; i < SLIDER.size; i++) {
      var div = SLIDER.createElement('div', 'id' + i, 'ImgItem', '', 'min-height:300px');
      $(div).click(function() {
        SLIDER.showSlider(this);
      });
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
    if(to > SLIDER.size) {
      to = SLIDER.size;
    }
    for ( var i = from; i < to; i++) {
      if (SLIDER.imgElm.add[i] == false) {
        SLIDER.imgElm.elm[i].src = SLIDER.imgThum[i];
        $(SLIDER.imgElm.elm[i]).load(function() {
          SLIDER.loadImg(this);
        });
        $(SLIDER.imgElm.elm[i]).appendTo($('#id' + i));
        SLIDER.imgElm.add[i] = true;
      }
    }
  },
  setCurrent : function(elm) {
    var id = "0";
    if (jQuery.type(elm) === "number" || jQuery.type(elm) === "string") {
      id = elm;
    } else {
      id = String($(elm).attr('id'));
    }
    SLIDER.current = (id.replace('id', '').replace('img', '')) * 1;
  },
  loadImg : function(elm) {
    $('#id' + elm.id.replace('img', '')).css('min-height', elm.height);
  },
  showSlider : function(elm) {
    SLIDER.fullScreen();
    SLIDER.setCurrent(elm);
    window.setTimeout(SLIDER.initLayer, 500);
  },
  showFullImg: function(elm) {
    if (typeof elm != "undefined" && elm) {
      if($('#showImg').css('display') === 'none') {
        SLIDER.showSlider(elm);
        return;
      }
      SLIDER.setCurrent(elm);
    }
    
    var cont = $('#contImg');
    cont.html('');
    var img = SLIDER.createElement('img', '', '', SLIDER.imgs[SLIDER.current]);
    $(img).load(function() {
      SLIDER.loadFullImg(this);
    });
    $(img).appendTo(cont);
    SLIDER.loadImgBefore(SLIDER.current);
  },
  loadImgBefore: function(index) {
  	var bf = index - 1;
  	var af = index + 1;
  	if(bf < 0) bf = SLIDER.size - 1;
  	if(af == SLIDER.size) af = 0;
  	$('#hidden').html('');
  	$(SLIDER.createElement('img', '', '', SLIDER.imgs[af])).appendTo($('#hidden'));
  	$(SLIDER.createElement('img', '', '', SLIDER.imgs[bf])).appendTo($('#hidden'));
	},
  loadFullImg: function(img) {
    var layer = $('#showImg');
    var cont = $('#contImg');
    if (img.width > (layer.width() - 200)) {
      img.width = (layer.width() - 200) + "px";
    }
    cont.css('left', ((layer.width() - img.width) / 2) + "px");
    cont.css('top',($(window).scrollTop() + (layer.height() - (img.height+20))/2)  + "px");
    cont.css('display','block');
  },
  initLayer: function() {
    var div = document.getElementById('showImg');
    if (!div) {
      div = SLIDER.createElement('div', 'showImg', 'ShowImg');
      $(div).appendTo($(top.document.body));
      $(div).click(function() {
        SLIDER.hiddenAll();
      });
    }
    SLIDER.resizeLayer();
    var cont = document.getElementById('contImg');
    if (!cont) {
      cont = SLIDER.createElement('div', 'contImg', 'ContentImg');
      $(cont).appendTo($(top.document.body));
    }
    SLIDER.showFullImg();
  },
  resizeLayer: function() {
    $('#showImg').css({
      display: 'block', 
      width: $(top.document).width() + "px", 
      height:$(top.document).height() + "px"
    });
  },
  fullScreen: function() {
    var el = document.documentElement, 
          rfs = // for newer Webkit and Firefox
              el.requestFullScreen || 
              el.webkitRequestFullScreen || 
              el.mozRequestFullScreen || 
              el.msRequestFullScreen;
    if (typeof rfs != "undefined" && rfs) {
      rfs.call(el);
    } else if (typeof window.ActiveXObject != "undefined") {
      // for Internet Explorer
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{F11}");
      }
    }
    $(window).css('overflow', 'hidden');
    $('html').css('overflow', 'hidden');
  },
  hiddenAll: function() {
    var cancelFullScreen = document.cancelFullScreen ||
                           document.mozCancelFullScreen ||
                           document.webkitCancelFullScreen;
    if (typeof cancelFullScreen != "undefined" && cancelFullScreen) {
      cancelFullScreen.call(document);
    } else if (typeof window.ActiveXObject != "undefined") {
      // for Internet Explorer
      var wscript = new ActiveXObject("WScript.Shell");
      if (wscript != null) {
        wscript.SendKeys("{ESC}");
      }
    }
    $('#showImg').css('display','none');
    $('#contImg').css('display','none').html('');
    $(window).css('overflow', 'auto');
    $('html').css('overflow', 'auto');
  }
};

var KEYIMG = {
  getKeynum : function(event) {
    var keynum = false;
    if (window.event) { /* IE */
      keynum = window.event.keyCode;
      event = window.event;
    } else if (event.which) { /* Netscape/Firefox/Opera */
      keynum = event.which;
    }
    if (keynum == 0) {
      keynum = event.keyCode;
    }
    return keynum;
  },
  calculateKey : function(event) {
    if($('#showImg').css('display') === 'block') {
      var keynum = KEYIMG.getKeynum(event);
      if (keynum == 37) {// onLeftArrow
        var show = SLIDER.current - 1;
        if (show < 0) {
          show = (SLIDER.size - 1);
          KEYIMG.current = show;
        }
        SLIDER.showFullImg("id"+show);
      } else if (keynum == 39) {// onRightArrow
        var show = SLIDER.current + 1;
        if (show == SLIDER.size)
          show = 0;
        SLIDER.showFullImg("id"+show);
      } else if (keynum == 38) {// onUpArrow
      
      } else if (keynum == 40) {// onDownArrow
      
      } else if (keynum == 36) {// onHome
      
      } else if (keynum == 35) {// onEnd
      
      } else if (keynum == 27) {// ESC
        SLIDER.hiddenAll();
      }
    }
    
  },
};

(function addOnkeyDown() {
  document.documentElement.onkeydown = KEYIMG.calculateKey;
})();

$(window).resize(function() {
  var div = document.getElementById('showImg');
  if(div && $(div).css('display') === 'block') {
    SLIDER.hiddenAll();
  }
});

$(document).ready(SLIDER.init());
$(document).ready(SLIDER.loadImgBefore(1));
//$(window).scroll(SLIDER.setFromTo());
var t=0;
(function A() {
  if (t >= SLIDER.size) {
    t = SLIDER.size - 1;
  } else if (t < SLIDER.size) {
    SLIDER.displayImg(t, t + 10);
    t = t + 10;
    if (t - 9 != SLIDER.size) {
      setTimeout(A, 1000);
    }
  }
})();









