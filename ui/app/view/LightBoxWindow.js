Ext.define('LightBoxApp.view.LightBoxWindow', {
    extend: 'Ext.window.Window',
    width: 320,
    height: 480,
    autoShow: true,
    alias: 'widget.lightboxwindow',
    constrainHeader: true,
    layout: 'fit',
    rotation: 0,
    autoScroll: true,
    style: {
        backgroundColor: 'transparent'
    },
    dockedItems: [
          {
              xtype: 'toolbar',
              dock: 'bottom',
              items: [
                    {
                        xtype: 'button',
                        tooltip: 'View resource information in a new tab',
                        iconCls: 'infoIcon'
                    },  
                    {
                        xtype: 'button',
                        tooltip: 'Rotate left',
                        iconCls: 'rotateLeft'
                    },
                    
                    {
                        xtype: 'button',
                        tooltip: 'Rotate right',
                        iconCls: 'rotateRight'
                    },
                    {
                        xtype: 'tbfill'
                    },
                    
                    {
                        xtype: 'sliderfield',
                        anchor: '100%',
                        flex: 3,
                        name: 'opacity',
                        maxValue: 100,
                        value: 100,
                        tipText: function(thumb){
                            return Ext.String.format('{0}% opacity', thumb.value);
                        }
                    }
              ]
          }
    ],
    // override ghost so that it displays the same contents and fix z-index so that it is visible
    ghost:  function(cls) {
        var me = this,
        ghostPanel = me.ghostPanel,
        box = me.getBox(),
        header;

        if (!ghostPanel) {
            ghostPanel = new Ext.panel.Panel({
                renderTo: document.body,
                floating: {
                    shadow: false
                },
                html: "<img src='" + me.resurl + "'>",
                frame: me.frame && !me.alwaysFramed,
                alwaysFramed: me.alwaysFramed,
                overlapHeader: me.overlapHeader,
                headerPosition: me.headerPosition,
                baseCls: me.baseCls,
                cls: me.baseCls + '-ghost ' + (cls ||'')
            });
            me.ghostPanel = ghostPanel;
        } else {
            ghostPanel.el.show();
        }
        ghostPanel.floatParent = me.floatParent;
        if (me.floating) {
            ghostPanel.setZIndex(Ext.Number.from(me.el.getStyle('zIndex') + 500, 0));
        } else {
            ghostPanel.toFront();
        }
        if (!(me.preventHeader || (me.header === false))) {
            header = ghostPanel.header;
            // restore options
            if (header) {
                header.suspendLayouts();
                Ext.Array.forEach(header.query('tool'), header.remove, header);
                header.resumeLayouts();
            }
            ghostPanel.addTool(me.ghostTools());
            ghostPanel.setTitle(me.title);
            ghostPanel.setIconCls(me.iconCls);
        }

        ghostPanel.setPagePosition(box.x, box.y);
        ghostPanel.setSize(box.width, box.height);
        me.el.hide();
        return ghostPanel;
    }
});