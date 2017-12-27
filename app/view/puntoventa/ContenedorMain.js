Ext.define('dinoaccess.view.puntoventa.ContenedorMain', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorPuntoVenta',
  itemId : 'wContenedorPuntoVenta',
  reference : 'wContenedorPuntoVenta',
  requires: [
    'Ext.layout.container.Card',
    'dinoaccess.view.puntoventa.AccionesContenedorMain',
    'dinoaccess.view.puntoventa.Main',
    'dinoaccess.view.puntoventa.Pago'
  ],
  layout: {
    type: 'card',
    align: 'stretch',
    deferredRender: true,
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller :'acciones-contenedormain',
  initComponent: function () {
    me = this;
    Ext.apply(this, {
      items: [{
        id: 'pdv-0',
        xtype: 'wPdv'
      },
      {
        id : 'pdv-1',
        xtype:'wPuntoVentaPago'
      },
      {
        id : 'pdv-2',
        xtype:'wListadoPdv'
      }

    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    __storeClientes  = Ext.create('dinoaccess.store.Clientes');
    return obj = [
      /*{
          xtype:'label',
          text :'CLIENTE',
          padding: '5px 0 0 0',
          border: true,
          width: 70,
          height: 25,
          style: {
              background: '#775c80',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '11px'
          }
      },*/
      {
        xtype:'combo',
        flex: 2.9,
        fieldStyle : 'font-size:18px;font-weight:bold; text-transform:uppercase;',
        store  :__storeClientes,
        valueField : 'idper',
        displayField : 'nombreper',
        queryMode : 'local',
        itemId :'cboCliente',
        editable:true,
        allowBlank:false,
        emptyText: 'SELECCIONAR AL CLIENTE',
        listeners:{
          'select' : 'onSelectCliente'
        }
        
      },
      {
        xtype:'button',
        itemId : 'btnNuevoClientePdv',
        glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
        combo : 'cboCliente',
        flex: 0.2,
        handler:'onClickNuevoClientePDV'


      },
      '->',
      {
        text : 'APERTURAR',
        itemId:'btnAperturar',
        scale : 'medium',
        handler:'onClickApeturarCaja'
      },
      {
        text : 'REGRESAR',
        itemId:'btnRegresar',
        scale : 'medium',
        handler:'onClickRegresarPago'
      },
       {
         text : 'PAGO',
         itemId:'btnVentasPdv',
         scale : 'medium',
         handler:'onClickIngresarPago'
       },
       {
         text : 'LISTADO VENTAS',
         itemId:'btnListadoVentasPdv',
         scale : 'medium',
         handler:'onClickListadoVentaPdv'
       },


    ];
  },


});
