Ext.define('dinoaccess.view.ventas.ListadoUsuarios', {
    extend: 'Ext.panel.Panel',
    xtype: 'wRegUsuarios',
    alias: 'widget.wRegUsuarios',
    requires: [
        'Ext.layout.container.HBox',
        'dinoaccess.view.ventas.AccionesRegCotizacion',
        'Ext.grid.*',
        'Ext.grid.column.*',
        'Ext.form.field.*',

    ],
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    defaults: {
        frame: true,
        bodyPadding: 5
    },
    controller:'acciones-regcotizacion',
    initComponent: function () {
        var storePefiles = Ext.create('dinoaccess.store.Perfiles');
        Ext.apply(this, {
            items: [{
                    title: 'Registros',
                    flex: 2,
                    margin: '0 3 0 0',
                    layout: 'fit',
                    items: [{
                        xtype: 'grid',
                        //store: storeClientes,
                        reference: 'dgvUsuarios',
                        sortableColumns: false,
                        columns: [{
                                text: 'Nombre Usuario',
                                dataIndex: 'nomcompleto',
                                flex: 1
                            },
                            {
                                text: 'Tipo',
                                dataIndex: 'numrucper',
                                flex: 0.5
                            },

                            {
                                xtype: 'widgetcolumn',
                                flex: 0.3,
                                widget: {
                                    xtype: 'button',
                                    glyph: 0xf014,
                                    handler: 'onClickEliminarCliente'

                                }

                            }
                        ],
                        tbar: [{
                            xtype: 'fieldset',
                            title: '<b>Buscar Por</b>',
                            layout: 'hbox',
                            flex: 1,
                            padding: '0 5 10 5',
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Nombre Usuario',
                                    labelWidth: 150,
                                    flex: 3,
                                    labelAlign: 'right',
                                    reference:'txtQueryBuscar',
                                    /*listeners:{
                                      focus:'onFocusTextoDeBusquedaCliente'
                                    }*/
                                },
                                {
                                    xtype: 'button',
                                    glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
                                    listeners:{click :'onClickBuscarClienteQuery'}
                                }
                            ]
                        }],
                        listeners :{
                            cellclick :'onSelectedCliente'
                        }

                    }]
                },
                {
                    title: 'Datos del Usuario',
                    flex: 2,
                    //margin: '0 10 0 0',
                    //autoScroll: true,
                    //layout:'vbox',
                    layout: {
                        type: 'vbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items:[

                          {
                            xtype:'panel',
                            flex:1,
                            title:'Informacion del Usuario',
                            /*layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },*/
                            layout:'fit',
                            flex: 1,
                            items: [
                            {
                                xtype: 'form',
                                reference: 'myFormClienteListado',
                                url : dinoaccess.util.Rutas.clienteGuardarViaListado,
                                layout: {
                                    type: 'vbox',
                                    pack: 'start',
                                    align: 'stretch'
                                },
                                items: [{
                                        xtype: 'hiddenfield',
                                        name: 'idusu',
                                        itemId:'idusu'

                                    },
                                    {
                                        xtype: 'label',
                                        text: 'Usuario'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'usuario',
                                        itemId: 'usuario',
                                        allowBlank: true
                                    },
                                    {
                                        xtype: 'label',
                                        text: 'Password'
                                    },
                                    {
                                        xtype: 'textfield',
                                        name: 'password',
                                        inputType :'password',
                                        allowBlank: true
                                    },
                                    {
                                      xtype:'radiogroup',
                                      fieldLabel: '<b>Perfiles</b>',
                                      columns: 3,
                                      items: [

                                          {
                                              boxLabel  : 'Administrador',
                                              inputValue:1,
                                              name      : 'tipousuario',

                                          }, {
                                              boxLabel  : 'Asesor Comercial',
                                              name      : 'tipousuario',
                                              inputValue : 2
                                          },
                                          {
                                             boxLabel  : 'Simple',
                                             name      : 'tipousuario',
                                             inputValue : 3
                                         }
                                      ]
                                    }
                                ],
                                bbar: [{
                                        xtype: 'button',
                                        text: 'Nuevo',
                                        iconCls: 'fa fa-file fa-2x',
                                        scale: 'medium',
                                        handler: 'onClickNuevoClienteLista'
                                    },
                                    {
                                        xtype: 'button',
                                        text: 'Grabar',
                                        iconCls: 'fa fa-thumbs-o-up fa-2x',
                                        scale: 'medium',
                                        handler: 'onClickGuardarClienteViaListado'
                                    }

                                ]

                            }]

                          },
                          {
                            xtype:'panel',
                            flex:1,
                            //title:'Accesos / Pefiles',
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items:[
                              {
                                xtype:'panel',
                                flex: 1,
                                autoScroll: true,
                                items : [{
                                       xtype :'treepanel',
                                       title:'Accesos',
                                       id : 'treeProgramas',
                                       store: Ext.create('Ext.data.TreeStore', {
                                           root: {
                                               //text : 'Clinica de los Ojos',
                                               iconCls : 'ux-start-button-icon',
                                               expanded: true,
                                               children: [
                                                   { text: "Andina Medica Sistema",id:'AMS','expanded':true , /*, iconCls:'app',*/
                                                       children:[
                                                           { text: "Coditizaciones", itemId:'regCotizacion', leaf: true,checked: false },
                                                           { text: "Clientes",itemId:'regClientes', leaf: true,"checked": false},
                                                           { text: "Pruductos",itemId:'regProductos', leaf: true,"checked": false},
                                                           { text: "Usuarios",itemId:'regProductos', leaf: true,"checked": false}
                                                      ]

                                                   }/*Sistema 1*/




                                               ]
                                           }
                                       }),
                                       rootVisible:false,
                                   }
                                 ]

                              },
                              {
                                xtype:'panel',
                                flex: 1,
                                layout:'fit',
                                title :'Pefiles',
                                layout: {
                                    type: 'vbox',
                                    pack: 'start',
                                    align: 'stretch'
                                },
                                bodyPadding:'5 5 5 5',
                                items:[
                                  {
                                    xtype:'combo',
                                    fieldLabel:'Selccionar Perfil',
                                    store:storePefiles,
                                    valueField:'id',
                                    displayField:'descripcion',
                                    editable:false


                                  },
                                  {
                                    xtype:'button',
                                    text : 'Actualizar Accesos al Perfil'
                                  }
                                ]

                              }

                            ]

                          }

                    ]


                }

            ]
        });
        this.callParent();
    }
});
