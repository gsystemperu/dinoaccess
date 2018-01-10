Ext.define('dinoaccess.view.ventas.AccionesContenedorCotizacionesFacturar', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-contenedorcotizacionesfacturar',
    requires:['dinoaccess.util.Rutas'],
    init:function(){
      console.log('iniciado');
    },
    onClickFacturarCotizacion:function(btn){
      try {
        var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
        var l = me.getLayout();
        l.setActiveItem(0);
        Ext.ComponentQuery.query('#frmRegCotizacion')[0].reset();
        Ext.ComponentQuery.query('#dgvDetalleVenta')[0].getStore().removeAll();
      } catch (e) {
        console.log('Ingresar Cotizacion Facturar');
      }
    },
    onClickCrearCotizacionFactura:function(btn){
      try {
        var r =  Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
        if (r)
        {
          if(r.get('estado')== 3  || r.get('estado')== 4 ||
             r.get('estado')== 5  || r.get('estado')== 6 ){
            Ext.Msg.alert("Aviso","Ya fue generado no se puede modificar!");
            return false;
          }

          var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(1);
          Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].reset();
          Ext.ComponentQuery.query('#frmRegCotizacionFacturar')[0].loadRecord(r);
          Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore().removeAll();
          Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0].mask('..Cargando');
          var  _tot = 0;
          Ext.Ajax.request({
              url :dinoaccess.util.Rutas.cotizacionDetalle,
              params:{
                vIdCotizacion : r.get('idcoti')
              },
              success:function(response){
                _ds = Ext.JSON.decode(response.responseText);
                Ext.each(_ds.data,function(record)
                 {
                    var _store         = Ext.ComponentQuery.query('#dgvDetalleVentaFacturar')[0].getStore();
                    var _precio         = 0;
                    _data = {
                            idprod: parseInt(record.id),
                            descripcion: record.descripcion,
                            cantidad:record.cantidad,
                            precio: record.precio,
                            total: record.total,
                            vencimiento : record.to_char,
                            presentacion : record.presentacion
                        };
                        _tot = _tot + record.total;

                      _store.insert(0, _data);
                 });
                 Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0].unmask();
                 c      = Ext.ComponentQuery.query('#incluyeigvfacturacion')[0];
                 i      = Ext.ComponentQuery.query('#igvventasfacturacion')[0];
                 s      = Ext.ComponentQuery.query('#Subtotalventasfacturacion')[0];
                 t      = Ext.ComponentQuery.query('#TotalGeneralfacturacion')[0];
                 
                 if(r.get('documentoventa')==1){//Factura
                   s.setValue(
                   Ext.util.Format.number( r.get('valventacont'), "0,000.00")
                  );
                   i.setValue(
                   Ext.util.Format.number( r.get('valigvcont'), "0,000.00")
                  );
                   t.setValue(
                   Ext.util.Format.number( r.get('valtotalcont'), "0,000.00")
                  );
                 }else{
                  s.setValue(
                    Ext.util.Format.number( r.get('valventacont'), "0,000.00")
                   );
                    i.setValue(
                    Ext.util.Format.number( r.get('valigvcont'), "0,000.00")
                   );
                    t.setValue(
                    Ext.util.Format.number( r.get('valtotalcont'), "0,000.00")
                   );
                 }
              }
          });


        }else{
          Ext.Msg.alert("Aviso","Tiene que seleccionar una cotizacion a facturar!");return false;
        }

     } catch (e) {
        console.log(e);
      }

    },
    onClickDocumentoImprimir:function(btn){
      try {
          var _record =  Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
         
          //if(_record.get('idguia')>0){
            
            //Imprimir en matricial A4
            //var objrpt = window.open( dinoaccess.util.Rutas.rptImprimirNota+
            //'id='+ _record.get('idfacturacion'), "", "width=700,height=900");
            //setTimeout(function(){ objrpt.close()}, 4000);

            var objrpt = window.open( dinoaccess.util.Rutas.imprimirTicket+ 'id='+ _record.get('idfacturacion'), "", "width=700,height=900");
            //setTimeout(function(){ objrpt.close(); }, 1000);
      
          //}
      } catch (e) {
          console.log(e);
      }

    },
    onClickGuiasRemisionImpresion:function(btn){
      try {
          var _record =  Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];
          if(_record.get('idguia')>0){
            var objrpt = window.open( dinoaccess.util.Rutas.rptImprimirNota+
            'id='+ _record.get('idguia'), "", "width=700,height=900");
            setTimeout(function(){ objrpt.close()}, 4000);
          }
      } catch (e) {
          console.log(e);
      }
    },
    onClickGuiasRemision:function(btn){
      try {
        var _record =  Ext.ComponentQuery.query('#dgvVentasFacturar')[0].getSelectionModel().getSelection()[0];

        if (_record && _record.get('estado')==3 && _record.get('idguia') == 0 )
        {
          var me =  Ext.ComponentQuery.query('#wContenedorCotizacionesFacturar')[0];    //this;
          var l = me.getLayout();
          l.setActiveItem(2);

          Ext.ComponentQuery.query('#frmRegGuiaRemision')[0].reset();
          Ext.ComponentQuery.query('#idfactura')[0].setValue(_record.get('idfacturacion'));
          Ext.ComponentQuery.query('#nrodocumento')[0].setValue(_record.get('docinterno'));


          __storeGuiaRemisionDetalle = Ext.ComponentQuery.query('#dgvDetalleGuiaRemision')[0].getStore();
          __storeGuiaRemisionDetalle.removeAll();
          Ext.Ajax.request({
              url : dinoaccess.util.Rutas.facturacionDetalle,
              params:{
                idfacturacion : _record.get('idfacturacion')
              },
              method : 'GET',
              success:function(response){
                 __data = Ext.JSON.decode( response.responseText );
                 console.log(__data);
                 Ext.each(__data.data,function(row){
                    __dato = {
                       cantidad     : row.cantidad ,
                       idprod       : row.idprod ,
                       descripcion  : row.producto,
                       unidadmedida : row.cantidadunidadmedida,
                       pesototal    :  (row.cantidad *  row.cantidadunidadmedida )
                    }
                    __storeGuiaRemisionDetalle.add(__dato);
                 });
              }
          });
        }

      } catch (e) {
        console.log('Ingresar Guia remiosion');
      }
    },
    onClickReporteVentas:function(){
      //var _record = this.lookupReference('dgvVentas').getSelectionModel().getSelection()[0];
      __desde = Ext.ComponentQuery.query('#dfDesdeCotizacionesFactura')[0].getRawValue();
      __hasta = Ext.ComponentQuery.query('#dfHastaCotizacionesFactura')[0].getRawValue();

      var _url = 'resources/api/reporte_ventas?desde='+ __desde + '&hasta='+ __hasta;

       _panel = Ext.ComponentQuery.query("#tabPrincipal")[0];
       if (_panel.getChildByElement('pdfreporteventas')) {
           _panel.remove('pdfreporteventas');
       }
       if (!_panel.getChildByElement('pdfreporteventas')) {
           _panel.add({
               xtype: 'panel',
               closable: true,
               id: 'pdfreporteventas',
               title: 'PDF: Reporte Ventas',
               layout: 'fit',
               bodyPadding: '5px 5px 5px 5px',
               items: [{
                   xtype: 'component',
                   itemId: 'xiframe',
                   autoScroll: true,
                   autoEl: {
                       tag: 'iframe',
                       style: 'height: 100%; width: 100%;',
                       src: _url
                   }
               }]
           });
       }
       _panel.setActiveTab('pdfreporteventas');

    }

});
