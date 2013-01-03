<?php
// $Id: preprocess-html.inc,v 1.1.2.1 2010/08/03 14:47:32 himerus Exp $
/**
 * @file
 * preprocess-block.inc is an alternate location for storage on items
 * to be ran during hook_preprocess_html.
 */
drupal_add_js('misc/ui/jquery.effects.core.min.js');
drupal_add_js('misc/ui/jquery.effects.bounce.min.js');

$vars['scripts'] = drupal_get_js();