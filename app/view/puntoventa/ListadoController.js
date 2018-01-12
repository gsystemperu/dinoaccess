Ext.define('dinoaccess.view.puntoventa.ListadoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.puntoventa-listado',
    onKeyUpBuscarProducto:function( obj, e, eOpts){
      if(e.keyCode==13){
          _combo = Ext.ComponentQuery.query('#cboCliente')[0].getValue();
          if(_combo==null){  dinoaccess.util.Util.showToast('Seleccionar un cliente para buscar sus precios !!');return false; }
          _store = Ext.ComponentQuery.query('#dvListaProductos')[0].getStore();
          _store.load({
            params:{
              nombre : obj.getValue(),
              idclie : _combo
            }
          });
      }
    },
    accionClickItem :function(  listview , record,item,index,e , eOpts){
      me = this;
      if(Ext.ComponentQuery.query('#cboCliente')[0].getValue()){
        var _data = {
               idprod   :  record.get('id'),
               producto :  record.get('nombre'),
               cantidad :  1,
               precio   :  record.get('precioventa'),
               total    :  record.get('precioventa') * 1,
               minutos  :  record.get('minutos'),
               dosis    :  0,
               preciodosis: record.get('preciodosis'),
               gramos   : 0,
               kilos    : 0,
               preciokilo  :record.get('preciokilo'),
               preciogramo :record.get('preciogramo')
        };
          var _grid = Ext.ComponentQuery.query('#dgvDetalleCaja')[0];
          /*if (_grid.getStore().findRecord('idprod', parseInt( record.get('id') ))) {
               Ext.Msg.alert('AVISO','EL PRODUCTO YA ESTA EN LISTA, MODIFICAR LA CANTIDAD ? ');return false;

           }*/
          _grid.getStore().insert(0,_data);
          me.onCalcularTotalVenta();
      }else{
        dinoaccess.util.Util.showToast('TIENE QUE SELECCIONAR AL CLIENTE O CREARLO !!');return false;
      }
   },
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
  
});
