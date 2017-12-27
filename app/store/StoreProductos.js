Ext.define('dinoaccess.store.StoreProductos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/*
@DataSet :
Stores para las operaciones de Producto
==============================================================
*/
Ext.define('dinoaccess.store.Productos', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
      nombre : '',
      tipoproducto : 0
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/*
@DataSet :
Stores para listar los productos para las ordenes de compra
==============================================================
*/
Ext.define('dinoaccess.store.ProductosOrdenCompra', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Producto',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    extraParams :{
        idprov : 0,
        nombre : ''
    },
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_listar_oc'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


/*
@DataSet :
Stores para visualizar las series de cada producto por lote y guia
==============================================================
*/
Ext.define('dinoaccess.store.ProductoExistencias', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.ProductoExistencia',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/producto_existencias'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});
