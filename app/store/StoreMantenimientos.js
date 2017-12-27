Ext.define('dinoaccess.store.StoreMantenimientos', {extend: 'Ext.data.Store',fields: ["id", "descripcion"],data: [{ id: 'test' }],proxy: { type: 'memory' }});

/* 
@DataSet :
Stores para los mantenimientos de las tablas maestras
==============================================================
*/
Ext.define('dinoaccess.store.Estados', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Estado',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/estados_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.Bancos', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Banco',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/bancos_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.Almacenes', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Almacen',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/almacen_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.AlmacenSecciones', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.AlmacenSecciones',
    autoLoad: false,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/almacen_secciones_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.Categoria', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Categoria',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/categoria_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('dinoaccess.store.Colores', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Color',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/color_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.Medidas', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Medida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/medidas_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});


Ext.define('dinoaccess.store.TipoDeProductos', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.TipoDeProducto',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tipo_producto_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.UnidadDeMedidas', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.UnidadDeMedida',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/unidad_medida_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

Ext.define('dinoaccess.store.Tarifas', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Tarifa',
    autoLoad: true,
    remoteSort: true,
    autoSync  : true,
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/tarifa_lista'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});



/* 
@DataSet :
Stores para los mantenimientos Tabla Modelo
==============================================================
*/
Ext.define('dinoaccess.store.Modelos', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Modelo',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/modelo_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});

/* 
@DataSet :
Stores para los mantenimientos Tabla Marca
==============================================================
*/
Ext.define('dinoaccess.store.Marcas', {
    extend: 'Ext.data.Store',
    requiere:['dinoaccess.model.DataModels'],
    model   :'dinoaccess.model.Marca',
    autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {read: 'resources/api/marca_listar'},
        reader: {
            type: 'json',
            rootProperty: 'data',
        }
    }
});