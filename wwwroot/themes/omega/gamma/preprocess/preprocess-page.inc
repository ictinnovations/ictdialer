<?php
// $Id: preprocess-page.inc,v 1.1.2.4 2010/08/15 17:01:38 himerus Exp $
/**
 * @file
 * preprocess-block.inc is an alternate location for storage on items
 * to be ran during hook_preprocess_page.
 */

/**
 * Render a custom menu tree for the primary navigation and drop-down menus.
 * It's very sexy...
 */

if (isset($vars['main_menu'])) {
  $vars['primary_nav'] = render(menu_tree('main-menu'));
}
else {
  $vars['primary_nav'] = FALSE;
}


// set the menu width for the user menu based on the custom theme settings.
$vars['user_menu_width'] = theme_get_setting('omega_user_menu_width');

/**
 * Render a user menu
 */
global $user;
if ($user->uid > 0) {
  // logged in user menu
  $user_links = array(
    // link to view profile
    'profile' => array(
      'attributes' => array(
        'title' => t('View your profile'),
      ),
      'href' => 'user',
      'title' => t('Profile'),
    ),
    // link to edit account/profile
    'account' => array(
      'attributes' => array(
        'title' => t('Edit your profile'),
      ),
      'href' => 'user/' . $user->uid . '/edit',
      'title' => t('Account'),
    ),
    // link to logout
    'logout' => array(
      'attributes' => array(
        'title' => t('Logout'),
      ),
      'href' => 'user/logout',
      'title' => t('Logout'),
    ),
  );
  // declare custom welcome message for registered users.
  $vars['user_welcome'] = t("Welcome back, ") . l($user->name, 'user') . '.';
}
else {
  // anonymous user menu
  $user_links = array(
    // link to login
    'login' => array(
      'attributes' => array(
        'title' => t('Logout'),
      ),
      'href' => 'user/login',
      'title' => t('Login'),
    ),
    // link to register
    'register' => array(
      'attributes' => array(
        'title' => t('Register'),
      ),
      'href' => 'user/register',
      'title' => t('Register'),
    ),
    // link to password reset form.
    'password' => array(
      'attributes' => array(
        'title' => t('Forgot Password?'),
      ),
      'href' => 'user/password',
      'title' => t('Forgot Password?'),
    ),
  );
  // declare custom welcome message for guests.
  $vars['user_welcome'] = t("Welcome, Guest!!");
}

// build a variable for the menu
$vars['user_nav'] = theme('links', array(
  'links' => $user_links,
  'attributes' => array(
    'class' => array('links', 'user-menu'),
  ),
  'heading' => array(
    'text' => t('User menu'),
    'level' => 'h2',
    'class' => array('element-invisible'),
  )
));
$vars['footer_title'] = check_plain(theme_get_setting('omega_footer_header_tag'));
