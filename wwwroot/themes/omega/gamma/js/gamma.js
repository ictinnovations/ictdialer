// $Id: gamma.js,v 1.1.2.3 2010/09/11 15:23:25 himerus Exp $
// declare the gamma variable for jQuery usage in the gamma theme.
(function ($) {
  /**
   * @todo   Must fix the interaction between active menu items
   * @todo   Change the order of the hover out fade back to normal, and sub-menu hiding
   *         This should be set to close the menu fully (after short delay) then fade the menu color back to normal
   * @todo  Make sure the menus accomodate menus that are only 2 wide on the top level.
   */
  gamma = jQuery.noConflict();
  gamma(document).ready(function(){
    // even up the menus to a non decimal width value
    // this happens because we don't define specific CSS width
    // and rely on padding to give us a nice width
    gamma('#site-menu .menu:first > li').each(function(){
      var currentWidth = gamma(this).innerWidth();
      gamma(this).width(Math.round(currentWidth));
    });
    // make the menu sexy
    gamma('#site-menu .menu:first > li').hover(
      // hover in
      function(){
        if(!gamma(this).hasClass('active-trail')) {
        gamma(this).children('a').stop().animate({
          "color": "#454545",
          }, 1000, function() {
        });
        gamma(this).addClass('hovering').stop().animate({
          "backgroundColor": "#DDD",
          }, 150, function() {
            
          });
        }
        // find the position of the parent LI in the menu
          var parentIndex = gamma('#site-menu .menu:first > li').index(this);
          // find the number of total items in the menu
          var totalNum = gamma('#site-menu .menu:first > li').size();
          // each dropdown is the width of the next 3 menu items by default
          // if the menu item is one of the last two, we need to change the way
          // the width and positioning is calculated.
          if(totalNum - parentIndex < 3) {
            // this menu item is one of the last two, and we need to calculate differently.
            // find offset of the parent LI
            var leftItem = totalNum - 3;
            var rightItem = totalNum - 1;
            var offset = gamma('#site-menu .menu:first > li:eq('+leftItem+')').offset();
            // get the left offset of the parent LI
            var leftOffset = offset.left - 1;
            // grab the appropriate indexes for the left and right positions of the menu
            var rightIndex = rightItem;
          }
          else {
            // Default implementation
            // find offset of the parent LI
            var offset = gamma(this).offset();
            // get the left offset of the parent LI
            var leftOffset = offset.left - 1;
            // grab the appropriate indexes for the left and right positions of the menu
            var rightIndex = parentIndex + 2;
          }
          // get the left offset of the last menu item to line up with
          var offsetLast = gamma('#site-menu .menu:first > li:eq('+rightIndex+')').offset();
          var lastLeftOffset = offsetLast.left;
          // get the width of the last item
          var rightWidth = gamma('#site-menu .menu:first > li:eq('+rightIndex+')').outerWidth();
          // create the "right offset" of the last item
          var rightOffset = lastLeftOffset + rightWidth;
          // determine the true width of the dropdown menu
          var menuWidth = rightOffset - leftOffset - 1;
          // move the child menu to the appropriate position and size
          gamma(this).addClass('isPositioned').children('ul').css('width', menuWidth).css('left', leftOffset).slideDown('normal');
        
      }, 
      // hover out
      function(){
        gamma(this).stop().children('ul').slideUp('normal').end();
        // don't re-animate the active item
        if(!gamma(this).hasClass('active-trail')) {
          gamma(this).children('a').stop().animate({
            "color": "#EEE",
            }, 1000, function() {
  
          });
          gamma(this).animate({
            "backgroundColor": "#8d8c8c",
            }, 1000, function() {
              gamma(this).removeClass('hovering');
          });
        }
    });
    /**
     * Fade in the user menu on page load and match the line height to the height of the #branding element
     */
    var logo_height = gamma('#branding').height();
    var user_menu_height = gamma('#user-menu').height();
    if (logo_height < user_menu_height) {
    	logo_height = 60;
    }
    var useMargin = Math.round((logo_height - user_menu_height) / 2);
    gamma('#user-menu').css('margin-top', useMargin).fadeIn('fast');
    
    /**
     * Respect primary menu trails, regardless of menu structure
     */
    var currentURL = document.location.pathname;
      var activeTopLevelPageArray = currentURL.split('/');
      var activeTopLevelPage = activeTopLevelPageArray[1];
     
      // applying the class to what we find
      gamma('#site-menu ul li a[href^=/'+activeTopLevelPage+']')
        .addClass('active');
      // now making the nav menu do what we want with styles for the active element
      gamma('#site-menu ul li a.active:first')
        .addClass('current-main') // assign main active bg to active link
        .parent('li') // select the parent list item
        .addClass('active-trail'); // then assign a class to it for manipulation
     
      /* If there is no match, just activate the "home" menu item/tab */
      var isActive = gamma('#site-menu li.active-trail').size();
      if (isActive < 1) {
        gamma('#site-menu li:first').addClass('active-trail');
      }
      
      
      // make the service links images sexy
      /*
      gamma('.service-links img').each(function(){
        initImage(this);
      });
      */
  });
})(jQuery);