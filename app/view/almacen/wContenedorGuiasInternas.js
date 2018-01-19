Ext.define('dinoaccess.view.almacen.wContenedorGuiasInternas',{
    extend: 'Ext.panel.Panel',
    alias : 'widgte.wContenedorGuiasInternas',
    xtype: 'wContenedorGuiasInternas',
    itemId: 'wContenedorGuiasInternas',
    requires: [
        'dinoaccess.view.almacen.wContenedorGuiasInternasController',
    ],
    controller: 'almacen-wcontenedorguiasinternas',
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
      controller: 'almacen-wcontenedorguiasinternas',
      initComponent: function () {
        me = this;
        Ext.apply(this, {
          items: [
          {xtype:'wGuiasInternas'}, 
          {xtype:'wIngresarGuiaInterna'},
          //{xtype:'weditarordencompra'}
        ],
        tbar: me.getToolBar()
        });
        this.callParent();
      },
      getToolBar:function(){
        return obj = [{
            xtype: 'button',
            text: 'CREAR',
            handler: 'onClickIngresarGuiaInterna'
          }
        ];
      }
    
});
