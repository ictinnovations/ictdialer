<?php
// $Id: preprocess-page.inc,v 1.6.2.17 2010/09/16 00:40:27 himerus Exp $

/**
 * @file
 * Contents of omega_preprocess_page().
 */

global $theme_key;

/**
 * Adding in the ability to combine the sidebars on certain paths in order to
 * adjust layouts based on context of the page. My main purpose for this is in
 * the admin section to help widen up the layout if two sidebars are being used.
 *
 * All it does is combine the sidebar_first and sidebar_second into
 * sidebar_first and unset the sidebar_second variable. This resets the layout
 * to act like only one sidebar is present in certain paths.
 */
if (theme_get_setting('sidebar_contain_pages')) {
  $path = drupal_get_path_alias($_GET['q']);
  // Compare with the internal and path alias (if any).
  $page_match = drupal_match_path($path, theme_get_setting('sidebar_contain_pages'));
  if ($path != $_GET['q']) {
    $page_match = $page_match || drupal_match_path($_GET['q'], theme_get_setting('sidebar_contain_pages'));
  }
  $page_match = !(theme_get_setting('sidebar_combine') xor $page_match);
  if ($page_match && substr($_GET['q'], 0, 17) != 'admin/build/block') {
    unset($vars['page']['sidebar_second']['#sorted']);
    unset($vars['page']['sidebar_second']['#theme_wrappers']);
    unset($vars['page']['sidebar_second']['#region']);

    $vars['page']['sidebar_first'] = array_merge($vars['page']['sidebar_first'], $vars['page']['sidebar_second']);
    $vars['page']['sidebar_second'] = array();
  }
}
/**
 * Header Region
 * Depends on the width of the logo and title region, which is 4 grids by
 * default. This leaves 12 (Grid-12 by default) for the maximum width of any one
 * of the elements in this zone. If only one zone is included, it fills the
 * maximum width, and if both zones are present, they will use the provided
 * settings from the theme configuration interface.
 */
// The width of the wrapper item around the navigation menus & header block
// regions. This width plus the logo width should total the width of your grid.
$vars['header_wrapper_width'] = theme_get_setting('omega_header_wrapper_width');

// The width of the logo element.
// This width plus the logo width should total the width of your grid.

$vars['default_container_width'] = theme_get_setting('omega_default_container_width');
$vars['branding_wrapper_width'] = theme_get_setting('omega_branding_wrapper_width');
$vars['header_logo_width'] = theme_get_setting('omega_header_logo_width');
$vars['header_menu_width'] = theme_get_setting('omega_header_menu_width');
$vars['internal_nav_wrapper_width'] = theme_get_setting('omega_internal_nav_wrapper_width');
$vars['breadcrumb_slogan_width'] = theme_get_setting('omega_breadcrumb_slogan_width');
$vars['search_width'] = theme_get_setting('omega_search_width');

$header_regions = array(
  'header_first' => array(
    'data' => $vars['page']['header_first'],
    'width' => theme_get_setting('omega_header_first_width'),
  ),
  'header_second' => array(
    'data' => $vars['page']['header_second'],
    'width' => theme_get_setting('omega_header_second_width'),
  ),
);
$vars = static_region_builder($header_regions, theme_get_setting('omega_header_wrapper_width'), $vars);


/**
 * Preface Region
 * Same as above, preparing the preface regions to accept settings configurations
 */
$vars['preface_wrapper_grids'] = theme_get_setting('omega_preface_wrapper_grids');
$preface_regions = array(
  'preface_first' => array(
    'data' => $vars['page']['preface_first'],
    'width' => theme_get_setting('omega_preface_first_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_preface_first_prefix'),
      'suffix' => theme_get_setting('omega_preface_first_suffix')),
    ),
  'preface_second' => array(
    'data' => $vars['page']['preface_second'],
    'width' => theme_get_setting('omega_preface_second_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_preface_second_prefix'),
      'suffix' => theme_get_setting('omega_preface_second_suffix')),
    ),
  'preface_third' => array(
    'data' => $vars['page']['preface_third'],
    'width' => theme_get_setting('omega_preface_third_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_preface_third_prefix'),
      'suffix' => theme_get_setting('omega_preface_third_suffix'))
  ),
);
$vars = static_region_builder($preface_regions, theme_get_setting('preface_wrapper_grids'), $vars);

/**
 * Body Region
 * Configuration of $sidebar_first, $sidebar_second, and the main content zone
 *
 * This section needs MUCH cleanup as I know I can condense the switch
 * statement to be much shorter than completely redeclaring each zone
 * for each case that can be present.
 *
 * @todo cleanup switch statement
 */
// now we will be switching between our primary content layout types.



if(theme_get_setting('omega_content_front_override') && $vars['is_front']) {
  $layout = theme_get_setting('omega_front_content_layout');
  $sidebar_first_width = theme_get_setting('omega_front_sidebar_first_width');
  $sidebar_second_width = theme_get_setting('omega_front_sidebar_second_width');
  $vars['content_container_width'] = theme_get_setting('omega_front_content_container_width');
  $content_width = theme_get_setting('omega_front_content_container_width');
}
else {
  $layout = theme_get_setting('omega_content_layout');
  $sidebar_first_width = theme_get_setting('omega_sidebar_first_width');
  $sidebar_second_width = theme_get_setting('omega_sidebar_second_width');
  $vars['content_container_width'] = theme_get_setting('omega_content_container_width');
  $content_width = theme_get_setting('omega_content_container_width');
}
$content_regions = array(
  'main_content' => array(
    'data' => $vars['page']['content'],
    'width' => $content_width,
    // primary defines which region will get all the extra space
    // should other regions be left out.
    'primary' => TRUE,
    // we need to tell the "related" zones so that we can determine widths for this primary zone
    'related' => array(
      'sidebar_first' => array('width' => $sidebar_first_width),
      'sidebar_second' => array('width' => $sidebar_second_width),
    ),
    'push' => array(
      'width' => '',
      'conditions' => array(
        // 'sidebar_second',
      ),
    ),
    'pull' => array(
      'width' => '',
      'conditions' => array(
        // 'main_content',
      ),
    ),
  ),
  'sidebar_first' => array(
    'data' => isset($vars['page']['sidebar_first']) ? $vars['page']['sidebar_first'] : '',
    'width' => $sidebar_first_width,
    'push' => array(
      'width' => '',
      'conditions' => array(
        // this just needs the region name it depends on in this primary array
        // must be a region in this group though, not a region outside the
        // $content_regions area.
        // 'sidebar_second',
      ),
    ),
    'pull' => array(
      'width' => '',
      'conditions' => array(
        // same as above
        // 'main_content',
      ),
    ),
  ),
  'sidebar_second' => array(
    'data' => isset($vars['page']['sidebar_second']) ? $vars['page']['sidebar_second'] : '',
    'width' => $sidebar_second_width,
    'push' => array(
      'width' => '',
      'conditions' => array(
        // 'sidebar_second',
      ),
    ),
    'pull' => array(
      'width' => '',
      'conditions' => array(
        // 'main_content',
      ),
    ),
  ),
);

switch ($layout) {
  default:
  case 'first_content_last':
  // FIRST - CONTENT - LAST
  
  // The distance to pull the "first" / left sidebar to place it on the left of
  // the content this does always include the right sidebar width, and does not
  // need to account for if there is content available in that region or not. If
  // there wasn't content in it, the primary content region would swallow up
  // that extra grid space anyway.

  // If sidebar_second isn't present, we will pull the first sidebar the
  // combined width of the content & sidebar last spacing otherwise.
  //$sl_pull = isset($vars['page']['sidebar_second']) ? $content_width : $content_width - $sidebar_second_width;
  // Test for issue: http://drupal.org/node/896286
  $sl_pull = (!isset($vars['page']['sidebar_second']) || count($vars['page']['sidebar_second']) == 0 ) ? $content_width - $sidebar_first_width : $content_width - $sidebar_first_width - $sidebar_second_width; 
  // let's assign some new data to our $content_regions array to assing pull classes
  
  // sidebar_first will be pulled an exact amount assuming it exists in this layout
  $content_regions['sidebar_first']['pull']['width'] = $sl_pull;
  $content_regions['sidebar_first']['pull']['conditions'] = array();
  $content_regions['sidebar_first']['push'] = FALSE;
  // sidebar_second doesn't move in this layout
  $content_regions['sidebar_second']['pull'] = FALSE;
  $content_regions['sidebar_second']['push'] = FALSE;
  // main_content will only be pushed in this layout
  $content_regions['main_content']['pull'] = FALSE;
  $content_regions['main_content']['push'] = array(
    'width' => $sidebar_first_width,
    'conditions' => array(
      'sidebar_first' => array(
        // type should either be TRUE or FALSE
        // false value here will use a ! operator in front of the variable in the ns() function
        'type' => FALSE,
        'value' => $sidebar_first_width,
      ),
    ),
  );

  break;

  // CONTENT  - FIRST - LAST
  case 'content_first_last':
  // This is seriously the easiest implementation because source order is used
  // making push/pull irrelevant in this case.

  // sidebar_first doesn't move in this layout
  $content_regions['sidebar_first']['pull'] = FALSE;
  $content_regions['sidebar_first']['push'] = FALSE;
  // sidebar_second doesn't move in this layout
  $content_regions['sidebar_second']['pull'] = FALSE;
  $content_regions['sidebar_second']['push'] = FALSE;
  // main_content doesn't move in this layout
  $content_regions['main_content']['pull'] = FALSE;
  $content_regions['main_content']['push'] = FALSE;
  // calling the dynamic region builder function to position these elements

  break;

  // FIRST - LAST - CONTENT
  case 'first_last_content':
  // pull data for the first sidebar
  $first_max_pull = $content_width - $sidebar_first_width;
  // pull data for the second sidebar
  $second_max_pull = $content_width - $sidebar_second_width;
  // push data for primary region
  $sc_max_push = $sidebar_first_width + $sidebar_second_width;

  
  // let's assign some new data to our $content_regions array to assing pull classes
  
  // sidebar_first will be pulled an exact amount assuming it exists in this layout
  $content_regions['sidebar_first']['pull'] = array(
    'width' => $first_max_pull,
    'conditions' => array(
      'sidebar_second' => array(
        'type' => TRUE,
        'value' => $sidebar_second_width,
      ),
    ),
  );
  $content_regions['sidebar_first']['push'] = FALSE;
  
  $content_regions['sidebar_second']['pull'] = array(
    'width' => $second_max_pull,
    'conditions' => array(
      'sidebar_second' => array(
        'type' => TRUE,
        'value' => $sidebar_first_width,
      ),
    ),
  );
  $content_regions['sidebar_second']['push'] = FALSE;
  
  // main_content will only be pushed in this layout
  $content_regions['main_content']['pull'] = FALSE;
  $content_regions['main_content']['push'] = array(
    'width' => $sc_max_push,
    'conditions' => array(
      'sidebar_first' => array(
        // type should either be TRUE or FALSE
        // false value here will use a ! operator in front of the variable in the ns() function
        'type' => FALSE,
        'value' => $sidebar_first_width,
      ),
      'sidebar_second' => array(
        // type should either be TRUE or FALSE
        // false value here will use a ! operator in front of the variable in the ns() function
        'type' => FALSE,
        'value' => $sidebar_second_width,
      ),
    ),
  );

  break;
}
  // calling the dynamic region builder function to position these elements

$vars = dynamic_region_builder($content_regions, $vars['content_container_width'], $vars);

/**
 * Postscript Region
 * Same as above, preparing the postscript regions to accept settings configurations
 */
$vars['postscript_container_width'] = theme_get_setting('omega_postscript_container_width');
$vars['preface_wrapper_grids'] = theme_get_setting('omega_preface_wrapper_grids');
$postscript_regions = array(
  'postscript_first' => array(
    'data' => $vars['page']['postscript_first'],
    'width' => theme_get_setting('omega_postscript_first_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_postscript_first_prefix'),
      'suffix' => theme_get_setting('omega_postscript_first_suffix')),
    ),
  'postscript_second' => array(
    'data' => $vars['page']['postscript_second'],
    'width' => theme_get_setting('omega_postscript_second_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_postscript_second_prefix'),
      'suffix' => theme_get_setting('omega_postscript_second_suffix')),
    ),
  'postscript_third' => array(
    'data' => $vars['page']['postscript_third'],
    'width' => theme_get_setting('omega_postscript_third_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_postscript_third_prefix'),
      'suffix' => theme_get_setting('omega_postscript_third_suffix'))
  ),
  'postscript_fourth' => array(
    'data' => $vars['page']['postscript_fourth'],
    'width' => theme_get_setting('omega_postscript_fourth_width'),
    'spacing' => array(
      'prefix' => theme_get_setting('omega_postscript_fourth_prefix'),
      'suffix' => theme_get_setting('omega_postscript_fourth_suffix'))
  ),
);
$vars = static_region_builder($postscript_regions, theme_get_setting('postscript_container_width'), $vars);

/**
 * Footer Region
 */
$vars['footer_container_width'] = theme_get_setting('omega_footer_container_width');

$footer_regions = array(
  'footer_first' => array(
    'data' => $vars['page']['footer_first'],
    'width' => theme_get_setting('omega_footer_first_width'),
  ),
  'footer_second' => array(
    'data' => $vars['page']['footer_second'],
    'width' => theme_get_setting('omega_footer_second_width'),
  ),
);
$vars = static_region_builder($footer_regions, theme_get_setting('omega_footer_container_width'), $vars);

// Set a variable for the site name title and logo alt attributes text.
$slogan_text = $vars['site_slogan'];
$site_name_text = $vars['site_name'];
$vars['site_name_and_slogan'] = $site_name_text . ' ' . $slogan_text;
if (isset($vars['logo'])) {
  //$vars['logo_img'] = theme('image', substr($vars['logo'], strlen(base_path())), t($vars['site_name']), t($vars['site_name']));
  // @todo - Why no theme_image()?
  $vars['logo_img'] = '<img src="' . $vars['logo'] . '" alt="' . $vars['site_name_and_slogan'] . '" id="logo" />';
}

// NINESIXTY - For easy printing of variables.
if (isset($vars['logo_img'])) {
  $vars['linked_logo_img'] = l($vars['logo_img'], '<front>', array('rel' => 'home', 'title' => t($vars['site_name']), 'html' => TRUE));
}
if (isset($vars['site_name'])) {
  $vars['linked_site_name'] = l($vars['site_name'], '<front>', array('rel' => 'home', 'title' => t('Home')));
}

  if (isset($vars['main_menu'])) {
    $vars['primary_nav'] = theme('links__system_main_menu', array(
      'links' => $vars['main_menu'],
      'attributes' => array(
        'class' => array('links', 'main-menu'),
      ),
      'heading' => array(
        'text' => t('Main menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      )
    ));
  }
  else {
    $vars['primary_nav'] = FALSE;
  }
  if (isset($vars['secondary_menu'])) {
    $vars['secondary_nav'] = theme('links__system_secondary_menu', array(
      'links' => $vars['secondary_menu'],
      'attributes' => array(
        'class' => array('links', 'secondary-menu'),
      ),
      'heading' => array(
        'text' => t('Secondary menu'),
        'level' => 'h2',
        'class' => array('element-invisible'),
      )
    ));
  }
  else {
    $vars['secondary_nav'] = FALSE;
  }

if (user_access('search content') && theme_get_setting('omega_render_search_box')) {
  $vars['search_region'] = drupal_get_form('search_block_form');
  $vars['search_region_classes'] = 'grid-' . theme_get_setting('omega_search_width');
}
