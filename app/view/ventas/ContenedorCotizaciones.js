Ext.define('dinoaccess.view.ventas.ContenedorCotizaciones', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCotizaciones',
  itemId : 'wContenedorCotizaciones',
  requires: [
    'Ext.layout.container.Card',
    'dinoaccess.util.Rutas',
    'dinoaccess.view.ventas.AccionesContenedorCotizaciones',
    'dinoaccess.view.ventas.RegistrarCotizacion'
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
  controller :'acciones-contenedorcotizaciones',
  initComponent: function () {
    me = this;
    Ext.apply(this,
    {
      items: [
      {
        id: 'coti-0',
        xtype: 'wListadoCotizaciones'
      },
      {
        id: 'coti-1',
        xtype:'wRegistrarCotizacion',


      }
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    return obj = [
          {
              text: 'COTIZACIONES',
              itemId: 'btnVerCotizaciones',
              handler: "onClickVerCotizaciones",
          },
          {
              text: 'CREAR',
              itemId: 'btnIngresarCotizacion',
              handler: "onClickIngresarCotizacion",
          },
          {
                  text: 'IMPRIMIR',
                  itemId : 'btnImprimirCotizacion',
                  handler: "onClickImprimirPDFCotizacion",
          },
          {
                  text: 'CONFIRMAR VENTA',
                  itemId : 'btnConfirmarCotizacion',
                  handler: "onClickConfirmarCotizacion",
          }
    ];
  }
});
