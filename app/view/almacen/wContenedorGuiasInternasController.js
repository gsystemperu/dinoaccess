Ext.define('dinoaccess.view.almacen.wContenedorGuiasInternasController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-wcontenedorguiasinternas',
    onClickIngresarGuiaInterna:function(btn){
        try {
            var me =  Ext.ComponentQuery.query('#wContenedorGuiasInternas')[0];    //this;
            var l  = me.getLayout();
            l.setActiveItem(1);
           // Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
           // Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
          } catch (e) {
            console.log('Ingresar Orden Compra');
          }
    }


});
