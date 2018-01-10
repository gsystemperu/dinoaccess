Ext.define('dinoaccess.view.puntoventa.Pago',{
    extend: 'Ext.form.Panel',
    xtype :'wPuntoVentaPago',
    alias : 'wPuntoVentaPago',
    itemId :'wPuntoVentaPago',

    layout:{type:'vbox',align:'stretch'},
    padding : 100,
    controller:'puntoventa-main',
    initComponent:function(){
         me = this;
         Ext.apply(this,{
            items:[
              me.getPanelPago(),
              me.getPanelTotales()
            ],
            buttons:[
              {
                text :'GUARDAR PAGO',
                scale :'medium',
                handler:'onClickGuardarCajaPago'

              }
            ]
         });
        this.callParent(arguments);

    },
    getPanelTotales:function(){
      return obj = {
        xtype:'panel',
        layout:{
          type:'vbox',
          align :'stretch'
        },
        defaults:{
          labelWidth : 300
        },
        bodyPadding: '30',
        padding : '5 0 0 0',
        items:[
          {
            xtype:'hiddenfield',
            itemId:'txtTotalVentabk',
            value : 0
          },
          {
            xtype: 'numberfield',
            fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Sub Total </div></b>',
            itemId: 'txtSubTotalVentaCajaValidar' ,
            decimalSeparator: '.',
            readOnly: false,
            fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
            enableKeyEvents: true,
            value : 0,
        },
        {
          xtype: 'numberfield',
          fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">I.G.V. </div></b>',
          itemId: 'txtIgvVentaCajaValidar' ,
          decimalSeparator: '.',
          readOnly: false,
          fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
          enableKeyEvents: true,
          value : 0,
        },
       {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Total </div></b>',
              itemId: 'txtTotalVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: true,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',

          },
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Pago Acuenta </div></b>',
              itemId: 'txtAcuentaVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: false,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              enableKeyEvents: true,
              value : 0,
              listeners:{
                keyup:'onKeyPagoAcuenta'
              },
              hidden:true
          },
          {
              xtype: 'numberfield',
              fieldLabel: '<b><div style="font-size:20px;margin-top:16px;">Saldo </div></b>',
              itemId: 'txtSaldoVentaCajaValidar' ,
              decimalSeparator: '.',
              readOnly: true,
              value : 0,
              fieldStyle: 'text-align: right;font-size:35px;font-weight:bold; ',
              hidden:true
          },

        

        ]
      };
    },
    getPanelPago:function(){
      var _storeFormaPago = Ext.create('dinoaccess.store.FormaPago');
      return obj = {
          xtype:'panel',
          layout:{
            type:'hbox',
            align :'stretch'
          },
          items:[
            {
                xtype:'radiogroup',
                vertical: true,
                flex: 1,
                items:[
                  {boxLabel:'BOLETA',name: 'dv',inputValue:'2',value:true},
                  {boxLabel:'FACTURA',name: 'dv',inputValue:'1'},
                  {boxLabel:'NOTA',name: 'dv',inputValue:'3'},
                ],
                listeners:{
                  change  :'onActivateRadio'
                }
            },
            {
                xtype:'label',
                text :'FORMA PAGO',
                padding: '5px 0 0 0',
                border: true,
                width: 110,
                height: 25,
                style: {
                    background: '#775c80',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            },
            {
              xtype:'combo',
              flex: 1,
              labelAlign:'right',
              store  :_storeFormaPago,
              valueField : 'idfopag',
              displayField : 'descripcion',
              queryMode : 'local',
              itemId :'cboFormaPagoPv',
              editable:false,
              allowBlank:false,
              value : 1
            },
            {
                xtype:'label',
                text :'DOCUMENTO',
                padding: '5px 0 0 0',
                border: true,
                width: 90,
                height: 25,
                hidden:true,
                style: {
                    background: '#775c80',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            },
            {
              xtype:'textfield',
              allowBlank :true,
              flex: 0.5,
              value : '001',
              itemId : 'txtSerieDoc',
              hidden:true,
            },
            {
              xtype:'textfield',
              allowBlank :true,
              flex: 0.5,
              itemId : 'txtNumeroDoc',
              hidden:true,
            }
          ]
      };

    }


});
