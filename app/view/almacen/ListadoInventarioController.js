Ext.define('dinoaccess.view.almacen.ListadoInventarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-listadoinventario',
    onClickInventarioAnular:function(btn){
        me = this;
        Ext.Ajax.request({
                url: dinoaccess.util.Rutas.inventarioAnular,
                params: { id          : btn.getWidgetRecord().get('id')},
                success: function(response){
                    var _error = Ext.JSON.decode(response.responseText);
                    if(_error.error!=0){
                            Ext.ComponentQuery.query('#dgvInvReg')[0].getStore().reload();
                    }
                }
             });

    }
});
