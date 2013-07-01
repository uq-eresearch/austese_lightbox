/**
 * @class LightBoxApp.view.ResourceGrid
 * @extends Ext.grid.Panel
 */
Ext.define('LightBoxApp.view.ResourceGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.resourcegrid',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            multiSelect: true,
            store: Ext.getStore('ResourceStore'),
            columns: [
                  {text: 'Title', dataIndex: 'title', flex: 1},
                  {text: 'File', dataIndex: 'filename'},
                  {text: 'Type', dataIndex: 'filetype'},
                  {text: 'Size', dataIndex: 'sizeString', hidden:true},
                  {
                      text: 'Uploaded', 
                      dataIndex: 'uploaddate',
                      hidden: true,
                      renderer: Ext.util.Format.dateRenderer("d/m/Y g:i a")
                  },
                  {text: 'Coverage', dataIndex: 'coverage', hidden: true},
                  {text: 'Description', dataIndex: 'description', hidden: true},
                  {text: 'Format', dataIndex: 'format', hidden: true},
                  {text: 'Language', dataIndex: 'language', hidden: true},
                  {text: 'Publisher', dataIndex: 'publisher', hidden: true},
                  {text: 'Rights', dataIndex: 'rights', hidden: true},
                  {text: 'Source', dataIndex: 'source', hidden: true}
            ]
        });
        me.callParent(arguments);
        me.store.load();
        me.store.sort();
    }
});
