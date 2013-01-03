<?php
// $Id: preprocess-node.inc,v 1.4.2.3 2010/08/03 14:19:52 himerus Exp $

/**
 * @file
 * Contents of omega_preprocess_node().
 */

// Add a class to allow styling of nodes of a specific type.
$vars['classes_array'][] = drupal_html_class($vars['type']);

// Add a class to allow styling based on publish status.
$vars['classes_array'][] = $vars['status'] ? 'published' : 'unpublished';

// Add a class to allow styling based on promotion.
$vars['classes_array'][] = $vars['promote'] ? 'promoted' : 'not-promoted';

// Add a class to allow styling based on sticky status.
$vars['classes_array'][] = $vars['sticky'] ? 'sticky' : 'not-sticky';

// Add a class to allow styling based on if a node is showing a teaser or the
// whole thing.
$vars['classes_array'][] = $vars['teaser'] ? 'teaser' : 'full-view';

// Add a class to allow styling of nodes being viewed by the author of the
// node in question.
if ($vars['uid'] == $vars['user']->uid) {
  $vars['classes_array'][] = 'self-posted';
}

// Add a class to allow styling based on the node author.
$vars['classes_array'][] = drupal_html_class('author-' . $vars['node']->name);

// Add a class to allow styling for zebra striping.
$vars['classes_array'][] = drupal_html_class($vars['zebra']);

// Add a class to make the node container self clearing.
$vars['classes_array'][] = 'clearfix';

// Remove node classes provided by core where duplication exists.
$exclusions = array(drupal_html_class('node-' . $vars['type']), 'node-promoted', 'node-sticky', 'node-teaser', 'node-unpublished');
foreach ($vars['classes_array'] as $key => $value) {
  if (in_array($value, $exclusions)) {
    unset($vars['classes_array'][$key]);
  }
}

// Prepare the arrays to handle the classes and ids for the node container.
$vars['node_attributes']['id'] = drupal_html_id('node-' . $vars['type'] . '-' . $vars['nid']);
$vars['node_attributes']['class'] = $vars['classes_array'];
