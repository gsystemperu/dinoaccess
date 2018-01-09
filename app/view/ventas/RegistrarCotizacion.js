Ext.define('dinoaccess.view.ventas.RegistrarCotizacion', {
      extend: 'Ext.panel.Panel',
      xtype: 'wRegistrarCotizacion',
      alias: 'widget.wRegistrarCotizacion',
      requires: [
        'Ext.grid.plugin.*',
        'Ext.form.field.*',
        'dinoaccess.util.Rutas',
        'Ext.grid.plugin.RowEditing'
      ],
      itemId: 'wRegistrarCotizacion',
      controller: 'acciones-regcotizacion',
      initComponent: function () {
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
          clicksToMoveEditor: 1,
          autoCancel: false
        });

        var storeClientes = Ext.create('dinoaccess.store.Clientes');
        var storeProductos = Ext.create('dinoaccess.store.Productos');
        var storeDetCotizacion = Ext.create('dinoaccess.store.DetalleCotizacion');
        var storeFormaPago = Ext.create('dinoaccess.store.FormaPago');
        var storeModoEntrega = Ext.create('dinoaccess.store.ModoEntrega');
        var storeVendedores = Ext.create('dinoaccess.store.Vendedores');
        var storeMonedas = Ext.create('dinoaccess.store.Monedas');
        var storeDocumentoVenta = Ext.create('dinoaccess.store.DocumentoVenta');

        me = this;
        Ext.applyIf(me, {
            items: [{
                xtype: "form",
                itemId: 'frmRegCotizacion',
                reference: 'frmRegCotizacion',
                url: dinoaccess.util.Rutas.cotizacionGuardar,
                bodyPadding:20,
                items: [{
                    xtype: 'panel',
                    flex: 1,
                    frame: false,
                    border: false,
                    items: [{
                        xtype: 'hiddenfield',
                        itemId: 'txtJsonDetalle',
                        name: 'vjsondetalle'
                      },
                      {
                        xtype: 'hiddenfield',
                        name: 'vid',
                        itemId: 'vid',
                        value: 0
                      },
                      {
                        xtype: 'container',
                        defaultType: 'textfield',
                        layout: 'fit',
                        //title: 'Cliente',
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            margin: '5 5 5 5',
                            columnWidth: 0.5,
                            items: [{
                                xtype: 'combobox',
                                itemId: 'cboDatosCliente',
                                name: 'idper',
                                fieldLabel: 'Nombre / Razon Social',
                                flex: 2,
                                fieldStyle: 'text-transform:uppercase',
                                labelWidth: 145,
                                allowBlank: false,
                                editable: true,
                                forceSelection: true,
                                store: storeClientes,
                                queryMode: 'local',
                                displayField: 'nombreper',
                                valueField: 'idper'
                              },
                              {
                                xtype: 'button',
                                glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                                handler: 'onClickNuevoCliente'
                              },
                              {

                                xtype: 'datefield',
                                fieldLabel: 'Fecha Venta',
                                value: new Date(),
                                labelAlign: 'right',
                                flex: 1,
                                itemId: 'dtFechaVenta',
                                name: 'vfecha',
                                labelWidth: 140

                              },
                              {

                                xtype: 'textfield',
                                fieldLabel: 'Referencia',
                                labelAlign: 'right',
                                flex: 1,
                                itemId: 'txtReferencia',
                                name: 'vreferencia',
                                hidden: true

                              }


                            ]
                          },

                        ]

                      },
                      {
                        xtype: 'container',
                        layout: {
                          type: 'hbox',
                          anchor: 'strech'
                        },
                      //  title: 'Pago',
                        defaults: {
                          labelWidth: 150,
                        },
                        padding: '0 5 5 0',
                        items: [{
                            xtype: 'combo',
                            fieldLabel: 'Forma Pago',
                            store: storeFormaPago,
                            displayField: 'descripcion',
                            valueField: 'idfopag',
                            queryMode: 'local',
                            allowBlank: false,
                            name: 'vformapago',
                            editable: false,
                            itemId: 'idfopag',
                            value: 1,
                            flex: 1,
                            labelAlign:'right'

                          },
                          {
                            xtype: 'button',
                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                            handler: 'onClickMantenimiento'
                          },
                          {
                            xtype: 'combo',
                            fieldLabel: 'Modo de Entrega',
                            store: storeModoEntrega,
                            displayField: 'descripcion',
                            valueField: 'idmodo',
                            queryMode: 'local',
                            allowBlank: false,
                            name: 'vmodoentrega',
                            labelAlign: 'right',
                            editable: false,
                            itemId: 'vmodoentrega',
                            value: 1,
                            flex: 1
                          },
                          {
                            xtype: 'button',
                            glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
                            handler: 'onClickMantenimiento'
                          },
                          {
                            xtype: 'datefield',
                            fieldLabel: 'Válido Hasta',
                            labelAlign: 'right',
                            editable: false,
                            name: 'fechavalidohasta',
                            value: new Date(),
                            flex: 1
                          },
                          {
                            xtype: 'combo',
                            fieldLabel: 'Asignar a Vendedor',
                            store: storeVendedores,
                            displayField: 'completo',
                            valueField: 'idvend',
                            queryMode: 'local',
                            allowBlank: true,
                            name: 'vvendedor',
                            labelAlign: 'right',
                            editable: false,
                            itemId: 'vvendedor',
                            hidden: true

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
                        layout: {
                          type: 'hbox',
                          anchor: 'strech'
                        },
                        defaults: {
                          labelWidth: 150,
                        },
                        padding: '0 5 5 0',
                        items: [
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
                                value : 2,
                                flex:1,
                                listeners :{
                                  change:'onChangeCambiarDocumento'
                                }
                            },
                         {
                            xtype: 'combo',
                            fieldLabel: 'Moneda',
                            store: storeMonedas,
                            displayField: 'descripcion',
                            valueField: 'id',
                            queryMode: 'local',
                            allowBlank: true,
                            name: 'idmoneda',
                            labelAlign: 'right',
                            editable: false,
                            flex: 1,
                            value: 1
                          },
                          {
                            xtype: 'combo',
                            fieldLabel: 'Asignar a Vendedor',
                            store: storeVendedores,
                            displayField: 'completo',
                            valueField: 'idvend',
                            queryMode: 'local',
                            allowBlank: true,
                            name: 'vvendedor',
                            labelAlign: 'right',
                            editable: false,
                            itemId: 'vvendedor',
                            hidden: true

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
                                padding: '0 0 5 0',
                                items: [{
                                    xtype: 'label',
                                    text: 'Buscar Producto',
                                    width: 120,
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
                                    glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
                                    handler: 'onClickBuscarProducto',
                                    tooltip: 'Accion para buscar los productos ingresados'
                                  },

                                  {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [{
                                        xtype: 'label',
                                        text: 'Nro. Cotizacion :',
                                        width: 120,
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
                                        xtype: 'textfield',
                                        flex: 1,
                                        disabled: true,
                                        fieldStyle: 'text-align: center;font-size:15px;font-weight:bold; ',
                                        value: 'CT000000000000',
                                        name: 'ctcodigo'
                                      },
                                      {
                                        xtype: 'checkboxfield',
                                        boxLabel: 'Precio incluye el I.G.V.',
                                        name: 'incluyeigv',
                                        reference: 'incluyeigv',
                                        itemId: 'incluyeigv',
                                        readOnly: false,
                                        value: 0,
                                        hidden:true,
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
                              reference: 'dgvDetalleVenta',
                              itemId: 'dgvDetalleVenta',
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
                                  xtype: 'numbercolumn',
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
                                  xtype: 'numbercolumn',
                                  text: 'Precio',
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
                                  xtype: 'numbercolumn',
                                  text: 'Total',
                                  dataIndex: 'total',
                                  flex: 0.5,
                                  align: 'right'

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
                              height: 250,
                              listeners: {
                                edit: 'onEditorCalcularTotal'
                              }

                            }]

                          }
                        ]

                      }, // fin fieldset Detalle
                      {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textarea',
                            flex: 1.5,
                            height: 100,
                            name: 'comentario',
                            fieldStyle: 'font-size:12px;text-transform:uppercase;',
                            },
                            {
                              xtype: 'panel',
                              flex: 1,
                              padding: '0 0 0 0',
                              items: [{
                                  xtype: 'textfield',
                                  reference: 'Subtotalventas',
                                  itemId: 'Subtotalventas',
                                  name: 'valventacont',
                                  fieldLabel: 'Sub Total',
                                  readOnly: true,
                                  width: 280,
                                  labelWidth: 120,
                                  fieldStyle: 'text-align: right;font-size:16px;',
                                  labelAlign: 'right',
                                  labelStyle: 'font-size:16px',
                                  hidden:true
                                },
                                {
                                  xtype: 'textfield',
                                  fieldLabel: 'Igv',
                                  reference: 'igvventas',
                                  itemId: 'igvventas',
                                  name: 'valigvcont',
                                  minValue: 0,
                                  readOnly: true,
                                  width: 280,
                                  labelWidth: 120,
                                  fieldStyle: 'text-align: right;font-size:16px;',
                                  labelAlign: 'right',
                                  labelStyle: 'font-size:16px',
                                  hidden:true
                                },
                                {
                                  xtype: 'textfield',
                                  fieldLabel: 'Total General ',
                                  labelAlign: 'right',
                                  reference: 'TotalGeneral',
                                  itemId: 'TotalGeneral',
                                  name: 'valtotalcont',

                                  minValue: 0,
                                  readOnly: true,
                                  width: 280,
                                  labelWidth: 120,
                                  fieldStyle: 'text-align: right;font-size:16px;',
                                  labelStyle: 'font-size:16px'
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
                              handler: 'onClickSalirCotizacion'
                            }, '-',
                            {
                              xytpe: 'button',
                              text: 'Guardar',
                              scale: 'medium',
                              handler: 'onClickGuardarCotizacion'
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
