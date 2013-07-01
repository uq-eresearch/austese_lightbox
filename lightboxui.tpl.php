<link rel="stylesheet" href="/sites/all/libraries/ext-4.1.1a/resources/css/ext-all.css">
<link rel="stylesheet" href="/sites/all/libraries/ext-4.1.1a/resources/css/ext-all-gray.css">
<?php 
/* 
 * arg(0) == 'lightbox'
 */
$modulePrefix = arg(0);
if (property_exists($user,'data')){
 $fullscreen = $user->data['fullscreen'];
} else {
 $fullscreen = false;
}
$project = null;
if (isset($_GET['project'])) {
 $project = $_GET['project'];
}
?>
<div id="metadata"
 <?php if ($fullscreen):?>
 data-fullscreen="<?php print $fullscreen; ?>"
 <?php endif; ?>
 <?php if ($project):?>
 data-project="<?php print $project; ?>"
 <?php endif; ?>
 data-baseurl="http://<?php print $_SERVER['SERVER_NAME']; ?>"
 data-moduleprefix="<?php print $modulePrefix; ?>"
 data-modulepath="<?php print drupal_get_path('module', 'lightbox'); ?>">
</div>
<div id="uiplaceholder"></div>
