Ext.define('dinoaccess.view.puntoventa.Listado',{
    extend: 'Ext.panel.Panel',
    xtype :'wListadoProducto',
    alias : 'wListadoProducto',
    requires: [
        'dinoaccess.view.puntoventa.ListadoController',
        'Ext.toolbar.TextItem',
        'Ext.view.View',
        'Ext.ux.DataView.Animated'
    ],
    controller: 'puntoventa-listado',
    bodyPadding:3,
    layout:'fit',
    initComponent:function(){
        me = this;
        __storeProducto     = Ext.create('dinoaccess.store.Productos');
       
         Ext.apply(this,{
             items:[{
                   xtype: 'dataview',
                   layout:'fit',
                   autoScroll :true,
                   itemId : 'dvListaProductos',
                    tpl: [
                        '<tpl for=".">',
                            '<div class="cuarto">',
                                    //'<table style="width:100%;" border="0" cellpadding="0" cellspacing="0" ><tr>',
                                       /*'<tpl if="imagen &gt;= true">',
                                            '<td><img src="resources/images/productos/{idprod}.jpg" width=80 height=80 /></td>',
                                       '<tpl else >',
                                            '<td><img src="resources/images/no-img.jpg" width=80 height=80 /></td>',
                                       '</tpl>',*/
                                        //'<td><table style="width:100%;" border="0" cellpadding="0" cellspacing="0">',

                                        '<table style="width:100%;" border="0" CELLPADDING="0" CELLSPACING="0">',
                                            '<tpl if="sevendepordosis &gt;=true"> ',
                                                 '<tr>',
                                                     '<td  align="right" class="productoprecio">Precio : S./ {precioventa} <br> Stock Dosis :{stock_dosis} <br> Existencias :{existencias} </strong><br></td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td class="productonombre">{nombre}</td>',
                                                 '</tr>',
                                            '</tpl>',

                                            '<tpl if="ventagramos &gt;=true"> ',
                                                 '<tr>',
                                                     //'<td  align="right" ><div class="productoprecio" >Precio S./ {precioventa} <br>    Dosis : {numerodosis} <br> Stock : {existencias}</div></strong><br></td>',
                                                     '<td  align="right" class="productoprecio">S./ {precioventa} <br> Stock Gramos : {stock_gramos}  <br> Existencias : {existencias}</strong><br></td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td class="productonombre">{nombre}</td>',
                                                 '</tr>',
                                            '</tpl>',

                                            '<tpl if="ventakilos &gt;=true"> ',
                                                 '<tr>',
                                                     '<td  align="right" class="productoprecio">S./ {precioventa} <br> Stock Kilos : {stock_kilos}  <br> Existencias : {existencias}</strong><br></td>',
                                                 '</tr>',
                                                 '<tr>',
                                                     '<td class="productonombre">{nombre}</td>',
                                                 '</tr>',
                                            '</tpl>',
                                            '<tpl if="ventakilos==false && ventagramos ==false && sevendepordosis ==false ">',
                                                  '<tr>',
                                                      //'<td  align="right" ><div class="productoprecio" >Precio S./ {precioventa} <br>    Dosis : {numerodosis} <br> Stock : {existencias}</div></strong><br></td>',
                                                      '<td  align="right" class="productoprecio">Precio Venta : S./ {precioventa} <br> Unidad :  <br> Existencias : {existencias}</strong><br></td>',
                                                  '</tr>',
                                                  '<tr>',
                                                      '<td class="productonombre">{nombre}</td>',
                                                  '</tr>',
                                            '</tpl>',

                                        '</table>',
                                    //'</td>',
                                    //'</tr></table>',
                            '</div>',
                        '</tpl>'
                    ],
                    plugins: {
                        xclass: 'Ext.ux.DataView.Animated'
                    },
                    multiSelect:true,
                    store:__storeProducto,
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    itemSelector: 'div.cuarto',
                    emptyText: ' ',
                    listeners:{ itemclick :'accionClickItem'}
                }
             ],
             tbar:[
               {
                   xtype:'label',
                   text :'PRODUCTO',
                   padding: '5px 0 0 0',
                   border: true,
                   width: 90,
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
                 reference: 'txtBuscarCodigoProd',
                 itemId: 'txtBuscarCodigoProd',
                 flex: 1,
                 hasfocus:true,
                 enableKeyEvents: true,
                 listeners:{
                   keyup:'onKeyUpBuscarProducto'
                 }
               }
             ]
         });
        this.callParent(arguments);

    },

});
