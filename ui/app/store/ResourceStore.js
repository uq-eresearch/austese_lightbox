

Ext.define('LightBoxApp.store.ResourceStore', {
    extend: 'Ext.data.Store',
    alias: 'store.resourcestore',

    requires: [
        'LightBoxApp.model.ResourceModel'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'ResourceStore',
            model: 'LightBoxApp.model.ResourceModel',
            proxy: {
                type: 'ajax',
                url: '/sites/all/modules/austese_repository/api/resources/',
                reader: {
                    type: 'json',
                    root: 'results'
                }
            }
        }, cfg)]);
    }
});