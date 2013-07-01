
Ext.Loader.setConfig({
    enabled: true
});
var modulePath = '/' + jQuery('#metadata').data('modulepath');
var project = jQuery('#metadata').data('project');
Ext.Loader.setPath('LightBoxApp.store',  modulePath + '/ui/app/store');
Ext.Loader.setPath('LightBoxApp.model',  modulePath + '/ui/app/model');
Ext.Loader.setPath('LightBoxApp.controller', modulePath + '/ui/app/controller');
Ext.Loader.setPath('LightBoxApp.view',  modulePath + '/ui/app/view');
Ext.Loader.setPath('Ext.ux', '/sites/all/libraries/ext-4.1.1a/examples/ux');
// keep z-index seed low to avoid interfering with drupal admin overlay
Ext.WindowMgr.zseed = 1040;
Ext.application({
    project: project,
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
        if (project){
            // set the project param for the store: used to filter resources belonging to project
            this.getStore('ResourceStore').proxy.extraParams.project = project;
        }
        this.getStore('ResourceStore').load();
    }
});
