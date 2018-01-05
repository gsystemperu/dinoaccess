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
        glyph: 'xf16b'
      }, {
        text: 'Productos',
        leaf: true,
        itemId: "wContenedorProducto",
        titulo: "Registro Productos",
        glyph: 'xf16b'
      },
      {
        text: 'Proveedores',
        leaf: true,
        itemId: "wRegProveedores",
        titulo: "Proveedores",
        glyph: 'xf16b'
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
            glyph: 'xf16b'
          },
          {
            text: 'Guias Entrada',
            leaf: true,
            itemId: "wContenedorGuias",
            titulo: "Guia Entrada",
            glyph: 'xf16b'
          }
        ]
      },
      {
        text: 'Inventario',
        expanded: true,
         children: [
          {
            text: 'Ajuste inventario',
            leaf: true,
            itemId: "wContenedorInventario",
            titulo: "Registro Inventario",
            glyph: 'xf16b'
          }
          
        ]
      },
  
    ]


  }
});
