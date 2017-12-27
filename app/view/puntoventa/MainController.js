Ext.define('dinoaccess.view.puntoventa.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.puntoventa-main',
    onCalcularTotalVenta: function ()
    {
        me = this;
        var store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
        var _tot = 0;

        store.each(function (record) {
            _tot = parseFloat(_tot) + record.get('total');
        });
        Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue(_tot.toFixed(2));
    },
    onEditorCalcularTotal:function(editor,e){
         _cant    = e.record.get('cantidad');
         if(e.record.get('precioanterior')!=0){
            _pre  = e.record.get('precioanterior');
         }else{
           _pre   = e.record.get('precio');
         }

         _dosis   = e.record.get('dosis');
         _kilos   = e.record.get('kilos');
         _gramos  = e.record.get('gramos');

         if(parseInt(_dosis)==0){
           _tot = _pre * _cant;
           e.record.set('precio', _pre.toFixed(2));
           e.record.set('total', _tot.toFixed(2));
           e.record.set('precioanterior',0);
           this.onCalcularTotalVenta();
           //return false;
         }
         if(parseFloat(_kilos)>0){
           _cant       = e.record.get('kilos');
           _pre        = e.record.get('preciokilo');
           _anterior   = e.record.get('precio');
           _tot = _pre * _cant;
           e.record.set('precio', _pre.toFixed(2));
           e.record.set('precioanterior', _anterior.toFixed(2));
           e.record.set('total', _tot.toFixed(2));
           this.onCalcularTotalVenta();
           //return false;
         }
         if(parseFloat(_gramos)>0){
           _cant       = e.record.get('gramos');
           _pre        = e.record.get('preciogramo');
           _anterior   = e.record.get('precio');
           _tot = _pre * _cant;
           e.record.set('precio', _pre.toFixed(2));
           e.record.set('precioanterior', _anterior.toFixed(2));
           e.record.set('total', _tot.toFixed(2));
           this.onCalcularTotalVenta();
           //return false;
         }
         if(parseFloat(_dosis)>0){
            console.log('dosis');
           _cant       = e.record.get('dosis');
           _pre        = e.record.get('preciodosis');
           _anterior   = e.record.get('precio');
           _tot = _pre * _cant;
           e.record.set('precio', _pre.toFixed(2));
           e.record.set('precioanterior', _anterior.toFixed(2));
           e.record.set('total', _tot.toFixed(2));
           this.onCalcularTotalVenta();
           //return false;
         }
     },
     onClickEliminarItem:function(btn){
       var rec = btn.getWidgetRecord();
       var store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
       store.remove(rec);
       this.onCalcularTotalVenta();
     },
     onClickGuardarCajaPago:function(btn){
       __form = Ext.ComponentQuery.query('#wPuntoVentaPago')[0];
       me = this;
       if(__form.isValid()){
         var _dataDetalle = [];
         var _store = Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore();
         if(_store.getCount()==0){    dinoaccess.util.Util.showToast("TIENE QUE INGRESAR PRODUCTOS"); return false; }
         _store.each(function (record) {
             if (record.get('cantidad') != 0)
             {
               if(record.get('precioanterior')!=0 && record.get('dosis')>0){
                  _swDosis = true;
               }else{
                  _swDosis = false;
               }
               if(record.get('precioanterior')!=0 && record.get('kilos')>0){
                  _swKilos = true;
               }else{
                  _swKilos = false;
               }
               if(record.get('precioanterior')!=0 && record.get('gramos')>0){
                  _swGramos = true;
               }else{
                  _swGramos = false;
               }

                _reg = {
                     "idprod"  : record.get('idprod'),
                     "cantidad": record.get('cantidad'),
                     "precio"  : record.get("precio"),
                     "total"   : record.get("total"),
                     "ventadosis"   : _swDosis,
                     "dosis"        : record.get("dosis"),
                     "ventakilos"   : _swKilos,
                     "kilos"        : record.get("kilos"),
                     "ventagramos"  : _swGramos,
                     "gramos"       : record.get("gramos"),
                  };
                 _dataDetalle.push(_reg);
              }

         });
         __jsondetalle =  JSON.stringify(_dataDetalle);

         __radios = Ext.ComponentQuery.query('radio');
         if(__radios[0].value){
            __tipodoc = 3;
         }
         if(__radios[1].value){
           __tipodoc = 2;
         }
         if(__radios[2].value){
           __tipodoc = 1;
         }

         Ext.Ajax.request({
             url : dinoaccess.util.Rutas.facturacionGuardarPagoPuntoVenta,
             params:{
               id           : 0,
               idcoti       : 0,
               idper        : Ext.ComponentQuery.query('#cboCliente')[0].getValue(),
               vjsondetalle : __jsondetalle.toString(),
               idfopag      : Ext.ComponentQuery.query('#cboFormaPagoPv')[0].getValue(),
               idmodo       : 1,
               documentoventa :__tipodoc,
               serie        :  Ext.ComponentQuery.query('#txtSerieDoc')[0].getValue(),
               numerodoc    : Ext.ComponentQuery.query('#txtNumeroDoc')[0].getValue(),
               acuenta      : Ext.ComponentQuery.query('#txtAcuentaVentaCajaValidar')[0].getValue()
             },
             success:function(response){
                __data = Ext.JSON.decode(response.responseText);
                if(__data.error!=0){
                        Ext.ComponentQuery.query('#wPuntoVentaPago')[0].reset();
                        Ext.ComponentQuery.query('#dgvDetalleCaja')[0].getStore().removeAll();
                        dinoaccess.util.Util.showToast("GUARDADO");
                        Ext.ComponentQuery.query('#dvListaProductos')[0].getStore().load();
                        var me =  Ext.ComponentQuery.query('#wContenedorPuntoVenta')[0];
                        var l = me.getLayout();
                        l.setActiveItem(0);
                        Ext.ComponentQuery.query('#txtTotalVentaCaja')[0].setValue('0');
                       
                        var objrpt = window.open( dinoaccess.util.Rutas.imprimirTicket+ 'id='+ __data.error, "", "width=700,height=900");
                        
                        // Impresion Matricial
                        //var objrpt = window.open( dinoaccess.util.Rutas.rptImprimirNota+ 
                        //'id='+ __data.error, "", "width=700,height=900");
                        //setTimeout(function(){ objrpt.close()}, 4000);
                    
                }
             }
         });
       }

     },
     onKeyPagoAcuenta:function(obj, e, eOpts){
       if(e.keyCode==13){
           __total   = Ext.ComponentQuery.query('#txtTotalVentaCajaValidar')[0].getValue()
           __acuenta = Ext.ComponentQuery.query('#txtAcuentaVentaCajaValidar')[0].getValue();
           Ext.ComponentQuery.query('#txtSaldoVentaCajaValidar')[0].setValue(__total - __acuenta);
       }
     }

});
