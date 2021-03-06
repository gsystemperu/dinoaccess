Ext.define('dinoaccess.store.tree.Mantenimiento', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
              text: 'Maestros Sistema',
              leaf: true,
              itemId: "wRegMaestros",
              titulo: "Maestros",
              glyph: 'xf013'
            },
        ]
    }
});


Ext.define('dinoaccess.store.tree.Maestros', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            {
              text: 'Estados',
              leaf: true,
              itemId: "wRegEstados",
              titulo: "Registro de Estados",
                glyph: 'xf022'
            },
            {
              text: 'Bancos',
              leaf: true,
              itemId: "wRegBancos",
              titulo: "Registro de Bancos",
              glyph: 'xf01c'
            },
            {
              text: 'Categorias',
              leaf: true,
              itemId: "wRegCategoria",
              titulo: "Registro de Categorias",
              glyph: 'xf022'
            },
            {
              text: 'Colores',
              leaf: true,
              itemId: "wRegColores",
              titulo: "Registro de Colores",
              glyph: 'xf022'
            },
            {
              text: 'Medidas',
              leaf: true,
              itemId: "wRegMedidas",
              titulo: "Registro de Medidas",
              glyph: 'xf022'
            },
            {
              text: 'Unidad Medida', //----
              leaf: true,
              itemId: "wRegUnidadMedida",
              titulo: "Registro de Uniad Medida",
              glyph: 'xf022'
            },
            {
              text: 'Tipo de Producto', //---
              leaf: true,
              itemId: "wRegTipoProducto",
              titulo: "Registro Tipo Producto",
              glyph: 'xf022'
            },
            {
              text: 'Tarifas',
              leaf: true,
              itemId: "wRegTarifas",
              titulo: "Registro Tarifas",
              glyph: 'xf022'
            },
            {
              text: 'Tipo Doc. Identidad',
              leaf: true,
              itemId: "wRegTipoDocIdentidad",
              titulo: "Registro de Tipo Documento Identidad",
              glyph: 'xf022'
            }


        ]


    }
});
