<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Resultset\Simple as Resultset;

class AperturaCaja extends \Phalcon\Mvc\Model
{
    public static function listarmonedas()
    {    
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_nombremonedas_listar',$param);
        return $sql;
    }

    public static function actualizar($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('ventas','sp_apertura_caja_agregar',$param);
        return $sql;
    }

    public static function listaaperturacaja()
    {    
        $obj     = new SQLHelpers();
        $param   = array();
        $sql     =  $obj->executarJson('ventas','sp_apetura_caja_listar',$param);
        return $sql;
    }
  
    /*public static function eliminar($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_eliminar',$param);
        return $sql;
    }
    //=================================================================
    // Sessiones del almacen

      public static function ListarSecciones($idalmacen)
    {    
        $obj     = new SQLHelpers();
        $param   = array($idalmacen);
        $sql     =  $obj->executarJson('inventario','sp_almacen_secciones_listar',$param);
        return $sql;
    }

      public static function actualizarseccion($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_secciones_actualizar',$param);
        return $sql;
    }
     public static function eliminarseccion($data)
    {    
        $obj     = new SQLHelpers();
        $param   = $data;
        $sql     =  $obj->executar('inventario','sp_almacen_secciones_eliminar',$param);
        return $sql;
    }
*/


    

}
