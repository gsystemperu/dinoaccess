Ext.setGlyphFontFamily('FontAwesome');
Ext.require('dinoaccess.util.Glyphs');
Ext.require('dinoaccess.util.Api');
/*Ext.Loader.setConfig({
  enabled:true,
  paths:{
      'gsperu':'./util'
  }
});*/


Ext.application(
{
    name: 'dinoaccess',
    extend: 'dinoaccess.Application'

});
