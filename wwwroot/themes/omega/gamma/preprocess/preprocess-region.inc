<?php
// $Id: preprocess-region.inc,v 1.1.2.1 2010/08/03 14:47:32 himerus Exp $
/**
 * @file
 * preprocess-block.inc is an alternate location for storage on items
 * to be ran during hook_preprocess_region.
 */
// adding a sidebar class to sidebar_first and sidebar_second
if ($vars['region'] == 'sidebar_first' || $vars['region'] == 'sidebar_second') {
  $vars['classes_array'][] = 'sidebar';
}