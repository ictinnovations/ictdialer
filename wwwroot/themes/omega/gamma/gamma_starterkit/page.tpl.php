<?php
// $Id: page.tpl.php,v 1.1.2.3 2010/08/15 17:01:38 himerus Exp $
/**
 * @file 
 * Default page template
 */
?>
  <div id="page" class="clearfix">
    <div id="gamma-header-wrapper" class="clearfix">
	    <div id="site-header" class="container-<?php print $branding_wrapper_width; ?> clearfix">
	      <div id="branding" class="grid-<?php print $header_logo_width; ?>">
	        <?php if (isset($linked_logo_img)): ?>
	          <?php print $linked_logo_img; ?>
	        <?php endif; ?>
	        
	        <?php if (isset($linked_site_name)): ?>
	          <?php if ($title): ?>
	            <h2 id="site-name" class=""><?php print $linked_site_name; ?></h2>
	          <?php else: ?>
	            <h1 id="site-name" class=""><?php print $linked_site_name; ?></h1>
	          <?php endif; ?>
	        <?php endif; ?>
	      </div><!-- /#branding -->
	      <div id="user-menu" class="grid-<?php print $user_menu_width; ?>">
	        <span class="user-welcome"><?php print $user_welcome ?></span><?php print $user_nav; ?>
	      </div>
	    </div><!-- /#site-header -->
	    
	    <?php if($page['header_first'] || $page['header_second']): ?>
	    <div id="header-regions" class="container-<?php print $header_wrapper_width; ?> clearfix">
	      <?php if($page['header_first']): ?>
	        <div id="header-first" class="<?php print $header_first_classes; ?>">
	          <?php print render($page['header_first']); ?>
	        </div><!-- /#header-first -->
	      <?php endif; ?>
	      <?php if($page['header_second']): ?>
	        <div id="header-last" class="<?php print $header_second_classes; ?>">
	          <?php print render($page['header_second']); ?>
	        </div><!-- /#header-last -->
	      <?php endif; ?>
	    </div><!-- /#header-regions -->
	    <?php endif; ?>
      <div id="gamma-menu-wrapper" class="container-<?php print $branding_wrapper_width; ?> clearfix">
        <?php if ($primary_nav || $secondary_nav): ?>
          <div id="site-menu" class="clearfix">
          <?php if($primary_nav): ?>
            <?php print $primary_nav; ?>
          <?php endif; ?>
          </div><!-- /#site-menu -->
        <?php endif; ?>
      </div><!-- /#gamma-menu-wrapper -->
    </div><!-- /#gamma-header-wrapper -->
    
    
    <div id="gamma-outer-body-wrapper" class="clearfix">
    <div id="gamma-body-wrapper" class="clearfix">
      <div id="gamma-inner-body-wrapper" class="clearfix container-<?php print $default_container_width; ?>">
		    <?php if($site_slogan && $is_front || $breadcrumb): ?>
		    <div id="internal-nav" class="container-<?php print $internal_nav_wrapper_width; ?> clearfix">
		      <div id="slogan-bcrumb" class="grid-<?php print $breadcrumb_slogan_width; ?>">
		        <?php if ($site_slogan && $is_front): ?>
		          <div id="slogan"><?php print $site_slogan; ?></div><!-- /#slogan -->
		        <?php endif; ?>
		        <?php if($breadcrumb): ?>
		          <div id="bcrumb"><?php print $breadcrumb; ?></div><!-- /#bcrumb -->
		        <?php endif; ?>
		      </div>
		      <?php if(isset($search_region)): ?>
		        <div id="search-region" class="<?php print $search_region_classes; ?>"><?php print render($search_region);?></div>
		      <?php endif; ?>
		    </div><!-- /#internal-nav -->
		    <?php endif; ?>
		    
		    
		    <?php if($page['preface_first'] || $page['preface_second'] || $page['preface_third']): ?>
		    <div id="preface-wrapper" class="container-<?php print $preface_wrapper_grids; ?> clearfix">
		      <?php if($page['preface_first']): ?>
		        <div id="preface-first" class="preface <?php print $preface_first_classes; ?>">
		          <?php print render($page['preface_first']); ?>
		        </div><!-- /#preface-first -->
		      <?php endif; ?>
		      <?php if($page['preface_second']): ?>
		        <div id="preface-middle" class="preface <?php print $preface_second_classes; ?>">
		          <?php print render($page['preface_second']); ?>
		        </div><!-- /#preface-middle -->
		      <?php endif; ?>
		      <?php if($page['preface_third']): ?>
		        <div id="preface-last" class="preface <?php print $preface_third_classes; ?>">
		          <?php print render($page['preface_third']); ?>
		        </div><!-- /#preface-last -->
		      <?php endif; ?>
		    </div><!-- /#preface-wrapper -->
		    <?php endif; ?>
		    
		    <?php if($messages): ?>
		    <div class="container-<?php print $default_container_width; ?> clearfix">
		      <div class="grid-<?php print $default_container_width; ?>">
		        <?php print $messages; ?>
		      </div>
		    </div><!-- /.container-xx -->
		    <?php endif; ?>
		    
		    <div id="main-content-container" class="container-<?php print $content_container_width; ?> clearfix">
		      <div id="main-wrapper" class="column <?php print $main_content_classes; ?>">
		        <?php if (isset($tabs) && count($tabs) > 0): ?>
		          <div id="content-tabs" class=""><?php print render($tabs); ?></div><!-- /#content-tabs -->
		        <?php endif; ?>
		    
		        <?php print render($title_prefix); ?>
		        <?php if ($title): ?>
		          <h1 class="title" id="page-title"><?php print $title; ?></h1>
		        <?php endif; ?>
		        <?php print render($title_suffix); ?>
		        
		        <?php if ($action_links): ?>
		          <ul class="action-links"><?php print render($action_links); ?></ul>
		        <?php endif; ?>
		    
		        <div id="main-content" class="region clearfix">
		          <?php print render($page['content']); ?>
		        </div><!-- /#main-content -->
		        
		        
		      </div><!-- /#main-wrapper -->
		    
		      <?php if (isset($page['sidebar_first'])): ?>
		        <div id="sidebar-first" class="column sidebar region <?php print $sidebar_first_classes; ?>">
		          <?php print render($page['sidebar_first']); ?>
		        </div><!-- /#sidebar-first -->
		      <?php endif; ?>
		    
		      <?php if (isset($page['sidebar_second'])): ?>
		        <div id="sidebar-last" class="column sidebar region <?php print $sidebar_second_classes; ?>">
		          <?php print render($page['sidebar_second']); ?>
		        </div><!-- /#sidebar-last -->
		      <?php endif; ?>
		    </div><!-- /#main-content-container -->
	    </div><!-- /#gamma-internal-body-wrapper -->
    </div><!-- /#gamma-body-wrapper -->
    </div>
    <?php if ($footer_title): ?>
    <?php if($page['postscript_first'] || $page['postscript_second'] || $page['postscript_third'] || $page['postscript_fourth']): ?>
    <div id="footer-header" class="container-<?php print $default_container_width; ?>">
      <div class="grid-<?php print $default_container_width; ?>">
        <h2><?php print $footer_title; ?></h2>
      </div>
    </div>
    <?php endif; ?>
    <?php endif; ?>
    <div id="gamma-footer-wrapper" class="clearfix">
      
	    
	    <?php if($page['postscript_first'] || $page['postscript_second'] || $page['postscript_third'] || $page['postscript_fourth']): ?>
	    <div id="postscript-wrapper" class="container-<?php print $postscript_container_width; ?> clearfix">
	      <?php if($page['postscript_first']): ?>
	        <div id="postscript-one" class="postscript <?php print $postscript_first_classes; ?>">
	          <?php print render($page['postscript_first']); ?>
	        </div><!-- /#postscript-one -->
	      <?php endif; ?>
	      <?php if($page['postscript_second']): ?>
	        <div id="postscript-two" class="postscript <?php print $postscript_second_classes; ?>">
	          <?php print render($page['postscript_second']); ?>
	        </div><!-- /#postscript-two -->
	      <?php endif; ?>
	      <?php if($page['postscript_third']): ?>
	        <div id="postscript-three" class="postscript <?php print $postscript_third_classes; ?>">
	          <?php print render($page['postscript_third']); ?>
	        </div><!-- /#postscript-three -->
	      <?php endif; ?>
	      <?php if($page['postscript_fourth']): ?>
	        <div id="postscript-four" class="postscript <?php print $postscript_fourth_classes; ?>">
	          <?php print render($page['postscript_fourth']); ?>
	        </div><!-- /#postscript-four -->
	      <?php endif; ?>
	    </div><!-- /#postscript-wrapper -->
	    <?php endif; ?>
	    
	    <?php if($page['footer_first'] || $page['footer_second']): ?>
	    <div id="footer-wrapper" class="container-<?php print $footer_container_width; ?> clearfix">
	      <?php if($page['footer_first']): ?>
	        <div id="footer-first" class="<?php print $footer_first_classes; ?>">
	          <?php print render($page['footer_first']); ?>
	        </div><!-- /#footer-first -->
	      <?php endif; ?>
	      <?php if($page['footer_second']): ?>
	        <div id="footer-last" class="<?php print $footer_second_classes; ?>">
	          <?php print render($page['footer_second']); ?>
	        </div><!-- /#footer-last -->
	      <?php endif; ?>
	    </div><!-- /#footer-wrapper -->
	    <?php endif; ?>
    </div><!-- /#gamma-footer-wrapper -->
  </div><!-- /#page -->