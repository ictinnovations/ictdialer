<?php
// $Id: preprocess-comment.inc,v 1.1.2.1 2010/08/03 14:47:32 himerus Exp $
/**
 * @file
preprocess-block.inc is an alternate location for storage on items
 * to be ran during hook_preprocess_comment.
 */
// Create a cleaner "submited by" variable.
$vars['submitted'] = t('Posted by ') . $vars['author'] . t(' on') . ' ' . $vars['created'];