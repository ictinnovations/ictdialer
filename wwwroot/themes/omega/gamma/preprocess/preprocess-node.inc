<?php
// $Id: preprocess-node.inc,v 1.1.2.1 2010/08/03 14:47:32 himerus Exp $
/**
 * @file
 * preprocess-block.inc is an alternate location for storage on items
 * to be ran during hook_preprocess_node.
 */

/**
 * @todo - make this term manipulation a setting in node display specific theme settings.
 */
foreach ($vars['content'] AS $item) {
  if (isset($item['#field_type'])) {
    $term_fields = '';
    if ($item['#field_type'] == 'taxonomy_term_reference') {
      $field_name = $item['#field_name'];
      // $term_fields will hold the HTML data from any term_reference field, and be rendered separately in node.tpl.php
      $term_fields .= render($item);
      // hide this "term" element from rendering in $content
      hide($vars['content'][$field_name]);
    }
  }
}
$vars['terms'] = $term_fields;

// Create a cleaner "submited by" variable.
$vars['submitted'] = t('Posted by ') . $vars['name'] . t(' on') . ' ' . format_date($vars['created'], 'short');

//krumo($vars);
//krumo($vars['content']);
//krumo($term_fields);