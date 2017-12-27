Ext.define('dinoaccess.store.tree.ControlVentas', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
             { text: 'Clientes', leaf: true, itemId: "wContenedorCliente", titulo :'Clientes',glyph: 'xf01c'},
             { text: 'Proformas', leaf: true, itemId: "wContenedorCotizaciones", titulo :'Proformas' ,glyph: 'xf01c' },
             { text: 'Productos', leaf: true, itemId: "wContenedorProducto", titulo :'Productos',glyph: 'xf01c'},
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
                   glyph: 'xf01c'

                 },
                 {
                  text: 'Crear Factura',
                  leaf: true,
                  itemId: "wRegistrarFacturaBoleta",
                  titulo: 'Factura / Bolera',
                  glyph: 'xf01c'

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
