Ext.define('dinoaccess.view.compras.AccionesContenedorOrdenCompra', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedoordencompra',
    requires: [
        'dinoaccess.util.Rutas'
    ],
    onClickIngresar:function(){
        try {
          var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(1);
          Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
          Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
        } catch (e) {
          console.log('Ingresar Orden Compra');
        }
    },
   
    onClickConfirmarOrdenCompra:function(){
      var g = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
      var r = g.getSelectionModel().getSelection()[0];
      me = this;
      if (r) {
          if(r.get('idestado')==4) 
          {
              dinoaccess.util.Util.showToast('LA ORDEN DE COMPRA ESTA ANULADA!');return false;
          }
          Ext.Ajax.request({
              url: dinoaccess.util.Rutas.ordenCompraConfirmar,
              params: {
                  id: r.get('id')
              },
              success: function (response) {
                  var _error = Ext.JSON.decode(response.responseText);
                  if (_error.error != 0) {
                      g.getStore().reload();
                  }
              }
          });
      }
    }


});
