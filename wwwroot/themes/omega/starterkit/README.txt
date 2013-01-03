$Id: README.txt,v 1.1.4.3 2010/10/18 03:46:03 himerus Exp $
##########################################################
##### Omega Theme
##########################################################
Project Page:   http://drupal.org/project/omega
Issue Queue:    http://drupal.org/project/issues/omega
Usage Stats:    http://drupal.org/project/usage/omega
Demo Page:      http://omega.himerus.com
Maintainer(s):  Jake Strawn 
                http://himerus.com
                http://twitter.com/himerus
##########################################################

Omega Theme Information
=======================
The Omega Theme is a powerful and free Drupal theme based on the 960gs. 
It harneses the power and features of many popular themes to provide an 
excellent base theme, and sub-theming system to help you quickly prototype 
and theme your site...

Additional 960gs/Omega Resources
================================
  * I recently presented at DrupalCamp Montreal on the 960gs and Omega theme. 
    The information on this presentation along with slides & video can be found here.
    http://himerus.com/drupalcamp-montreal-advanced-960gs-theming-omega
    
  * I presented on 960gs and the ninesixty theme at Drupalcon Paris with Todd 
    from Four Kitchens. You can download the slides here, and watch the video here.
    http://himerus.com/drupalcon-paris-accelerated-grid-theming-using-ninesixty
    
  * I will be presenting this April at Drupalcon San Fransisco on the Omgea theme 
    in a presentation titled: Elevating 960gs in Drupal with the Omega theme. 
    You may find information on the session and sign up here
    http://sf2010.drupal.org/conference/sessions/elevating-960gs-drupal-omega-theme

Creating your Omega Sub Theme
=============================

1.  Copy the starterkit folder from the default Omega theme directory 
    and place it in your sites/all/themes directory.

2.  Rename the folder to the theme name of your choice.
    (subtheme for this example)
    
3.  Rename omega_starterkit.info to subtheme.info and modify default
    information in the .info file as needed (name & description)
    
4.  Open template.php and search and replace omega_starterkit with
    "subtheme" or the appropriate name of the theme you are creating.
    
5.  Open theme-settings.php and search and replace omega_starterkit with
    "subtheme" or the appropriate name of the theme you are creating.
    
6.  Visit admin/appearance/settings/subtheme and configure to your 
    hearts desire!!

Contributors
============
- himerus (Jake Strawn)
