<?php
// $Id: template.php,v 1.1.2.5 2010/09/11 14:46:21 himerus Exp $

/**
 * @file
 * template.php for gamma theme
 */

/*
 * Add any conditional stylesheets you will need for this sub-theme.
 *
 * To add stylesheets that ALWAYS need to be included, you should add them to
 * your .info file instead. Only use this section if you are including
 * stylesheets based on certain conditions.
 */
/* -- Delete this line if you want to use and modify this code
// Example: optionally add a fixed width CSS file.
if (theme_get_setting('gamma_fixed')) {
  drupal_add_css(path_to_theme() . '/layout-fixed.css', 'theme', 'all');
}
// */

/**
* Automatically rebuild the theme registry.
*/


/**
 * Implements hook_theme().
 */
function gamma_theme(&$existing, $type, $theme, $path) {
  $hooks = omega_theme($existing, $type, $theme, $path);
  // Add your theme hooks like this:
  /*
  $hooks['hook_name_here'] = array( // Details go here );
  */
  // @TODO: Needs detailed comments. Patches welcome!
  return $hooks;
}


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

function gamma_preprocess(&$vars, $hook) {
  
}
// */

/**
 * Override or insert variables into the page templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
/* -- Delete this line if you want to use this function
function gamma_preprocess_page(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the node templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
/* -- Delete this line if you want to use this function
function gamma_preprocess_node(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the comment templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("comment" in this case.)
 */
/* -- Delete this line if you want to use this function
function gamma_preprocess_comment(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */

/**
 * Override or insert variables into the block templates.
 *
 * @param $vars
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
/* -- Delete this line if you want to use this function
function gamma_preprocess_block(&$vars, $hook) {
  $vars['sample_variable'] = t('Lorem ipsum.');
}
// */
function gamma_preprocess_field(&$vars) {
  //drupal_set_message('Calling <strong>gamma_preprocess_field()</strong>');
  // Add specific suggestions that can override the default implementation.
  array_unshift($vars['theme_hook_suggestions'], 'field__' . $vars['element']['#field_type']);
}
function gamma_preprocess_field_taxonomy_term_reference(&$vars) {
  drupal_set_message('Calling <strong>gamma_preprocess_field__taxonomy_term_reference()</strong>');
}

/**
 * Return a "traditional" format for taxonomy term links
 * This will render them as an unordered list rather than a series of divs and 
 * also adding first and last classes, etc.
 * @param unknown_type $vars
 * @return string
 */
function gamma_field__taxonomy_term_reference($vars) {
  $output = '';

  // Render the label, if it's not hidden.
  if (!$vars['label_hidden']) {
    $output .= '<div class="field-label"' . $vars['title_attributes'] . '>' . $vars['label'] . ':&nbsp;</div>';
  }

  // Render the items.
  $output .= '<ul class="field-items"' . $vars['content_attributes'] . '>';
  foreach ($vars['items'] as $delta => $item) {
    $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
    if (count($vars['items']) - 1 == $delta) {
      $classes .= ' last';
    }
    if ($delta == 0) {
      $classes .= ' first';
    }
    $output .= '<li class="' . $classes . '"' . $vars['item_attributes'][$delta] . '>' . drupal_render($item) . '</li>';
  }
  $output .= '</ul>';

  // Render the top-level DIV.
  $output = '<div class="' . $vars['classes'] . '"' . $vars['attributes'] . '>' . $output . '</div>';
  //krumo($vars);
  return $output;
}


function gamma_menu_tree($vars) {
  return '<ul class="menu">' . $vars['tree'] . '</ul>';
}

function gamma_menu_link(array $vars) {
  $element = $vars['element'];
  $sub_menu = '';

  if ($element['#below']) {
    $sub_menu = drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>";
}


function gamma_links($vars) {
  $links = $vars['links'];
  $attributes = $vars['attributes'];
  $heading = $vars['heading'];
  global $language_url;
  $output = '';

  if (count($links) > 0) {
    $output = '';

    // Treat the heading first if it is present to prepend it to the
    // list of links.
    if (!empty($heading)) {
      if (is_string($heading)) {
        // Prepare the array that will be used when the passed heading
        // is a string.
        $heading = array(
          'text' => $heading,
          // Set the default level of the heading.
          'level' => 'h2',
        );
      }
      $output .= '<' . $heading['level'];
      if (!empty($heading['class'])) {
        $output .= drupal_attributes(array('class' => $heading['class']));
      }
      $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
    }

    $output .= '<ul' . drupal_attributes($attributes) . '>';

    $num_links = count($links);
    $i = 1;

    foreach ($links as $key => $link) {
      $class = array($key);

      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class[] = 'first';
      }
      if ($i == $num_links) {
        $class[] = 'last';
      }
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
          && (empty($link['language']) || $link['language']->language == $language_url->language)) {
        $class[] = 'active';
      }
      $output .= '<li' . drupal_attributes(array('class' => $class)) . '>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes.
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span' . $span_attributes . '>' . $link['title'] . '</span>';
      }

      $i++;
      $output .= "</li>";
    }

    $output .= '</ul>';
  }

  return $output;
}

function gamma_item_list($vars) {
  $items = $vars['items'];
  $title = $vars['title'];
  $type = $vars['type'];
  $attributes = $vars['attributes'];

  $output = '<div class="item-list">';
  if (isset($title)) {
    $output .= '<h3>' . $title . '</h3>';
  }

  if (!empty($items)) {
    $output .= "<$type" . drupal_attributes($attributes) . '>';
    $num_items = count($items);
    foreach ($items as $i => $item) {
      $attributes = array();
      $children = array();
      if (is_array($item)) {
        foreach ($item as $key => $value) {
          if ($key == 'data') {
            $data = $value;
          }
          elseif ($key == 'children') {
            $children = $value;
          }
          else {
            $attributes[$key] = $value;
          }
        }
      }
      else {
        $data = $item;
      }
      if (count($children) > 0) {
        // Render nested list.
        $data .= theme_item_list(array('items' => $children, 'title' => NULL, 'type' => $type, 'attributes' => $attributes));
      }
      if ($i == 0) {
        $attributes['class'][] = 'first';
      }
      if ($i == $num_items - 1) {
        $attributes['class'][] = 'last';
      }
      $output .= '<li' . drupal_attributes($attributes) . '>' . $data . "</li>";
    }
    $output .= "</$type>";
  }
  $output .= '</div>';
  return $output;
}

/**
 * Implementation of theme_views_mini_pager
 * 
 * This custom theming for views_mini_pager changes the previous/next
 * links to remove theme completely when not present to avoid the
 * &nbsp; messing up the spacing/theming in the list.
 */
function gamma_views_mini_pager($tags = array(), $limit = 10, $element = 0, $parameters = array(), $quantity = 9) {
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.


  $li_previous = theme('pager_previous',
    array(
      'text' => (isset($tags[1]) ? $tags[1] : t('‹‹')),
      'limit' => $limit,
      'element' => $element,
      'interval' => 1,
      'parameters' => $parameters,
    )
  );

  $li_next = theme('pager_next',
    array(
      'text' => (isset($tags[3]) ? $tags[3] : t('››')),
      'limit' => $limit,
      'element' => $element,
      'interval' => 1,
      'parameters' => $parameters,
    )
  );
  
  if ($pager_total[$element] > 1) {
    if (!empty($li_previous)) {
	  	$items[] = array(
	      'class' => array('pager-previous'),
	      'data' => $li_previous,
	    );
    }
    $items[] = array(
      'class' => array('pager-current'),
      'data' => t('@current of @max', array('@current' => $pager_current, '@max' => $pager_max)),
    );
    if (!empty($li_next)) {
	    $items[] = array(
	      'class' => array('pager-next'),
	      'data' => $li_next,
	    );
    }
    return theme('item_list',
      array(
        'items' => $items,
        'title' => NULL,
        'type' => 'ul',
        'attributes' => array('class' => array('pager')),
      )
    );
  }
}

function gamma_form_alter(&$form, &$form_state, $form_id) {
	switch ($form_id) {
		// for some reason the login form links are above the submit button
		// WTF
		case 'user_login_block':
			$form['links']['#weight'] = 100;
			break;
	}
}

/**
 * Implements hook_css_alter().
 * Alter CSS files before they are output on the page.
 *
 * @param $css
 *   An array of all CSS items (files and inline CSS) being requested on the page.
 */
function gamma_css_alter(&$css) {
  // fluid width option
  if (theme_get_setting('gamma_color_scheme')) {
  	$css_gamma_color_css = drupal_get_path('theme', 'gamma') . '/css/dark.css';
    $css_gamma_color = theme_get_setting('gamma_color_scheme');
    if (isset($css[$css_gamma_color_css])) {
      $css[$css_gamma_color_css]['data'] = drupal_get_path('theme', 'gamma') . '/css/' . $css_gamma_color . '.css';
    }
  }
}