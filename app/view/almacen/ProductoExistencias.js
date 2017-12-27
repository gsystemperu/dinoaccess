Ext.define('dinoaccess.view.almacen.ProductoExistencias', {
  extend: 'Ext.form.Panel',
  xtype: 'wProductosExistencias',
  alias: 'widget.wProductosExistencias',
  requires: [
    'Ext.layout.container.HBox',
    'Ext.container.ButtonGroup',
    'Ext.grid.column.*',
    'Ext.form.field.*',
    'Ext.panel.Panel',
    'dinoaccess.store.DataTemp',
    'dinoaccess.view.almacen.AccionesProducto',
    'Ext.grid.plugin.*',
    'dinoaccess.util.Rutas'
  ],
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  bodyPadding: 0,
  defaults: {
    bodyPadding: 0,
    border: false
  },
  controller: 'acciones-producto',
  initComponent: function () {
    var storeProductoExistencias = Ext.create('dinoaccess.store.ProductoExistencias');
    Ext.apply(this, {
      items: [
        this.getDatosDelProducto(),
        this.getPanelDetalle(storeProductoExistencias)
      ]
    });
    this.callParent();

  },
  getDatosDelProducto: function () {
    return obj = {
      xtype: 'panel',
      frame: false,
      defaultType: 'textfield',
      layout: 'hbox',
      padding: 5,
      bodyPadding: 5,
      defaults: {
        labelWidth: 150,
        labelAlign: 'right'
      },
      items: [
        {
            xtype: 'label',
            itemId : 'lblNombreProducto',
            padding: '5px 5px 5px 5px',
            border: false,
            flex: 1,
            height : 25,
            style: {
              color: '#775c80',
              textAlign: 'left',
              fontWeight: 'bold',
              fontSize: '15px'
            }
          },
          {
            xtype: 'label',
            text: 'Codigo',
            padding: '5px 0 0 0',
            border: false,
            width: 60,
            height: 25,
            style: {
              background: '#775c80',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '13px'
            }
          },
         {
          xtype: 'textfield',
          reference: 'txtCodigoProducto',
          flex: 1,
          enablekeyevent : true,
          listeners:{
            keyup: 'onKeyUpBuscarCodigoSerie'
          }
        },
        {
          xtype: 'button',
          glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
          tooltip: 'Busca el producto por codigo de serie',
          //handler: 'onClickBuscarOrdenCompraPorFechas'
        },
        /*{
          xtype: 'label',
          text: 'Lote',
          padding: '5px 0 0 0',
          border: false,
          width: 60,
          height: 25,
          style: {
            background: '#775c80',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '13px'
          }
        }, {
          xtype: 'textfield',
          itemId: 'txtNumerolote',
          flex: 0.5,
        },
        {
          xtype: 'button',
          glyph: dinoaccess.util.Glyphs.getGlyph('buscar'),
          tooltip: 'Buscador al producto por su numero lote',
          //handler: 'onClickBuscarOrdenCompraPorFechas'
        }*/


      ]
    };
  },
  getPanelDetalle: function (storeProductoExistencias) {
    var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToMoveEditor: 1,
      autoCancel: false
    });

    return obj = {
      xtype: 'panel',
      layout: 'fit',
      itemId: 'panCargando',
      border: false,
      flex: 0.7,
      items: [{
        xtype: 'grid',
        reference: 'dgvProductoExistencias',
        itemId: 'dgvProductoExistencias',
        store: storeProductoExistencias,
        columnLines: true,
        sortableColumns: false,
        selModel: 'rowmodel',
        plugins: [rowEditing],
        plugins: {
          ptype: 'cellediting',
          clicksToEdit: 1
        },
        columns: [
             {xtype: 'rownumberer'},
          {
            text: 'Fecha Ingreso',
            dataIndex: 'fechaingreso',
            flex: 0.5,
            align: 'center'
          },
          {
            text: 'Proveedor',
            dataIndex: 'razonsocial',
            flex: 1.5,
            align: 'left'
          },
          /*{
            text: 'Codigo',
            dataIndex: 'codigobarras',
            flex: 1,
            align: 'left'
          },*/
          {
            text: 'Estado',
            dataIndex: 'estado',
            flex: 0.8,
            align: 'left',
            renderer: function (value, metaData, record)
            {
               switch (value) {
                 case 'VENDIDO':
                  metaData.style = "color:red;fontSize:13px;";
                 break;
                 default:
                 metaData.style = "fontSize:13px;";

               }
               return value;
             }
          },
          {
            text: 'Guia Ingreso',
            dataIndex: 'numeroguia',
            flex: 0.5,
            align: 'right'
          },
        /*  {
            text: 'Nro. Lote',
            dataIndex: 'numerolote',
            flex: 0.5,
            align: 'right'
          },*/
          /*{
            text : 'Seccion Almacen',
            dataIndex :'seccionalmacen',
            flex: 1
          },*/
          /*{
            text : 'Ubicacion',
            dataIndex :'ubicacion',
            flex: 1
          },
          /*{
            text: 'Codigo Interno',
            dataIndex: 'codigobarras',
            flex: 1,
            align: 'center'
          },*/
          {
            text: 'Vencimiento',
            dataIndex: 'vencimiento',
            flex: 0.5,
            align: 'center'
          },
          {
            text: 'Presentacion',
            dataIndex: 'presentacion',
            flex: 1,
            align: 'center'
          },

          {
            xtype:'numbercolumn',
            text: 'Stock Dosis',
            dataIndex: 'cantidaddosis',
            flex: 0.5,
            align: 'center',
            hidden:true,
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#F7F8E0;fontSize:13px;";return value;}
            /*renderer :function(value,style){
              return '<span style="color:red;font-size:13px;">'+ value.toString() +'</span>';
            }*/
          },
          {
            xtype:'numbercolumn',
            text: 'Stock (Kg)',
            dataIndex: 'cantidadkilos',
            flex: 0.5,
            align: 'center',
            hidden:true,
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#F7F8E0;fontSize:13px;";return  value;}
          },

          {
            xtype:'numbercolumn',
            text: 'Stock (g)',
            dataIndex: 'cantidadgramo',
            flex: 0.5,
            hidden:true,
            align: 'center',
            renderer: function (value, metaData, record)
            {metaData.style = "background-color:#F7F8E0;fontSize:13px;";return value;}
          },


          {
           xtype: 'widgetcolumn',
           flex: 0.5,
           widget: {
             xtype: 'button',
             flex: 1,
             glyph: 0xf014,
             tooltip : 'Opcion para eliminar una existencia en el almacen.',
             handler: 'onClickEliminarProductoSerie'

           }

         }
        ],

      }]



    };
  }
});
