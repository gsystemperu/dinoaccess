Ext.define('dinoaccess.store.Menu', {
    extend: 'Ext.data.Store',
    requires: [
        'dinoaccess.util.Util'
    ],
    model: 'dinoaccess.model.menu.Accordion',
    extraParams:{
      vusuario : 0
    },
    autoLoad: false,
    autoSync: true,
    proxy: {
        type: 'ajax',
        url: 'resources/api/usuario_menu',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        listeners: {
            exception: function(proxy, response, operation){
                dinoaccess.util.Util.showErrorMsg(response.responseText);
            }
        }
    }
});
