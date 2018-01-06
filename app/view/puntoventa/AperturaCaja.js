Ext.define('dinoaccess.view.puntoventa.AperturaCaja', {
    extend: 'Ext.window.Window',
    alias : 'widget.wApeturaCaja',
    xtype : 'wAperturaCaja',
    itemId : 'wAperturaCaja',
    requires   : [
        'Ext.form.field.*',
        'dinoaccess.util.*',
        'Ext.grid.*',
        'dinoaccess.view.puntoventa.AccionesAperturaCaja'

    ],
    config : {
        nombre : '',
        monto  : 0,
        codigo : 0
    },
    margin: 30,
    autoScroll: true,
    controller:'acciones-aperturacaja',
    submitEmptyText : false,
    layout: {
      type: 'fit',
      pack: 'start',
      align: 'stretch'
    },
    width : 500,
    height : 500,
    autoShow:true,
    modal : true,
    initComponent: function()
    {
        me = this;
        __store = Ext.create('dinoaccess.store.NombreMoneda');
        //me.title = me.getNombre();
        Ext.apply(me,
        {
          items :me.getGrillaPagos(__store,me.getCodigo()),
          bbar: [
              {
                xtype:'label',
                text : 'Ingresado :'
              },
              {
                xtype:'label',
                itemId :'lblTotalIngresado',
                style: {
                    fontWeight: 'bold'
                }
              },
              '->',
              {
                  xtype: 'button',
                  text: 'Grabar',
                  scale: 'medium',
                  handler: 'onClickGuardarAperturaCaja'
              }
          ]
        });
        me.tbar = me.getTopBar(me.getMonto());
        me.callParent(arguments);
        /*Ext.Ajax.request({
              url : dinoaccess.util.Rutas.facturacionBuscarPagosAcuenta,
              params:{
                idfacturacion : me.getCodigo()
              },
              success:function(response){
                 __data = Ext.JSON.decode(response.responseText);
                 if(__data.data){
                   me.getCargarDataGrilla(__data.data);
                 }
              }
        });*/

    },
    getTopBar :function(__total){
      return __obj = [
        {
          xtype:'button',
          text : 'VER HISTORIAL',
          //handler:'onClickIngresarNuevoPago'
        }
        ,'->',
        {
          xtype:'textarea',
          text:'Comentario :',
          itemId : 'txtAperturaCajaComentario',
          style: {
              fontWeight: 'bold'
          }
        }
        /*,{
          xtype:'label',
          text : __total.toString(),
          style: {
              fontWeight: 'bold'
          }
        }*/
      ];
    },
    getCargarDataGrilla:function(__store){
       __grilla    =  Ext.ComponentQuery.query('#dgvPagoAcuenta')[0].getStore();
       __suma      = 0;
       Ext.each(__store,function(row,i){
          __dato = {
              "fecha" : row.fecha,  //Ext.Date.format(row.fecha, 'Y-m-d') ,
              "monto" : row.monto
          };
          __grilla.insert(0,__dato);
          __suma   = __suma + row.monto;
       });
       Ext.ComponentQuery.query('#lblTotalIngresado')[0].setText(__suma.toString());
    },
    getGrillaPagos:function(__store,__idfactura){
        return __obj = [
          /* {
             xtype  :'hiddenfield',
             itemId :'idfactura',
             value  : __idfactura
           },*/
           {
             xtype:'grid',
             itemId :'dgvAperturaCaja',
             store : __store,
             selModel: 'cellmodel',
             plugins: {
                 ptype: 'cellediting',
                 clicksToEdit: 1
             },
             columns:[
               {

                 text : 'Moneda',
                 dataIndex : 'descripcion',
                 align:'center',
                 flex: 2
               },
               { xtype:'numbercolumn',flex:1, align :'right', text:'Cantidad',dataIndex:'monto',
                   editor:{
                    xtype:'numberfield',
                    value : 0,
                    format: '0.00',
                    decimalPrecision: 2,
                    decimalSeparator: '.'
                    }
              },
              {
                  xtype: 'widgetcolumn',
                  flex: 0.5,
                  widget: {
                      xtype: 'button',
                      width: 24,
                      glyph: 0xf014,
                      //listeners: {
                      //    click: 'onClickEliminarPago'
                      //}
                  }

              }
            ],
            listeners: {
                edit: 'onEditorCalcularTotal'
            }

           }
        ]
    }

});
