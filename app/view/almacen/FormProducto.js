Ext.define('dinoaccess.view.almacen.FormProducto', {
    extend: 'Ext.form.Panel',
    alias : 'widget.wFormProducto',
    xtype : 'wFormProducto',
    itemId : 'wFormProducto',
    requires   : [
        'Ext.form.field.*',
        'dinoaccess.util.Rutas',
        'dinoaccess.view.almacen.AccionesProducto',

    ],
    reference : 'myFrmProducto',
    margin: 30,
    autoScroll: true,
    controller: 'acciones-producto',
    submitEmptyText : false,
    url: dinoaccess.util.Rutas.productoGuardar,
    layout: {
      type: 'vbox',
      pack: 'start',
      align: 'stretch'
    },
    initComponent: function() {
        me = this;
        var storeColores = Ext.create('dinoaccess.store.Colores');
        var storeMedida = Ext.create('dinoaccess.store.Medidas');
        var storeUnidadMedida = Ext.create('dinoaccess.store.UnidadDeMedidas');
        var storeTipoProd = Ext.create('dinoaccess.store.TipoDeProductos');
        var storeProveedores = Ext.create('dinoaccess.store.Proveedores');
        var storePresentacion = Ext.create('dinoaccess.store.Presentacion');
        var storeModelos = Ext.create('dinoaccess.store.Modelos');
        var storeMarcas = Ext.create('dinoaccess.store.Marcas');
        
        Ext.apply(me,
        {
          items : me.getFormularioProducto(storeColores, storeMedida, storeUnidadMedida, storeTipoProd,storeProveedores,storePresentacion,storeModelos,storeMarcas),
          bbar: [
            /*{
              xtype: 'button',
              text: 'Copiar',
              scale: 'medium',
              handler: 'onClickCopiarProducto'
            },*/
            '->',
            {
             xtype: 'button',
             text: 'Cancelar',
             scale: 'medium',
             handler: 'onClickCancelarProducto'
           },
             {
              xtype: 'button',
              text: 'Grabar',
              scale: 'medium',
              handler: 'onClickGuardarProducto'
            }

          ]
        });
        me.callParent(arguments);
    },
    getFormularioProducto: function (storeColores, storeMedida, storeUnidadMedida, storeTipoProd,storeProveedores,storePresentacion,storeModelos,storeMarcas ) {
      _storeDetProvProd = Ext.create('dinoaccess.store.DetProductoProveedor', {});

      var obj = [
        /*{
            xtype: 'label',
            text :'Producto / Nuevo',
            padding:0,
            border: false,
            flex: 1,
            //height : 30,
            padding:'5 5 5 5',
            style: {
              color: '#775c80',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            }
          },*/
        {
          xtype:'hiddenfield',
          name : 'id',
          value : 0
        },
        {
          xtype:'hiddenfield',
          name :'jsondetalle',
          itemId :'jsondetalle'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Codigo Producto',
          name: 'codigoproducto',
          itemId: 'codigoserie'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Codigo Barras',
          name: 'codigobarras'
        },
        {
          xtype: 'textfield',
          fieldLabel: 'Nombre',
          name: 'nombre',
          allowBlank :false,
          fieldStyle  :'font-size:20px;text-transform: uppercase;background-color:#F9F7D8'
        },
        {
          xtype:'container',
          layout:{
            type:'hbox',
            anchor :'100%'
          },
          padding : '0 0 5 0',
          items :[
            {
              xtype: 'combo',
              fieldLabel: 'Categoría',
              name: 'idtipoproducto',
              itemId: 'tipoproducto',
              displayField: 'descripcion',
              valueField: 'id',
              queryMode: 'local',
              editable: false,
              flex: 1,
              store: storeTipoProd,
              emptyText: '---- Seleccionar -----',
              allowBlank :false
            },
            {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),handler:'onClickNuevoTipoProducto'},
            {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),
              handler:'onClickRefrescarTipoProducto'
            },
          ]

        },

        {
          xtype: 'textfield',
          fieldLabel: 'Talla',
          name: 'talla',
          hidden:true
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          hidden:true,
          padding: '0 0 10 0',
          defaultType: 'combo',
          items: [{
              fieldLabel: 'Color',
              name: 'idcolor',
              flex: 1,
              store: storeColores,
              valueField: 'id',
              displayField: 'descripcion',
              queryMode: 'local',
              editable: false,

              emptyText: '---- Seleccionar -----',
            },
            {
              fieldLabel: 'Medida',
              name: 'idmedida',
              flex: 1,
              labelAlign: 'right',
              store: storeMedida,
              valueField: 'id',
              displayField: 'descripcion',
              queryMode: 'local',
              editable: false,

              emptyText: '---- Seleccionar -----',
            }
          ]

        },
       
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          defaultType: 'combo',
          defaults:{
            labelAlign :'left'
          },
          padding: '0 0 10 0',
          items: [
             {
               fieldLabel:'Modelo',
               store : storeModelos,
               displayField :'descripcion',
               valueField : 'id',
               queryMode : 'local',
               emptyText: '---- Seleccionar -----',
               flex:1,
               name : 'idmodelo',
               itemId : 'idmodelo'
             },
             {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),handler:'onClickNuevoUnidadMedida'},
             {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),handler:'onClickRefrescarModelo'},
           
             {
               fieldLabel:'Marca',
               flex: 1,
               store : storeMarcas,
               name : 'idmarca',
               displayField :'descripcion',
               valueField : 'id',
               queryMode : 'local',
               labelAlign:'right',
               emptyText: '---- Seleccionar -----',

               itemId : 'idmarca'
               
              },
              {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),handler:'onClickNuevoUnidadMedida'},
              {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),handler:'onClickRefrescarMarca'},
            
          ]
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          defaultType: 'combo',
          defaults:{
            labelAlign :'right'
          },
          padding: '0 0 10 0',
          items: [
            {
              xtype: 'numberfield',
              fieldLabel: 'Precio Compra',
              name: 'preciocompra',
              fieldStyle : 'font-size:15px;',
              labelAlign : 'left',
              value : 0,
              flex: 1
            },

            {
              fieldLabel: 'Unidad Medida',
              name: 'idunidadmedida',
              itemId: 'idunidadmedida',
              flex: 1,
              store: storeUnidadMedida,
              displayField: 'descripcion',
              valueField: 'id',
              queryMode: 'local',
              editable: false,
              emptyText: '---- Seleccionar -----',
            },
            {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),handler:'onClickNuevoUnidadMedida'},
            {xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),handler:'onClickRefrescarUnidadMedida'},
            {
                fieldLabel: 'Presentación',
                labelAlign:'right',
                name: 'idpresentacion',
                itemId :'idpresentacion',
                flex: 1,
                store: storePresentacion,
                displayField: 'despres',
                valueField: 'idpres',
                queryMode: 'local',
                editable: false,
                emptyText: '---- Seleccionar -----',
              },
              {
                xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                handler:'onClickNuevoPresentacion'
              },
              {
                xtype:'button',glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),
                handler:'onClickRefrescarPresentacion'
              },
              {
                xtype: 'numberfield',
                fieldLabel: 'Cantidad',
                name: 'cantidadunidadmedida',
                fieldStyle : 'font-size:15px;',
                value : 0,
                flex: 1
              }
          ]
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          padding: '0 0 10 0',
          defaultType: 'combo',
          hidden : true,
          items: [

            {
              fieldLabel: 'U.M. Fraccion',
              name: 'idunidadmedidafraccion',
              flex: 1,
              labelAlign: 'right',
              store: storeUnidadMedida,
              displayField: 'descripcion',
              valueField: 'id',
              queryMode: 'local',
              editable: false,
              hidden:true,
              emptyText: '---- Seleccionar -----',
            }
          ]

        },
        {
          xtype: 'textfield',
          fieldLabel: 'Composicion Items',
          name: 'composicion',
          hidden: true
        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          hidden:true,
          padding: '0 0 10 0',
          defaultType: 'numberfield',
          items: [
            {
              fieldLabel: 'Precio Venta',
            //  name: 'precioventa',
              flex: 1
            },
            {
              fieldLabel: 'P.V. Fraccion',
              name: 'precioventafraccion',
              flex: 1,
              labelAlign: 'right',
              hidden:true
            }
          ]

        },
        {
          xtype: 'container',
          layout: {
            type: 'hbox',
          },
          padding: '0 0 10 0',
          defaultType: 'numberfield',
          items: [{
              fieldLabel: 'Precio Dolares',
              name: 'preciodolares',
              flex: 1,
              hidden: true
            },
            {
              xtype: 'datefield',
              value: new Date(),
              fieldLabel: 'Fecha Caducidad',
              name: 'fechacaducidad',
              flex: 1,
              labelAlign: 'left',
              format: 'd/m/Y',
              altFormats: 'Y-m-d',
              hidden: true
            }
          ]

        },
        {
          xtype:'tabpanel',
          itemId :'tabDetalleProducto',
          height : 300,
          items:[
            {
              title:'..: Venta :..',
              layout:{
                type:'vbox',
                align : 'stretch',
                pack  : 'start'
              },
              bodyPadding:10,
              items:[
                {
                  xtype: 'container',
                  layout: {
                    type: 'hbox',
                    align : 'stretch',
                    pack  : 'start'
                  },
                  hidden: true,
                  defaultType: 'numberfield',
                  defaults:{
                    labelAlign:'right',
                    flex :1,
                  },
                  items: [
                    {
                      xtype: 'checkbox',
                      boxLabel: '<b>Venta por dosis</b>',
                      name: 'sevendepordosis',
                      boxLabelAlign: 'before',
                      flex: 0.5

                    },
                    {
                      fieldLabel: '<b>Número de dosis</b>',
                      name: 'numerodosis',
                      labelWidth : 130,
                      labelAlign :'right',
                      value : 0
                    },
                    {
                      fieldLabel: '<b>Precio Dosis</b>',
                      name: 'preciodosis',
                      labelWidth : 100,
                      labelAlign :'right',
                      value : 0
                    },
                  ]
                },
                {
                  xtype: 'container',
                  padding : '5 0 5 0',
                  layout: {
                    type: 'hbox',
                    align : 'stretch',
                    pack  : 'start'
                  },
                  hidden:true,
                  defaultType: 'numberfield',
                  defaults:{
                    labelAlign:'right',
                      flex: 2
                  },
                  items: [
                    {
                      xtype: 'checkbox',
                      boxLabel: '<b>Venta por Kilos</b>',
                      name: 'ventakilos',
                      boxLabelAlign: 'before',
                      flex: 0.5

                    },

                    {
                      fieldLabel: '<b>Precio Kilo</b>',
                      name: 'preciokilo',
                      labelWidth : 130,
                      labelAlign :'right',
                      value : 0
                    },
                  ]
                },
                {
                  xtype: 'container',
                  layout: {
                    type: 'hbox',
                    align : 'stretch',
                    pack  : 'start'
                  },
                  hidden:true,
                  defaultType: 'numberfield',
                  defaults:{
                    labelAlign:'right',
                    flex: 2
                  },
                  items: [
                    {
                      xtype: 'checkbox',
                      boxLabel: '<b>Venta por Gramos</b>',
                      name: 'ventagramos',
                      boxLabelAlign: 'before',
                      flex: 0.5

                    },

                    {
                      fieldLabel: '<b>Precio Gramo</b>',
                      name: 'preciogramo',
                        labelWidth : 130,
                      labelAlign :'right',
                      value : 0
                    },
                  ]
                },
                {
                  xtype: 'container',
                  layout: {
                    type: 'hbox',
                    flex: 1,
                    labelAlign:'right'
                  },
                  hidden: true,
                  padding: '0 0 10 0',
                  defaultType: 'numberfield',
                  items: [{
                      xtype: 'checkbox',
                      boxLabel: 'Maneja Stock',
                      name: 'manejastock',
                      flex: 1,
                    },
                    {
                      xtype: 'numberfield',
                      fieldLabel: 'Stock Minimo',
                      name: 'stockminimo',
                      flex: 1,
                      labelAlign: 'right'
                    },
                  ]
                },
                {
                  xtype: 'container',
                  padding :'5 5 5 5',
                  layout: {
                    type: 'hbox',
                    flex: 1,
                  },
                  items:[
                    {

                        xtype:'numberfield',
                        fieldLabel:'Precio Publico Lima',
                        name : 'precioventa',
                        flex: 1,
                        allowDecimals: true,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1',
                        labelWidth:170,
                        value : 0,
                        allowBlank :false

                     },
                    {

                        xtype:'numberfield',
                        fieldLabel:'Precio Especial Lima 1',
                        name : 'precioprodlocalespecial',
                        flex: 1,
                        allowDecimals: true,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1',
                        labelWidth:170,
                        value : 0,
                        labelAlign:'right'
                     },
                     {

                         xtype:'numberfield',
                         fieldLabel:'Precio Especial Lima 2',
                         name : 'precioprodlocalespecial2',
                         flex: 1,
                         allowDecimals: true,
                         decimalSeparator: '.',
                         decimalPrecision:2,
                         step:'0.1',
                         labelWidth:170,
                         value : 0,
                         labelAlign:'right'


                      },
                      {
                          xtype:'numberfield',
                          fieldLabel:'Precio Especial Lima 3',
                          name : 'precioprodlocalespecial3',
                          flex: 1,
                          allowDecimals: true,
                          decimalSeparator: '.',
                          decimalPrecision:2,
                          step:'0.1',
                          labelWidth:170,
                          value : 0,
                          labelAlign:'right'
                       },

                  ]
                },
                {
                  xtype: 'container',
                  layout: {
                    type: 'hbox',
                  },
                  padding :'5 5 5 5',
                  defaults:{
                    flex: 1
                  },
                  items:[
                    {

                        xtype:'numberfield',
                        fieldLabel:'Precio Provincia',
                        name : 'precioprodprovincia',
                        flex: 1,
                        allowDecimals: true,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1',
                        labelWidth:170,
                        value : 0
                     },
                     {

                         xtype:'numberfield',
                         fieldLabel:'Precio Especial Provincia 1',
                         name : 'precioprodprovinciaespecial',
                         flex: 1,
                         allowDecimals: true,
                         decimalSeparator: '.',
                         decimalPrecision:2,
                         step:'0.1',
                         labelWidth:170,
                         value : 0,
                         labelAlign:'right'
                     },
                     {

                         xtype:'numberfield',
                         fieldLabel:'Precio Especial Provincia 2',
                         name : 'precioprodprovinciaespecial2',
                         flex: 1,
                         allowDecimals: true,
                         decimalSeparator: '.',
                         decimalPrecision:2,
                         step:'0.1',
                         labelWidth:170,
                         value : 0,
                         labelAlign:'right'
                     },
                     {

                         xtype:'numberfield',
                         fieldLabel:'Precio Especial Provincia 3',
                         name : 'precioprodprovinciaespecial3',
                         flex: 1,
                         allowDecimals: true,
                         decimalSeparator: '.',
                         decimalPrecision:2,
                         step:'0.1',
                         labelWidth:170,
                         value : 0,
                         labelAlign:'right'
                     }

                  ]
                },

                {
                  xtype: 'container',
                  layout: {
                    type: 'hbox',
                  },
                  padding :'5 5 5 5',
                  items:[
                    {

                        xtype:'numberfield',
                        fieldLabel:'Precio Distribuidor Lima',
                        name : 'precioproddistribuidorlima',
                        flex: 1,
                        allowDecimals: true,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1',
                        labelWidth:170,
                        value : 0
                    },
                    {

                        xtype:'numberfield',
                        fieldLabel:'Precio Distribuidor Provincia',
                        name : 'precioproddistribuidorprovincia',
                        flex: 1,
                        allowDecimals: true,
                        decimalSeparator: '.',
                        decimalPrecision:2,
                        step:'0.1',
                        labelWidth:170,
                        value : 0,
                        labelAlign:'right'
                    }
                  ]
                }



              ]
            }
            ,
            {
                title:'..:: Proveedores ::..',
                layout:'fit',
                tbar:[
                  { xtype:'button', text: 'nuevo',handler:'onClickAddProveedorProducto'},
                  { xtype:'button', text: 'Nuevo Proveedor',handler:'onClickNuevoProveedor'},
                  { xtype:'button', text: 'Refrescar',handler:'onClickRefrescarProveedor'},
                ],
                items:[
                    {
                      xtype:'gridpanel',
                      store : _storeDetProvProd,
                      itemId : 'dgvDetProvProd',
                      selModel: 'rowmodel',
                      plugins: {
                           ptype: 'cellediting',
                           clicksToEdit: 1
                      },
                      columns: [
                          {
                            text: 'Nombre/Razón Social',
                            dataIndex: 'razonsocial',
                            flex: 3 ,
                            editor:{
                              xtype:'combo',
                              //typeAhead: true,
                              //triggerAction: 'all',
                              store:storeProveedores,
                              valueField :'razonsocial',
                              displayField:'razonsocial',
                              editable :false,
                              itemId : 'cboProveedorGrid'
                            }
                          },
                          {
                            xtype: 'numbercolumn', text: 'Precio Compra',
                            dataIndex: 'precio', flex: 1,
                            editor:{
                              xtype:'numberfield',
                              value : 0
                            }
                          },

                          {
                            xtype: 'widgetcolumn',
                            flex: 0.5,
                            widget: {
                              xtype: 'button',
                              flex: 1,
                              glyph: 0xf014,
                              handler: 'onClickEliminarProveedorProducto'

                            }

                          }
                      ],
                    }
                ]
            }

          ]

        }






      ];
      return obj;
    }



});
