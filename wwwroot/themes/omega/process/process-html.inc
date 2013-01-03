<?php
// $Id: process-html.inc,v 1.1.2.3 2010/10/11 00:11:43 himerus Exp $

/**
 * @file
 * Contents of omega_process_html().
 */

// enable/disable optional CSS files
if (theme_get_setting('reset_css') == '1') {
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/reset.css', array('group' => CSS_DEFAULT, 'every_page' => TRUE, 'weight', -100));
}
if (theme_get_setting('text_css') == '1') {
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/text.css', array('group' => CSS_DEFAULT, 'every_page' => TRUE, 'weight', -100));
}
if (theme_get_setting('regions_css') == '1') {
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/regions.css', array('group' => CSS_DEFAULT, 'every_page' => TRUE, 'weight', -100));
}
if (theme_get_setting('defaults_css') == '1') {
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/defaults.css', array('group' => CSS_DEFAULT, 'every_page' => TRUE, 'weight', -100));
}
if (theme_get_setting('custom_css') == '1') {
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/custom.css', array('group' => CSS_DEFAULT, 'every_page' => TRUE, 'weight', -100));
}

// Add JavaScript for fluid width option
if (theme_get_setting('omega_fixed_fluid') == 'fluid') {
  drupal_add_js(array('fluid_grid' => theme_get_setting('omega_fixed_fluid')), 'setting');
}
$vars['styles']  = drupal_get_css();