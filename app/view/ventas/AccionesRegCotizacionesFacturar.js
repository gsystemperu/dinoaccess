Ext.define('dinoaccess.view.ventas.AccionesRegCotizacionesFacturar', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-regcotizacionfacturar',
    onClickSalirCotizacionFacturar:function(){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
        Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].reset();
      } catch (e) {
        console.log('Ingresar Cotizacion Facturar');
      }
    },
    onClickMantenimiento: function () {var _win = Ext.create('dinoaccess.view.ventas.Mantenimiento');},
    onClickNuevoCliente:function(){var _win = Ext.create('dinoaccess.view.ventas.RegistrarCliente');_win.show(btn, function () {}, this);},
    onClickGuardarCotizacionFacturar:function(){
      var _form =  Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0];
       if (_form.isValid()) {

           var _dataDetalle = [];
           var _store = this.lookupReference('dgvDetalleVentaFacturar').getStore();
           me = this;
           _store.each(function (record) {
               if (record.get('cantidad') != 0) {
                   _reg = {
                       "idprod": record.get('idprod'),
                       "cantidad": record.get('cantidad'),
                       "precio": record.get("precio"),
                       "total": record.get("total"),
                       "vencimiento": (record.get("vencimiento")==null? null:  Ext.Date.format(record.get("vencimiento"), 'd/m/Y') )
                   };
                   _dataDetalle.push(_reg);
               }

           });
           _txt1 = Ext.ComponentQuery.query('#txtJsonDetalleFacturacion');
           _txt1[0].setValue(JSON.stringify(_dataDetalle));
           var _view = this.getView();
           _form.submit({
               waitMsg: 'Guardando informacion...',
               success: function (form, action) {
                   var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
                   var l = me.getLayout();
                   l.setActiveItem(0);
                   _dgv = Ext.ComponentQuery.query('#dgvVentasFacturar')[0];
                   _dgv.getStore().load();

               },
               failure: function () {
                   Ext.Msg.alert("Aviso", action.result.msg);
                   _view.close();
               }
           });
       } else {
           dinoaccess.util.Util.showErrorMsg('Ingresar los datos para la facturacion!');
       }
    },
    onClickEliminarcotizacionFacturar:function(button, event, eOpts){
      var rec = button.getWidgetRecord();
      me = this;
      //if(rec.get('estado')==3){ dinoaccess.util.Util.showErrorMsg('No se puede anular esta factura!'); return false; }
      Ext.MessageBox.confirm('Aviso','Desea eliminar el producto ?',function(btn){
        if(btn=='yes'){
          if (rec) {
              Ext.Ajax.request({
                 url :dinoaccess.util.Rutas.facturacionAnular,
                 params:{
                   idfacturacion : rec.get('idfacturacion'),
                   idcotizacion   : rec.get('idcoti')
                 },
                 success:function(response){
                   var data = Ext.JSON.decode(response.responseText);
                   Ext.each(data,function(r){
                     if(r.error != 0)
                         Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore().reload();
                  });
                 }
             });
          }
        }
      });
    },
    onClickVerCotizacionFactura:function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts){
      //try {
        var _record =  record;  //Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
        if (_record)
        {
        //  if(_record.get('estado')== 3 ||_record.get('estado')== 4 ||_record.get('estado')== 5  ||_record.get('estado')== 6 ){ Ext.Msg.alert("Aviso","Ya fue generado no se puede modificar!");return false;}
          var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(3);
          Ext.ComponentQuery.query('#frmVisualizarCotizacionFacturar')[0].reset();
          Ext.ComponentQuery.query('#frmVisualizarCotizacionFacturar')[0].loadRecord(_record);
          Ext.ComponentQuery.query('#dgvDetalleVentaFacturarVisualizar')[0].getStore().removeAll();

          Ext.Ajax.request({
              url :dinoaccess.util.Rutas.cotizacionDetalle,
              params:{
                vIdCotizacion : _record.get('idcoti')
              },
              success:function(response){
                var _ds = Ext.JSON.decode(response.responseText);
                me.mask('.. cargando');
                t=0;
                Ext.each(_ds.data,function(record)
                 {
                    var _store         = Ext.ComponentQuery.query('#dgvDetalleVentaFacturarVisualizar')[0].getStore();
                    
                    _data = {
                            idprod: parseInt(record.id),
                            descripcion: record.descripcion,
                            cantidad:record.cantidad,
                            precio: record.precio,
                            total: record.total,
                            vencimiento : record.to_char,
                            presentacion : record.presentacion
                        };
                      _store.insert(0, _data);
                      t = t + record.total;
                 });
                 if(_record.get('incluyeigv'))
                 {
                    
                    Ext.ComponentQuery.query('#txtSubtotalventasFacturar')[0].setValue(t);
                    Ext.ComponentQuery.query('#txtIgvventasFacturar')[0].setValue(0);
                    Ext.ComponentQuery.query('#txtTotalGeneralFacturar')[0].setValue(t);
                 }else{
                    Ext.ComponentQuery.query('#txtSubtotalventasFacturar')[0].setValue(t);
                    Ext.ComponentQuery.query('#txtIgvventasFacturar')[0].setValue(t*0.18);
                    Ext.ComponentQuery.query('#txtTotalGeneralFacturar')[0].setValue( t+(t*0.18) );
                 }
                 


                 me.unmask();
              }
          });

        }else{
          Ext.Msg.alert("Aviso","Tiene que seleccionar una cotizacion a facturar!");return false;
        }

     /*} catch (e) {
        console.log('Ingresar Cotizacion a facturar');
      }*/
    },
    onClickIngresarPagoAcuenta:function(btn){
      __rec = btn.getWidgetRecord();
      Ext.widget('wPagosAcuenta', {
        codigo :__rec.get("idfacturacion"),
        nombre :__rec.get("nomcompleto") ,
        monto  :__rec.get("totalcoti")
      });
    },
    onClickBuscarCotizacionesPorFechas:function(btn){
        __store = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore();

        __store.load({
            params:{
              vDesde : Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
              vHasta : Ext.ComponentQuery.query('#dfHasta')[0].getRawValue()
            }
        });

    },
    onSelectedDetalleFacturacionVenta:function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts)
    {
         me = this;
          //if(record.get('idcoti')>0)
          //{
        //     __store = Ext.ComponentQuery.query('#gvVentasFacturarCotizacion')[0].getStore();
        //     __store.load({
        //        params :{
        //          vIdCotizacion: record.get('idcoti')
        //        }
        //      })
              /*__grid = Ext.ComponentQuery.query('#gvVentasFacturarDetalle')[0];
              __grid.reconfigure(__storeCotiDet,[{
                      text: 'Producto',dataIndex: 'descripcion',
                      flex: 2,align: 'left'
                  },
                  {
                      text: 'Presentacion',dataIndex: 'presentacion',
                      flex: 1,align: 'left'
                  },
                  {
                      text: 'Precio',dataIndex: 'precio',
                      flex: 0.5,align: 'right'
                  },
                  {
                      text: 'Cantidad',dataIndex: 'cantidad',
                      flex: 0.5,align: 'right'
                  },
                  {
                      text: 'Total',dataIndex: 'total',
                      flex: 0.5,align: 'right'
                  }
              ]);*/
        //  }
          if(record.get('idfacturacion')>0)
          {
            __store = Ext.ComponentQuery.query('#gvVentasFacturarDetalle')[0].getStore();
            alert("a");
            __store.load({
               params :{
                 idfacturacion: record.get('idfacturacion')
               }
             })

            /*__storeFactDet = Ext.create('dinoaccess.store.DetalleFacturacion');

            __grid = Ext.ComponentQuery.query('#gvVentasFacturarDetalle')[0];
            __grid.reconfigure(__storeFactDet,[{
                    text: 'Producto',dataIndex: 'producto',
                    flex: 2,align: 'left'
                },
                {
                    text: 'Presentacion',dataIndex: 'presentacion',
                    flex: 1,align: 'left'
                },
                {
                    text: 'Precio',dataIndex: 'precio',
                    flex: 0.5,align: 'right'
                },
                {
                    text: 'Cantidad',dataIndex: 'cantidad',
                    flex: 0.5,align: 'right'
                },
                {
                    text: 'Cantidad',dataIndex: 'cantidad',
                    flex: 0.5,align: 'right'
                },
                {
                    text: 'Total',dataIndex: 'total',
                    flex: 0.5,align: 'right'
                }
            ]);

            Ext.Ajax.request({
                url : dinoaccess.util.Rutas.facturacionDetalle,
                params:{
                  idfacturacion : record.get('idfacturacion')
                },
                success:function(response){
                    __data = Ext.JSON.decode(response.responseText);

                    __index = 1;
                    Ext.each(__data.data,function(record,index){
                        __dato = {
                            cantidad : record.cantidad,
                            dosis   :  record.dosis,
                            dosiscantidad : record.dosiscantidad,
                            gramos : record.gramos,
                            gramoscantidad : record.gramoscantidad,
                            id  : record.id,
                            kilos : record.kilos,
                            kiloscantidad : record.kiloscantidad,
                            precio  : record.precio,
                            presentacion : record.presentacion,
                            producto : record.producto,
                            total : record.total,
                            vecimiento : record.vencimiento
                        };
                      //  __grid.getStore().insert(__index,__dato);
                        __index ++ ;
                    });

                }
            });*/
          }
    },
    onClickEliminarDetalle: function (button, event, eOpts) {
        var grid = this.lookupReference('dgvDetalleVentaFacturar');
        var store = grid.getStore();
        var rec = button.getWidgetRecord();
        if (rec) {
            store.remove(rec);
            this.onCalcularTotalRegistroCotizacionFacturar(false);
        }
    },
    onSelectedIncluyeIGV: function (obj, newValue, oldValue, eOpts) {
        this.onCalcularTotalRegistroCotizacionFacturar(newValue);
    },
    onEditorCalcularTotalRegistroCotizacionFacturar: function (editor, e) {
        var _cant = 0;
        var _pre = 0;
        _cant = e.record.get('cantidad');
        _pre = e.record.get('precio');
        _tot = _pre * _cant;
        e.record.set('total', _tot.toFixed(2));
        this.onCalcularTotalRegistroCotizacionFacturar();
    },
    onCalcularTotalRegistroCotizacionFacturar: function () {
        me = this;
        __objChk      = Ext.ComponentQuery.query('#incluyeigvfacturacion')[0];
        __objIgv      = this.lookupReference('igvventasfacturacion');
        __objSubTotal = this.lookupReference('Subtotalventasfacturacion');
        __objTotal    = this.lookupReference('TotalGeneralfacturacion');

        var store = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
        var _tot = 0;
        var _igv = 0;
        store.each(function (record) {
            _tot = _tot + record.get('total');
        });
        __objSubTotal.setValue(_tot.toFixed(2));

        if (__objChk.getValue()){
            var _igv = 0;
        }
        else{
            var _igv = _tot * 0.18;
        }
    __objSubTotal.setValue(
        Ext.util.Format.number(_tot.toFixed(2), "0,000.00")
    );
    __objIgv.setValue(
        Ext.util.Format.number(_igv.toFixed(2), "0,000.00")
    );
    //Ext.ComponentQuery.query('#txtIgvventas')[0].setValue(_igv.toFixed(2));
    var _totven = 0;
    _totven     = _tot + _igv;
    __objTotal.setValue(
        Ext.util.Format.number(_totven.toFixed(2), "0,000.00")
    );


    },

});
