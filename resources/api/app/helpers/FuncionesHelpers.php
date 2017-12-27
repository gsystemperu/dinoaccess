<?php

 	class FuncionesHelpers
 	{

 		public function esCadenaNulo($objeto)
 		{
		    if (!empty($objeto)) {
		        $retorna = $objeto;
		        $retorna = "'" . str_replace("'", "''", $retorna) . "'";
		        $retorna = stripslashes($retorna);
		        return $retorna;
		    }
		    return "NULL";
		}

		public function esNumeroNulo($objeto) {
		    if (!empty($objeto) && trim($objeto) != "" && is_numeric($objeto)) {
		        return $objeto;
		    }
		    return "NULL";
		}

		public function esNumeroCero($objeto) {
		    if (!empty($objeto) && trim($objeto) != "" && is_numeric($objeto)) {
		        return $objeto;
		    }
		    return "0";
		}

    public function nombreMes($objeto) {
       $nombre = '';
		    switch ($objeto) {
		      case "01": $nombre='Enero'; break;
          case "02":$nombre='Febrero'; break;
          case "03":$nombre='Marzo'; break;
          case "04":$nombre='Abril'; break;
          case "05":$nombre='Mayo'; break;
          case "06":$nombre='Junio'; break;
          case "07":$nombre='Julio'; break;
          case "08":$nombre='Agosto'; break;
          case "09":$nombre='Septiembre'; break;
          case "10":$nombre='Octubre'; break;
          case "11":$nombre='Noviembre'; break;
          case "12":$nombre='Diciembre'; break;
		    }
        return $nombre;
		}


 	}
