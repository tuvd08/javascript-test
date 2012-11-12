(function($) {

  function scrollableElement(els) {
    var elm = null; 
    $.each(els, function(i, it) {
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
    return (elm) ? elm : els.join() ;
  }

  function runScroll(target) {
    var scrollTargetOffset,
        scrollElem = scrollableElement(['html', 'body']);
    currentPosision = $(scrollableElement(['html', 'body'])).scrollTop();
    scrollTargetOffset = $(target).offset().top;
    
    scrollTargetOffset += -($('#navbarHolder').height());

    var speed = 200;
    var delta = (scrollTargetOffset > currentPosision) ? 
                    (scrollTargetOffset - currentPosision) : (currentPosision - scrollTargetOffset);
    if(delta <= 300) {
      speed = 200;
    } else if(delta <= 600) {
      speed = 350;
    } else if(delta <= 900) {
      speed = 450;
    } else if(delta <= 1200) {
      speed = 600;
    } else {
      speed = 900;
    }
    
    var fixedElement = $('#navbarHolder');
    $(scrollElem).stop().animate({
      scrollTop: scrollTargetOffset
    }, speed, 'swing', function() {
      var isiPad = navigator.userAgent.match(/iPad/i) != null;
      if(isiPad) {
        fixedElement.css({ "position": "relative", 'top':scrollTargetOffset , 'left': 10});
        window.scroll(0, scrollTargetOffset );
        fixedElement.css({ "position": "fixed", 'top': 0, 'left':0 });
      }
    });

  };

    jq('div#navbar').find('a').off('mousedown').on('mousedown', function(event) {
      var target = $($(this).attr('rel'));
      runScroll(target);
      event.stopPropagation();
      event.preventDefault();
      return false;
    });
  //window.addScroll = addScroll;
})(jq, window);

