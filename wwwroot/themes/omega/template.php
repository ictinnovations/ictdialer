<?php
// $Id: template.php,v 1.9.2.19 2010/10/11 00:11:42 himerus Exp $
// Report all PHP errors (see changelog)

/**
 * @file
 * Contains theme functions, preprocess and process overrides, and custom
 * functions for the Omega theme.
 */


/**
  * Implements hook_preprocess().
  *
  * This function checks to see if a hook has a preprocess file associated with it
  * and if so, loads it.
  *
  * This makes it easier to keep sorted the preprocess functions that can be present
  * in the template.php file. You may still use hook_preprocess_page, etc in
  * template.php or create a file preprocess-page.inc in the preprocess folder to
  * include the appropriate logic to your preprocess functionality.
  *
  * @param $vars
  * @param $hook
  */
function omega_preprocess(&$vars, $hook) {
  // Collect all information for the active theme.
  $themes_active = array();
  global $theme_info;
  // If there is a base theme, collect the names of all themes that may have
  // preprocess files to load.
  if (isset($theme_info->base_theme)) {
    global $base_theme_info;
    foreach ($base_theme_info as $base) {
      $themes_active[] = $base->name;
    }
  }

  // Add the active theme to the list of themes that may have preprocess files.
  $themes_active[] = $theme_info->name;
  // Check all active themes for preprocess files that will need to be loaded.
  foreach ($themes_active as $name) {
    if (is_file(drupal_get_path('theme', $name) . '/preprocess/preprocess-' . str_replace('_', '-', $hook) . '.inc')) {
      include(drupal_get_path('theme', $name) . '/preprocess/preprocess-' . str_replace('_', '-', $hook) . '.inc');
    }
  }
}

/**
 * Implementation of hook_process()
 * 
 * This function checks to see if a hook has a process file associated with 
 * it, and if so, loads it.
 * 
 * This makes it easier to keep sorted the process functions that can be present in the 
 * template.php file. You may still use hook_process_page, etc in template.php
 * or create a file process-page.inc in the process folder to include the appropriate
 * logic to your process functionality
 * 
 * @param $vars
 * @param $hook
 */
function omega_process(&$vars, $hook) {
// Collect all information for the active theme.
  $themes_active = array();
  global $theme_info;
  //krumo($theme_info);
  // If there is a base theme, collect the names of all themes that may have 
  // preprocess files to load.
  if (isset($theme_info->base_theme)) {
    global $base_theme_info;
    foreach ($base_theme_info as $base) {
      $themes_active[] = $base->name;
    }
  }

  // Add the active theme to the list of themes that may have preprocess files.
  $themes_active[] = $theme_info->name;

  // Check all active themes for preprocess files that will need to be loaded.
  foreach ($themes_active as $name) {
    if (is_file(drupal_get_path('theme', $name) . '/process/process-' . str_replace('_', '-', $hook) . '.inc')) {
      include(drupal_get_path('theme', $name) . '/process/process-' . str_replace('_', '-', $hook) . '.inc');
    }
  }
}

/**
 * Implements template_preprocess_html().
 *
 * Preprocessor for page.tpl.php template file.
 * The default functionality can be found in preprocess/preprocess-page.inc
 */
function omega_preprocess_html(&$vars) {
  
}

/**
 * Implements template_preprocess_page().
 */
function omega_preprocess_page(&$vars) {

}

/**
 * Implements template_preprocess_node().
 */
function omega_preprocess_node(&$vars) {

}

/**
 * Implements template_process_page().
 */
function omega_process_page(&$vars) {

}

/**
 * Implements template_process_node().
 */
function omega_process_node(&$vars) {
  // Convert node attributes to a string and append to existing RDFa attributes.
  $vars['attributes'] .= drupal_attributes($vars['node_attributes']);
}

/**
 * NINESIXTY - Contextually adds 960 Grid System classes.
 *
 * The first parameter passed is the *default class*. All other parameters must
 * be set in pairs like so: "$variable, 3". The variable can be anything
 * available within a template file and the integer is the width set for the
 * adjacent box containing that variable.
 *
 *  class="<?php print ns('grid-16', $var_a, 6); ?>"
 *
 * If $var_a contains data, the next parameter (integer) will be subtracted from
 * the default class. See the README.txt file.
 */
function ns() {
  $args = func_get_args();
  $default = array_shift($args);
  // Get the type of class, i.e., 'grid', 'pull', 'push', etc.
  // Also get the default unit for the type to be procesed and returned.
  list($type, $return_unit) = explode('-', $default);

  // Process the conditions.
  $flip_states = array('var' => 'int', 'int' => 'var');
  $state = 'var';
  foreach ($args as $arg) {
    if ($state == 'var') {
      $var_state = !empty($arg);
    }
    elseif ($var_state) {
      $return_unit = $return_unit - $arg;
    }
    $state = $flip_states[$state];
  }

  $output = '';
  // Anything below a value of 1 is not needed.
  if ($return_unit > 0) {
    $output = $type . '-' . $return_unit;
  }
  return $output;
}

/**
 * The region_builder function will create the variables needed to create
 * a dynamic group of regions. This function is simply a quick pass-thru
 * that will create either inline or stacked regions. This function will
 * not do any advanced functionality, but simply assing the appropriate
 * classes based on the settings for the theme.
 *
 * For a more advanced set of regions, dynamic_region_builder() will be used.
 */
function static_region_builder($region_data, $container_width, $vars) {
  // let's cycle the region data, and determine what we have
  foreach ($region_data AS $region => $info) {
    // if we do have content for this region, let's create it.
    if ($info['data']) {
      $vars[$region . '_classes'] = ns('grid-' . $info['width']);
    }
    if (isset($info['spacing'])) {
      foreach ($info['spacing'] AS $attribute => $value) {
        if ($value) {
          $vars[$region . '_classes'] .= ' ' . $attribute . '-' . $value;
        } 
      }
    }
  }
  return $vars;
}

/*
function _omega_dynamic_zones($width, $conditions, $vars) {
  foreach ($conditions AS $variable => $reaction) {
    if (($reaction['type'] && isset($vars['page'][$variable])) || (!$reaction['type'] && !isset($vars['page'][$variable]))) {
      $width = $width - $reaction['value'];
    }
  }
  return $width;
}
*/

function _omega_dynamic_zones($width, $conditions, $vars) {
  foreach ($conditions AS $variable => $reaction) {
    if (($reaction['type'] && is_array($vars['page'][$variable]) && count($vars['page'][$variable]) > 0 ) || (!$reaction['type'] && (!is_array($vars['page'][$variable]) || count($vars['page'][$variable]) == 0)  )) {
      $width = $width - $reaction['value'];
    }
  }
  return $width;
} 


function _omega_dynamic_widths($width, $conditions, $vars) {
  foreach ($conditions AS $variable => $zone) {
    if ((isset($vars['page'][$variable])) && count($vars['page'][$variable]) > 0) {
      $width = $width - $zone['width'];
    }
  }
  return $width;
}

/**
 * The dynamic_region_builder function will be used to pass important zones
 * like the content regions where the regions sent to the function MUST appear
 * inline, and advanced calculations need to be done in order to display the as such
 *
 * Stacked regions are not possible using this function, and should be passed through
 * static_region_builder() instead.
 */
function dynamic_region_builder($region_data, $container_width, $vars) {
  // let's cycle the region data, and determine what we have
  foreach ($region_data AS $region => $info) {
    // if we do have content for this region, let's create it.
    if (isset($info['data'])) {
      if (isset($info['primary'])) {
        $width = $container_width;
        $vars[$region . '_classes'] = ns('grid-' . _omega_dynamic_widths($width, $info['related'], $vars));
      }
      else {
        $width = $info['width'];
        $vars[$region . '_classes'] = ns('grid-' . $info['width']);
      }
      // we know we have stuff to put here, so we can check for push & pull options
      if ($info['pull']) {
        // looks like we do wanna pull, or this value would have been false, so let's boogie
        $vars[$region . '_classes'] .= ' ' . ns('pull-' . _omega_dynamic_zones($info['pull']['width'], $info['pull']['conditions'], $vars));
      }
      if ($info['push']) {
        // looks like a push
        $vars[$region . '_classes'] .= ' ' . ns('push-' . _omega_dynamic_zones($info['push']['width'], $info['push']['conditions'], $vars));
      }
    }
    // currently ignored becuase we have not given prefix/suffix class options
    // to the primary content zones... this will become active again later
    if (isset($info['spacing'])) {
      foreach ($info['spacing'] AS $attribute => $value) {
        if ($value) {
          $vars[$region . '_classes'] .= ' ' . $attribute . '-' . $value;
        }
      }
    }
    // \unused prefix/suffix stuffs
  }
  return $vars;
}

/**
 * The rfilter function takes one argument, an array of values for the regions
 * for a "group" of regions like preface or postscript
 * @param $vars
 */
function rfilter($vars) {
  return count(array_filter($vars));
}

/**
 * ZEN - Returns HTML for a breadcrumb trail.
 *
 * @param $variables
 *   An associative array containing:
 *   - breadcrumb: An array containing the breadcrumb links.
 */
function omega_breadcrumb($variables) {
  $breadcrumb = $variables['breadcrumb'];
  // Determine if we are to display the breadcrumb.
  $show_breadcrumb = theme_get_setting('omega_breadcrumb');
  if ($show_breadcrumb == 'yes' || $show_breadcrumb == 'admin' && arg(0) == 'admin') {

    // Optionally get rid of the homepage link.
    $show_breadcrumb_home = theme_get_setting('omega_breadcrumb_home');
    if (!$show_breadcrumb_home) {
      array_shift($breadcrumb);
    }

    // Return the breadcrumb with separators.
    if (!empty($breadcrumb)) {
      // Provide a navigational heading to give context for breadcrumb links to
      // screen-reader users. Make the heading invisible with .element-invisible.
      $output = '<h2 class="element-invisible">' . t('You are here') . '</h2>';

      $breadcrumb_separator = theme_get_setting('omega_breadcrumb_separator');
      $trailing_separator = $title = '';
      if (theme_get_setting('omega_breadcrumb_title')) {
        $trailing_separator = $breadcrumb_separator;
        $title = drupal_get_title();
      }
      elseif (theme_get_setting('omega_breadcrumb_trailing')) {
        $trailing_separator = $breadcrumb_separator;
      }
      $output .= '<div class="breadcrumb">' . implode($breadcrumb_separator, $breadcrumb) . "$trailing_separator$title</div>";
      return $output;
    }
  }
  // Otherwise, return an empty string.
  return '';
}

/**
 * Implements hook_theme().
 *
 * @todo Either remove this entirely, or clean up and document.
 */
function omega_theme(&$existing, $type, $theme, $path) {
  //include_once './' . drupal_get_path('theme', 'omega') . '/theme-functions.inc';
  // Since we are rebuilding the theme registry and the theme settings' default
  // values may have changed, make sure they are saved in the database properly.
  //omega_theme_get_default_settings($theme);
  return array();
}


/**
 * Implements hook_css_alter().
 * Alter CSS files before they are output on the page.
 *
 * @param $css
 *   An array of all CSS items (files and inline CSS) being requested on the page.
 */
function omega_css_alter(&$css) {
  // fluid width option
  if (theme_get_setting('omega_fixed_fluid') == 'fluid') {
    $css_960 = drupal_get_path('theme', 'omega') . '/css/960.css';
    if (isset($css[$css_960])) {
      $css[$css_960]['data'] = drupal_get_path('theme', 'omega') . '/css/960-fluid.css';
    }
  }
}
