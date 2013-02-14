Ext.define('LightBoxApp.view.LightBox', {
    extend: 'Ext.window.Window',
    closable: false,
    height: 500,
    header:false,
    resizeHandles: '',
    width: 600,
    autoScroll: true,
    layout: 'fit',
    requires: [
    ],
    alias: 'widget.lightbox',
    initComponent: function() {
        var me = this;
        
        Ext.applyIf(me, {
            cls: 'lightbox',
            bodyStyle: {
                backgroundColor:'white'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'addIcon',
                            itemId: 'addButton',
                            tooltip: 'Add a resource to the Light Box'
                        },
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'homeIcon',
                            tooltip: 'Return to AustESE workbench home'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'fullscreenIcon',
                            itemId: 'toggleFullscreenButton',
                            tooltip: 'Toggle fullscreen mode'
                        }
                    ]
                }
            ]
            
        });
        me.callParent(arguments);
    }
});