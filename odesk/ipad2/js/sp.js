/*                                     JQUERY ON DOC READY
__________________________________________________________
*/


$(document).ready(function() {



    /* ---SMOOTH SCROLL----------------------------- */

      if(isIpad) {
        jq('div#IpadNavbar').find('a').smoothScroll({
          speed:'auto',
          autoCoefficent:1.6,
          easing:'linear',
          offsetFunction : function() {
            return -(jq('#navbarHolder').height());
          }
        });
      } else {
        jq('div#navbar').find('a').smoothScroll({
          speed:'auto',
          autoCoefficent:1.6,
          easing:'linear',
          offsetFunction : function() {
            return -(jq('#navbarHolder').height());
          }
        });
      }

    /* ---NAV BAR ANIMATION------------------------- */
    
    // private functions

    // don't pass window or document
    function scrollableElement(els) {
      var elm = null; 
      jq.each(els, function(i, it) {
        var scrollElement = $(it);
        if(scrollElement.scrollTop()) {
          if (scrollElement.scrollTop() > 0) {
            elm = it;
          } else {
            scrollElement.scrollTop(1);
            var isScrollable = scrollElement.scrollTop() > 0;
            scrollElement.scrollTop(0);
            if (isScrollable) {
              elm = it;
            }
          }
        }
        
      });
      return (elm) ? elm : jq(els.join()) ;
    }

    var x = 0, y = 0, olX = -1, g = true, values = [], values1 = [], names = [];
    function initInfo() {
      if(g || x === 0) {
        x = 0, y = 0, values = [], names = [], values1 = [];
        // navigation info
        jq.each(jq('#navbar').find('li'), function(idx, item) {
          var param = jq(item).find('a:first').attr('id');
          var pW = jq(item).outerWidth(true);
          values.push((x + pW/2));
          names.push(param);
          x = x +  pW;
        });

        // page info
        jq.each(jq('#container').find('.blockItem'), function(idx, item) {
          var pH = jq(item).outerHeight(true);
          if(idx === 2) pH = pH - 4;
          y = y + pH;
          values1.push(y);
        });
        
      }
      return x;
    }

    var nbW = jq('#navbar').width()
    
    $('div#navbar').css({backgroundPosition: (jq('#navbar').find('li:first').outerWidth()+420) +'px bottom'});


    /* ---NAV BAR ANIMATION------------------------- */
    
    function getIndexNavbar() {
        var infoShow = {position: 40+delta, type : 'nav_about'};
        
        var crWScroll = $(scrollableElement(['html', 'body'])).scrollTop() + $('#navbarHolder').height() + 10;
		if(jq.browser.msie && (jq.browser.version)*1 < 8){
			crWScroll += 180;
		}

        var t = 0, l = values1.length;
        for (var i = 0; i < l; ++i) {
          if(crWScroll < values1[i]) {
            t = i;
            break;
          } else if(crWScroll >= values1[l-1]) {
            i = l - 1;
          }
        }
		var p = values[t] + delta;
        infoShow.position = (p < 0) ? 0 : p;
        infoShow.type = names[t];
        return infoShow;
    }

    jq(window).on('scroll', function() {

        if(olX > 0 && olX === initInfo()) {
          g = false;
        } else {
          delta = nbW - initInfo() - 11;
          olX = x;
        }
        var p = getIndexNavbar().position;
        $('div#navbar').stop().animate({
          backgroundPosition: p +'px bottom'
        }, 150, 'swing', function() {
        });
        
        
        if(isIpad) {
          $("#IpadBarHolder").stop().animate({'top': $(scrollableElement(['html', 'body'])).scrollTop()}, 10, 'swing', function() {});
        }
        
    });

    jq("div#contact").data('defautl', jq("div#contact").height())

    /* ---BROWSER RESIZE - NAVBAR FIX--------------- */
    
    jq(window).on('resize load', function() {
       $("#logo").css('left', $('#container').offset().left);
       nbW = jq('#navbar').width()
       delta = nbW - initInfo() - 11;

      /* ---FOOTER HEIGHT FIX------------------------- */
      
      var h = $(window).height();
      var dH = jq("div#contact").data('defautl');
      var mH = dH + ((h > dH) ? (h - dH) : (dH - h));
      $("div#contact").css("minHeight", mH +'px').find('.bgContact').css("minHeight", mH-100 +'px');
      
      $('div#navbar').css({backgroundPosition: getIndexNavbar().position +'px bottom'}); 
      var top = $(scrollableElement(['html', 'body'])).scrollTop();
      $('#logo').css('opacity', (top < 50) ? 0 : 1);
      
      if(isIpad) {
        $("#IpadBarHolder").css('top', top);
      }
    
    });
    
        
    /* ---IE FIXES---------------------------------- */
    
    if ($.browser.msie && $.browser.version.substr(0,1)<=7) {
        $("a#switch").css("margin-top", "-35px");
        $("div#extras").css("background-position", "0 150px");
    }
    
    else {
        $("a#switch").css("margin-top", "6px");
        $("div#extras").css("background-position", "0 192px");
    }
    

});
