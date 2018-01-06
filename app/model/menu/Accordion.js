Ext.define('dinoaccess.model.menu.Accordion', {
    extend: 'Ext.data.Model',
    requires: [
       'dinoaccess.model.menu.TreeNode'
   ],
   fields: [
       { name: 'id', type: 'int'},
       { name: 'text' },
       { name: 'iconCls' }
   ],
   hasMany: {
       model: 'dinoaccess.model.menu.TreeNode',
       foreignKey: 'parent_id',
       name: 'items'
   }
});
