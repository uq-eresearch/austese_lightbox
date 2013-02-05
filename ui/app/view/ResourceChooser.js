Ext.define('LightBoxApp.view.ResourceChooser', {
    extend: 'Ext.window.Window',
    width: 320,
    height: 480,
    autoShow: true,
    layout: 'fit',
    title: 'Select resources to display',
    alias: 'widget.resourcechooser',
    requires: [
         'LightBoxApp.view.ResourceGrid'
    ],
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            // TODO: add search, paging etc
            items: [{
                xtype: 'resourcegrid'
            }],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'button',
                            text: 'OK'
                        },
                        {
                            xtype: 'button',
                            text: 'Cancel'
                        }
                     ]
                }
            ]
        });
        me.callParent(arguments);
    }
});