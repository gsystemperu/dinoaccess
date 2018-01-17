Ext.define('dinoaccess.view.main.Main', {
  extend: 'Ext.container.Viewport',
  layout: 'border',
  alias: 'wMain',
  requires: [
    'dinoaccess.view.main.MainController',
    'dinoaccess.view.menu.Tree'
  ],
  controller: 'main',
  items: [
    {
      region:'south',
      items:[
        {
          html: '<div style="text-aling:center;"><label style="font-size:15px;color:#5c617c"> Analista : Eddy Erazo  Celular : 925 183 347   </label></div>'
        }
      ]
    },
    {
      region: 'west',
      collapsible: true,
      titleCollapse :false,
      collapsed:true,
      title: '::. Dino Access Tecnology .::',
      titleAlign : 'center',
      width: 240,
      layout: {
        type: 'accordion',
        titleCollapse: true,
        animate: true,
        activeOnTop: false,
        fill: false
      },
      listeners:{
        beforecollapse:'onBeforecollapse'
      },
      items: [{
        title: 'Configuraciones',
        itemId: 'panMantenimiento',
        iconCls: 'fa fa-users',
        bodyPadding: 0,
        items: [{
          xtype: 'menutree',
          reference: 'treeMantenimiento', //'treeGestionClientes',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]


      }, {
        title: 'Control Inventario/Almacen',
        itemId: 'panControlAlmacen', //'panGestionCliente',
        iconCls: 'fa fa-university',
        bodyPadding: 0,
        items: [{
          xtype: 'menutree',
          reference: 'treeControlAlmacen', //'treeGestionClientes',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]
      }, 
      {
        title: 'Control Compras',
        itemId: 'panControlCompras', //'panGestionCliente',
        iconCls: 'fa fa-american-sign-language-interpreting',
        bodyPadding: 0,
        items: [
          {
          xtype: 'menutree',
          reference: 'treeControlCompras', //'treeGestionClientes',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
          }
        ]
      }, 
      {
        title: 'Control de Ventas',
        itemId: 'panControlVentas',
        iconCls: 'fa fa-address-card',
        //listeners: [{ expand: 'onExpandPanel' }],
        items: [{
          xtype: 'menutree',
          reference: 'treeControlVentas',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]

      },
      {
        title: 'Manufactura (MRP)',
        itemId: 'panControlMRP',
        iconCls: 'fa fa-university',
        hidden:true,
        //listeners: [{ expand: 'onExpandPanel' }],
        items: [{
          xtype: 'menutree',
          reference: 'treeControlManufactura',
          layout: 'fit',
          rootVisible: true,
          listeners: {
            itemClick: 'onClickOpcionMenu'
          }
        }]

      }, {
        title: 'Importacion de Datos',
        itemId: 'panImportacionDatos',
        iconCls: 'fa fa-server',
        //listeners: [{ expand: 'onExpandPanel' }],
        html: 'Panel content!',
        hidden:true,
      }, {
        title: 'Control de Usuarios',
        itemId: 'panControlUsuarios',
        iconCls: 'fa fa-file',
        hidden:true,
        //listeners: [{ expand: 'onExpandPanel' }],
        items: [{
          xtype: 'menutree',
          reference: 'treeControlUsuarios',
          layout: 'fit',
          rootVisible: false,
          useArrows: true,
        }]
      }]

    }, {
      region: 'center',
      padding: 5,
      xtype: 'tabpanel',
      itemId: 'tabPrincipal',
      activeTab: 0,
      plain: true,
      defaults: {
        bodyPadding: 5,
      },
      scrollable: true,
      items: [
        {
          title: 'Nosotros',
          bodyPadding:'200 0 0 300',
          html: '<div style="text-aling:center;"><img src="resources/images/lgsis.png" width="300" height="150" >  </div>'          
          
      }]
    }
  ]

});
