<?php
// $Id: theme-settings.php,v 1.10.2.15 2010/08/03 14:19:52 himerus Exp $

/**
 * @file
 * Theme settings for the Omega theme.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 *
 * @param $form
 *   Nested array of form elements that comprise the form.
 * @param $form_state
 *   A keyed array containing the current state of the form.
 */
function omega_form_system_theme_settings_alter(&$form, &$form_state) {
  // Add the form's CSS
  drupal_add_css(drupal_get_path('theme', 'omega') . '/css/omega_theme_settings.css', array('weight' => 1000));
  // Add javascript to show/hide optional settings
  drupal_add_js(drupal_get_path('theme', 'omega') . '/js/omega_admin.js', array('weight' => 1000, 'type' => 'file', 'cache' => FALSE));

  for ($i = 1; $i <= 24; $i++) {
    $grids[$i] = $i;
  }
  for ($i = 0; $i <= 23; $i++) {
    $spacing[$i] = $i;
  }
  $containers = array(
    '12' => '12 column grid',
    '16' => '16 column grid',
    '24' => '24 column grid',
  );

  // General Settings
  $form['omega_general'] = array(
    '#type' => 'vertical_tabs',
    '#prefix' => t('<h2 class="omega-config-title">General Omega 960 Settings</h2>'),
    '#description' => t('Configure generic options on rendering content in this theme.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
    '#weight' => 10,
  );
  $form['omega_general']['optional_css'] = array(
    '#type' => 'fieldset',
    '#title' => t('Optional CSS Files'),
    '#description' => t('Here, you may disable default theme CSS provided by the Omega base theme.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['omega_general']['optional_css']['reset_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable reset.css'),
    '#default_value' => theme_get_setting('reset_css'),
    '#description' => t('reset.css is the default CSS reset standard created by <a href="http://meyerweb.com/eric/tools/css/reset/">Eric Meyer</a>.'),
  );
  $form['omega_general']['optional_css']['text_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable text.css'),
    '#default_value' => theme_get_setting('text_css'),
    '#description' => t('text.css offers some generic typography to give the default text presenation a bit more love.'),
  );
  $form['omega_general']['optional_css']['regions_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable regions.css'),
    '#default_value' => theme_get_setting('regions_css'),
    '#description' => t('regions.css defines all the default regions of the Omega theme and its sub-themes. Currently there are no defining characteristics in this file, and it can be disabled without affecting any region presentation.'),
  );
  $form['omega_general']['optional_css']['defaults_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable defaults.css'),
    '#default_value' => theme_get_setting('defaults_css'),
    '#description' => t('defaults.css gives the Omega theme the majority of the spacing and alignment CSS for various elements.'),
  );
  $form['omega_general']['optional_css']['custom_css'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable custom.css'),
    '#default_value' => theme_get_setting('custom_css'),
    '#description' => t('custom.css provides some additional CSS that is module related, and not a part of core drupal. Can be disabled and used as a reference for certain items. Contributed CSS that is not directly related to core markup will be in this file.'),
  );

  // Page titles
  $form['omega_general']['search_settings'] = array(
    '#type' => 'fieldset',
    '#title' => t('Search Settings'),
    '#description' => t('You may configure search settings here.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['omega_general']['search_settings']['omega_render_search_box'] = array(
    '#type' => 'checkbox',
    '#title' => t('Render tradional search box in theme.'),
    '#description' => t('By default in Drupal 7, the search box is no longer rendered in the theme. Enabling this setting will recreate that Drupal 6 behavior, allowing the search box to be renderd in the theme, AND as a block elsewhere should you choose.'),
    '#default_value' => theme_get_setting('omega_render_search_box'),
  );
  $form['omega_general']['search_settings']['omega_search_default_text'] = array(
    '#type' => 'textfield',
    '#title' => t('Custom Default Search Text'),
    '#size' => 60,
    '#default_value' => theme_get_setting('omega_search_default_text'),
    '#description' => t('Enter default value to use in search boxes.'),
  );
  $form['omega_general']['page_format_titles'] = array(
    '#type' => 'fieldset',
    '#title' => t('Page titles'),
    '#description' => t('This is the title that displays in the title bar of your web browser. Your site title, slogan, and mission can all be set on your Site Information page. [NOTE: For more advanced page title functionality, consider using the "Page Title" module.  However, the Page titles theme settings do not work in combination with the "Page Title" module and will be disabled if you have it enabled.]'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );

  if (module_exists('page_title') == FALSE) {
    $form['omega_general']['page_format_titles']['general_page_title_settings'] = array(
      '#type' => 'fieldset',
      '#prefix' => t('<h3 class="omega-accordion"><a href="#">General Page Title Settings</a></h3><div class="omega-accordion-content">'),
      '#suffix' => '</div>',
      '#title' => t('Front page title'),
      '#description' => t('Your front page in particular should have important keywords for your site in the page title'),
    );
    // SEO configurable separator
    $form['omega_general']['page_format_titles']['general_page_title_settings']['configurable_separator'] = array(
      '#type' => 'textfield',
      '#title' => t('Title separator'),
      '#description' => t('Customize the separator character used in the page title'),
      '#size' => 60,
      '#default_value' => theme_get_setting('configurable_separator'),
    );
    // front page title
    $form['omega_general']['page_format_titles']['front_page_format_titles'] = array(
      '#type' => 'fieldset',
      '#prefix' => t('<h3 class="omega-accordion"><a href="#">Front page titles</a></h3><div class="omega-accordion-content">'),
      '#suffix' => '</div>',
      '#title' => t('Front page title'),
      '#description' => t('Your front page in particular should have important keywords for your site in the page title'),
    );
    $form['omega_general']['page_format_titles']['front_page_format_titles']['front_page_title_display'] = array(
      '#type' => 'select',
      '#title' => t('Set text of front page title'),
      '#default_value' => theme_get_setting('front_page_title_display'),
      '#options' => array(
        'title_slogan' => t('Site title | Site slogan'),
        'slogan_title' => t('Site slogan | Site title'),
        'custom' => t('Custom (below)'),
      ),
    );
    $form['omega_general']['page_format_titles']['front_page_format_titles']['page_title_display_custom'] = array(
      '#type' => 'textfield',
      '#title' => t('Custom'),
      '#size' => 60,
      '#default_value' => theme_get_setting('page_title_display_custom'),
      '#description' => t('Enter a custom page title for your front page'),
    );

    // other pages title
    $form['omega_general']['page_format_titles']['other_page_format_titles'] = array(
      '#type' => 'fieldset',
      '#title' => t('Other page titles'),
      '#prefix' => t('<h3 class="omega-accordion"><a href="#">Other page titles</a></h3><div class="omega-accordion-content">'),
      '#suffix' => '</div>',
    );
    $form['omega_general']['page_format_titles']['other_page_format_titles']['other_page_title_display'] = array(
      '#type' => 'select',
      '#title' => t('Set text of other page titles'),
      '#collapsible' => TRUE,
      '#collapsed' => FALSE,
      '#default_value' => theme_get_setting('other_page_title_display'),
      '#options' => array(
        'ptitle_slogan' => t('Page title | Site slogan'),
        'ptitle_stitle' => t('Page title | Site title'),
        'ptitle_custom' => t('Page title | Custom (below)'),
        'custom' => t('Custom (below)'),
      ),
    );
    $form['omega_general']['page_format_titles']['other_page_format_titles']['other_page_title_display_custom'] = array(
      '#type' => 'textfield',
      '#title' => t('Custom'),
      '#size' => 60,
      '#default_value' => theme_get_setting('other_page_title_display_custom'),
      '#description' => t('Enter a custom page title for all other pages'),
    );
  }
  else {
    $form['omega_general']['page_format_titles']['#description'] = 'NOTICE: You currently have the "Page Title" module installed and enabled, so the Page titles theme settings have been disabled to prevent conflicts.  If you wish to re-enable the Page titles theme settings, you must first disable the "Page Title" module.';
    $form['omega_general']['page_format_titles']['configurable_separator']['#disabled'] = 'disabled';
  }

  // Breadcrumb
  $form['omega_general']['breadcrumb'] = array(
    '#type' => 'fieldset',
    '#title' => t('Breadcrumb settings'),
    '#attributes' => array('id' => 'omega-breadcrumb'),
  );
  $form['omega_general']['breadcrumb']['omega_breadcrumb'] = array(
    '#type' => 'select',
    '#title' => t('Display breadcrumb'),
    '#default_value' => theme_get_setting('omega_breadcrumb'),
    '#options' => array(
      'yes' => t('Yes'),
      'admin' => t('Only in admin section'),
      'no' => t('No'),
    ),
  );
  $form['omega_general']['breadcrumb']['omega_breadcrumb_separator'] = array(
    '#type' => 'textfield',
    '#title' => t('Breadcrumb separator'),
    '#description' => t('Text only. Don’t forget to include spaces.'),
    '#default_value' => theme_get_setting('omega_breadcrumb_separator'),
    '#size' => 5,
    '#maxlength' => 10,
  );
  $form['omega_general']['breadcrumb']['omega_breadcrumb_home'] = array(
    '#type' => 'checkbox',
    '#title' => t('Show home page link in breadcrumb'),
    '#default_value' => theme_get_setting('omega_breadcrumb_home'),
  );
  $form['omega_general']['breadcrumb']['omega_breadcrumb_trailing'] = array(
    '#type' => 'checkbox',
    '#title' => t('Append a separator to the end of the breadcrumb'),
    '#default_value' => theme_get_setting('omega_breadcrumb_trailing'),
    '#description' => t('Useful when the breadcrumb is placed just before the title.'),
  );
  $form['omega_general']['breadcrumb']['omega_breadcrumb_title'] = array(
    '#type' => 'checkbox',
    '#title' => t('Append the content title to the end of the breadcrumb'),
    '#default_value' => theme_get_setting('omega_breadcrumb_title'),
    '#description' => t('Useful when the breadcrumb is not placed just before the title.'),
  );

  // Region Settings
  $form['omega_regions'] = array(
    '#type' => 'vertical_tabs',
    '#prefix' => t('<h2 class="omega-config-title">960gs Region Settings</h2>'),
    '#weight' => -10,
    '#description' => t('Configure how your regions are rendered. This area is currently a quick implementation of an interface to allow end users to quickly build out and adjust the default page layout. This feature will be improved over time, and include much more flexibility.'),
  );
  $form['omega_regions']['defaults'] = array(
    '#type' => 'fieldset',
    '#title' => t('Default Configuration'),
  );
  $form['omega_regions']['defaults']['omega_default_container_width'] = array(
    '#type' => 'select',
    '#title' => t('Default container width'),
    '#default_value' => theme_get_setting('omega_default_container_width'),
    '#options' => $containers,
    '#weight' => -50,
    '#description' => t('This width is used for regions like $help, $messages and other non-important regions in page.tpl.php'),
  );
  $default_omega_layout = theme_get_setting('omega_fixed_fluid') ? theme_get_setting('omega_fixed_fluid') : 'fixed';
  $form['omega_regions']['defaults']['omega_fixed_fluid'] = array(
    '#type' => 'radios',
    '#description' => t('You may select fluid layout, or the default fixed width layout.'),
    '#title' => t('Fixed / Fluid Layout'),
    '#default_value' => $default_omega_layout,
    '#options' => array(
      'fixed' => t('Fixed width (theme default)'),
      'fluid' => t('Fluid width'),
    ),
  );

  // Header Blocks
  $form['omega_regions']['branding'] = array(
    '#type' => 'fieldset',
    '#title' => t('Logo/Menu Configuration'),
    '#description' => t('Header region zones, including Logo/Branding, Primary & Secondary menus, Header first and Header Second. By default, the logo and menu elements are designed to display inline. This is accomplished by making the width of the grid elements for the logo and menus to equal the container width for those items, however, to make them stack, you can make each element have the full amount of grids that the container allows.'),
  );
  $form['omega_regions']['branding']['omega_branding_wrapper_width'] = array(
    '#type' => 'select',
    '#title' => t('Wrapper Area width for Logo/Navigation Elements'),
    '#default_value' => theme_get_setting('omega_branding_wrapper_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the branding (logo) area and navigation menus.'),
  );
  $form['omega_regions']['branding']['omega_header_logo_width'] = array(
    '#type' => 'select',
    '#title' => t('Width for Logo/Branding area'),
    '#default_value' => theme_get_setting('omega_header_logo_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the logo/branding area. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['branding']['omega_header_menu_width'] = array(
    '#type' => 'select',
    '#title' => t('Wrapper Area width for Menu Elements'),
    '#default_value' => theme_get_setting('omega_header_menu_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the primary/secondary menu elements. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['headers'] = array(
    '#type' => 'fieldset',
    '#title' => t('Header Configuration'),
    '#description' => t(''),
  );
  $form['omega_regions']['headers']['omega_header_wrapper_width'] = array(
    '#type' => 'select',
    '#title' => t('Wrapper Area width for Header Elements'),
    '#default_value' => theme_get_setting('omega_header_wrapper_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the header region areas.'),
  );
  $form['omega_regions']['headers']['omega_header_first_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Header First'),
    '#default_value' => theme_get_setting('omega_header_first_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the first header region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['headers']['omega_header_second_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Header Second'),
    '#default_value' => theme_get_setting('omega_header_second_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the last header region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['internal_nav'] = array(
    '#type' => 'fieldset',
    '#title' => t('Slogan/Breadcrumb/Search Configuration'),
    '#description' => t(''),
  );
  $form['omega_regions']['internal_nav']['omega_internal_nav_wrapper_width'] = array(
    '#type' => 'select',
    '#title' => t('Wrapper Area width for Breadcrumb/Slogan/Search'),
    '#default_value' => theme_get_setting('omega_internal_nav_wrapper_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the breadcrumb/search/slogan area.'),
  );
  $form['omega_regions']['internal_nav']['omega_breadcrumb_slogan_width'] = array(
    '#type' => 'select',
    '#title' => t('Wrapper Area width for Breadcrumb/Slogan'),
    '#default_value' => theme_get_setting('omega_breadcrumb_slogan_width'),
    '#options' => $grids,
    '#description' => t('Grid width for the slogan/breadcrumb area. By default, the slogan will only appear in the zone if there is no breadcrumb avaiable.'),
  );
  $form['omega_regions']['internal_nav']['omega_search_width'] = array(
    '#type' => 'select',
    '#title' => t('Wrapper Area width for Search'),
    '#default_value' => theme_get_setting('omega_search_width'),
    '#options' => $grids,
    '#description' => t('Grid width for the search zone, which appears inline with the breadcrumb/slogan zone.'),
  );

  // Preface Blocks
  $form['omega_regions']['preface'] = array(
    '#type' => 'fieldset',
    '#title' => t('Preface Configuration'),
    '#description' => t('Grid configuration for preface zones. You may use prefix and suffix here to allow extra spacing between regions. You can create all regions inline if the total of the grid elements are less than or equal to the container width defind above. You may stack these items easily by making the elements grid width be the full amount defined by the container.'),
  );
  $form['omega_regions']['preface']['omega_preface_wrapper_grids'] = array(
    '#type' => 'select',
    '#title' => t('Preface Wrapper Container Grids'),
    '#default_value' => theme_get_setting('omega_preface_wrapper_grids'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the preface regions.'),
  );
  $form['omega_regions']['preface']['omega_preface_first_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Preface First'),
    '#default_value' => theme_get_setting('omega_preface_first_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the first preface region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['preface']['omega_preface_first_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Preface First'),
    '#default_value' => theme_get_setting('omega_preface_first_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['preface']['omega_preface_first_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Preface First'),
    '#default_value' => theme_get_setting('omega_preface_first_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );
  $form['omega_regions']['preface']['omega_preface_second_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Preface Second'),
    '#default_value' => theme_get_setting('omega_preface_second_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the middle preface region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['preface']['omega_preface_second_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Preface Second'),
    '#default_value' => theme_get_setting('omega_preface_second_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['preface']['omega_preface_second_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Preface Second'),
    '#default_value' => theme_get_setting('omega_preface_second_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );
  $form['omega_regions']['preface']['omega_preface_third_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Preface Third'),
    '#default_value' => theme_get_setting('omega_preface_third_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the last preface region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['preface']['omega_preface_third_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Preface Third'),
    '#default_value' => theme_get_setting('omega_preface_third_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['preface']['omega_preface_third_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Preface Third'),
    '#default_value' => theme_get_setting('omega_preface_third_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );

  // Main Body Regions
  $form['omega_regions']['main'] = array(
    '#type' => 'fieldset',
    '#title' => t('Content Layout Configuration'),
    '#description' => t('<p>Grid configurations for Content Zone, Sidebar First and Sidebar Second. The "main" regions here are the only true "smart" zone that will use the maximum container width to determine the appropriate width for elements in this zone based on which regions are displayed on the current page.</p><p>If your container grid is 16 grids, and you have a configuration of 4-8-4, which would imply two sidebars and the content zone, if all regions are present, this layout of 4-8-4 will be respected. However, if on a page, the first sidebar is empty of content, the content zone would then incorporate those leftover 4 grids, so your layout would be 12-4.'),
  );
  $form['omega_regions']['main']['defaults'] = array(
    '#type' => 'fieldset',
    '#title' => t('Content Layout Configuration Defaults'),
    '#prefix' => t('<h3 class="omega-accordion"><a href="#">Content Layout Configuration Defaults</a></h3><div class="omega-accordion-content">'),
    '#suffix' => '</div>',
  );
  $form['omega_regions']['main']['defaults']['omega_content_layout'] = array(
    '#type' => 'radios',
    '#description' => t('You may arrange the order and size of your sidebars and main content zones here.'),
    '#title' => t('Content Zone Layout'),
    '#default_value' => theme_get_setting('omega_content_layout'),
    '#options' => array(
      'first_content_last' => t('Sidebar First - Content - Sidebar Second'),
      'content_first_last' => t('Content - Sidebar First - Sidebar Second'),
      'first_last_content' => t('Sidebar First - Sidebar Second - Content'),
    ),
  );
  $form['omega_regions']['main']['defaults']['omega_content_container_width'] = array(
    '#type' => 'select',
    '#title' => t('Container width for content zone'),
    '#default_value' => theme_get_setting('omega_content_container_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the main content regions. This includes the content_top, content_bottom, and primary content zone.'),
  );
  $form['omega_regions']['main']['defaults']['omega_sidebar_first_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Sidebar First'),
    '#default_value' => theme_get_setting('omega_sidebar_first_width'),
    '#options' => $grids,
    '#description' => t('This number, combined with the Content Main and Sidebar Second determine the share of your grid for each element.'),
  );
  $form['omega_regions']['main']['defaults']['omega_content_main_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Main Content Region'),
    '#default_value' => theme_get_setting('omega_content_main_width'),
    '#options' => $grids,
    '#description' => t('This number, combined with the Sidebar First and Sidebar Second determine the share of your grid for each element.'),
  );
  $form['omega_regions']['main']['defaults']['omega_sidebar_second_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Sidebar Second'),
    '#default_value' => theme_get_setting('omega_sidebar_second_width'),
    '#options' => $grids,
    '#description' => t('This number, combined with the Sidebar First and Main Content determine the share of your grid for each element.'),
  );
  $form['omega_regions']['main']['front'] = array(
    '#type' => 'fieldset',
    '#title' => t('Content Layout Configuration for Front Page'),
    '#prefix' => t('<h3 class="omega-accordion"><a href="#">Content Layout Configuration for Front Page</a></h3><div class="omega-accordion-content">'),
    '#suffix' => '</div>',
    '#description' => t('<p>You have the ability to proide alternate setings here for the content zone on the front page.'),
  );
  $form['omega_regions']['main']['front']['omega_content_front_override'] = array(
    '#type' => 'checkbox',
    '#title' => t('Override settings for content zones on home page.'),
    '#default_value' => theme_get_setting('omega_content_front_override'),
  );
  $form['omega_regions']['main']['front']['omega_front_content_layout'] = array(
    '#type' => 'radios',
    '#description' => t('You may arrange the order and size of your sidebars and main content zones here.'),
    '#title' => t('Content Zone Layout'),
    '#default_value' => theme_get_setting('omega_front_content_layout'),
    '#options' => array(
      'first_content_last' => t('Sidebar First - Content - Sidebar Second'),
      'content_first_last' => t('Content - Sidebar First - Sidebar Second'),
      'first_last_content' => t('Sidebar First - Sidebar Second - Content'),
    ),
  );
  $form['omega_regions']['main']['front']['omega_front_content_container_width'] = array(
    '#type' => 'select',
    '#title' => t('Container width for content zone'),
    '#default_value' => theme_get_setting('omega_front_content_container_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the main content regions. This includes the content_top, content_bottom, and primary content zone.'),
  );
  $form['omega_regions']['main']['front']['omega_front_sidebar_first_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Sidebar First'),
    '#default_value' => theme_get_setting('omega_front_sidebar_first_width'),
    '#options' => $grids,
    '#description' => t('This number, combined with the Content Main and Sidebar Second determine the share of your grid for each element.'),
  );
  $form['omega_regions']['main']['front']['omega_front_content_main_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Main Content Region'),
    '#default_value' => theme_get_setting('omega_front_content_main_width'),
    '#options' => $grids,
    '#description' => t('This number, combined with the Sidebar First and Sidebar Second determine the share of your grid for each element.'),
  );
  $form['omega_regions']['main']['front']['omega_front_sidebar_second_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Sidebar Second'),
    '#default_value' => theme_get_setting('omega_front_sidebar_second_width'),
    '#options' => $grids,
    '#description' => t('This number, combined with the Sidebar First and Main Content determine the share of your grid for each element.'),
  );
  $form['omega_regions']['main']['combine'] = array(
    '#type' => 'fieldset',
    '#title' => t('Combine Sidebar Settings'),
    '#prefix' => t('<h3 class="omega-accordion"><a href="#">Combine Sidebar Settings</a></h3><div class="omega-accordion-content">'),
    '#suffix' => '</div>',
  );
  $options = array(t('Combine Sidebars on all except the listed pages.'), t('Combine Sidebars on only the listed pages.'));
  $description = t("Enter one page per line as Drupal paths. The '*' character is a wildcard. Example paths are %blog for the blog page and %blog-wildcard for every personal blog. %front is the front page.", array('%blog' => 'blog', '%blog-wildcard' => 'blog/*', '%front' => '<front>'));
  $form['omega_regions']['main']['combine']['sidebar_combine'] = array(
    '#type' => 'radios',
    '#title' => t('Combine Sidebars'),
    '#description' => t('This is useful for administrative pages, and in certain contexts. You may choose to in certain areas, combine the <strong>$sidebar_first</strong> and <strong>$sidebar_second</strong> to create one sidebar from the content of both.'),
    '#options' => $options,
    '#default_value' => theme_get_setting('sidebar_combine'),
  );
  $form['omega_regions']['main']['combine']['sidebar_contain_pages'] = array(
    '#type' => 'textarea',
    '#title' => t('Pages'),
    '#default_value' => theme_get_setting('sidebar_contain_pages'),
    '#description' => $description,
  );

  // Postscript Blocks
  $form['omega_regions']['postscript'] = array(
    '#type' => 'fieldset',
    '#title' => t('Postscript Configuration'),
    '#description' => t('Grid configuration for postscript zones. You may use prefix and suffix here to allow extra spacing between regions. You can create all regions inline if the total of the grid elements are less than or equal to the container width defind above. You may stack these items easily by making the elements grid width be the full amount defined by the container.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['omega_regions']['postscript']['omega_postscript_container_width'] = array(
    '#type' => 'select',
    '#title' => t('Container width for postscript regions'),
    '#default_value' => theme_get_setting('omega_postscript_container_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the postscript regions.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_first_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Postscript First'),
    '#default_value' => theme_get_setting('omega_postscript_first_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the first postscript region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_first_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Postscript First'),
    '#default_value' => theme_get_setting('omega_postscript_first_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_first_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Postscript First'),
    '#default_value' => theme_get_setting('omega_postscript_first_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_second_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Postscript Second'),
    '#default_value' => theme_get_setting('omega_postscript_second_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the second postscript region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_second_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Postscript Second'),
    '#default_value' => theme_get_setting('omega_postscript_second_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_second_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Postscript Second'),
    '#default_value' => theme_get_setting('omega_postscript_second_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_third_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Postscript Third'),
    '#default_value' => theme_get_setting('omega_postscript_third_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the third postscript region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_third_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Postscript Third'),
    '#default_value' => theme_get_setting('omega_postscript_third_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_third_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Postscript Third'),
    '#default_value' => theme_get_setting('omega_postscript_third_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_fourth_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Postscript Fourth'),
    '#default_value' => theme_get_setting('omega_postscript_fourth_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the fourth postscript region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_fourth_prefix'] = array(
    '#type' => 'select',
    '#title' => t('Prefix Spacing for Postscript Fourth'),
    '#default_value' => theme_get_setting('omega_postscript_fourth_prefix'),
    '#options' => $spacing,
    '#prefix' => '<div class="prefix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding prefix grids to this element will add padding to the left side of the element, creating spacing between the previous element.'),
  );
  $form['omega_regions']['postscript']['omega_postscript_fourth_suffix'] = array(
    '#type' => 'select',
    '#title' => t('Suffix Spacing for Postscript Fourth'),
    '#default_value' => theme_get_setting('omega_postscript_fourth_suffix'),
    '#options' => $spacing,
    '#prefix' => '<div class="suffix_config">',
    '#suffix' => '</div>',
    '#description' => t('Adding suffix grids to this element will add padding to the right side of the element, creating spacing between the next element.'),
  );

  // Footer Blocks
  $form['omega_regions']['footer'] = array(
    '#type' => 'fieldset',
    '#title' => t('Footer Configuration'),
    '#description' => t('Grid configuration for footer zones. You can create both regions inline if the total of the grid elements are less than or equal to the container width defind above. You may stack these items easily by making the elements grid width be the full amount defined by the container.'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['omega_regions']['footer']['omega_footer_container_width'] = array(
    '#type' => 'select',
    '#title' => t('Container width for footer regions'),
    '#default_value' => theme_get_setting('omega_footer_container_width'),
    '#options' => $containers,
    '#description' => t('Container Grid width for the footer regions.'),
  );
  $form['omega_regions']['footer']['omega_footer_first_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Footer First'),
    '#default_value' => theme_get_setting('omega_footer_first_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the first footer region. This number should be less than or equal to the container width defined above.'),
  );
  $form['omega_regions']['footer']['omega_footer_second_width'] = array(
    '#type' => 'select',
    '#title' => t('Contextual Width for Footer Second'),
    '#default_value' => theme_get_setting('omega_footer_second_width'),
    '#options' => $grids,
    '#description' => t('Grid width of the last footer region. This number should be less than or equal to the container width defined above.'),
  );

  // Administrative Settings
  $form['omega_admin'] = array(
    '#type' => 'vertical_tabs',
    '#prefix' => t('<h2 class="omega-config-title">Administrative Omega 960 Settings</h2>'),
    '#description' => t('Configure options for administration and development.'),
    '#weight' => 11,
  );
  // overlay toggle options
  $form['omega_admin']['grid_overlay'] = array(
    '#type' => 'fieldset',
    '#title' => t('Grid Overlay / Debugging'),
    '#collapsible' => TRUE,
    '#collapsed' => TRUE,
  );
  $form['omega_admin']['grid_overlay']['debug_grid_toggle'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable grid overlay/toggle for selected roles.'),
    '#default_value' => theme_get_setting('debug_grid_toggle'),
  );
  $form['omega_admin']['grid_overlay']['debug_grid_toggle_state'] = array(
    '#type' => 'checkbox',
    '#title' => t('Turn on grid overlay on page load. (otherwise requires clicking to enable)'),
    '#default_value' => theme_get_setting('debug_grid_toggle_state'),
  );
  $role_options = array_map('check_plain', user_roles());
  unset($role_options[1]);
  $form['omega_admin']['grid_overlay']['debug_grid_roles'] = array(
    '#type' => 'checkboxes',
    '#title' => t('Roles that may use the grid overlay/debugging tool. (User 1 Automatically has access.)'),
    '#default_value' => theme_get_setting('debug_grid_roles'),
    '#options' => $role_options,
  );
}