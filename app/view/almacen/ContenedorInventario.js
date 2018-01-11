
Ext.define('dinoaccess.view.almacen.ContenedorInventario', {
        extend: 'Ext.panel.Panel',
        xtype: 'wContenedorInventario',
        itemId : 'wContenedorInventario',
        requires: [
          'Ext.layout.container.Card',
          'dinoaccess.util.Rutas',
          'dinoaccess.view.almacen.ContenedorInventarioController'
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
        controller :'almacen-contenedorinventario',
        initComponent: function () {
          me = this;
          Ext.apply(this,
          {
            items: [
            {
              xtype: 'wListadoInventario'
            },
            {
              xtype:'wRegInventarioInicial',
            }
          ],
          tbar: me.getBotonesERP()
      
          });
          this.callParent();
        },
        getBotonesERP:function(){
          return obj = [
                {
                    text: 'CREAR',
                    handler: "onClickCrearInventario",
                },
                {
                    text: 'IMPRIMIR STOCK',
                    handler: "onClickImprimirStockInventario",
                }           
                
          ];
        }
      });
      