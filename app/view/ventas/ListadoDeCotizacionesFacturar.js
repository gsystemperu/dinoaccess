Ext.define('dinoaccess.view.ventas.ListadoDeCotizacionesFacturar', {
    extend: 'Ext.panel.Panel',
    xtype: 'wListadoCotizacionesFacturar',
    alias: 'widget.wListadoCotizacionesFacturar',
    requires: [
        'Ext.layout.container.HBox',
        'Ext.container.ButtonGroup',
        'Ext.grid.column.*',
        'Ext.form.field.*',
        'Ext.panel.Panel',
        'dinoaccess.view.ventas.AccionesRegCotizacionesFacturar',
        'dinoaccess.store.DataTemp',
        'Ext.util.TaskRunner'
    ],
    layout: {
        type: 'fit',
        pack: 'start',
        align: 'stretch'
    },
    bodyPadding: 0,
    defaults: {
        bodyPadding: 0,
        border: false
    },
    controller: 'acciones-regcotizacionfacturar',
    initComponent: function () {
        var storeCotiFacturar    = Ext.create('dinoaccess.store.CotizacionesFacturar');
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me = this;
        Ext.apply(this, {
            items: [
              me.getListadoCotizacionesAfacturar(storeCotiFacturar,rowEditing),
            ],
        });
        this.callParent();
        r = new Ext.util.TaskRunner();
            t = r.start({
            run: function(st){
                storeCotiFacturar.reload();
            },
            interval: 10000
        });
    },
    getListadoCotizacionesAfacturar:function(storeCotiFacturar,rowEditing){
      return obj = {
        xtype: 'panel',
        flex: 1,
        margin: '0 3 0 0',
        layout: 'fit',
        items: [{
            xtype: 'grid',
            itemId: 'dgvVentasFacturar',
            reference: 'dgvVentasFacturar',
            store: storeCotiFacturar,
            columnLines: true,
            sortableColumns: false,
            requires: [
                'Ext.grid.selection.SpreadsheetModel',
                'Ext.grid.plugin.Clipboard'
            ],
            /*viewConfig: {
                loadMask: false
            },*/
            emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
            columns: [
               {xtype: 'rownumberer'},
              {
                    text: 'F.Cotizacion',
                    dataIndex: 'fechacoti',
                    flex: 0.5,
                    align: 'center'
                },
                {
                        text: 'F.Facturado',
                        dataIndex: 'fechafact',
                        flex: 0.5,
                        align: 'center'
                },
                {
                        text: 'Doc. Interno',
                        dataIndex: 'docinterno',
                        flex: 0.5,
                        align: 'center'
                },
                {
                    text: 'Nombre / Razon Social',
                    dataIndex: 'nomcompleto',
                    flex: 1.5
                },
                {
                    text: 'Estado',
                    dataIndex: 'descripcion',
                    flex: 0.7,
                    align: 'center',
                    renderer : function(value,style){
                       if(value=='CT ANULADA' || value=='VD ANULADO'){
                          return '<span style="color:red;">'+value.toString()+'</span>'
                       }else if(value=='CT CONFIRMADA'){
                          return '<span style="color:#FF9800;">'+value.toString()+'</span>'
                       }else{
                         return '<span style="color:DarkSlateBlue;"><b>'+value.toString()+'</b></span>';
                       }
                    }
                },
                {
                    text: 'F.Pago',
                    dataIndex: 'formapago',
                    flex: 0.7,
                    align: 'center',

                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total',
                    dataIndex: 'valtotalcont',
                    flex: 0.7,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Acuenta',
                    dataIndex: 'pagoacuenta',
                    flex: 0.7,
                    align: 'right'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Saldo',
                    dataIndex: 'saldopagar',
                    flex: 0.7,
                    align: 'right'
                },
                {
                  text: 'Env.',
                  dataIndex: 'idguia',
                  flex: 0.5,
                  align: 'center',
                  renderer : function(value,style){
                     if(value>0){
                        return '<span style="color:red;">Enviado</span>';
                     }else{
                       return '';
                     }
                  }
                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf0d6,
                        tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
                        handler: 'onClickIngresarPagoAcuenta'

                    }

                },
                {
                    xtype: 'widgetcolumn',
                    width: 50,
                    widget: {
                        xtype: 'button',
                        width: 30,
                        glyph: 0xf014,
                        handler: 'onClickEliminarcotizacionFacturar'

                    }

                }
            ],
            listeners: {
                celldblclick: 'onClickVerCotizacionFactura'
            }
        }],
        tbar: [{
            xtype: 'container',
            bodyPadding: 0,
            layout: 'hbox',
            columnWidth: 10,
            items: [{
                    xtype: 'label',
                    text: 'Fecha Desde',
                    padding: '5px 0 0 0',
                    border: true,
                    width: 100,
                    height: 25,
                    style: {
                        background: '#775c80',
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '13px'
                    }
                }, {
                    xtype: 'datefield',
                    value: new Date(),
                    reference: 'dfDesdeCotizacionesFactura',
                    itemId: 'dfDesdeCotizacionesFactura',
                    width: 100
                },
                {
                    xtype: 'label',
                    text: 'Fecha Hasta',
                    padding: '5px 0 0 0',
                    border: true,
                    width: 100,
                    height: 25,
                    style: {
                        background: '#775c80',
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: '13px'
                    }
                }, {
                    xtype: 'datefield',
                    value: new Date(),
                    reference: 'dfHastaCotizacionesFactura',
                    itemId: 'dfHastaCotizacionesFactura',
                    width: 100
                },
                {
                    xtype: 'button',
                    glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
                    tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
                    handler: 'onClickBuscarCotizacionesPorFechas'
                },

            ]
        }]
      };//Fin Objeto
    },
   
});
