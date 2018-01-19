Ext.define('dinoaccess.view.almacen.IngresarGuiaInterna',{
    extend: 'Ext.panel.Panel',
    xtype :'wIngresarGuiaInterna',
    requires: [
        'Ext.grid.plugin.*',
        'dinoaccess.view.almacen.IngresarGuiaInternaController',
        'dinoaccess.util.Rutas'
    ],
    padding: 10,
    controller: 'almacen-ingresarguiainterna',
    initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        var storeProveedores = Ext.create('dinoaccess.store.Proveedores');
        var storeDetalle     = Ext.create('dinoaccess.store.DetalleOrdenCompra');
        var storeMonedas     = Ext.create('dinoaccess.store.Monedas');
        storeAlma = Ext.create('dinoaccess.store.Almacenes');
        me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: "form",
                    itemId: 'frmOrdenCompra',
                    reference: 'frmOrdenCompra',
                    url: dinoaccess.util.Rutas.ordenCompraGuardar,
                    items: [{
                            xtype: 'panel',
                            flex: 1,
                            frame: false,
                            border: false,
                            items: [{
                                    xtype: 'hiddenfield',
                                    itemId: 'txtJsonDetalleOC',
                                    name: 'vjsondetalle'
                                },
                                {
                                    xtype: 'hiddenfield',
                                    name: 'vid',
                                    itemId: 'vid',
                                    value: 0
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: 'Almacen de Origen',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5 6',
                                            columnWidth: 0.5,
                                            defaults: {
                                                allowBlank: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    itemId: 'cboAlmacenOc',
                                                    padding :'0 10 0 0',
                                                    store: storeAlma,
                                                    valueField: 'id',
                                                    displayField: 'descripcion',
                                                    queryMode: 'local',
                                                    editable: false,
                                                    width : 200,
                                                    name: 'idalmacenorigen',
                                                    allowBlank:false,
                                                    flex: 2
                                               },
                                                {
                                                    xtype: 'button',
                                                    glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                                    handler: 'onClickFormularioProveedor',
                                                    control: 'cboProveedoresf'
                                                },
                                                {
                                                    xtype: 'button',
                                                    glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),
                                                    handler: 'onClickRefrescarProveedor',
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Fecha Envio',
                                                    value: new Date(),
                                                    labelAlign: 'right',
                                                    flex: 1,
                                                    name: 'vfecha',
                                                    format: 'd/m/Y',
                                                    readOnly:true

                                                }
                                               

                                            ]
                                        },

                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    title: 'Almacen de Destino',
                                    layout: 'fit',
                                    items: [{
                                            xtype: 'container',
                                            layout: 'hbox',
                                            margin: '0 0 5 6',
                                            columnWidth: 0.5,
                                            defaults: {
                                                allowBlank: false
                                            },
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    padding :'0 10 0 0',
                                                    store: storeAlma,
                                                    valueField: 'id',
                                                    displayField: 'descripcion',
                                                    queryMode: 'local',
                                                    editable: false,
                                                    name: 'idalmacendestino',
                                                    allowBlank:false,
                                                    flex : 2
                                               },
                                                {
                                                    xtype: 'button',
                                                    glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                                    handler: 'onClickFormularioProveedor',
                                                    control: 'cboProveedoresf'
                                                },
                                                {
                                                    xtype: 'button',
                                                    glyph: dinoaccess.util.Glyphs.getGlyph('refrescar'),
                                                    handler: 'onClickRefrescarProveedor',
                                                }
                                            ]
                                        },

                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    columnWidth: 0.1,
                                    title: 'Detalle del Envio',
                                    defaultType: 'textfield',
                                    items: [{
                                            xtype: 'container',
                                            margin: '0 0 0 -5',
                                            layout: 'fit',
                                            frame: true,
                                            border: false,
                                            items: [{
                                                    xtype: 'container',
                                                    layout: 'vbox',
                                                    columnWidth: 0.5,
                                                    margin: '0 0 10 6',
                                                    items: [


                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                align:'streach'
                                                            },
                                                            padding: '0 0 0 0',
                                                            items: [{
                                                                    xtype: 'label',
                                                                    text: 'Producto',
                                                                    width: 80,
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
                                                                    xtype: 'button',
                                                                    // text: 'Buscar Producto',
                                                                    glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
                                                                    handler: 'onClickBuscarProducto'

                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'fit',
                                            margin: '0 0 5 0',
                                            items: [{
                                                xtype: 'grid',
                                                flex: 1,
                                                itemId: 'dgvDetalleGuiaInterna',
                                                reference: 'dgvDetalleGuiaInterna',
                                                store: storeDetalle,
                                                plugins: [rowEditing],
                                                selModel: 'cellmodel',
                                                plugins: {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1
                                                },
                                                columns: [
                                                   {
                                                        text: 'Producto',
                                                        dataIndex: 'producto',
                                                        flex: 1.8
                                                    },

                                                    {
                                                        xtype:'numbercolumn',
                                                        text: 'Cant.',
                                                        dataIndex: 'cantidad',
                                                        flex: 0.3,
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
                                                        text: 'Precio Compra',
                                                        dataIndex: 'precio',
                                                        flex: 0.6,
                                                        align: 'right',
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
                                                        flex: 0.6,
                                                        align: 'right'

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
                                                    edit: 'onEditorCalcularTotalOrdenCompra'
                                                }

                                            }]

                                        }
                                    ]

                                }, // fin fieldset Detalle
                                {
                                    xtype: 'panel',
                                    layout: 'hbox',
                                    items: [{
                                            xtype: 'panel',
                                            flex: 1.8
                                        },
                                        {
                                            xtype: 'panel',
                                            flex: 1,
                                            padding: '0 0 15 0',
                                            items: [{
                                                    xtype: 'textfield',
                                                    itemId: 'txtSubtotalOrdenCompra',
                                                    name: 'subtotal',
                                                    fieldLabel: '<b>Sub Total</b>',
                                                    value: "0.00",
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:16px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '<b>I.g.v.  </b>',
                                                    itemId: 'txtIgvOrdenCompra',
                                                    name: 'igv',
                                                    value: "0.00",
                                                    minValue: 0,
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:16px;'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: '<b>Total General </b>',
                                                    itemId: 'txtTotalGeneralOrdenCompra',
                                                    value: "0.00",
                                                    name: 'totalgeneral',
                                                    minValue: 0,
                                                    readOnly: true,
                                                    width: 280,
                                                    labelWidth: 120,
                                                    fieldStyle: 'text-align: right;font-size:16px;',
                                                    labelAlign :'right',
                                                    labelStyle : 'font-size:16px;'
                                                }
                                            ]
                                        }

                                    ]

                                },
                                {
                                    xtype: 'panel',
                                    buttons: [

                                        {
                                            xytpe: 'button',
                                            text: 'Cancelar',
                                            scale: 'medium',
                                            handler: 'onClickSalirOrdenCompra'
                                        }, '-',

                                        {
                                            xytpe: 'button',
                                            text: 'Guardar',
                                            scale: 'medium',
                                            itemId: 'btnGuardarVenta',
                                            handler: 'onClickGuardarOrdenCompra'
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
