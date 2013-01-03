<?php
// $Id: theme-settings.php,v 1.1.2.1 2010/08/03 14:47:32 himerus Exp $
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
function gamma_starterkit_form_system_theme_settings_alter(&$form, &$form_state) {
  
  return $form;
}
