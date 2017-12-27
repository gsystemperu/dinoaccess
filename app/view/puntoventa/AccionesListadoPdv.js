Ext.define('dinoaccess.view.puntoventa.AccionesListadoPdv', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.acciones-listadopdv',
    requires:['dinoaccess.util.Rutas'],
    init:function(){},
    onClickIngresarPagoAcuentaPdv:function(btn){
      __rec = btn.getWidgetRecord();
      Ext.widget('wPagosAcuentaPdv', {
        codigo :__rec.get("idfacturacion"),
        nombre :__rec.get("nomcompleto") ,
        monto  :__rec.get("totalcoti")
      });
    },
    onClickEliminarPagoAcuentaPdv:function(btn){
        console.log("aaa");
    },
    onClickVisualizarVenta:function(btn){
      __record  = Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getSelectionModel().getSelection()[0];
      if(__record){
        var objrpt = window.open( dinoaccess.util.Rutas.rptVisualizarNota+ 
        'id='+ __record.get('idfacturacion'), "", "width=700,height=900");
      }
    },
    onClickImprimirComprobante:function(btn){
      __record  = Ext.ComponentQuery.query('#dgvVentasFacturarPdv')[0].getSelectionModel().getSelection()[0];
      if(__record){
        var objrpt = window.open( dinoaccess.util.Rutas.rptImprimirNota+ 
        'id='+ __record.get('idfacturacion'), "", "width=700,height=900");
      }
    }
});
