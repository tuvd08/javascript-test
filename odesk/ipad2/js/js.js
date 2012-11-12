
//FADE EFFECT

$(document).ready(function() {
    
    
    $('#btn_top').click(function() {
        $('html,body').animate({scrollTop: $("#container").offset().top},'slow');
    });
    
    $('.prjGrid .hover').hover(function () {
        $(this).stop().animate({ opacity: 1 }, 200);},
        function () {
        $(this).stop().animate({ opacity: 0 }, 200);}
        );
    
    $('.pprj .hover').hover(function () {
        $(this).stop().animate({ opacity: 1 }, 200);},
        function () {
        $(this).stop().animate({ opacity: 0 }, 200);}
        );
  
    $('div#navbar li a').hover(function () {
        var is_id = '#' + $(this).attr('id') + ' .m_r';
        var is_id_w = '#' + $(this).attr('id') + ' .m_w';
        
        $(is_id).stop().animate( {width: $(is_id_w).width() }, 200, function(){});
    }, function () {
        is_id = '#' + $(this).attr('id') + ' .m_r';        
        $(is_id).stop().animate( {width: 0 }, 200, function(){});
    });
 
    var message = $("#logo");
    var originalMessageTop = message.offset().top + message.height();
    var view = $(window);
    view.bind("scroll resize", function() {
      var viewTop = view.scrollTop();
      if ((viewTop > originalMessageTop) && !message.is(".site-message-fixed")) {
        message.removeClass("site-message-absolute").addClass("site-message-fixed").stop().animate({
          opacity : 1
        }, 300);
      } else if ((viewTop <= originalMessageTop) && message.is(".site-message-fixed")) {
        message.removeClass("site-message-fixed").addClass("site-message-absolute").stop().animate({
          opacity : 0
        }, 100);
      }
    });

//HEIGHT ANIMATE EFFECT
    $('.prjGrid .item').click(function() {
      var id_item = this.id;

      var id = '#i' + this.id;

      $('.next_slide').fadeIn('slow', function() {
      });
      $('.prev_slide').fadeIn('slow', function() {
      });

      var ids = '';
      var this_id = '';

      $('html,body').animate({
        scrollTop : $("#work").offset().top
      }, 'slow');

      $('#project .selected').animate({
        height : 0
      }, 600, function() {
      });
      $('#project .selected').removeClass('selected');
      $(id).addClass("selected");

      $(id).stop().animate({
        height : 482
      }, 600, function() {
        $('#project .close_item_info').click(function() {
          $(id).removeClass("selected");
          $(id).stop().animate({
            height : 0
          }, 600, function() {
          });
        });
      });

      $('#project').stop().animate({
        opacity : 1,
        height : 482
      }, 600, function() {
        $('.prjGrid .hover').stop().animate({
          opacity : 0.5
        }, 400);
        $('.prjGrid .hover').hover(function() {
          $(this).stop().animate({
            opacity : 1
          }, 200);
        }, function() {
          $(this).stop().animate({
            opacity : 0.5
          }, 200);
        });
        $('#project .close_item_info').click(function() {
          $('#project').stop().animate({
            opacity : 0,
            height : 0
          }, 600, function() {
            $('.prjGrid .hover').stop().animate({
              opacity : 0
            }, 400);
            $('.prjGrid .hover').hover(function() {
              $(this).stop().animate({
                opacity : 1
              }, 200);
            }, function() {
              $(this).stop().animate({
                opacity : 0
              }, 200);
            });
            $(id + ' .next_slide').fadeOut('slow', function() {
            });
            $(id + ' .prev_slide').fadeOut('slow', function() {
            });
          });
        });
      });
    });

    $('.next_slide').click(function(event) {
      $('#project').find('.prjinfo').each(function() {
        if ($(this).attr("class") == "prjinfo selected") {
          ids = $(this).attr('id');
          this_id = '#' + ids + ' .pic';
          event.preventDefault();
          var currli = $(this_id + ":visible");
          var nextli = currli.next();
          if (nextli.length == 0) {
            nextli = currli.siblings(':first');
          }
          currli.fadeOut('fast', function() {
            nextli.fadeIn('fast', function() {
            });
          });
          this_id = '';
        }
        ;
      });
    });
    $('.prev_slide').click(function(event) {
      $('#project').find('.prjinfo').each(function() {
        if ($(this).attr("class") == "prjinfo selected") {
          ids = $(this).attr('id');
          this_id = '#' + ids + ' .pic';

          event.preventDefault();
          var currli = $(this_id + ":visible");
          var prevli = currli.prev();
          if (prevli.length == 0) {
            prevli = currli.siblings(':last');
          }
          currli.fadeOut('fast', function() {
            prevli.fadeIn('fast', function() {
            });
          });

          this_id = '';
        }
        ;
      });
    });
    
   
});
