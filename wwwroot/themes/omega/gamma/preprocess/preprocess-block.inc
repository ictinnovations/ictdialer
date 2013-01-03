<?php
// $Id: preprocess-block.inc,v 1.1.2.1 2010/08/03 14:47:32 himerus Exp $
/**
 * @file 
 * preprocess-block.inc is an alternate location for storage on items
 * to be ran during hook_preprocess_block.
 */

// give blocks placed through the menu_tree theme wrapper a specific class for proper theming
if (substr($vars['elements']['#theme_wrappers'][0], 0, 9) == 'menu_tree') {
  $vars['classes_array'][] = 'menu-block';
  //krumo($vars);
}
// add the menu-block class to some default blocks in Drupal for proper styling.
switch ($vars['block_html_id']) {
  case 'block-comment-recent':
    $vars['classes_array'][] = 'menu-block';
    break;
}
