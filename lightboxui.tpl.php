<link rel="stylesheet" href="/sites/all/libraries/ext-4.1.1a/resources/css/ext-all.css">
<link rel="stylesheet" href="/sites/all/libraries/ext-4.1.1a/resources/css/ext-all-gray.css">
<?php 
/* 
 * arg(0) == 'lightbox'
 */
$modulePrefix = arg(0);
$fullscreen = $user->data['fullscreen'];
?>
<div id="metadata"
 <?php if ($fullscreen):?>
 data-fullscreen="<?php print $fullscreen; ?>"
 <?php endif; ?>
 data-moduleprefix="<?php print $modulePrefix; ?>"
 data-modulepath="<?php print drupal_get_path('module', 'lightbox'); ?>">
</div>
<div id="uiplaceholder"></div>
