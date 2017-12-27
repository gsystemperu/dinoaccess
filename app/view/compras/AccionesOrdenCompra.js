Ext.define('dinoaccess.view.compras.AccionesOrdenCompra', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-ordencompra',
    requires: [
        'dinoaccess.util.Rutas',

    ],
    //@ Tabla Orden de Compra
    //=============================================
    onClickIngresar: function () {
        Ext.create('dinoaccess.view.compras.IngresarOrdenCompra');
    },
    onClickBuscarProducto: function (btn) {
       if(Ext.ComponentQuery.query('#cboProveedoresf')[0].getValue()!=null){
        Ext.create('dinoaccess.view.almacen.ProductoBuscarOC',{
          proveedor : Ext.ComponentQuery.query('#cboProveedoresf')[0].getValue()
        });
      }else{
        dinoaccess.util.Util.showToast('Seleccionar al Proveedor');
      }
    },
  /*  onClickBuscarProductoEditar: function (btn) {
       if(Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue()!=null){
        Ext.create('dinoaccess.view.almacen.ProductoBuscarOC',{
          proveedor : Ext.ComponentQuery.query('#cboProveedoresfEditar')[0].getValue()
        });
      }else{
        dinoaccess.util.Util.showToast('Seleccionar al Proveedor');
      }
    },*/
    onKeyUpBuscarProducto:function( obj, e, eOpts){
      if(e.keyCode==13){
          _store = Ext.ComponentQuery.query('#dgvProductos')[0].getStore();
          _store.load({
            params:{
              nombre : obj.getValue(),

            }
          });
      }

    },
    onKeyUpBuscarProductoOC:function( obj, e, eOpts){
      if(e.keyCode==13){
          _store = Ext.ComponentQuery.query('#dgvProductosOC')[0].getStore();
          _store.load({
            params:{
              idprov : Ext.ComponentQuery.query('#cboProveedoresf')[0].getValue(),
              nombre : obj.getValue()
            }
          });
      }

    },

    onClickItemProductoOC: function (grid, record, item, index, e, eOpts) {
        me = this;
        if(Ext.ComponentQuery.query('#myStore')[0].getValue()){
          var _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
        }else{
          var _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        }
        var _precio = 0;
        if(parseFloat(record.get('preciocompraproveedor'))>0){
          _precio = parseFloat(record.get('preciocompraproveedor'));
        }else{
          _precio = parseFloat(record.get('preciocompra'))
        }
        _data = {
            idprod: parseInt(record.get('id')),
            producto: record.get('nombre'),
            cantidad: 1,
            precio: _precio,    //parseFloat(record.get('preciocompra')),
            total: parseInt(1) * _precio    // parseFloat(record.get('preciocompra'))
        };

        if (_store.findRecord('idprod', parseInt(record.get('id')))) {
            Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
            return false;
        }
        _store.insert(0, _data);
        me.onCalcularTotalOrdenCompra();
    },




    //@ Objeto : Ventana , Listado de productos
    onClickItemProducto: function (grid, record, item, index, e, eOpts) {
        me = this;
        var _store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        var _precio = 0;

        _data = {
            idprod: parseInt(record.get('id')),
            producto: record.get('nombre'),
            cantidad: 1,
            precio: parseFloat(record.get('preciocompra')),
            total: parseInt(1) * parseFloat(record.get('preciocompra'))
        };

        if (_store.findRecord('idprod', parseInt(record.get('id')))) {
            Ext.Msg.alert("Error", "Producto ya se encuentra cargada");
            return false;
        }
        _store.insert(0, _data);
        me.onCalcularTotalOrdenCompra();
    },
    onCalcularTotalOrdenCompra: function () {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        var _tot = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        Ext.ComponentQuery.query('#txtSubtotalOrdenCompra')[0].setValue(_tot.toFixed(2));
        if (Ext.ComponentQuery.query('#ckbAplicarIgv')[0].getValue()) {
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompra')[0].setHidden(true);
            Ext.ComponentQuery.query('#txtIgvOrdenCompra')[0].setHidden(true);
            var _igv = 0;
        } else {
            Ext.ComponentQuery.query('#txtSubtotalOrdenCompra')[0].setHidden(false);
            Ext.ComponentQuery.query('#txtIgvOrdenCompra')[0].setHidden(false);
            var _igv = _tot * 0.18;
        }

        Ext.ComponentQuery.query('#txtIgvOrdenCompra')[0].setValue(_igv.toFixed(2));
        var _totven = 0;
        _totven = _tot + _igv;
        Ext.ComponentQuery.query('#txtTotalGeneralOrdenCompra')[0].setValue(
            //Ext.util.Format.number(_totven.toFixed(2), "0,000.00")
            _totven.toFixed(2)
        );
        try {Ext.ComponentQuery.query('#txtBuscarCodigoProd')[0].focus();} catch (e) {}

    },
    onEditorCalcularTotalOrdenCompra: function (editor, e) {
        var _cant = 0;
        var _pre = 0;
        _cant = e.record.get('cantidad');
        _pre = e.record.get('precio');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalOrdenCompra();
    },
    onClickEliminarDetalle: function (button, event, eOpts) {
        var store = Ext.ComponentQuery.query('#dgvDetalleOrdenCompra')[0].getStore();
        var rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalOrdenCompra();
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

    onClickGuardarOrdenCompra: function () {
        var _form = this.lookupReference('frmOrdenCompra');
        if (_form.isValid()) {
            var _dataDetalle = [];
            var _store = this.lookupReference('dgvDetalleOrdenCompra').getStore();
            me = this;
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
            _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleOC');
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
    //==============================================

    onClickBuscarOrdenCompraPorFechas: function (btn) {
        store = Ext.ComponentQuery.query("#gridOrdenesCompra")[0].getStore();
        store.load({
            params: {
                start: 1,
                limit: 100,
                desde: Ext.ComponentQuery.query('#dfDesdeOC')[0].getRawValue(),
                hasta: Ext.ComponentQuery.query('#dfHastaOC')[0].getRawValue(),
                proveedor: 0
            }
        });
    },
    onClickBuscarOrdenCompraPorProveedor: function (btn) {
        store = Ext.ComponentQuery.query("#gridOrdenesCompra")[0].getStore();
        store.load({
            params: {
                start: 1,
                limit: 100,
                desde: Ext.ComponentQuery.query('#dfDesdeOC')[0].getRawValue(),
                hasta: Ext.ComponentQuery.query('#dfHastaOC')[0].getRawValue(),
                proveedor: Ext.ComponentQuery.query('#cboProveedores')[0].getValue()
            }
        });
    },

    onClickFormularioProveedor: function (btn) {
        var win = Ext.create('dinoaccess.view.almacen.FormProveedor', {
            control: btn.control.toString()
        });
    },

    onClickConfirmarOrdenCompra: function (btn) {
        var _grid = this.lookupReference('gridOrdenesCompra');
        var _rec = _grid.getSelectionModel().getSelection()[0];
        me = this;
        if (_rec) {
            _grid.mask('... Confirmando ');
            Ext.Ajax.request({
                url: dinoaccess.util.Rutas.ordenCompraConfirmar,
                params: {
                    id: _rec.get('id')
                },
                success: function (response) {
                    var _error = Ext.JSON.decode(response.responseText);
                    if (_error.error != 0) {
                        _grid.unmask();
                        me.lookupReference('gridOrdenesCompra').getStore().reload();
                    }
                }
            });
        }
    },
    onClickActualizarLista:function(btn){
      this.lookupReference('gridOrdenesCompra').getStore().load({
        params:{page:1,start:0}
      });
    },

    onClickEditarOrdenCompra:function(button){
      var rec = button.getWidgetRecord();
      var _me  = this;
      if(rec.get('idestado')==4){ dinoaccess.util.Util.showToast('La OC esta anulada!');; return false; }
      if (rec) {
          try {
            var me =  Ext.ComponentQuery.query('#wContenedorOrdenCompra')[0];    //this;
            var l = me.getLayout();
            l.setActiveItem(2);
            Ext.ComponentQuery.query('#frmOrdenCompraEditar')[0].loadRecord(rec);
            _store  = Ext.ComponentQuery.query('#dgvDetalleOrdenCompraEditar')[0].getStore();
            _store.removeAll();
            Ext.Ajax.request({
                url :dinoaccess.util.Rutas.ordenCompraBuscarDetalle,
                params:{
                  id :rec.get('id')
                },
                success:function(response){
                   var _obj = Ext.JSON.decode(response.responseText);
                   Ext.each(_obj.data,function(record){
                      _data = {
                          idprod   : parseInt(record.idprod),
                          producto : record.nombre,
                          cantidad : record.cantidad,
                          precio   : record.preciocompra,
                          total    : record.total
                      };
                      _store.insert(0, _data);
                      _me.onCalcularTotalOrdenCompraEditar();
                    });
                }
            });

          } catch (e) {
            console.log('Editar Orden Compra');
          }
      }
    },

    onClickAnularOrdenCompra:function(button){
      var rec = button.getWidgetRecord();
      if(rec.get('idestado')==4){ dinoaccess.util.Util.showToast('La OC esta anulada!');; return false; }
      var _me  = this;
      if (rec) {
          try {

            Ext.Ajax.request({
                url :dinoaccess.util.Rutas.ordenCompraAnular,
                params:{
                  id :rec.get('id')
                },
                success:function(response){
                   var _obj = Ext.JSON.decode(response.responseText);
                   console.log(_obj);
                   Ext.ComponentQuery.query('#gridOrdenesCompra')[0].getStore().reload();
                }
            });

          } catch (e) {
            console.log('anular orden compra');
          }
      }
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
    onClickIngresarPagoAcuenta:function(btn){
      __record = btn.getWidgetRecord();
      Ext.widget('wCompraPagosAcuenta',{
        codigo :__record.get('id'),
        nombre :__record.get('razonsocial'),
        monto  :__record.get('totalorden')
      });
    },
    onClickRefrescarProveedor:function(){
        Ext.ComponentQuery.query('#cboProveedoresf')[0].getStore().load();
    }
});
