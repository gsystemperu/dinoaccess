Ext.define('dinoaccess.view.ventas.VisualizarCotizacionFacturar', {
    extend: 'Ext.panel.Panel',
    xtype :'wVisualizarCotizacionFacturar',
    alias: 'widget.wVisualizarCotizacionFacturar',
    requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'dinoaccess.util.Rutas',
          'Ext.grid.plugin.RowEditing'
    ],
    bodyPadding: 5,
    controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });

        var storeClientes       = Ext.create('dinoaccess.store.Clientes');
        var storeDetCotizacion  = Ext.create('dinoaccess.store.DetalleCotizacion');
        var storeFormaPago      = Ext.create('dinoaccess.store.FormaPago');
        var storeModoEntrega    = Ext.create('dinoaccess.store.ModoEntrega');
        var storeDocumentoVenta = Ext.create('dinoaccess.store.DocumentoVenta');

        me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmVisualizarCotizacionFacturar',
                    reference: 'frmVisualizarCotizacionFacturar',
                    url: dinoaccess.util.Rutas.facturacionGuardar,
                    items: [{
                            xtype: 'panel',
                            flex: 1,
                            frame: false,
                            border: false,
                            padding : 10,
                            items: [{
                                    xtype: 'hiddenfield',
                                    itemId: 'txtJsonDetalleFacturacion',
                                    name: 'vjsondetalle'
                                },
                                {
                                  xtype: 'hiddenfield',
                                  name: 'idfacturacion',
                                  value: 0
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'idcoti',
                                    itemId : 'idcoti',
                                    value: 0
                                },
                                {
                                  
                                            xtype: 'container',
                                            layout: 'hbox',
                                            defaults:{
                                                labelWidth: 180,
                                                labelAlign:'right'
                                            },
                                            items: [{
                                                    xtype: 'combobox',
                                                    itemId: 'cboDatosClienteFact',
                                                    name : 'idper',
                                                    fieldLabel: 'Nombre / Razon Social',
                                                    flex: 2,
                                                    fieldStyle: 'text-transform:uppercase',
                                                    allowBlank: false,
                                                    editable: true,
                                                    forceSelection : true,
                                                    store: storeClientes,
                                                    queryMode: 'local',
                                                    displayField: 'nombreper',
                                                    valueField :'idper',
                                                    readOnly:true,
                                                    fieldStyle :'font-size:25px;'
                                                }


                                            ]
                                 },
                                
                                 {
                                  
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults:
                                    {
                                       labelWidth: 180,
                                       labelAlign:'right'
                                    },
                                    padding : '5 0 5 0',
                                    items: [
                                        {

                                            xtype: 'datefield',
                                            fieldLabel: 'Fecha Venta',
                                            value: new Date(),
                                            labelAlign: 'right',
                                            flex: 0.8,
                                            itemId: 'dtFechaVenta',
                                            name: 'fechacoti',
                                            allowBlank:false

                                        },
                                        {
                                          xtype:'datefield',
                                          fieldLabel :'Válido Hasta',
                                          labelAlign :'right',
                                          editable:false,
                                          name : 'fechavalidohasta',
                                          value : new Date(),
                                          flex: 0.8,
                                          readOnly:true,
                                          name :'validohasta'
                                        },
                                        {

                                            xtype: 'textfield',
                                            fieldLabel: 'Referencia',
                                            labelAlign: 'right',
                                            flex: 1,
                                            itemId: 'txtReferencia',
                                            name   : 'vreferencia',
                                            hidden : true

                                        }


                                    ]
                         },

                                   
                                {
                                    xtype: 'container',
                                    layout: 'hbox', padding : '5 0 5 0',
                                    defaults:
                                    {
                                       labelWidth: 180,
                                       labelAlign:'right'
                                    },
                                    items: [{
                                            xtype: 'combo',
                                            fieldLabel: 'Forma Pago',
                                            store: storeFormaPago,
                                            displayField: 'descripcion',
                                            valueField: 'idfopag',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idfopag',
                                            editable:false,
                                            itemId:'idfopag',
                                            value : 1,
                                            flex:1

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Mod. Entrega',
                                            store: storeModoEntrega,
                                            displayField: 'descripcion',
                                            valueField: 'idmodo',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'idmodo',
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'vmodoentrega',
                                            value : 1,
                                            flex:1
                                        },
                                        {
                                            xtype: 'button',
                                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                        {
                                            xtype: 'combo',
                                            fieldLabel: 'Documento',
                                            store: storeDocumentoVenta,
                                            displayField: 'descripcion',
                                            valueField: 'id',
                                            queryMode: 'local',
                                            allowBlank: false,
                                            name: 'documentoventa',
                                            labelAlign:'right',
                                            editable:false,
                                            itemId:'documentoventa',
                                            value : 1,
                                            flex:1

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        },
                                       
                                    ]


                                },
                                {
                                  
                                    xtype: 'container',
                                    layout: 'hbox',
                                    padding : '5 0 5 0',
                                    defaults:
                                    {
                                       labelWidth: 180,
                                       labelAlign:'right'
                                    },
                                    items: [
                                        {
                                            xtype:'numberfield',
                                            fieldLabel :'A Cuenta',
                                            name : 'pagoacuenta',
                                            value : 0,
                                            
                                          },
                                          {
                                              xtype:'textfield',
                                              fieldLabel :'Serie/Número',
                                              labelAlign :'right',
                                              name : 'seriedoc',
                                              value : '001',
                                              flex : 0.5,
                                              allowBlank:false,
                                              fieldStyle: 'text-align: center;font-size:12px;font-weight:bold; background:#775c80;color:white',
                                            },
                                            {
                                              xtype:'textfield',
                                              labelAlign :'right',
                                              name : 'numerodoc',
                                              flex : 0.5,
                                              allowBlank:false,
                                              fieldStyle: 'text-align: center;font-size:12px;font-weight:bold; background:#775c80;color:white',
                                            },
          
                                    ]
                                },
                               

                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.1,
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'container',
                                            margin: '0 0 0 -5',
                                            layout: 'fit',
                                            frame: true,
                                            border: false,
                                            items: [


                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    items: [
                                                      {
                                                              xtype: 'label',
                                                              text: 'Buscar Producto',
                                                              width: 120,
                                                              height: 23,
                                                              hidden:true,
                                                              style: {
                                                                  paddingTop: '3px',
                                                                  background: '#775c80',
                                                                  color: 'white',
                                                                  textAlign: 'center',
                                                                  fontWeight: 'bold',
                                                                  fontSize: '13px'
                                                              }
                                                          },
                                                        {
                                                            xtype: 'button',
                                                            glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
                                                            handler: 'onClickBuscarProducto',
                                                            tooltip : 'Accion para buscar los productos ingresados',
                                                            hidden:true
                                                            //flex: 1
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                                            handler: 'onClickNuevoProductoPorCotizacion',
                                                            tooltip : 'Accion para agregar un nuevo producto',
                                                            hidden:true
                                                            //flex: 0.5
                                                        },
                                                        {
                                                          xtype:'container',
                                                          layout:'hbox',
                                                          padding:'5 0 5 0',
                                                          items:[
                                                            {
                                                              xtype: 'label',
                                                              text: 'Nro. Cotizacion :',
                                                              width: 190,
                                                              height: 23,
                                                              style: {
                                                                  paddingTop: '3px',
                                                                  background: '#775c80',
                                                                  color: 'white',
                                                                  textAlign: 'center',
                                                                  fontWeight: 'bold',
                                                                  fontSize: '13px'
                                                              }
                                                            },
                                                            {
                                                              xtype:'textfield',
                                                              flex : 1,
                                                              readOnly : true,
                                                              fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                              name : 'idcotitxt'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',
                                                                padding: '5',
                                                                hidden:true,
                                                                boxLabel: 'Precio incluye el I.G.V.',
                                                                labelStyle :'font-size:17px;',
                                                                name: 'incluyeigv',
                                                                reference: 'incluyeigv',
                                                                itemId: 'incluyeigvfacturacion',
                                                                readOnly:false,
                                                                value: 0,
                                                                fieldStyle : 'font-size:17px;'
                                                                
                                                            }
                                                          ]

                                                        }

                                                    ]
                                                }


                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            margin: '0 0 5 0',
                                            items: [{
                                                xtype: 'grid',
                                                flex: 1,
                                                reference: 'dgvDetalleVentaFacturarVisualizar',
                                                itemId: 'dgvDetalleVentaFacturarVisualizar',
                                                store: storeDetCotizacion,
                                                plugins: [rowEditing],
                                                selModel: 'cellmodel',
                                                plugins: {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                },
                                                columns: [{
                                                        text: 'Descripción',
                                                        dataIndex: 'descripcion',
                                                        flex: 3
                                                    },
                                                    {
                                                        text: 'Presentacion',
                                                        dataIndex: 'presentacion',
                                                        flex: 0.5,
                                                        align: 'center',
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Cantidad',
                                                        dataIndex: 'cantidad',
                                                        flex: 0.5,
                                                        align: 'center',
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Precio',
                                                        dataIndex: 'precio',
                                                        flex: 0.6,
                                                        align: 'center',
                                                    },
                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Total',
                                                        dataIndex: 'total',
                                                        flex: 0.5,
                                                        align: 'center'

                                                    },
                                                    {
                                                        xtype: 'datecolumn',
                                                        dataIndex: 'vencimiento',
                                                        flex: 0.5,
                                                        format: 'd/m/Y',
                                                        text: 'Vencimiento',
                                                    },
                                                    {
                                                        xtype: 'widgetcolumn',
                                                        flex: 0.2,
                                                        widget: {
                                                            xtype: 'button',
                                                            width: 24,
                                                            glyph: 0xf014,
                                                            listeners: {
                                                                click: 'onClickEliminarDetalle'
                                                            }
                                                        }

                                                    }


                                                ],
                                                cls: '',
                                                height: 300,
                                            }]

                                        }
                                    ]

                                }, // fin fieldset Detalle
                                {
                                    xtype: 'panel',
                                    flex: 1,
                                    layout:'hbox',
                                    items: [
                                        {
                                            xtype:'panel',
                                            flex: 3,
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            padding: '0 0 15 0',
                                            items: [{
                                                    xtype: 'textfield',
                                                    itemId: 'txtSubtotalventasFacturar',
                                                    name: 'valventacont',
                                                    value: "0.00",
                                                    fieldLabel: 'Sub Total',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:15px;',
                                                   
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Igv',
                                                    itemId: 'txtIgvventasFacturar',
                                                    name: 'valigvcont',
                                                    value: "0.00",
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelStyle : 'font-size:15px;',
                                                    labelAlign :'right'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Total General ',
                                                    itemId: 'txtTotalGeneralFacturar',
                                                    value: "0.00",
                                                    name: 'totalcoti',
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:15px;',
                                                }
                                            ]
                                        }

                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    buttons: [
                                      '->',
                                      {
                                            xytpe: 'button',
                                            text: 'Salir',
                                            scale: 'medium',
                                            handler: 'onClickSalirCotizacionFacturar'
                                        }
                                    ]


                                }
                            ]

                        }

                    ]
                }


            ]
        });

        me.callParent(arguments);
    }
});
