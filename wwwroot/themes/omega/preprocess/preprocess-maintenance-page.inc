<?php
// $Id: preprocess-maintenance-page.inc,v 1.3.2.2 2010/08/03 14:19:52 himerus Exp $

/**
 * @file
 * Contents of omega_preprocess_maintenance_page().
 * @todo This needs work.
 */

$vars['body_attributes'] = array();

$vars['body_attributes']['id'] = 'maintenance-page';

$classes[] = $vars['body_classes'];

$vars['body_attributes']['class'] = implode(' ', $classes);

$vars['attributes'] = drupal_attributes($vars['body_attributes']);
