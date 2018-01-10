Ext.define('dinoaccess.view.ventas.RegistroCotizacionFacturar', {
    extend: 'Ext.panel.Panel',
    xtype :'wRegistroCotizacionFacturar',
    alias: 'widget.wRegistroCotizacionFacturar',
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
        var storeMonedas        = Ext.create('dinoaccess.store.Monedas');

        me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: "form",
                    itemId: 'frmRegCotizacionFacturar',
                    reference: 'frmRegCotizacionFacturar',
                    url: dinoaccess.util.Rutas.facturacionGuardar,
                    items: [{
                            xtype: 'panel',
                            flex: 1,
                            padding : '5 5 5 5',
                            frame: false,
                            border: false,
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
                                    defaultType: 'textfield',
                                    title: 'Datos Generales',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            columnWidth: 0.5,defaults:{ labelWidth: 150},
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

                                    ]

                                },
                                
                                {
                                    xtype: 'container',
                                    defaultType: 'textfield',
                                    layout: 'hbox',
                                    columnWidth: 0.5,defaults:{ labelWidth: 150},
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
                                            allowBlank:false,
                                            flex: 1
                                            
        
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
                                          name :'validohasta',
                                          flex: 1
                                        },
        

                                    ]

                                },

                                

                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 150,
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
                                            fieldLabel: 'Modo Entrega',
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
                                            flex:1,
                                            listeners:{
                                                select:'onSelectCambiarDocumento'
                                            }

                                        },
                                        {
                                            xtype: 'button',
                                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                            handler: 'onClickMantenimiento'
                                        }
                                      
                                    ]


                                },
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    defaults: {
                                        labelWidth: 150,
                                        padding : '5 0 5 0',
                                        labelAlign:'right'
                                    },
                                    items: [
                                          {
                                              xtype: 'combo',
                                              fieldLabel: 'Moneda',
                                              store: storeMonedas,
                                              displayField: 'descripcion',
                                              valueField: 'id',
                                              queryMode: 'local',
                                              allowBlank: false,
                                              name: 'idmoneda',
                                              editable:false,
                                              itemId:'idmoneda',
                                              value : 1,
                                              flex:1

                                          },
                                          {
                                            xtype:'numberfield',
                                            fieldLabel :'A Cuenta',
                                            name : 'pagoacuenta',
                                            value : 0,
                                            flex : 2,
                                            labelAlign:'right'
                                          }
                                    ]
                                },


                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.1,
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'container',
                                            padding : '5 0 5 0',
                                            layout: 'fit',
                                            frame: true,
                                            border: false,
                                            items: [


                                                {
                                                    xtype: 'container',
                                                    layout: 'hbox',
                                                    padding: '0 0 5 0',
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
                                                          items:[
                                                            {
                                                              xtype: 'label',
                                                              text: 'Nro. Cotizacion :',
                                                              width : 250,
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
                                                              flex : 2,
                                                              readOnly : true,
                                                              fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                                              name : 'idcotitxt'
                                                            },
                                                            {
                                                                xtype: 'checkboxfield',hidden:true,
                                                                boxLabel: 'Precio incluye el I.G.V.',
                                                                labelStyle :'font-size:17px;',
                                                                name: 'incluyeigv',
                                                                reference: 'incluyeigv',
                                                                itemId: 'incluyeigvfacturacion',
                                                                readOnly:false,
                                                                fieldStyle : 'font-size:17px;',
                                                                value: 0,
                                                                 listeners: {
                                                                      change: {
                                                                          fn: 'onSelectedIncluyeIGV'
                                                                      }
                                                                  }
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
                                                reference: 'dgvDetalleVentaFacturar',
                                                itemId: 'dgvDetalleVentaFacturar',
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
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            value: 0,
                                                            maxValue: 1000,
                                                            minValue: 0,
                                                            itemId: 'txtCantidadUnidad'

                                                        }
                                                    },
                                                    {

                                                        xtype:'numbercolumn',
                                                        text: 'Precio',
                                                        dataIndex: 'precio',
                                                        flex: 0.6,
                                                        align: 'center',
                                                        editor: {
                                                            xtype: 'numberfield',
                                                            format: '0.00',
                                                            decimalPrecision: 2,
                                                            decimalSeparator: '.'
                                                        }
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
                                                        editor: {
                                                            xtype: 'datefield',
                                                            format: 'd/m/Y',
                                                            value: new Date()
                                                        }
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
                                                listeners: {
                                                    edit: 'onEditorCalcularTotalRegistroCotizacionFacturar'
                                                }

                                            }]

                                        }
                                    ]

                                }, // fin fieldset Detalle
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [

                                        {
                                            xtype:'panel',
                                            flex: 2,
                                            frame:false,
                                            layout : 'fit',
                                            items:[
                                              {
                                                xtype:'textarea',
                                                name : 'comentario',
                                                fieldStyle : 'font-size:15px;',
                                                emptyText : 'Comentario de Cotización'
                                              }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            padding: '0 0 15 0',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    reference: 'Subtotalventasfacturacion',
                                                    itemId: 'Subtotalventasfacturacion',
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
                                                    reference: 'igvventasfacturacion',
                                                    itemId: 'igvventasfacturacion',
                                                    name: 'valigvcont',
                                                    value: "0.00",
                                                    minValue: 0,
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
                                                    value: "0.00",
                                                    reference: 'TotalGeneralfacturacion',
                                                    itemId: 'TotalGeneralfacturacion',
                                                    name: 'valtotalcont',
                                                    minValue: 0,
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
                                    buttons: [{
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            handler: 'onClickSalirCotizacionFacturar'
                                        }, '-',
                                        {
                                            xytpe: 'button',
                                            text: 'Guardar',
                                            scale: 'medium',
                                            handler: 'onClickGuardarCotizacionFacturar'
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
