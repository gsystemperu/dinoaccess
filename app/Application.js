
Ext.define('dinoaccess.Application', {
    extend: 'Ext.app.Application',
    name: 'dinoaccess',
    stores: [
      'StoreMantenimientos',
      'StoreProductos',
      'StoreProveedores',
      'StoreAbastecimiento',
      'StoreOrdenCompra',
      'StoreVentas',
      'StoreManufactura'
    ],
    views:[
        'main.Main',
        'conf.Maestros',
        'almacen.Almacenes',
        'almacen.Producto',
        'almacen.ReglasAbastecimiento',
        'almacen.IngresarAbastecimiento',
        'almacen.Proveedor',
        'almacen.ProductoBuscar',
        'almacen.FormProveedor',
        'compras.OrdenCompra',
        'compras.GuiasEntrada',
        'compras.ContenedorGuias',
        'almacen.ProductoExistencias',
        'almacen.ContenedorProducto',
        'almacen.ProductoUbicacion',
        'compras.ContenedorOrdenCompra',
        'almacen.ProductoBuscarOC',
        'compras.PagosAcuenta',

        'ventas.ContenedorCotizaciones',
        'ventas.ContenedorCliente',
        'ventas.ListadoDeCotizaciones',
        'ventas.RegistrarCliente',
        'ventas.RegistrarProducto',
        'ventas.BuscarProducto',
        'ventas.ListadoClientes',
        //'ventas.ListadoProductos',
        'ventas.Mantenimiento',
        'ventas.VisorClienteCotizacion',
        'ventas.VisorProductoCotizacion',
        'ventas.VisorVendedorCotizacion',
        'ventas.EditarCotizacion',
        'ventas.Imprimir',
        'ventas.ListadoUsuarios',
        'ventas.CotizacionesClienteBuscar',
        'ventas.ListadoDeCotizacionesFacturar',
        'ventas.ContenedorCotizacionesFacturar',
        'ventas.RegistroCotizacionFacturar',
        'ventas.PagosAcuenta',
        'ventas.GuiaRemision',
        'ventas.ListadoClienteFacturacion',
        'ventas.ListadoClienteCotizacion',
        'ventas.VisualizarCotizacionFacturar',
        'ventas.RegistrarFacturaBoleta',
        'ventas.BuscarProductoFB',

        'puntoventa.ContenedorMain',
        'puntoventa.ListadoPdv',
        'puntoventa.PagosAcuentaPdv',
        'puntoventa.AperturaCaja',

        'mrp.ContenedorFormulas',
        'mrp.ListadoFormulas',
        'mrp.FormListaMaterial'

    ],

     models: [
      'dinoaccess.model.DataModels',
      'dinoaccess.model.DataModelVentas',
      'dinoaccess.model.DataModelMrp'
    ],
    launch: function () {
       //$('#splashscreen').hide();
       Ext.util.Format.decimalSeparator = '.';
       Ext.util.Format.thousandSeparator = ' ';
       //Ext.Msg.alert("Test2");
       Ext.create('wMain');
    }
});
