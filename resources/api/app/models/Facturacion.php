<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class Facturacion extends \Phalcon\Mvc\Model
{

    public static function actualizar($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_agregar',$param);
        return $sql;
    }
    public static function actualizarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executar('ventas','sp_factura_pago_acuenta',$param);
        return $sql;
    }
    public static function buscarPagoAcuenta($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     = $obj->executarJson('ventas','sp_pagos_acuenta_buscar',$param);
        return $sql;
    }

    public static function guardarPuntoVentaPago($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_punto_venta_agregar',$param);
        return $sql;
    }
    public static function buscarVentasPdv($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_punto_venta_listar',$param);
        return $sql;
    }
    public static function buscarVentasCliente($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_cliente_facturacion_buscar',$param);
        return $sql;
    }

    public static function anular($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_facturacion_anular',$param);
        return $sql;
    }

    public static function datosFacturacionCliente($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_datos_cliente',$param);
        return $sql;
    }
    public static function detalleFacturacion($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('ventas','sp_facturacion_detalle_vista',$param);
        return $sql;
    }

    public static function listarMoneda($data)
    {
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executarJson('contabilidad','sp_monedas_lista',$param);
        return $sql;
    } 
     



}
