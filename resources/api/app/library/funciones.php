<?php
function pintarApostrofe($cadena)
{
	return str_replace("'", "\'", $cadena);
}

function dia($pDia)
{	
	if(strtolower($pDia)=='monday') return 'lunes';
	if(strtolower($pDia)=='tuesday') return 'martes';
	if(strtolower($pDia)=='wednesday') return 'mi&eacute;rcoles';
	if(strtolower($pDia)=='thursday') return 'jueves';
	if(strtolower($pDia)=='friday') return 'viernes';
	if(strtolower($pDia)=='saturday') return 'sábado';
	if(strtolower($pDia)=='sunday') return 'domingo';
}

function horam($pHora)
{
	if( $pHora=='' ) return '';
	$aHora=array('12','01','02','03','04','05','06','07','08','09','10','11');
	if(substr($pHora,0,2) > 11) return $aHora[substr($pHora,0,2)-12].':'.substr($pHora,3,2).' p.m.';
	return substr($pHora,0,5).' a.m.';
}

function nombremes($mes){
	$nmes="";
	switch ($mes) {
		case 1:
			$nmes="Enero";
			break;
		case 2:
			$nmes="Febrero";
			break;
		case 3:
			$nmes="Marzo";
			break;
		case 4:
			$nmes="Abril";
			break;
		case 5:
			$nmes="Mayo";
			break;
		case 6:
			$nmes="Junio";
			break;
		case 7:
			$nmes="Julio";
			break;																		
		case 8:
			$nmes="Agosto";
			break;
		case 9:
			$nmes="Setiembre";
			break;
		case 10:
			$nmes="Octubre";
			break;
		case 11:
			$nmes="Noviembre";
			break;
		case 12:
			$nmes="Diciembre";
			break;															
	}
	return $nmes;
}

// Function : Verifica que un usuario tenga permiso a una opcion de la aplicacion
// Owner:	Herles
/*
function validaopcion($opcion){
	$s_idusuario= $_SESSION["idusuario"];
	if($s_idusuario==""){
		senderror1("No tiene una sesión activa, Debe de Ingresar nuevamente al sistema");
		//echo "No tiene una sesión activa, Debe de Ingresar nuevamente al sistema";
	}
	$herror="";
	$sqlconnect1=@mssql_connect("data3","sa","");
	if(!($herror=="")){
		senderror1("No se pudo conectar a la base de datos SQLServer<br>".$herror);
		//echo "No se pudo conectar a la base de datos SQLServer<br>".$herror;
	}
	$sqldb=mssql_select_db("web_usuario",$sqlconnect1);
	$sql_query="exec wb_opcion_valida ".$s_idusuario.",".$opcion;
	$herror="";
	$sql_result=mssql_query($sql_query);
	if(!($herror=="")){
		senderror1("Error al ejecutar el procedimiento almacenado<br>".$herror);
		//echo "Error al ejecutar el procedimiento almacenado<br>".$herror;
	}
	$sql_filas = mssql_num_rows($sql_result);
	if($sql_filas>0){
	}else{
  	senderror1("No tiene permiso para realizar esta Tarea.");
  	//echo "No tiene permiso para realizar esta Tarea.";
	}
}

function senderror1($error){
	echo "<div align=center class=msgerror>$error<br><input type=button class=msgerrorbtn value=Cerrar onclick=javascript:window.close()></div>";
	exit;
}
*/

// Funcion de JUAN JAIMES
function cadena_vacio_a_nulo($objeto) {
	if (!empty($objeto)) {
		$retorna = $objeto;
		$retorna = "'".str_replace("'", "''", $retorna)."'";
		$retorna = stripslashes($retorna);
		return $retorna;
	}
	return "NULL";
}

// Funcion de JUAN JAIMES
function numero_vacio_a_nulo($objeto) {
	if (!empty($objeto) && trim($objeto)!="") {
		return $objeto;
	}
	return "NULL"; 
}

// Funcion de JUAN JAIMES
function pinta($objeto){
	//return utf8_encode($objeto);
	return utf8_decode($objeto);
	//return $objeto;
}

// Funcion de JUAN JAIMES
function pinta_pdf($objeto){
	//return utf8_encode($objeto);
	return utf8_decode($objeto);
	//return $objeto;
}

// Funcion de JUAN JAIMES
function utf8_code($objeto){
	//return utf8_encode($objeto);
	return utf8_decode($objeto);
}

// Funcion de JUAN JAIMES
function guarda($objeto){
	//return utf8_decode($objeto);
	return $objeto;
}

function ceros_izq($valor, $longitud){
	$retorna_valor = str_repeat("0", $longitud - strlen(trim($valor))) . trim($valor);
	return $retorna_valor;
}

// Funcion de JUAN JAIMES
function retorna_algo($expresion, $blancos_derecha=''){
	$retorna = empty($expresion) || trim($expresion) == "" ? "&nbsp;" : $expresion;

	if ($blancos_derecha=="S") {
		$expresion_result = "";
		for ($i=0; $i<=strlen($retorna); $i++) {
			switch (substr($retorna,$i,1))
			{
				case " ":
					$expresion_result = $expresion_result."&nbsp;";
					break;
					
				default:
					$expresion_result = $expresion_result.substr($retorna,$i,1);
			}
		}
		return $expresion_result;
	}
	
	return $retorna;
}

// Funcion de JUAN JAIMES
function retorna_sin_espacio($objeto) {
	if (!empty($objeto) && trim($objeto)!="") {
		return $objeto;
	}
	return "";
}
// Funcion de JUAN JAIMES
function retorna_sin_cero($objeto) {
	if (!empty($objeto) && trim($objeto)!="" && trim($objeto)!="0") {
		return $objeto;
	}
	return "";
}

//Funcion de JUAN JAIMES

//Genera Boton
function button($id, $clase, $imagen, $texto){
	echo "<button id='$id' class='$clase'>";
	echo "<table border='0' cellspacing='0' cellpadding='0'>";
	echo "	<tr>";
	echo "		<td><img src='$imagen' /></td>";
	echo "		<td nowrap='nowrap'>$texto</td>";
	echo "	</tr>";
	echo "</table>";
	echo "</button>";
}

function button_img_size($id, $clase, $imagen, $texto,$width,$height){
	echo "<button id='$id' class='$clase'>";
	echo "<table border='0' cellspacing='0' cellpadding='0'>";
	echo "	<tr>";
	echo "		<td><img src='$imagen' height='$height' width='$width' /></td>";
	echo "		<td nowrap='nowrap'>$texto</td>";
	echo "	</tr>";
	echo "</table>";
	echo "</button>";
}

// Genera boton horizontal c/s imagen
function boton_horizontal($id, $texto="", $imagen="", $largo, $ancho="28", $disabled=true, $title=""){
	$habilitado = "";
	if( $disabled == false ){
		$habilitado = " disabled='disabled'";
		$imagen = substr($imagen, 0, strlen($imagen)-4)."_disabled.gif";
	}
	if( $title != "" ){
		$title = " title='".$title."'";
	}
	echo "<button id='".$id."' name='".$id."' style='width:".$largo."px; height:".$ancho."px;'".$habilitado.$title.">";
	echo "<table border='0' cellspacing='0' cellpadding='0' align='center'><tr>";
	if ($imagen != ""){
		echo "<td style='padding-right:4px;'><img src='".$imagen."' /></td>";
	}
	if ($texto != ""){
		echo "<td>".$texto."</td>";
	}
	echo "</tr></table>";
	echo "</button>";
}

// Funcion de JUAN JAIMES
// Genera boton vertical c/s imagen
function boton_vertical($id, $texto="", $imagen="", $largo, $ancho="50", $disabled=true){
	$habilitado = "";
	if( $disabled == false ){
		$habilitado = " disabled='disabled'";
		$imagen = substr($imagen, 0, strlen($imagen)-4)."_disabled.gif";
	}
	echo "<button id='".$id."' name='".$id."' style='width:".$largo."px; height:".$ancho."px;'".$habilitado.">";
	echo "<table border='0' cellspacing='0' cellpadding='0' align='center'>";
	if ($imagen != ""){
		echo "<tr><td align='center'><img src='".$imagen."' /></td></tr>";
	}
	if ($texto != ""){
		echo "<tr><td align='center'>".$texto."</td></tr>";
	}
	echo "</table>";
	echo "</button>";
}

// Funcion de JUAN JAIMES
// Genera opcion menu vista vertical
function opcion_menu_vista_vertical($id, $texto="", $imagen="", $menu=false){
	echo "<div id='".$id."' class='menu_vista_opcion'><table border='0' cellspacing='0' cellpadding='0'>";
	echo "<tr><td class='menu_vista_opcion_td_imagen' align='center'><img src='".$imagen."' border='0' /></td></tr>";
	if( $menu == false ){
		echo "<tr><td class='menu_vista_opcion_td_texto' valign='top'>".$texto."</td></tr>";
	} else {
		echo "<tr><td class='menu_vista_opcion_td_texto' valign='top'>".$texto."<br /><img src='http://".$_SERVER['SERVER_NAME']."/sig/images/iconos/ico_flecha_abajo.gif' border='0' align='center' /></td></tr>";
	}
	echo "</table></div>";
}

//Function de JUAN JAIMES
function query($sQuery, $hDb_conn)
{
    if(!$rQuery = @mssql_query($sQuery, $hDb_conn))
    {
        $sMssql_get_last_message = mssql_get_last_message();
        $sQuery_added  = "BEGIN TRY\n";
        $sQuery_added .= "\t".$sQuery."\n";
        $sQuery_added .= "END TRY\n";
        $sQuery_added .= "BEGIN CATCH\n";
        $sQuery_added .= "\tSELECT 'Error: '  + ERROR_MESSAGE()\n";
        $sQuery_added .= "END CATCH";
        $rRun2= @mssql_query($sQuery_added, $hDb_conn);
        $aReturn = @mssql_fetch_assoc($rRun2);
        if(empty($aReturn))
        {
            echo "<strong>MSSQL retorna:</strong> ".$sMssql_get_last_message."<br><strong>Comando ejecutado:</strong> ".nl2br($sQuery);
        }
        elseif(isset($aReturn['computed']))
        {
            echo "<strong>MSSQL retorna:</strong> ".$aReturn["computed"]."<br><strong>Comando ejecutado:</strong> ".nl2br($sQuery);
        }
        return false;
    }
    else
    {
        return $rQuery;
    }
}

function v_opc_mnu($opcion,$iduser)
{
	$conectData3Opciones = mssql_pconnect("respaldo","sa","magicsigm111111");
	$db1 = mssql_select_db('web_usuario');
	$sql_opciones = "SELECT * FROM web_usuario_grupo a
					 left join web_grupo b on a.idgrupo=b.idgrupo
					 left join web_grupo_opcion c on b.idgrupo=c.idgrupo
					 left join web_opcion d on c.idopcion=d.idopcion
					 where a.idusuario='".$iduser."' AND d.codigo='".$opcion."'";			
	$rs_opciones = mssql_query($sql_opciones, $conectData3Opciones);
	if(!$rs_opciones)
	{ return $mensaje="NO SE PUEDE EXTRAER LA OPCIONES DEL MENU";}
	else
	{
		$num_registros = mssql_num_rows($rs_opciones);
		if($num_registros != 0)
		{return $variable = 1;}
		else
		{return $variable = 2;}
	}
	mssql_close($conect02);
}

function v_permite_opcion($opcion, $idsistema, $usuario)
{
	require_once("config.php");
	require_once("clases_php/db_sql.class.php"); 
	$rstUsuario = new EasySQL($g_sql_data3_tipoBD, $g_sql_data3_server, $g_sql_data3_username, $g_sql_data3_password, $g_sql_data3_db_usuarios);
	$rstUsuario->select("SELECT idusuario FROM web_usuario WHERE login='".$usuario."'");
	$Usuario = $rstUsuario->fetchArray();
	
	$sql_opciones = "SELECT * FROM web_usuario_grupo a
					 left join web_grupo b on a.idgrupo=b.idgrupo
					 left join web_grupo_opcion c on b.idgrupo=c.idgrupo
					 left join web_opcion d on c.idopcion=d.idopcion
					 where a.idusuario=".$Usuario["idusuario"]." AND d.idsistema=".$idsistema." AND d.codigo='".$opcion."'";			

	$rstAcceso = new EasySQL($g_sql_data3_tipoBD, $g_sql_data3_server, $g_sql_data3_username, $g_sql_data3_password, $g_sql_data3_db_usuarios);
	$rstAcceso->select($sql_opciones);
	if( $rstAcceso->total_rows > 0 ){
		return true;
	} else{
		return false;
	}
}

function traer_fecha($menos_dias, $g_sql_tipoBD, $g_sql_server, $g_sql_username, $g_sql_password, $g_sql_database) {
	$Fecha = new EasySQL($g_sql_tipoBD, $g_sql_server, $g_sql_username, $g_sql_password, $g_sql_database); 
	$Fecha->select("SELECT CONVERT(VARCHAR, GETDATE() - ".$menos_dias.", 103) AS FECHA"); 
	$Fec = $Fecha->fetchArray();
	return $Fec["FECHA"];
}

function repetir($pCadena, $pRepetir) {
	$cRetorna = "";
	$nContador = 0;
	while ( ++$nContador <= $pRepetir ) $cRetorna .= $pCadena;
	return $cRetorna;
}


function cadena_sql($pDbsql, $pProcedAlmacenado, $pParametros, $pEsquema="", $pRetorna="")
{
	switch($pDbsql)
	{		
		case "SQL":
			$sql = "exec ".$pProcedAlmacenado." ".$pParametros;
			break;
			
		case "PostGreSQL":
			if( $pEsquema != "" ) $pEsquema = $pEsquema . ".";
			if( $pRetorna != "" ) $pRetorna = " (" . $pRetorna . ")";
			$sql = "select * from ".$pEsquema.$pProcedAlmacenado." (".$pParametros.")";
			break;
	}
	return $sql; 	
}
?>
