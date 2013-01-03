<?php
// $Id: preprocess-html.inc,v 1.1.2.8 2010/10/18 03:46:03 himerus Exp $

/**
 * @file
 * Contents of omega_preprocess_html().
 */

// grid debugging
global $user;
$debug_access = FALSE;
$debug_roles = theme_get_setting('debug_grid_roles');

if (!isset($user->roles[1])) {
  // Check to see if $user has the appropriate role.
  foreach ($debug_roles as $k => $v) {
    if ($v && isset($user->roles[$k])) {
      // user has access to debug tools
      $debug_access = TRUE;
    }
  }
}

// if grid debug is ON, and user either has access by role, or is uid 1
if(theme_get_setting('debug_grid_toggle') && ($debug_access || $user->uid == 1)) {
  $debug_settings = array(
    'grid_overlay_on' => theme_get_setting('debug_grid_toggle'),
    'grid_overlay_state' => theme_get_setting('debug_grid_toggle_state'),
  );
  drupal_add_js($debug_settings, 'setting');
  drupal_add_js(drupal_get_path('theme', 'omega') . '/js/debug.js', array('weight' => 1000, 'type' => 'file'));
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/debug.css');
}

/**
 * Allow the default text in the search box to be 100% configurable via backend theme settings
 */
$search_text_val = check_plain(theme_get_setting('omega_search_default_text')) ? check_plain(theme_get_setting('omega_search_default_text')) : 'search...';
$search_text = array(
  'default_search_text' => $search_text_val,
);
drupal_add_js($search_text, 'setting');

// ACQUIA-MARINA
// Set site title, slogan, mission, page title & separator (unless using Page Title module)
if (!module_exists('page_title')) {
  $title = t(variable_get('site_name', ''));
  $slogan = t(variable_get('site_slogan', ''));
  $page_title = t(drupal_get_title());
  $title_separator = theme_get_setting('configurable_separator');
  if ($vars['is_front']) { // Front page title settings
    switch (theme_get_setting('front_page_title_display')) {
      case 'title_slogan':
        $vars['head_title'] = drupal_set_title($title . $title_separator . $slogan);
        break;
      case 'slogan_title':
        $vars['head_title'] = drupal_set_title($slogan . $title_separator . $title);
        break;
      case 'custom':
        if (theme_get_setting('page_title_display_custom') !== '') {
          $vars['head_title'] = drupal_set_title(t(theme_get_setting('page_title_display_custom')));
        }
    }
  }
  else { // Non-front page title settings
    switch (theme_get_setting('other_page_title_display')) {
      case 'ptitle_slogan':
        $vars['head_title'] = drupal_set_title($page_title . $title_separator . $slogan);
        break;
      case 'ptitle_stitle':
        $vars['head_title'] = drupal_set_title($page_title . $title_separator . $title);
        break;
      case 'ptitle_custom':
        if (theme_get_setting('other_page_title_display_custom') !== '') {
          $vars['head_title'] = drupal_set_title($page_title . $title_separator . t(theme_get_setting('other_page_title_display_custom')));
        }
        break;
      case 'custom':
        if (theme_get_setting('other_page_title_display_custom') !== '') {
          // make sure to wrap this in a t() or you might be sacrificing a kitten
          $vars['head_title'] = drupal_set_title(t(theme_get_setting('other_page_title_display_custom')));
        }
    }
  }
  $vars['head_title'] = strip_tags($vars['head_title']); // Remove any potential html tags
}