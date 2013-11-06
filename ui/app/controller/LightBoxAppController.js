Ext.define('LightBoxApp.controller.LightBoxAppController', {
    extend: 'Ext.app.Controller',
    resources: [],
    toggleFullscreen: function(button, e, options){
        button.up('window').toggleMaximize();
        if (button.iconCls=='exitFullscreenIcon') {
            button.setIconCls('fullscreenIcon');
        } else {
            button.setIconCls('exitFullscreenIcon');
            // set height of placeholder to 0 to prevent overflow in browser window
            var placeholder = Ext.get('uiplaceholder');
            placeholder.setHeight(0);
            Ext.getBody().scrollTo('top',0);
        }
    },
    
    resizeUI: function(w, h){
        // force resize and repositioning of app when window resizes
        var uiPanel = Ext.ComponentQuery.query("lightbox")[0];
        var placeholder = Ext.get('uiplaceholder');
        var newHeight = h - (placeholder.getY());
        var newWidth = w - placeholder.getX()*2;
        placeholder.setHeight(newHeight);
        placeholder.setWidth(newWidth);
        uiPanel.setHeight(newHeight);
        uiPanel.setWidth(newWidth);
        uiPanel.showAt(placeholder.getX(), placeholder.getY());
    },
    addResources: function(resources){
        var lightbox = Ext.ComponentQuery.query('lightbox')[0];
        for (var i = 0; i < resources.length; i++){
            var resource = resources[i];
            var resurl = resource.get('uri');
            var resid = resource.get('id');
            this.resources.push(resid);
            if (resource.get('filetype').match('image')){
                // create new window in lightbox with resource
                var title = resource.get('title') || resource.get('filename');
                var win = Ext.create('LightBoxApp.view.LightBoxWindow', {
                    renderTo: lightbox.body,
                    title: title,
                    resurl: resurl,
                    resid: resid,
                    x: Math.random()*500,
                    y: Math.random()*100,
                    html: "<div data-annolabel='"+title+"' data-id='" + this.baseurl + "/repository/resources/" + resid + "/content'><img src='" + resurl + "' alt='image'></div>",
                    
                });
                win.on("activate",function(){
                    if (typeof enableAnnotations == "function"){enableAnnotations();}
                }, win, {single:true});
            }
            lightbox.doLayout();
        }
        // update fragment identifier for bookmarking
        this.updateIdFragment();
    },
    updateIdFragment: function(){
        var ids="";
        for (var i = 0; i < this.resources.length; i++){
            ids += this.resources[i] + ";";
        }
        document.location.href = document.location.href.split('#')[0] + "#" + ids;
    },
    removeResource: function(resWin){
        var id = resWin.resid;
        for(var i in this.resources){
            if(this.resources[i]==id){
                this.resources.splice(i,1);
                break;
            }
        }
        this.updateIdFragment();
    },
    addSelectedResources: function(button){
        var chooser = button.up('resourcechooser');
        var resources = chooser.down("resourcegrid").getSelectionModel().getSelection();
        this.addResources(resources);
        chooser.close();
    },
    showResourceChooser: function(button){
        // prompt for resource details
        var lightbox = button.up('lightbox');
        var chooser = Ext.create('LightBoxApp.view.ResourceChooser',{
            renderTo: lightbox.body,
        });
        var store = chooser.down('resourcegrid').getSelectionModel().getStore();
        store.load();
        store.filter('filetype',/\image/);
    },
    adjustOpacity: function(slider, newVal){
        var resWin = slider.up('lightboxwindow');
        if (newVal != 0){
            newVal = newVal/100.0;
        }
        resWin.body.setStyle('opacity',newVal);
    },
    adjustRotation: function(button) {
        var resWin = button.up('lightboxwindow');
        var rotationDegree = 90;
        if (button.iconCls=='rotateLeft'){
            rotationDegree = -90;
        }
        resWin.rotation += rotationDegree;
        resWin.rotation = (resWin.rotation + 360) % 360;
        var image = resWin.body.child('img');
        image.removeCls(['rotate90','rotate180','rotate270']);
        if (resWin.rotation != 0){
            image.addCls('rotate'+resWin.rotation);
        }
        // TODO: adjust top, left, width and height so that image is displayed correctly within window
    },
    openResourceRecord: function(button){
        var resWin = button.up("lightboxwindow");
        var url = '/repository/resources/' + resWin.resid;
        window.open(url,'_blank');
    },
    initDisplayResources: function(store){
        var urlsplit = document.location.href.split('#');
        if (urlsplit.length > 1){
            var idsplit = urlsplit[1].split(';');
            var records = [];
            for (var i = 0; i < idsplit.length; i++){
                var id = idsplit[i];
                if (id){
                    var rec = store.getById(id);
                    if (rec && rec != -1){
                        records.push(rec);
                    }
                }
            }
            this.addResources(records);
        }
    },
    init: function(application) {
        this.baseurl = jQuery('#metadata').data('baseurl');
        Ext.EventManager.onWindowResize(this.resizeUI, this);
        this.control({
            "#addButton": {
                click: this.showResourceChooser
            },
            "#toggleFullscreenButton": {
                click: this.toggleFullscreen
            },
            "resourcechooser button[text='OK']":{
                click: this.addSelectedResources
            },
            "resourcechooser button[text='Cancel']":{
                click: function(b){b.up("window").close();}
            },
            "lightbox": {
                restore: function(){
                    this.resizeUI(Ext.Element.getViewportWidth(),Ext.Element.getViewportHeight());
                },
                afterrender: function(){
                    this.resizeUI(Ext.Element.getViewportWidth(),Ext.Element.getViewportHeight());
                }
            },
            "sliderfield": {
                changecomplete: this.adjustOpacity
            },
            "button[iconCls='rotateLeft'], button[iconCls='rotateRight']":{
                click: this.adjustRotation
            },
            "button[iconCls='infoIcon']": {
                click: this.openResourceRecord
            },
            "button[iconCls='homeIcon']": {
                click: function(){
                    document.location.href='/';
                }
            },
            "lightboxwindow": {
                beforeclose: this.removeResource
            }
        });
        // listener to init select resources when resources are loaded into store
        Ext.getStore('ResourceStore').on('load',this.initDisplayResources,this,{single:true});
    }
});
