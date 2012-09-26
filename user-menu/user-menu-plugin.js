;(function($, document, window) {
  var template = null;
  var display = true;
  // building template of menu
  function buildTemplate() {
    if(template === null) {
      template = $('<div class="UIInfoContent" style="backgroud: #fff; font-size:11px; padding:10px; box-shadow: -1px 2px 3px #D5D5D5; border-radius: 8px 8px 8px 8px; max-width: 250px"></div>')
        .append(
          $('<div class="ClearFix"></div>')
            .append('<div class="Avatar" style="width: 50px; height: 50px; border: solid 1px #b7b7b7; border-radius:5px; float:left"></div>')
            .append(
              $('<div style="margin-left: 60px; line-height: 14px"></div>')
                .append('<div class="FullName" style="font-weight: bold;color: darkorange; font-size: 11px">FullName</div>')
                .append('<div class="Status" style="color: #222222; font-size: 10px; white-space:nowrap">Status</div>')
                .append('<div><a class="More" href="javascript:void(0)" style="font-size: 10pxl color: darkorange;">More<span class="LeftRowIcon"></span></a></div>')
            )
        )
        .append('<div class="Invite" style="line-height: 24px; text-align: center; margin: 6px auto; max-width:150px; border:solid 1px gray; cursor:pointer" >Invite to connect</div>');
    }
    return template;
  }
  // hidden all menus
  function hideAllUserInfo(event) {
    if(display === false) {
      var allMenu = $(document.body).find('div.UIUserInfoMenu');
      allMenu.find('div.UIInfoContent').animate({height:'0px', width: '0px'}, 200, 'linear', function() {
        allMenu.html('');
      });
    }
  }
  //
  function UserInfo(jelm) {
    var userInfo = {
        jElmInfo: $(jelm),
        container : $('<div class="UIUserInfoMenu"></div>')
                      .css({
                        'visibility': 'inherit',
                        'display': 'inline',
                        'float': 'none',
                        'position': 'relative',
                        'width': 'auto'
                      }),
        userId : "",
        avatarURL : "",
        profileURL : "",
        status : "",
        template : "",
        init : function() {
          
        },
        getFullName : function() {
          return this.userId;
        },
        getStatus : function () {
          return "Status of " + userInfo.userId;
        },
        getProfileURL : function () {
          
        },
        getAvatarURL : function() {
          return (userInfo.userId === 'root') ? 'url("https://www.google.com.vn/images/icons/product/chrome-48.png") no-repeat' :
                              'url("https://lh3.googleusercontent.com/-JAV0q-ipLnQ/AAAAAAAAAAI/AAAAAAAAAAA/qlKfTovIo3s/s27-c/photo.jpg") center no-repeat';
        },
        inviteUser : function(event) {
          infoblock('invite this user ' + userInfo.userId);
          display = false;
          hideAllUserInfo(event);
        },
        buildMenu : function(event) {
          display = true;
          this.userId = this.jElmInfo.attr('rel');
          // this.init() ;
          if(true) {
            var template = buildTemplate();
            template.find('.FullName').html(this.getFullName());
            template.find('.Status').html(this.getStatus());
            template.find('.Avatar').css('background', this.getAvatarURL());
            template.find('.More').attr('href', userInfo.getProfileURL());
            template.find('.Invite').off('click').on('click', userInfo.inviteUser);
            var container = this.jElmInfo.next();
            if(container.length == 0 || container.attr('id') != ('InfoMenuOf' + this.userId)) {
              this.container.attr('id', 'InfoMenuOf' + this.userId).append(template);
              this.container.on('mouseenter', function(event) {
                display = true;
                event.stopPropagation();
              }).on('mouseleave', function(event) {
                display = false;
                window.setTimeout(function () { hideAllUserInfo(event);}, 500);
                event.stopPropagation();
              });
              this.container.insertAfter(this.jElmInfo);
            } else {
              // show menu existing
              container.append(template);
            }
            template.css({height:'auto', width: 'auto'});
            var w = template.width();
            var h = template.height();
            template.animate({height: h + 'px', width: w + 'px'}, 500);
          }
        }
    };
    return userInfo;
  }
  
  $.fn.showUserInfo = function() {
    $(this).on('mouseover', function(event) {
      var userInfo = new UserInfo($(this));
      userInfo.buildMenu(event);
      event.stopPropagation();
    }).on('mouseout', function(event) {
      display = false;
      window.setTimeout(function () {hideAllUserInfo(event);}, 500);
      event.stopPropagation();
    });
    return $(this);
  };
})($, document, window);

