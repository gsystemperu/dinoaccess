Ext.define('dinoaccess.store.tree.ControlCompras', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
                text: 'Orden Compra',
                leaf: true,
                itemId: "wContenedorOrdenCompra",
                titulo: "Orden Compra",
                glyph: 'xf0e4'
              },
            
        ]


    }
});
