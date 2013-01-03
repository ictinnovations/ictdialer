//$Id: omega_admin.js,v 1.1.4.2 2010/08/03 14:19:52 himerus Exp $

(function ($) {
  omega = jQuery.noConflict();
  omega(document).ready(function(){
    // hide all collapsible fieldset stuffs
    omega('.omega-accordion-content').hide();
    // show the first fieldset in any group of "accordion" items
    firsts = omega([]);
    omega('.fieldset-wrapper').each(function(){
      var new_first = omega(this).children('.omega-accordion:first');
      firsts = firsts.add(new_first);
    });  
    firsts
      .children('a')
        .addClass('expanded')
        .end() // return to the h3
      .next('.omega-accordion-content')
      .addClass('expanded')
      .show();
    // provide click/toggle functionality
    omega('.omega-accordion a').click(function(){
      // remove expanded class from all href items
      omega(this).parents('.fieldset-wrapper').find('a').removeClass('expanded');
      // add expanded back to the cliked href
      omega(this).addClass('expanded');
      var clicked = omega(this).parent('h3');
      // if we click a header that is already open, do nothing
      if(clicked.next('.omega-accordion-content').hasClass('expanded')) {
        return false;
      }
      else {
        clicked
          .next('.omega-accordion-content')
            .slideDown('fast')
            .addClass('expanded')
            .addClass('active-accordion')
            .end()
          .parents('.fieldset-wrapper')
          .children('.omega-accordion-content:not(.active-accordion)')
          .removeClass('expanded')
          .slideUp('fast');
        omega('.omega-accordion-content').removeClass('active-accordion');
        return false;
      }
    });
  });
})(jQuery);
