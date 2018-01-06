Ext.define('dinoaccess.store.tree.ControlVentas', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
             { text: 'Clientes', leaf: true, itemId: "wContenedorCliente", titulo :'Clientes',glyph: 'xf022'},
             { text: 'Proformas', leaf: true, itemId: "wContenedorCotizaciones", titulo :'Proformas' ,glyph: 'xf022' },
             { text: 'Productos', leaf: true, itemId: "wContenedorProducto", titulo :'Productos',glyph: 'xf022'},
             {
               text: 'Facturación',
               expanded: true,
               //leaf : true,
                titulo : '',
                children: [
                 {
                   text: 'Venta / facturar',
                   leaf: true,
                   itemId: "wContenedorCotizacionesFacturar",
                   titulo: "Proforma/Facturar",
                   glyph: 'xf022'

                 },
                 {
                  text: 'Crear Factura',
                  leaf: true,
                  itemId: "wRegistrarFacturaBoleta",
                  titulo: 'Factura / Bolera',
                  glyph: 'xf022'

                },
              
               ]
             },
             {
               text: 'PUNTO VENTA',
               expanded: true,
               titulo : '',
                children: [
                 {
                   text: 'TIENDA',
                   leaf: true,
                   itemId: "wContenedorPuntoVenta",
                   titulo: ".:. Tienda .:. ",
                   iconCls:'punto_venta',
                  
                 }
               ]
             }
        ]
    }
});
