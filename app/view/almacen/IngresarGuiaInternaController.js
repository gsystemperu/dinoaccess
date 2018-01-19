Ext.define('dinoaccess.view.almacen.IngresarGuiaInternaController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.almacen-ingresarguiainterna',
    onClickBuscarProducto(btn){
            if(this.lookupReference('cboAlmacenOc').getValue()!=null)
            {
                Ext.widget('wRegProductoBuscarGI');
            }else{
                dinoaccess.util.Util.showToast('Seleccionar el almacen de origen!!');
            }
    }

});
