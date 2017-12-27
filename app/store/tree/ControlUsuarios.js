Ext.define('dinoaccess.store.tree.ControlUsuarios', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
            { text: 'Registro de Usuarios', leaf: true, itemId: "registroUsuarios", titulo: "Registro Usuarios" },
            { text: 'Niveles de Acceso', leaf: true, itemId: "registroNivelesAccesso", titulo: 'Nivles de Acceso' },
        ]
    }
});
