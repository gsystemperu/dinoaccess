Ext.define('dinoaccess.model.DataModels', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int'
    }]
});

// @Model : Estado
Ext.define('dinoaccess.model.Estado', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});

// @Model : Banco
Ext.define('dinoaccess.model.Banco', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen
Ext.define('dinoaccess.model.Almacen', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Secciones
Ext.define('dinoaccess.model.AlmacenSecciones', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idalmacen',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'usuario',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Categorias
Ext.define('dinoaccess.model.Categoria', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Almacen Color
Ext.define('dinoaccess.model.Color', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Medidas
Ext.define('dinoaccess.model.Medida', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Tipo de producto
Ext.define('dinoaccess.model.TipoDeProducto', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Unidad de Medida
Ext.define('dinoaccess.model.UnidadDeMedida', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});

// @Model : Tarifa
Ext.define('dinoaccess.model.Tarifa', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'valor',
            type: 'float'
        },
        {
            name: 'idestado',
            type: 'int'
        }
    ]
});


// @Model : Marca
Ext.define('dinoaccess.model.Marca', {
    extend: 'Ext.data.Model',
    fields: [
       {
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});


// @Model : Modelo
Ext.define('dinoaccess.model.Modelo', {
    extend: 'Ext.data.Model',
    fields: [
       {
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        }
    ]
});


// @Model : Producto
Ext.define('dinoaccess.model.Producto', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: "codigoproducto",
            type: 'string'
        },
        {
            name: "nombre",
            type: 'string'
        },
        {
            name: "preciocompra",
            type: 'float'
        },
        {
            name: "precioventa",
            type: 'float'
        },
        {
            name: "precioventafraccion",
            type: 'float'
        },
        {
            name: "preciodolares",
            type: 'float'
        },
        {
            name: "stockminimo",
            type: 'int'
        },
        {
            name: "fechacaducidad",
            type: 'string'
        },
        {
            name: "idcolor",
            type: 'int'
        },
        {
            name: "idmedida",
            type: 'int'
        },
        {
            name: "idunidadmedida",
            type: 'int'
        },
        {
            name: "idunidadmedidafraccion",
            type: 'int'
        },
        {
            name: "idtipoproducto",
            type: 'int'
        },
        {
            name: "talla",
            type: 'string'
        },
        {
            name: "stockminimo",
            type: 'float'
        },
        {
            name: "manejastock",
            type: 'boolean'
        },
        {
            name: "existencias",
            type: 'integer'
        },
        {name: "precioprodlocalespecial",type: 'float'},
        {name: "precioprodlocalespecial2",type: 'float'},
        {name: "precioprodlocalespecial3",type: 'float'},
        {name: "precioprodprovincia",type: 'float'},
        {name: "precioprodprovinciaespecial",type: 'float'},
        {name: "precioprodprovinciaespecial2",type: 'float'},
        {name: "precioprodprovinciaespecial3",type: 'float'},
        {name: "precioproddistribuidorlima",type: 'float'},
        {name: "precioproddistribuidorprovincia",type: 'float'},
        {name: "sevendepordosis",type: 'boolean'},
        {name: "numerodosis",type: 'integer'},
        {name: "preciodosis",type: 'float'},
        {name: "ventas",type: 'float'},
        {name: "cotizaciones",type: 'float'},
        {name: "cantidadunidadmedida",type: 'float'},
        {name: "unidadmedida",type: 'string'},
        {name: "ventakilos",type: 'boolean'},
        {name: "preciokilo",type: 'float'},
        {name: "ventagramos",type: 'boolean'},
        {name: "preciogramo",type: 'float'},
        {name: "stock_dosis",type: 'float'},
        {name: "stock_kilos",type: 'float'},
        {name: "stock_gramos",type: 'float'},

        {name: "idmodelo",type: 'integer'},
        {name: "modelo",type: 'string'},
        {name: "idmarca",type: 'float'},
        {name: "marca",type: 'string'}
    ]
});

// @Model : Tarifa
Ext.define('dinoaccess.model.Proveedor', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'contacto',
            type: 'string'
        },
        {
            name: 'telefono',
            type: 'string'
        },
        {
            name: 'direccion',
            type: 'string'
        },
        {
            name: 'direccionfiscal',
            type: 'string'
        },
        {
            name: 'numrucprov',
            type: 'string'
        }
    ]
});


// @Model : Abastecimientos
Ext.define('dinoaccess.model.Abastecimiento', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idprov',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'fecha',
            type: 'date'
        },
        {
            name: 'tipodoc',
            type: 'string'
        },
        {
            name: 'serie',
            type: 'string'
        },
        {
            name: 'numero',
            type: 'string'
        },
        {
            name: 'lote',
            type: 'string'
        },
        {
            name: 'idestado',
            type: 'int'
        },
        {
            name: 'feabastecimiento',
            type: 'string'
        }

    ]
});

// @Model : Abastecimiento detalle
Ext.define('dinoaccess.model.AbastecimientoDetalle', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'idaba',
            type: 'int'
        },
        {
            name: 'item',
            type: 'int'
        },
        {
            name: 'idprod',
            type: 'int'
        },
        {
            name: 'nombre',
            type: 'string'
        },
        {
            name: 'cantidad',
            type: 'int'
        },
        {
            name: 'precio',
            type: 'int'
        },
        {
            name: 'total',
            type: 'int'
        },
        {
            name: 'vencimiento',
            type: 'date'
        }
    ]
});



// @Model : Orden de Compra
//eddy erazo 
Ext.define('dinoaccess.model.OrdenCompra', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'idprov',
            type: 'int'
        },
        {
            name: 'razonsocial',
            type: 'string'
        },
        {
            name: 'fecha',
            type: 'string'
        },
        {
            name: 'estado',
            type: 'string'
        },
        {
            name: 'fpedido',
            type: 'string'
        },
        {
            name: 'incluyeigv',
            type: 'boolean'
        },
        {
            name: 'occodigo',
            type: 'string'
        },
        {name: 'totalorden',type: 'float'},
        {name: 'pagoacuenta',type: 'float'},
        {name: 'saldopagar',type: 'float'},
        {name: 'idmoneda',type: 'integer'}
        

    ]
});



// @Model : Orden de Compra Detalle estado confirmado
//
Ext.define('dinoaccess.model.OrdenCompraDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idordencompra',type: 'int'},
        {name :'item',type:'int'},
        {name :'idprod',type:'int'},
        {name :'producto',type:'string'},
        {name :'cantidad',type:'float'},
        {name :'preciocompra',type:'float'},
        {name :'cantidadrecibida',type:'float'},
        {name :'total',type:'float'},
        {name :'saldo',type:'float'}
    ]
});

// @Model : Producto existencias con sus series
Ext.define('dinoaccess.model.ProductoExistencia', {
    extend: 'Ext.data.Model',
    fields: [
        {name :'id',type:'int'},
        {name: 'fechaingreso',type:'string'},
        {name :'idprodeedor',type:'int'},
        {name :'razonsocial',type:'string'},
        {name :'numeroguia',type:'string'},
        {name :'numerolote',type:'string'},
        {name :'codigobarras',type:'string'},
        {name: "vencimiento",type:'string'},
        {name: "idseccion",type:'int'},
        {name: "seccionalmacen",type:'string'},
        {name: "ubicacion",type:'string'},
        {name: "observaciones",type:'string'},
        {name: "estado",type:'string'},
        {name: "cantidaddosis",type:'int'},
        {name: "cantidadgramo",type:'float'},
        {name: "cantidadkilos",type:'float'}


    ]
});

// @Model : Moneda
Ext.define('dinoaccess.model.Moneda', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {name: 'abreviatura',type: 'string'},
        {name: 'simbolo',type: 'string'}
    ]
});


// @Model : Listado de nombre de monedas para la apetura de caja
Ext.define('dinoaccess.model.NombreMoneda', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id',
            type: 'int'
        },
        {
            name: 'descripcion',
            type: 'string'
        },
        {
            name: 'valor',
            type: 'float'
        },
        {
            name: 'monto',
            type: 'float'
        },
    ]
});


// @Model : Detalle de Guia Remisión
Ext.define('dinoaccess.model.GuiaRemisionDetalle', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idordencompra',type: 'int'},
        {name :'item',type:'int'},
        {name :'idprod',type:'int'},
        {name :'producto',type:'string'},
        {name :'cantidad',type:'float'},
        {name :'preciocompra',type:'float'},
        {name :'cantidadrecibida',type:'float'},
        {name :'total',type:'float'},
        {name :'saldo',type:'float'}
    ]
});
