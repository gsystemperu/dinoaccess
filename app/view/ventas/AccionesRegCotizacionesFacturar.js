Ext.define('dinoaccess.view.ventas.AccionesRegCotizacionesFacturar', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.acciones-regcotizacionfacturar',
  onClickSalirCotizacionFacturar: function () {
    try {
      var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
      var l = me.getLayout();
      l.setActiveItem(0);
      Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].reset();
    } catch (e) {
      console.log('Ingresar Cotizacion Facturar');
    }
  },
  onClickMantenimiento: function () {
    var _win = Ext.create('dinoaccess.view.ventas.Mantenimiento');
  },
  onClickNuevoCliente: function () {
    var _win = Ext.create('dinoaccess.view.ventas.RegistrarCliente');
    _win.show(btn, function () {}, this);
  },
  onClickGuardarCotizacionFacturar: function () {
    var _form = Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0];
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
            "vencimiento": (record.get("vencimiento") == null ? null : Ext.Date.format(record.get("vencimiento"), 'd/m/Y'))
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
          var me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0]; //this;
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
  onClickEliminarcotizacionFacturar: function (button, event, eOpts) {
    var rec = button.getWidgetRecord();
    me = this;
    //if(rec.get('estado')==3){ dinoaccess.util.Util.showErrorMsg('No se puede anular esta factura!'); return false; }
    Ext.MessageBox.confirm('Aviso', 'Desea eliminar el producto ?', function (btn) {
      if (btn == 'yes') {
        if (rec) {
          Ext.Ajax.request({
            url: dinoaccess.util.Rutas.facturacionAnular,
            params: {
              idfacturacion: rec.get('idfacturacion'),
              idcotizacion: rec.get('idcoti')
            },
            success: function (response) {
              var data = Ext.JSON.decode(response.responseText);
              Ext.each(data, function (r) {
                if (r.error != 0)
                  Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore().reload();
              });
            }
          });
        }
      }
    });
  },
  onClickVerCotizacionFactura: function (grid, td, cellIndex, r, tr, rowIndex, e, eOpts) {
    if (r) {
      me = Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];
      me.mask('..cargando'); //this;
      l = me.getLayout();
      l.setActiveItem(3);
      Ext.ComponentQuery.query('#frmVisualizarCotizacionFacturar')[0].reset();
      Ext.ComponentQuery.query('#frmVisualizarCotizacionFacturar')[0].loadRecord(r);
      Ext.ComponentQuery.query('#dgvDetalleVentaFacturarVisualizar')[0].getStore().removeAll();
      Ext.Ajax.request({
        url: dinoaccess.util.Rutas.cotizacionDetalle,
        params: {
          vIdCotizacion : r.get('idcoti'),
          vIdFacturacion :r.get('idfacturacion') 
        },
        success: function (response) {
          d = Ext.JSON.decode(response.responseText);
          t = 0;
          Ext.each(d.data, function (record) {
            var s = Ext.ComponentQuery.query('#dgvDetalleVentaFacturarVisualizar')[0].getStore();
            d = {
              idprod: parseInt(record.id),
              descripcion: record.descripcion,
              cantidad: record.cantidad,
              precio: record.precio,
              total: record.total,
              vencimiento: record.to_char,
              presentacion: record.presentacion
            };
            s.insert(0, d);
            t = t + record.total;
          }); //eddy
        Ext.ComponentQuery.query('#txtSubtotalventasFacturar')[0].setValue(
            Ext.util.Format.number( r.get('valventacont'), "0,000.00")
        );
        Ext.ComponentQuery.query('#txtIgvventasFacturar')[0].setValue(
            Ext.util.Format.number( r.get('valigvcont'), "0,000.00")
        );
        Ext.ComponentQuery.query('#txtTotalGeneralFacturar')[0].setValue(
            Ext.util.Format.number( r.get('valtotalcont'), "0,000.00")
        );
        me.unmask();
        }
      });

    } else {
      Ext.Msg.alert("Aviso", "Tiene que seleccionar una cotizacion a facturar!");
      return false;
    }

    /*} catch (e) {
       console.log('Ingresar Cotizacion a facturar');
     }*/
  },
  onClickIngresarPagoAcuenta: function (btn) {
    __rec = btn.getWidgetRecord();
    Ext.widget('wPagosAcuenta', {
      codigo: __rec.get("idfacturacion"),
      nombre: __rec.get("nomcompleto"),
      monto: __rec.get("totalcoti")
    });
  },
  onClickBuscarCotizacionesPorFechas: function (btn) {
    __store = Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getStore();

    __store.load({
      params: {
        vDesde: Ext.ComponentQuery.query('#dfDesdeCotizacionesFactura')[0].getRawValue(),
        vHasta: Ext.ComponentQuery.query('#dfHastaCotizacionesFactura')[0].getRawValue()
      }
    });

  },
  onSelectedDetalleFacturacionVenta: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
    me = this;
    if (record.get('idfacturacion') > 0) {
      __store = Ext.ComponentQuery.query('#gvVentasFacturarDetalle')[0].getStore();
      alert("a");
      __store.load({
        params: {
          idfacturacion: record.get('idfacturacion')
        }
      })


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
    __objChk = Ext.ComponentQuery.query('#incluyeigvfacturacion')[0];
    __objIgv = this.lookupReference('igvventasfacturacion');
    __objSubTotal = this.lookupReference('Subtotalventasfacturacion');
    __objTotal = this.lookupReference('TotalGeneralfacturacion');

    store = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
    t = 0;
    store.each(function (record) {
      t = t + record.get('total');
    });

    Ext.ComponentQuery.query('#igvventasfacturacion')[0].setValue(
      Ext.util.Format.number(t - ( t / 1.18 ), "0,000.00")
    );
    Ext.ComponentQuery.query('#Subtotalventasfacturacion')[0].setValue(
      Ext.util.Format.number(t / 1.18, "0,000.00")
    );
    Ext.ComponentQuery.query('#TotalGeneralfacturacion')[0].setValue(Ext.util.Format.number(t, "0,000.00"));
  },
  onSelectCambiarDocumento: function (combo, record, eOpts) {
    t = 0;
    s = this.lookupReference('dgvDetalleVentaFacturar').getStore();
    s.each(function (r) {
      t = t + r.get('total');
    });
    // Factura
    /*if (record.get('id') == 1) {
      i = t * 0.18;
      Ext.ComponentQuery.query('#Subtotalventasfacturacion')[0].setValue(
        Ext.util.Format.number(t.toFixed(2), "0,000.00")
      );
      Ext.ComponentQuery.query('#igvventasfacturacion')[0].setValue(
        Ext.util.Format.number(i.toFixed(2), "0,000.00")
      );
      Ext.ComponentQuery.query('#TotalGeneralfacturacion')[0].setValue(
        Ext.util.Format.number(i + t, "0,000.00")
      );
    } else {*/
      Ext.ComponentQuery.query('#igvventasfacturacion')[0].setValue(
        Ext.util.Format.number(t - ( t / 1.18 ), "0,000.00")
      );
      Ext.ComponentQuery.query('#Subtotalventasfacturacion')[0].setValue(
        Ext.util.Format.number(t / 1.18, "0,000.00")
      );

      Ext.ComponentQuery.query('#TotalGeneralfacturacion')[0].setValue(Ext.util.Format.number(t, "0,000.00"));
    //}
  }

});
