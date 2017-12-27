Ext.define('dinoaccess.store.tree.ControlAlmacen', {
  extend: 'Ext.data.TreeStore',
  root: {
    expanded: true,
    children: [
      {
        text: 'Almacenes',
        leaf: true,
        itemId: "wRegAlmacen",
        titulo: "Registro Almacenes",
        glyph: 'xf01c'
      }, {
        text: 'Productos',
        leaf: true,
        itemId: "wContenedorProducto",
        titulo: "Registro Productos",
        glyph: 'xf01c'
      },
      {
        text: 'Proveedores',
        leaf: true,
        itemId: "wRegProveedores",
        titulo: "Proveedores",
        glyph: 'xf01c'
      },
      {
        text: 'Ingreso Mercaderia',
        expanded: true,
         children: [
          {
            text: 'Orden Compra',
            leaf: true,
            itemId: "wContenedorOrdenCompra",
            titulo: "Orden Compra",
            glyph: 'xf01c'
          },
          {
            text: 'Guias Entrada',
            leaf: true,
            itemId: "wContenedorGuias",
            titulo: "Guia Entrada",
            glyph: 'xf01c'
          }
        ]
      },
  
    ]


  }
});
