<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Producto extends \Phalcon\Mvc\Model
{



     public static function listar()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
        return $sql;
    }
    public static function buscarNombre($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
       return $sql;
    }
    public static function buscarNombreYcliente($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
       return $sql;
    }
    
    public static function buscarTipo($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_all',$param);
       return $sql;
    }

    /*
    @ Model : Buscar Productos solo para la vista de orden de compra
    */
    public static function  buscarOrdenCompra($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_OC_all',$param);
       return $sql;
    }

    public static function  buscarProductoOrdenCompra($data)
    {
       $obj     = new SQLHelpers();
       $param   = $data;
       $sql     =  $obj->executarJson('inventario','sp_producto_listar_oc_proveedor',$param);
       return $sql;
    }

    public static function buscarCodigoBarras($codigo)
    {
        $obj     = new SQLHelpers();
        $param   = array($codigo);
        $sql     =  $obj->executarJson('inventario','sp_producto_buscar_codigo_barras',$param);
        return $sql;
    }
    public static function buscarCodigoSerie($serie)
    {
        $obj     = new SQLHelpers();
        $param   = array($serie);
        $sql     =  $obj->executarJson('inventario','sp_producto_buscar_codigo_serie',$param);
        return $sql;
    }
  /*  public static function buscarNombre($nombre)
    {
        $obj     = new SQLHelpers();
        $param   = array($nombre);
        $sql     =  $obj->executarJson('inventario','sp_producto_buscar_nombre',$param);
        return $sql;
    }*/

    public static function actualizar($data)
    {   //print_r($data);die();
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_producto_actualizar',$param);
        return $sql;
    }

    public static function eliminar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_producto_eliminar',$param);
        return $sql;
    }

    public static function eliminarSerie($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        
        $sql     =  $obj->executar('inventario','sp_producto_eliminar_existencia',$param);
        return $sql;
    }



    //@ Metodos Tipo Producto
      public static function listarTipoProducto()
    {
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('inventario','sp_tipo_producto_listar',$parametros);
        return $sql;
    }

     public static function actualizarTipoProducto($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_tipo_producto_actualizar',$param);
        return $sql;
    }

    public static function eliminarTipoProducto($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_tipo_producto_eliminar',$param);
        return $sql;
    }

    /**
     * [existenciasPorProducto : Lista las existencias por cada producto individual por serie]
     * @param  [type] $data [ array , parametro idproducto]
     * @return [type] $json  , retorna un json con todos los datos
     */
    public static function existenciasPorProducto($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executarJson('inventario','sp_producto_existencias_listar',$param);
      return $sql;
    }


    public static function ingresarUbicacionProducto($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executar('inventario','sp_producto_existencia_ubicacion_actualizar',$param);
      return $sql;
    }


    public static function buscarProductoPorCodigoBarras($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executarJson('inventario','sp_producto_serie_buscar',$param);
      return $sql;
    }

    /**
     * [proveedoresDelProducto]
     * @param  [type] $data array con el codigo de producto
     * @return [type] Json      [description]
     */
    public static function proveedoresDelProducto($data){
      $obj     = new SQLHelpers();
      $param   = $data;
      $sql     = $obj->executarJson('inventario','sp_productoxproveedor_listar',$param);
      return $sql;
    }

     /**
     * [proveedoresDelProducto]
     * @param  [type] $data array con el codigo de producto
     * @return [type] Json      [description]
     */
    public static function copiarProducto($data){
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('inventario','sp_producto_copiar',$param);
        return $sql;
      }

}
