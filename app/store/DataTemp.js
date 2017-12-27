Ext.define('dinoaccess.store.DataTemp', {
    extend: 'Ext.data.Store',
    fields: ["id", "descripcion"],
    data: [{ id: 'test' }],
    proxy: { type: 'memory' }
});

Ext.define('dinoaccess.store.TipoDocumento', {
    extend: 'Ext.data.Store',
    fields: ["id", "descripcion"],
    data: [
        { id: 'SD', descripcion: 'SIN DOCUMENTO' },
        { id: 'B', descripcion: 'BOLETA' },
        { id: 'F', descripcion: 'FACTURA' },
        { id: 'OP', descripcion: 'ORDEN PEDIDO' },
        { id: 'G', descripcion: 'GUIA' }
    ],
    proxy: { type: 'memory' }
});

Ext.define('dinoaccess.store.DetalleAbastecimiento', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "idprod", type:'int' },
            {name: "producto", type:'string' },
            {name: "cantidad", type:'int' },
            {name: "precio", type:'float' },
            {name: "total", type:'float' }  ,
            {name: "vencimiento",type:'date', format:'d/m/Y'},
            {name: "genserie",type:'boolean'}
    ],
    proxy: { type: 'memory' }
});


Ext.define('dinoaccess.store.DetalleOrdenCompra', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "idprod", type:'int' },
            {name: "producto", type:'string' },
            {name: "cantidad", type:'int' },
            {name: "precio", type:'float' },
            {name: "total", type:'float' }
    ],
    proxy: { type: 'memory' }
});

/*
  @ Store Temporal para el detalle del ingreso al almacen de una o varias guias
 */
Ext.define('dinoaccess.store.TmpOrdenCompraConfirmadas', {
    extend: 'Ext.data.Store',
    fields: [
      {name: 'idordencompra',type: 'int'},
      {name :'item',type:'int'},
      {name :'idprod',type:'int'},
      {name :'producto',type:'string'},
      {name :'cantidad',type:'int'},
      {name :'preciocompra',type:'float'},
      {name :'cantidadrecibida',type:'int'},
      {name :'numeroguia',type:'string'},
      {name: "vencimiento",type:'date', format:'d/m/Y'}

    ],
    proxy: { type: 'memory' }
});


/**
 * Detalle de proveedores en la vista de producto.
 * un producto puede tener varios proveedores con diferentes
 * precios.
 *
 * @type {Store}
 */

Ext.define('dinoaccess.store.DetProductoProveedor', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "razonsocial"},
            {name: "precio", type:'float' }
    ],
    data : [
      ['' ,0 ]
    ],
    proxy: { type: 'memory' }
});

Ext.define('dinoaccess.store.PagosAcuenta', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "fecha",type:'date',format:'d/m/Y'},
            {name: "fechat",type:'date',format:'d/m/Y'},
            {name: "monto", type:'float' }
    ],
    /*data : [
      ['' ,0 ]
  ],*/
    proxy: { type: 'memory' }
});

Ext.define('dinoaccess.store.CajaDetalleVenta', {
    extend: 'Ext.data.Store',
    fields: [
      {name: "idprod", type:'int' },
      {name: "producto", type:'string' },
      {name: "cantidad", type:'int' },
      {name: "precio", type:'float' },
      {name: "total", type:'float' },
      {name: "dosis", type:'float' },
      {name: "preciodosis", type:'float' },
      {name: "precioanterior", type:'float' },
      {name: "kilos", type:'float' },
      {name: "gramos", type:'float' },
      {name: "preciokilo", type:'float' },
      {name: "preciogramo", type:'float' }


    ],
    /*data : [
      ['' ,0 ]
    ],*/
    proxy: { type: 'memory' }
});



Ext.define('dinoaccess.store.GuiaRemisionDetalle', {
    extend: 'Ext.data.Store',
    fields: [
      {name: "cantidad", type:'float' },
      {name: "idprod", type:'integer' },
      {name: "descripcion", type:'string' },
      {name: "unidadmedida", type:'float' },
      {name: "pesototal", type:'float' }
    ],
    proxy: { type: 'memory' }
});




/**
 * Detalle de productos de la lista de producto para la manufactura de alimentos
 *
 * @type {Store}
 */

Ext.define('dinoaccess.store.DetListaMateriales', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "producto"},
            {name: "cantidad", type:'float' },
            {name: "unidadmedida"}
    ],
    data : [
      ['' ,0 ]
    ],
    proxy: { type: 'memory' }
});


/**
 * Store para los estados de las cotizaciones y ventas , se usa en los listados
 *
 * @type {Store}
 */

Ext.define('dinoaccess.store.BusquedaEstado', {
    extend: 'Ext.data.Store',
    fields: [
            {name: "id",type:'integer'},
            {name: "descripcion", type:'string' },
            
    ],
    data : [
      [1 ,'CT GENERADA'],
      [2 ,'CT CONFIRMADA'],
      [3 ,'CT FACTURADA'],
      [4 ,'CT ANULADA'],
    ],
    proxy: { type: 'memory' }
});
