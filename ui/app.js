
Ext.Loader.setConfig({
    enabled: true
});
var modulePath = '/' + jQuery('#metadata').data('modulepath');
Ext.Loader.setPath('LightBoxApp.store',  modulePath + '/ui/app/store');
Ext.Loader.setPath('LightBoxApp.model',  modulePath + '/ui/app/model');
Ext.Loader.setPath('LightBoxApp.controller', modulePath + '/ui/app/controller');
Ext.Loader.setPath('LightBoxApp.view',  modulePath + '/ui/app/view');
Ext.Loader.setPath('Ext.ux', '/sites/all/libraries/ext-4.1.1a/examples/ux');
// keep z-index seed low to avoid interfering with drupal admin overlay
Ext.WindowMgr.zseed = 1040;
Ext.application({
    // FIXME: import ResourceModel, ResourceStore and ResourceGrid from repository rather than duplicating code here
    models: [
        'ResourceModel'
    ],
    stores: [
        'ResourceStore'
    ],
    views: [
        'LightBox',
        'LightBoxWindow',
        'ResourceChooser',
        'ResourceGrid',
    ],
    autoCreateViewport: false,
    name: 'LightBoxApp',
    controllers: [
        'LightBoxAppController'
    ],
    launch: function(){
        var placeholder = Ext.get('uiplaceholder');
        Ext.getBody().setStyle('overflow', 'hidden');
        var mainWindow = Ext.create('LightBoxApp.view.LightBox',{
            renderTo: Ext.getBody(),
        }).showAt(placeholder.getX(),placeholder.getY());
        var fullscreen = jQuery('#metadata').data('fullscreen');
        if (fullscreen == 1){
            this.getController('LightBoxAppController').toggleFullscreen(Ext.ComponentQuery.query('#toggleFullscreenButton')[0]);
        }
    }
});
