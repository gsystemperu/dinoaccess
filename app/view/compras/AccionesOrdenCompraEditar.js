Ext.define('dinoaccess.view.compras.AccionesOrdenCompraEditar', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-ordencompraeditar',
    requires: [
        'dinoaccess.util.Rutas'
    ],
    onClickBuscarProductoEditar:function(btn){
      if(Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue()!=null){
       Ext.create('dinoaccess.view.almacen.ProductoBuscarOC',{
         proveedor : Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue(),
         mystore     : Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore()
       });
     }else{
       dinoaccess.util.Util.showToast('Seleccionar al Proveedor');
     }

   },
   onEditorCalcularTotalOrdenCompraEditar: function (editor, e) {
       var _cant = 0;
       var _pre = 0;
       _cant = e.record.get('cantidad');
       _pre = e.record.get('precio');
       _tot = _pre * _cant;
       e.record.set('total', _tot.toFixed(2));
       this.onCalcularTotalOrdenCompraEditar();
   },
   onCalcularTotalOrdenCompraEditar: function () {
       me = this;
       var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
       var _tot = 0;
       store.each(function (record) {
           _tot = _tot + record.get('total');
       });
       Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setValue(_tot.toFixed(2));
       if (Ext.ComponentQuery.query('#ckbAplicarIgvEditar')[0].getValue()) {
           Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setHidden(true);
           Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setHidden(true);
           var _igv = 0;
       } else {
           Ext.ComponentQuery.query('#txtSubtotalOrdenCompraEditar')[0].setHidden(false);
           Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setHidden(false);
           var _igv = _tot * 0.18;
       }

       Ext.ComponentQuery.query('#txtIgvOrdenCompraEditar')[0].setValue(_igv.toFixed(2));
       var _totven = 0;
       _totven = _tot + _igv;
       Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompraEditar')[0].setValue(
           //Ext.util.Format.number(_totven.toFixed(2), "0,000.00")
           _totven.toFixed(2)
       );
       try {Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();} catch (e) {}

   },
   onClickSalirOrdenCompra: function (btn) {
     try {
       var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
       var l = me.getLayout();
       l.setActiveItem(0);
       Ext.ComponentQuery.query('#frmOrdenCompra')[0].reset();
       Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
     } catch (e) {
       console.log('Salir Orden Compra');
     }
   },
   onClickEliminarDetalleEditar: function (button, event, eOpts) {
       var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
       var rec = button.getWidgetRecord();
       if (rec) {
           store.remove(rec);
           this.onCalcularTotalOrdenCompraEditar();
       }
   },
   onClickGuardarOrdenCompra: function () {
       var _form = this.lookupReference('frmOrdenCompraEditar');
       if (_form.isValid()) {
           var _dataDetalle = [];
           var _store = this.lookupReference('dgvDetalleOrdenCompraEditar').getStore();
           me = this;
           console.log(_store);
           _store.each(function (record) {
               if (record.get('cantidad') != 0) {
                   _reg = {
                       "idprod": record.get('idprod'),
                       "cantidad": record.get('cantidad'),
                       "precio": record.get("precio"),
                       "total": record.get("total")

                   };
                   _dataDetalle.push(_reg);
               }

           });
           _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleOCEditar');
           _txt1[0].setValue(JSON.stringify(_dataDetalle));
           var _view = this.getView();
           _form.submit({
               waitMsg: 'Guardando informacion...',
               success: function (form, action) {
                   _dgv = Ext.ComponentQuery.query('#gridOrdenesCompra')[0];
                   _dgv.getStore().load();
                   var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
                   var l = me.getLayout();
                   l.setActiveItem(0);
                   Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore().removeAll();
               },
               failure: function (action) {
                   Ext.Msg.alert("Aviso", "Error en conexión de base de datos");

               }
           });
       } else {
           dinoaccess.util.Util.showErrorMsg('Ingresar los datos necesarios!');
       }
   },

});
