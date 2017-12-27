Ext.define('dinoaccess.view.almacen.Almacenes', {
  extend: 'Ext.panel.Panel',
  xtype: 'wRegAlmacen',
  alias: 'widget.wRegAlmacen',
  requires: [
    'Ext.layout.container.HBox',
    'dinoaccess.view.almacen.AccionesAlmacen',
    'Ext.grid.*',
    'Ext.form.field.Number'
  ],
  layout: {
    type: 'hbox',
    pack: 'start',
    align: 'stretch'
  },
  bodyPadding: 2,
  defaults: {
    frame: false,
    bodyPadding: 3,
    layout: {
      type: 'vbox',
      pack: 'start',
      align: 'stretch'
    },
  },
  controller: 'acciones-almacen',
  initComponent: function () {
    me = this;
      store = Ext.create('dinoaccess.store.Almacenes');
    Ext.apply(this, {
      items: [
        me.getPanelAlmacen(store),
        me.getPanelAlmacenSession(store)
      ]
    });
    this.callParent();
  },
  getPanelAlmacen: function (store) {
  
    var obj = {
      xtype: 'panel',
      flex: 1,
      items: [{
        xtype: 'grid',
        title: 'Almacen',
        store: store,
        reference: 'dgvAlmacen',
        flex: 1,
        columns: [{
            text: 'Descripcion',
            dataIndex: 'descripcion',
            flex: 2
          },
          {
            xtype: 'widgetcolumn',
            flex: 0.5,
            widget: {
              xtype: 'button',
              flex: 1,
              glyph: 0xf014,
              handler: 'onClickEliminarAlmacen'
            }
          }
        ],
        listeners: {
          select: 'onSelectedAlmacen'
        }

      }, {
        xtype: 'form',
        title: 'Detalle',
        reference: 'frmAlmacen',
       url: dinoaccess.util.Rutas.almacenGuardar,
        flex: 1,
        layout: {
          type: 'vbox',
          pack: 'start',
          align: 'stretch',

        },
        bodyPadding: 5,
        defaultType: 'textarea',
        items: [{
          xtype: 'hiddenfield',
          name: 'id',
          value: 0
        }, {
          fieldLabel: 'Descripcion',
          name: 'descripcion',
          itemId: 'txtNombreAlmacen'

        }],
        bbar: [{
          xtype: 'button',
          text: 'Nuevo',
          handler: 'onClickNuevoAlmacen',
          glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
        }, {
          xtype: 'button',
          text: 'Guardar',
          handler: 'onClickGuardarAlmacen',
          glyph: dinoaccess.util.Glyphs.getGlyph('guardar'),
        }]

      }]


    };
    return obj;
  },
  getPanelAlmacenSession: function (storealmacen) {
    store = Ext.create('dinoaccess.store.AlmacenSecciones');
    var obj = {
      xtype: 'panel',
      flex: 1.5,
      items: [{
        xtype: 'grid',
        title: 'Secciones',
        reference: 'dgvSecciones',
        store: store,
        flex: 1,
        columns: [ {
          text: 'Descripcion',
          dataIndex: 'descripcion',
          flex: 2
        },
         {
            xtype: 'widgetcolumn',
            flex: 0.5,
            widget: {
              xtype: 'button',
              flex: 1,
              glyph: 0xf014,
              handler: 'onClickEliminarSeccion'
            }
          }
      ],
        listeners: {
          select: 'onSelectedSeccion'
        }

      }, {
        xtype: 'form',
        title: 'Detalle',
        reference : 'frmSeccion',
        url : dinoaccess.util.Rutas.seccionAlmacenGuardar,
        flex: 1,
        layout: {
          type: 'vbox',
          pack: 'start',
          align: 'stretch',

        },
        bodyPadding: 5,
        defaultType: 'textfield',
        items: [{
            xtype: 'hiddenfield',
            name: 'id',
            value: 0
          },

          {
            xtype: 'combo',
            fieldLabel: 'Almacen',
            store : storealmacen,
            name : 'idalmacen',
            displayField : 'descripcion',
            valueField : 'id',
            queryMode : 'local',
            editable : false
          },
           {
            fieldLabel: 'Nombre Session',
            name: 'descripcion',
            itemId : 'txtDescripcion'
          }
        ],
        bbar: [{
          xtype: 'button',
          text: 'Nuevo',
           glyph: dinoaccess.util.Glyphs.getGlyph('nuevo'),
           handler : 'onClickNuevoSeccion'
         
        }, {
          xtype: 'button',
          text: 'Guardar',
           glyph: dinoaccess.util.Glyphs.getGlyph('guardar'),
           handler :'onClickGuardarSeccion'
        
        }]


      }]

    };
    return obj;
  }
});