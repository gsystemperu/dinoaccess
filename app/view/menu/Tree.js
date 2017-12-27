Ext.define('dinoaccess.view.menu.Tree', {
    extend: 'Ext.tree.Panel',
    xtype: 'menutree',

    requires: [
       'dinoaccess.overrides.tree.ColumnOverride'
    ],

    border: 0,
    autoScroll: true,
    rootVisible: false
});
