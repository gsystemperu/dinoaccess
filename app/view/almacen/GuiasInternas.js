Ext.define('dinoaccess.view.almacen.GuiasInternas', {
    extend: 'Ext.panel.Panel',
    xtype: 'wGuiasInternas',
    alias: 'widget.wGuiasInternas',
    requires: [
      'Ext.layout.container.HBox',
      'Ext.container.ButtonGroup',
      'Ext.grid.column.*',
      'Ext.form.field.*',
      'Ext.panel.Panel',
      'dinoaccess.store.DataTemp',
      'dinoaccess.view.almacen.GuiasInternasController'
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
    controller: 'almacen-guiasinternas',
    initComponent: function () {
      var storeAbastecimiento = Ext.create('dinoaccess.store.OrdenesCompras');
      var storeProveedores = Ext.create('dinoaccess.store.Proveedores');
      var storeAbastecimientoDet = Ext.create('dinoaccess.store.AbastecimientoDetalle');
  
      var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        clicksToMoveEditor: 1,
        autoCancel: false
      });
  
      Ext.apply(this, {
        items: [{
            xtype: 'panel',
            flex: 1,
            margin: '0 3 0 0',
            layout: 'fit',
            border: false,
            items: [
              this.getPanelAbastecimiento(storeAbastecimiento)
            ],
            tbar: [
              this.getPanelToolBarAbastecimiento(storeProveedores)
            ]
          },
        ]
      });
      this.callParent();
  
      /*storeAbastecimiento.load({
        params: {
          desde: Ext.ComponentQuery.query('#dfDesde')[0].getRawValue(),
          hasta: Ext.ComponentQuery.query('#dfHasta')[0].getRawValue(),
          proveedor: 0
        }
      });*/
    },
    getPanelToolBarAbastecimiento: function (storeProveedores) {
      return obj = {
        xtype: 'container',
        bodyPadding: 0,
        layout: {
          type: 'hbox',
          anchor: '100%'
        },
        columnWidth: 10,
        items: [{
            xtype: 'label',
            text: 'Fecha Desde',
            padding: '5px 0 0 0',
            border: false,
            width: 100,
            height: 25,
            style: {
              background: '#775c80',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '13px'
            }
          }, {
            xtype: 'datefield',
            value: new Date(),
            reference: 'dfDesde',
            itemId: 'dfDesdeOC',
            width: 100,
            format: 'd/m/Y'
          }, {
            xtype: 'label',
            text: 'Fecha Hasta',
            padding: '5px 0 0 0',
            border: false,
            width: 100,
            height: 25,
            style: {
              background: '#775c80',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '13px'
            }
          }, {
            xtype: 'datefield',
            value: new Date(),
            reference: 'dfHastaOC',
            itemId: 'dfHastaOC',
            width: 100,
            format: 'd/m/Y'
          }, {
            xtype: 'button',
            glyph: dinoaccess.util.Glyphs.getGlyph(
              'buscar'),
            tooltip: 'Buscador por rangos de fechas : { Desde , Hasta }',
            handler: 'onClickBuscarOrdenCompraPorFechas'
          }, {
            xtype: 'label',
            text: 'Proveedor',
            padding: '5px 0 0 0',
            border: true,
            width: 100,
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
            xtype: 'combo',
            store: storeProveedores,
            itemId: 'cboProveedores',
            valueField: 'id',
            displayField: 'razonsocial',
            queryMode: 'local',
            flex: 1,
            width: 400,
            editable: false
          },
           {
            xtype: 'button',
            glyph: dinoaccess.util.Glyphs.getGlyph(
              'buscar'),
            tooltip: 'Buscar Pedidos Por Proveedor',
            handler: 'onClickBuscarOrdenCompraPorProveedor'
          },
          {
            xtype: 'button',
            glyph: dinoaccess.util.Glyphs.getGlyph(
              'nuevo'),
            tooltip: 'Formulario de proveedor',
            handler: 'onClickFormularioProveedor',
            control: 'cboProveedores'
          }
        ]
      };
  
    },
    getPanelAbastecimiento: function (storeAbastecimiento) {
      return obj = {
        xtype: 'grid',
        itemId: 'gridOrdenesCompra',
        reference: 'gridOrdenesCompra',
        store: storeAbastecimiento,
        columnLines: true,
        sortableColumns: false,
  
        requires: [
          'Ext.grid.selection.SpreadsheetModel',
          'Ext.grid.plugin.Clipboard'
        ],
        emptyText: 'NO HAY REGISTROS PARA MOSTRAR SEGUN EL RANGO DE FECHAS',
        columns: [
           {xtype: 'rownumberer'},
          {
            text: 'Fecha Orden',
            dataIndex: 'fordencompra',
            flex: 1,
            align: 'center',
          },
          {
            text: 'Codigo Generado',
            dataIndex: 'occodigo',
            flex: 1
          },
          {
            text: 'Nombre / Razon Social',
            dataIndex: 'razonsocial',
            flex: 2
          },
          {
            text: 'Almacen',
            dataIndex: 'almacen',
            flex: 1.5
          },
         {
            text: 'Estado',
            dataIndex: 'estado',
            flex: 1.5,
            renderer:function(value, metaData, record){
              if(record.data.idestado == 1){
                metaData.style = "color:#ffffff;font-Size:12px;background-color:#adadad";
                return value;
              }
              if(record.data.idestado == 2){
                metaData.style = "color:#ffffff;font-Size:12px;background-color:#5f7c8a";
                return value;
              }
              if(record.data.idestado == 3){ // Completado
                metaData.style = "color:#ffffff;font-Size:12px;background-color:#85687D";
                return value;
              }
              if(record.data.idestado == 4){ // anulado
                metaData.style = "color:#ffffff;font-Size:12px;background-color:#8A0829";
                return value;
              }
            }
          },
  
         
  
  
          {
            xtype:'numbercolumn',
            text: 'Total',
            dataIndex: 'totalorden',
            align : 'right',
            flex: 1,
            format:'0.00'
          },
          {
  
            xtype:'numbercolumn',
            text: 'Acuenta',
            dataIndex: 'pagoacuenta',
            flex: 1,
            align : 'right',
            format:'0.00',
            hidden:true
            
          },
          {
  
            xtype:'numbercolumn',
            text: 'Saldo',
            dataIndex: 'saldopagar',
            flex: 1,
            align : 'right',
            format:'0.00',
            hidden:true,
            renderer : function(value,style,record){
  
              if(record.get('pagoacuenta') == 0){
                n = 0;
                return n.toFixed(2);
              }else{
                return value;
              }
            }
          },
          {
            xtype: 'widgetcolumn',
            width: 60,
            hidden:true,
            widget: {
              xtype: 'button',
              width: 60,
              glyph: 0xf0d6,
              tooltip : 'INGRESAR PAGOS A CUENTA AL DOCUMENTO',
              handler: 'onClickIngresarPagoAcuenta'
            }
  
          },
          {
            xtype: 'widgetcolumn',
            width: 60,
            widget: {
              xtype: 'button',
              width: 60,
              glyph: 0xf044,
              handler: 'onClickEditarOrdenCompra'
            }
  
          },
          {
            xtype: 'widgetcolumn',
            width: 60,
            widget: {
              xtype: 'button',
              width: 60,
              glyph: 0xf014,
               handler: 'onClickAnularOrdenCompra'
  
            }
  
          }
        ]
      };
    },
  });
  