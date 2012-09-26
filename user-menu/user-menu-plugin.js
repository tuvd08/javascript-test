;(function($, document, window) {
  var template = "";
  function buildTemplate() {
    if(template.length == 0) {
      $('<div style="backgroud: #fff; box-shadow: 5px #888888; border-radius:10px;"></div>')
        .append($('<div></div>')
            .append('<div style="width: 50px; height: 50px; border: solid 1px #b7b7b7; border-radius:5px; float:left">' +
            '</div>'))
    }
    return template;
  }

  function UserInfo(userName) {
    var userInfo = {
        userId : userName,
        avatarURL : "",
        profileURL : "",
        status : "",
        template : "",
        getFullName : function() {
          
        },
        getStatus : function () {
        
        },
        getProfileURL : function () {
        
        },
        getAvatarURL : function() {
          
        },
        buildMenu : function() {
          var template = buildTemplate();
          
        }
    };
    return userInfo;
  }
  
  $.fn.showUserInfo = function() {
    $(this).on('mouseover', function(event) {
      var userId = $(this).attr('id');
      var userInfo = new UserInfo(userId);
      userInfo.buildMenu();
    });
    return $(this);
  };
})($, document, window);