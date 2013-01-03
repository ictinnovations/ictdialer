<?php
// $Id: theme-settings.php,v 1.1.2.3 2010/08/24 11:38:30 himerus Exp $
/**
 * @file
 * template.php for gamma theme
 */

/**
 * Implementation of THEMEHOOK_settings() function.
 *
 * @param $saved_settings
 *   An array of saved settings for this theme.
 * @return
 *   A form array.
 */
function gamma_form_system_theme_settings_alter(&$form, &$form_state) {
  for ($i = 1; $i <= 24; $i++) {
    $grids[$i] = $i;
  }
  // add setting for user menu
  $form['omega_regions']['branding']['omega_user_menu_width'] = array(
    '#type' => 'select',
    '#title' => t('Width for User Menu'),
    '#default_value' => theme_get_setting('omega_user_menu_width'),
    '#options' => $grids,
    '#description' => t('Width of the user menu which provides different links for the logged in or anonymous user.'),
  );
  // add a text field to prefix the postscript region for sexification of lower regions
  $form['omega_regions']['postscript']['omega_footer_header_tag'] = array(
    '#type' => 'textfield',
    '#title' => t('Custom "Footer" Header'),
    '#size' => 60,
    '#weight' => -100,
    '#default_value' => theme_get_setting('omega_footer_header_tag'),
    '#description' => t('This text will appear above the postscript regions in the "footer" area of the site, and be rendered with an H2 tag... <em>Plain Text only</em>.'),
  );
  $form['omega_general']['optional_css']['reset_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable reset.css'),
    '#default_value' => theme_get_setting('reset_css'),
    '#description' => t('reset.css is the default CSS reset standard created by <a href="http://meyerweb.com/eric/tools/css/reset/">Eric Meyer</a>.'),
  );
  $form['omega_general']['optional_css']['gamma_color_scheme'] = array(
      '#type' => 'select',
      '#title' => t('Select Gamma Color Scheme...'),
      '#description' => t('The Gamma subtheme allows you to configure your default color scheme using a pre-built set of color options. Here you may select the color scheme you would like to use for your site.'),
      '#default_value' => theme_get_setting('gamma_color_scheme'),
      '#options' => array(
        'dark' => t('dark.css (grayscale)'),
        'blue' => t('blue.css (blue)'),
      ),
      '#weight' => -100,
    );
  // Return the form
  return $form;
}
