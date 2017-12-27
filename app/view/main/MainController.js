Ext.define('dinoaccess.view.main.MainController', {
  extend: 'Ext.app.ViewController',
  requires: [
    'Ext.window.MessageBox',
    'Ext.tab.Panel',
    'Ext.tree.Panel',
    'dinoaccess.store.tree.GestionClientes',
    'dinoaccess.store.tree.ControlAlmacen',
    'dinoaccess.store.tree.ControlVentas',
    'dinoaccess.store.tree.Mantenimiento',
    'dinoaccess.store.tree.ControlUsuarios',
    'dinoaccess.store.tree.ControlManufactura'

  ],

  alias: 'controller.main',
  onExpandPanel: function (pan, obj) {
    /**
     * Expande el panel y Genera un DASHBOARD del Menú
     */

    this.lookupReference('')
    switch (pan.itemId) {
      case "panControlVentas":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Control de Ventas',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      case "panFinanzas":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Finanzas',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
      case "panRecursosHumanos":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Recursos Humanos',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);
        break;
      case "panFacturaElectronica":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Factura Electronica',
            closable: true,
            flex: 1,
            id: pan.itemId
          });

        }
        _panel.setActiveTab(pan.itemId);
        break;
      case "panControlAlmacen":
        _panel = this.getView().down('tabpanel');
        if (!_panel.getChildByElement(pan.itemId)) {
          _panel.add({
            title: 'Control Almacen',
            closable: true,
            id: pan.itemId,
            items: [{
              xtype: 'DashBoardCrm'
            }]
          });

        }
        _panel.setActiveTab(pan.itemId);

        break;
        /* case "panMantenimiento":
             _panel = this.getView().down('tabpanel');
             if (!_panel.getChildByElement(pan.itemId)) {
                 _panel.add({
                     title: 'Mantenimientos',
                     closable: true,
                     id: pan.itemId,
                     items: [{ xtype: 'DashBoardCrm' }]
                 });

             }
             _panel.setActiveTab(pan.itemId);

             break;*/



    }
  },
  init: function () {
    /*_panel = this.getView().down('tabpanel');
    if (!_panel.getChildByElement('panControlAlmacen')) {
        _panel.add({
            title: 'Control Almacen',
            closable: true,
            id: 'panControlAlmacen',
            //layout: 'fit',
            items: [{ xtype: 'DashBoardCrm' }]
        });

    }

    _panel.setActiveTab('panControlAlmacen');
    */
    /* |------ Cargar Menu Dinamico ------| */

    var _ref = this.getReferences();
    var store = Ext.create('dinoaccess.store.tree.ControlAlmacen');
    _ref.treeControlAlmacen.setStore(store);
    var store = Ext.create('dinoaccess.store.tree.ControlVentas');
    _ref.treeControlVentas.setStore(store);
    var store = Ext.create('dinoaccess.store.tree.Mantenimiento');
    _ref.treeMantenimiento.setStore(store);
    var store = Ext.create('dinoaccess.store.tree.ControlUsuarios');
    _ref.treeControlUsuarios.setStore(store);
    var store = Ext.create('dinoaccess.store.tree.ControlManufactura');
    _ref.treeControlManufactura.setStore(store);

  },
  onClickOpcionMenu: function (obj, record, item, index, e, eOpts) {

    _view = record.get("itemId");
    _tit = record.get("titulo");
    _panel = this.getView().down('tabpanel');
    try {
      if(_tit == ''){return 0;}
      if (!_panel.getChildByElement(_view)) {
        _panel.add({
          title: _tit,
          closable: true,
          id: _view,
          layout: 'fit',
          items: [{
            xtype: _view
          }]
        });

      }
      _panel.setActiveTab(_view);
    } catch (err) {

      console.info(err);
    }
  },
  onBeforecollapse:function(p, direction, animate, eOpts ) {
  /*  try {
      if(p.getTitleRotation()){
        p.setTitleRotation(0);
      }else{
        p.setTitleRotation(1);
      }
    } catch (e) {
        console.log(e);
    }*/

  }

});
