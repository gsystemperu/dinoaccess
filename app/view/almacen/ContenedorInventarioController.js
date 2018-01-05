Ext.define('dinoaccess.view.almacen.ContenedorInventarioController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-contenedorinventario',
    
    //@Acciones
    onClickCrearInventario:function(btn){
        try 
        {
            var me =  Ext.ComponentQuery.query('#wContenedorInventario')[0];    //this;
            var l = me.getLayout();
            l.setActiveItem(1);
            Ext.ComponentQuery.query('#dgvInvNuevo')[0].getStore().load();
            Ext.ComponentQuery.query('#wRegInventarioInicial')[0].reset();
            
        } catch (e) {
            console.log(e);
        }
        
    },
    onClickImprimirStockInventario:function(btn){
        
        w = window.open( dinoaccess.util.Rutas.inventarioImprimirStock, "", "width=700,height=900");
        //setTimeout(function(){ objrpt.close(); }, 1000);
     
    },
  

});
