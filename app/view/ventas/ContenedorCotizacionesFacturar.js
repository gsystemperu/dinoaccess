Ext.define('dinoaccess.view.ventas.ContenedorCotizacionesFacturar', {
  extend: 'Ext.panel.Panel',
  xtype: 'wContenedorCotizacionesFacturar',
  itemId : 'wContenedorCotizacionesFacturar',
  requires: [
    'Ext.layout.container.Card',
    'dinoaccess.util.Rutas',
    'dinoaccess.view.ventas.AccionesContenedorCotizacionesFacturar'
  ],
  layout: {
    type: 'card',
    align: 'stretch',
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller :'acciones-contenedorcotizacionesfacturar',
  initComponent: function () {
    me = this;
    Ext.apply(this,
    {
      items: [
      {
        id: 'cotifac-0',
        xtype: 'wListadoCotizacionesFacturar'
      },
      {
        id: 'cotifac-1',
        xtype:'wRegistroCotizacionFacturar',
      },
      {
        id: 'cotifac-2',
        xtype:'wGuiaRemision',
      },
      {
        id: 'cotifac-3',
        xtype:'wVisualizarCotizacionFacturar',
      },
    ],
    tbar: me.getBotonesERP()

    });
    this.callParent();
  },
  getBotonesERP:function(){
    return obj = [
          {
              text: 'CREAR',
              handler: "onClickCrearCotizacionFactura",
          },
          /*{
            text :'VER DOCUMENTO',
            handler :'onClickVerCotizacionFactura'
          },*/
          {
            text :'IMPRIMIR DOCUMENTO',
            handler : 'onClickDocumentoImprimir'
          },
         /* {
            text :'GUIA DE REMISIÓN',
            handler:'onClickGuiasRemision'
          },
          {
            text :'IMPRIMIR GUIA DE REMISIÓN',
            handler:'onClickGuiasRemisionImpresion'
          },
          '->',*/
          {
            text :'IMPRIMIR LISTADO',
            handler:'onClickReporteVentas'
          }
    ];
  }
});
