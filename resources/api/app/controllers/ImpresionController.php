<?php
use \Phalcon\Mvc\Controller as Controller;
include __DIR__ .'/../library/funciones.php';
include __DIR__ .'/../library/phpmailer/class.phpmailer.php';
include __DIR__ .'/../library/phpmailer/class.pop3.php';
include __DIR__ .'/../library/phpmailer/class.smtp.php';
include __DIR__ .'/../library/fpdf/fpdf.php';
include __DIR__ .'/../library/fpdf/exfpdf.php';
include __DIR__ .'/../library/fpdf/easyTable.php';

//include 'exfpdf.php';
//include 'easyTable.php';


class ImpresionController extends Controller
{
  //  public function initialize(){$this->view->disable(); }
    public function indexAction(){

      $request  = new Phalcon\Http\Request();
      $idcoti   = 48;//$request->get("id");
      $data     = array($idcoti);
      $cliente  =  json_decode(Cotizacion::buscarCotizacionPorId($data));
      $detalle  =  json_decode(Cotizacion::detalleCotizacionVista($data));
      $this->view->cliente = $cliente;
      $this->view->detalle = $detalle;

    }

    public function impresionnotaAction()
    {
      
            $request  = new Phalcon\Http\Request();
            $id   =  $request->get("id");
            $data     = array($id);
            $cliente  =  json_decode(Facturacion::datosFacturacionCliente($data));       
            $detalle  =  json_decode(Facturacion::detalleFacturacion($data));
            $this->view->cliente = $cliente;
            $this->view->detalle = $detalle;      
   }
      
   public function visualizarnotaAction(){
    $request  = new Phalcon\Http\Request();
    $id   =  $request->get("id");
    $data     = array($id);
    $cliente  =  json_decode(Facturacion::datosFacturacionCliente($data));       
    $detalle  =  json_decode(Facturacion::detalleFacturacion($data));
    $this->view->cliente = $cliente;
    $this->view->detalle = $detalle;   
   }
          
    public function enviarCotizacionAction(){


      $request    = new Phalcon\Http\Request();
      $idCot = 60;//$request->getPost("id");

      $dataEmpresa =  json_decode(Empresa::listar())->data[0];
      //print_r($dataEmpresa);die();
      $dataCotizacion =  json_decode(Cotizacion::buscarCotizacionPorId(array($idCot)))->data[0];
      //print_r($dataCotizacion);die();
      $dataDetalle =  json_decode(Cotizacion::detalleCotizacionVista(array($idCot)))->data;
      //print_r($dataDetalle);die();
      $dataPersona = json_decode(Persona::Buscar($dataCotizacion->idper))->data[0];;
      //print_r($dataPersona);die();



      $total_sin_imp = 0.00;
      $impuestos = 0.00;
      $total_cotizacion = 0.00;

      // ========== FPDF ==========  //
      $pdf = new exFPDF('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 9;

      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell($wg,6,pinta($dataEmpresa->razonsocial),0,'L');
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->razonsocial),'T','L');
      $pdf->MultiCell($wg,$in, pinta($dataEmpresa->direccion),0,'L');
      $pdf->MultiCell($wg,$in,"RUC: ".$dataEmpresa->ruc,0,'L');
      $pdf->MultiCell($wg,$in,"Correo: ".pinta($dataEmpresa->correo),0,'L');
      $pdf->MultiCell($wg,$in,pinta("Teléfono: ".$dataEmpresa->telefono),'B','L');
      $pdf->MultiCell($wg,$in,pinta("Contacto: ".$dataEmpresa->contacto),0,'L');

      $pdf->Ln(4);

      $pdf->SetFont($font,'B',20);
      $pdf->MultiCell($wg,$in,pinta("Cotización # 00".$dataCotizacion->idcoti),0,'L');

      $pdf->Ln(5);

      $fila = $pdf->GetY();
      $pdf->SetFont($font,'B',$tam);
      $pdf->MultiCell(50,$in,"Fecha de presupuesto: ",0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,"Comercial: ",0,'L');
      $pdf->SetXY(140,$fila);
      $pdf->MultiCell(40,$in,"Forma de Pago: ",0,'R');

      $pdf->SetXY(10,$fila+6);
      $fila = $pdf->GetY();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell(50,$in,pinta($dataCotizacion->fechacoti),0,'L');
      $pdf->SetXY(60,$fila);
      $pdf->MultiCell(80,$in,pinta($dataCotizacion->nomcompleto),0,'L');
      $pdf->SetXY(140,$fila);
      $pdf->MultiCell(40,$in,pinta($dataCotizacion->formapago),0,'R');

      $pdf->Ln(5);

      //-----------------------------------
      //----------- LISTA PRODUCTOS DETALLE
      $table=new easyTable($pdf, '{105, 20, 20, 22, 22}', 'align:L; border:{B};');
         $table->rowStyle('font-style:B;');
         $table->easyCell(pinta('Descripción'), 'valign:B;border:{B};');
         $table->easyCell(pinta('Cantidad'), 'align:R;valign:B;border:{B};');
         $table->easyCell(pinta('Precio Unitario'),'align:R;valign:B;border:{B};');
         $table->easyCell(pinta('Impuestos'),'align:C;valign:B;border:{B};');
         $table->easyCell(pinta('Precio'),'align:R;valign:B');
         $table->printRow();

         foreach($dataDetalle as $row){
          $table->rowStyle('border-color:#ADADAD;');
          $table->easyCell(pinta($row->descripcion), 'align:L;');
          $table->easyCell(pinta($row->cantidad), 'align:R');
          $table->easyCell(pinta($row->precio), 'align:R');
          $table->easyCell(pinta(''), 'align:R');
          $table->easyCell(pinta($row->total), 'align:R');
          $total_sin_imp += $row->total;
          $table->printRow();
         }

      $table->endTable(4);
      //----------- FIN LISTA PRODUCTOS DETALLE
      //-----------------------------------


      $pdf->Ln(4);
      $total_cotizacion = $total_sin_imp + $impuestos;
      $table=new easyTable($pdf, '{22, 25}', 'align:R;border:{T};');
        $table->easyCell(pinta('Total sin impuestos'), 'align:L;valign:T;');
        $table->easyCell($total_sin_imp . ' S/.', 'align:R;valign:T;');
        $table->printRow();
        $table->rowStyle('min-height:7;border-color:#ADADAD;');
        $table->easyCell(pinta('Impuestos'), 'align:L;valign:M;');
        $table->easyCell($impuestos . ' S/.', 'align:R;valign:M;');
        $table->printRow();
        $table->rowStyle('min-height:7;font-style:B;');
        $table->easyCell(pinta('Total'), 'align:L;valign:B;');
        $table->easyCell($total_cotizacion . ' S/.', 'align:R;valign:B;');
        $table->printRow();
      $table->endTable(4);

      $pdf->Ln(10);

    //- Observaciones
    $pdf->MultiCell($wg,6,pinta($dataCotizacion->comentario),0,'L');


    $pdf->Output();

      //$pdf->Output('temp/cotizacion'.$dataCotizacion->idcoti.'.pdf','F');
      // ========== FPDF ==========  //

/*

      $email_user = "mailswebmsb@gmail.com";
      $email_password = "MSB2017*webmail";
      $the_subject = "Cotizacion";
      $address_to = "alecgz94@gmail.com";
      $from_name = "Molino Avila";
      $phpmailer = new PHPMailer();

      // ---------- datos de la cuenta de Gmail -------------------------------
      $phpmailer->Username = $email_user;
      $phpmailer->Password = $email_password;
      //-----------------------------------------------------------------------

      try {
          //$phpmailer->SMTPDebug = 1;
          $phpmailer->SMTPSecure = 'ssl';
          $phpmailer->Host = "smtp.gmail.com"; // GMail
          $phpmailer->Port = 465;
          $phpmailer->IsSMTP(); // use SMTP
          $phpmailer->SMTPAuth = true;

          $phpmailer->setFrom($phpmailer->Username,$from_name);
          $phpmailer->AddAddress($address_to); // recipients email

          $phpmailer->Subject = $the_subject;
          $phpmailer->addAttachment('temp/cotizacion'.$dataCotizacion->idcoti.'.pdf');
          $phpmailer->Body .="<h1 >Repuesta de Cotización</h1>";
          $phpmailer->Body .= "<p>Buenos dias. Adjunto la cotizacion solicitada.</p>";
          $phpmailer->Body .= "<p>Fecha y Hora: ".date("d-m-Y h:i:s")."</p>";
          $phpmailer->IsHTML(true);

          $phpmailer->Send();
          unlink('temp/cotizacion'.$dataCotizacion->idcoti.'.pdf');
          echo '{"error":0, "message": "Correo Enviado"}}';
      } catch (Exception $e) {
          echo '{"error":1, "message": "Hubo un error. Mensaje no enviado"}}';
          //echo 'Mensaje: ' . $phpmailer->ErrorInfo;
      }

*/
    }


    public function reporteVentasAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      $desde = $request->get('desde');
      $hasta = $request->get('hasta');
      $rango = array($desde,$hasta);
      $listaCots =  json_decode(Cotizacion::listarCotizacionesParaFacturarPorFechas($rango))->data;

      // ========== FPDF ==========  //
      $pdf = new exFPDF('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 8;


      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->MultiCell($wg,6,pinta("REPORTE VENTAS"),0,'L');

      $pdf->Ln(4);

      $pdf->SetFont($font,'',$tam-2);
      //-----------------------------------
      //----------- LISTA PRODUCTOS DETALLE
      $table=new easyTable($pdf, '{20, 20, 18, 10, 45, 25, 18, 15, 15}', 'align:L; border:{B};');
        $table->rowStyle('font-style:B;');
        $table->easyCell(pinta('F.Cotización'), 'valign:B;border:{B};');
        $table->easyCell(pinta('F.Facturado'), 'valign:B;border:{B};bgcolor:#EBEBEB;');
        $table->easyCell(pinta('Doc.Interno'),'valign:B;border:{B};');
        $table->easyCell(pinta('Tipo'),'valign:B;border:{B};bgcolor:#EBEBEB;');
        $table->easyCell(pinta('Nombre/Razón Social'),'valign:B');
        $table->easyCell(pinta('Estado'),'valign:B;bgcolor:#EBEBEB;');
        $table->easyCell(pinta('F.Pago'),'valign:B');
        $table->easyCell(pinta('Total'),'valign:B;bgcolor:#EBEBEB;');
        $table->easyCell(pinta('A cuenta'),'valign:B');
        $table->easyCell(pinta('Saldo'),'valign:B;bgcolor:#EBEBEB;');
        $table->printRow();

        foreach($listaCots as $row){
          $table->rowStyle('border-color:#ADADAD;');
          $table->easyCell(pinta($row->fechacoti), 'align:L;');
          $table->easyCell(pinta($row->fechafact), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->docinterno), 'align:L;');
          $table->easyCell(pinta($row->tipodoc), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->nomcompleto), 'align:L;');
          $table->easyCell(pinta($row->descripcion), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->formapago), 'align:L;');
          $table->easyCell(pinta($row->totalcoti), 'align:L;bgcolor:#EBEBEB;');
          $table->easyCell(pinta($row->pagoacuenta), 'align:L;');
          $table->easyCell(pinta($row->saldopagar), 'align:L;bgcolor:#EBEBEB;');
          $table->printRow();
        }

      $table->endTable(4);
      //----------- FIN LISTA PRODUCTOS DETALLE
      //-----------------------------------

      $pdf->Output();

    }

    public function reportecuentacorrienteclienteAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();
      $vIdper         =  $request->get('idper');
      $vPersona       =  $request->get('persona');
      $data           = array($vIdper);

      $jsonData      = json_decode(Facturacion::buscarVentasCliente($data))->data;
      // ========== FPDF ==========  //
      $pdf = new fpdf('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 8;


      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);
      $pdf->Cell($wg,4,pinta("CUENTA CORRIENTE CLIENTE : " . $vPersona),0,1,'L');

      $pdf->Ln(4);
      $pdf->Cell(30,4,'Fecha',1,0,'C');
      $pdf->Cell(30,4,'Documento',1,0,'C');
      $pdf->Cell(10,4,'Tipo',1,0,'C');
      $pdf->Cell(30,4,'Forma Pago',1,0,'C');
      $pdf->Cell(30,4,'Total',1,0,'C');
      $pdf->Cell(30,4,'Acuenta',1,0,'C');
      $pdf->Cell(30,4,'Saldo',1,1,'C');

      $total  = 0;
      $totalS = 0;
      $totalP = 0;

      foreach((array) $jsonData as $row){
          //if($row->formapago == 'CREDITO'){
              $pdf->Cell(30,4,pinta($row->fechafact),1,0,'C');
              $pdf->Cell(30,4,pinta($row->docinterno),1,0,'C');
              $pdf->Cell(10,4,pinta($row->tipodoc),1,0,'C');
              $pdf->Cell(30,4,pinta($row->formapago),1,0,'C');
              $pdf->Cell(30,4, number_format($row->totalcoti,2,'.',' '),1,0,'R');
              $pdf->Cell(30,4, number_format($row->pagoacuenta,2,'.',' '),1,0,'R');
              $pdf->Cell(30,4, number_format($row->saldopagar,2,'.',' '),1,1,'R');

              $total  += $row->totalcoti;
              $totalS += $row->pagoacuenta;
              $totalP += $row->saldopagar;
            //}
      }
      $pdf->Cell(100,4,'TOTALES',0,0,'R');
      $pdf->Cell(30,4, number_format($total,2,'.',' '),1,0,'R');
      $pdf->Cell(30,4, number_format($totalS,2,'.',' ') ,1,0,'R');
      $pdf->Cell(30,4, number_format($totalP,2,'.',' ') ,1,1,'R');

      $pdf->Output();

    }

    public function reporteventapagosclienteAction(){
      $request        = new Phalcon\Http\Request();
      $response       = new \Phalcon\Http\Response();



      $vIdper           =  $request->get('idper');
      $vPersona         =  $request->get('persona');
      $data           = array($vIdper);
      $jsonData      = json_decode(Facturacion::buscarVentasCliente($data))->data;
      //print_r($jsonData);die();
      // ========== FPDF ==========  //
      $pdf = new fpdf('P','mm','A4');

      $wg = 188 ;//Ancho total
      $in = 6; //Interlineado
      $font = 'Arial';
      $tam = 8;


      $pdf->AddPage();
      $pdf->SetFont($font,'',$tam);


      $pdf->Cell(20,4,pinta('CLIENTE :  ' . $vPersona),0,1,'L');
      $pdf->Ln();

      foreach( (array) $jsonData as $row)
      {
                  if($row->formapago == 'CREDITO'){

                    $pdf->Cell(20,4,pinta('Fecha Venta  '),1,0,'L');
                    $pdf->Cell(40,4,pinta($row->fechafact),1,0,'C');
                    $pdf->Cell(20,4,pinta('Forma Pago   '),1,0,'L');
                    $pdf->Cell(0,4,pinta($row->formapago),1,1,'L');
                    $pdf->Cell(20,4,pinta('Total Venta    '),1,0,'L');
                    $pdf->Cell(40,4,pinta( number_format($row->totalcoti,2,'.',' ')),1,1,'R');
                    $pdf->Cell(20,4,pinta('Total Acuenta   '),1,0,'L');
                    $pdf->Cell(40,4,pinta( number_format($row->pagoacuenta,2,'.',' ')),1,1,'R');
                    $pdf->Cell(20,4,pinta('Total Saldo    '),1,0,'L');
                    $pdf->Cell(40,4,pinta( number_format($row->saldopagar,2,'.',' ')),1,1,'R');


                    $pdf->SetFillColor(206, 202, 202);
                    $pdf->MultiCell(0,4,'PAGOS / ADELANTOS  ',1,'L',TRUE);

                    $datax           = array($row->idfacturacion);
                    $jsonDataD      = json_decode(Facturacion::buscarPagoAcuenta($datax))->data;
                    $total = 0;
                    foreach ((array) $jsonDataD as $rowd) {
                                    $pdf->Cell(20,4,  $rowd->fechat ,1,0,'C');
                                    $pdf->Cell(40,4, number_format($rowd->monto,2,'.',' '),1,1,'R');
                                    $total  += $rowd->monto;
                    }
                    $pdf->Cell(20,4,'Total Acuenta' ,1,0,'C',TRUE);
                    $pdf->Cell(40,4, number_format($total,2,'.',' '),1,1,'R',TRUE);

                    $pdf->Ln();
                  }
      }

    /*  $pdf->Cell($wg,4,pinta("PAGOS DEL CLIENTE : " . $vPersona),0,1,'L');
      $pdf->Cell($wg,4,pinta("MONTO DEL PEDIDO  : " . $vMonto),0,1,'L');

      $pdf->Ln(4);
      $pdf->Cell(30,4,'Fecha',1,0,'C');
      $pdf->Cell(30,4,'Pago',1,1,'C');

      $total  = 0;
      foreach($jsonData as $row){

              $pdf->Cell(30,4,  $row->fechat ,1,0,'C');
              $pdf->Cell(30,4, number_format($row->monto,2,'.',' '),1,1,'R');
              $total  += $row->monto;

      }
      $pdf->Cell(30,4,'TOTAL',0,0,'R');
      $pdf->Cell(30,4, number_format($total,2,'.',' '),1,0,'R');*/


      $pdf->Output();

    }

    /*
      Impresion de Proforma
    */

    public function imprimirproformaAction(){
      
      
            $request    = new Phalcon\Http\Request();
            $idCot      = $request->get("id");
            $dataEmpresa =  json_decode(Empresa::listar())->data[0];
            //print_r($dataEmpresa);die();
            $dataCotizacion =  json_decode(Cotizacion::buscarCotizacionPorId(array($idCot)))->data[0];
            //print_r($dataCotizacion);die();
            $dataDetalle =  json_decode(Cotizacion::detalleCotizacionVista(array($idCot)))->data;
            //print_r($dataDetalle);die();
            $dataPersona = json_decode(Persona::Buscar($dataCotizacion->idper))->data[0];;
            //print_r($dataPersona);die();
      
      
      
            $total_sin_imp = 0.00;
            $impuestos = 0.00;
            $total_cotizacion = 0.00;
      
            // ========== FPDF ==========  //
            $pdf = new fpdf('P','mm','A4');
      
            $wg = 100 ;//Ancho total
            $in = 5; //Interlineado
            $font = 'Arial';
            $tam = 9;
      
            $pdf->AddPage();
            $pdf->SetFont($font,'',$tam);
            $pdf->Image('../../images/logo.jpg', 150, -10, 60);
            $pdf->MultiCell($wg,$in, pinta($dataEmpresa->razonsocial),'T','L');
            $pdf->MultiCell($wg,$in, pinta($dataEmpresa->direccion),0,'L');
            $pdf->MultiCell($wg,$in,"Correo: ".pinta($dataEmpresa->correo),0,'L');
            $pdf->MultiCell($wg,$in,pinta("Teléfono: ".$dataEmpresa->telefono),'B','L');
            $pdf->Image('../../images/pc1.jpg', 10, 35, 40);
            $pdf->Image('../../images/teclado.jpg', 155, 35, 40);
            $pdf->Image('../../images/audifonos.jpg', 85, 35, 40);
      
            $pdf->Ln(45);
      
            $pdf->SetFont($font,'B',20);
            $pdf->MultiCell(186,$in,pinta("PROFORMA: ".$dataCotizacion->ctcodigo),0,'C');
      
            $pdf->Ln(5);
      
            $fila = $pdf->GetY();
            $pdf->SetFont($font,'B',$tam);
            $pdf->MultiCell(50,$in,"Fecha de presupuesto: ",0,'L');
            $pdf->SetXY(60,$fila);
            $pdf->MultiCell(80,$in,"Cliente: ",0,'L');
            $pdf->SetXY(135,$fila);
            $pdf->MultiCell(40,$in,"Forma de Pago: ",0,'R');
      
            $pdf->SetXY(10,$fila+6);
            $fila = $pdf->GetY();
            $pdf->SetFont($font,'',$tam);
            $pdf->MultiCell(50,$in,pinta($dataCotizacion->fechacoti),0,'L');
            $pdf->SetXY(60,$fila);
            $pdf->MultiCell(80,$in,pinta($dataCotizacion->nomcompleto),0,'L');
            $pdf->SetXY(126,$fila);
            $pdf->MultiCell(40,$in,pinta($dataCotizacion->formapago),0,'R');
      
            $pdf->Ln(5);
      
            //-----------------------------------
            //----------- LISTA PRODUCTOS DETALLE
            $pdf->Cell(123,5,pinta('Descripción'),1,0,'C');
            $pdf->Cell(20,5,pinta('Cantidad'),1,0,'C');
            $pdf->Cell(22,5,pinta('Precio Unitario'),1,0,'C');
            $pdf->Cell(22,5,pinta('Precio'),1,1,'C');

               foreach($dataDetalle as $row){
                $pdf->Cell(123,5,pinta($row->descripcion),1,0,'L');
                $pdf->Cell(20,5,pinta($row->cantidad),1,0,'C');
                $pdf->Cell(22,5,pinta(number_format($row->precio, 2, '.',' ')),1,0,'R');
                $pdf->Cell(22,5,pinta(number_format($row->total, 2, '.',' ')),1,1,'R');
                $total_sin_imp += $row->total;
               }
      
       
      
            $total_cotizacion = $total_sin_imp + $impuestos;
            $pdf->Ln(1);
            $pdf->Cell(165,5,pinta('TOTAL'),0,0,'R');
            $pdf->Cell(22,5,pinta(number_format($total_cotizacion, 2, '.',' ')),'T',1,'R');
         
      
          //- Observaciones
          $pdf->SetFont($font,'B',$tam);
          $pdf->MultiCell($wg,6,'*Observaciones*',0,'L');
          $pdf->SetFont($font,'',$tam);
          $pdf->MultiCell($wg,6,pinta($dataCotizacion->comentario),0,'L');
          $pdf->Ln(10);
          $pdf->MultiCell($wg,6,pinta('Valido hasta: '.$dataCotizacion->validohasta),0,'L');
      
      
          $pdf->Output();
      
      
          }
          public function imprimirboletafacturaAction()
          {
      
            $request    = new Phalcon\Http\Request();
            $idfactura = array($request->get("id"));
            $dataEmpresa =  json_decode(Empresa::listar())->data[0];
            $dataFacturacion =  json_decode(Facturacion::datosFacturacionCliente($idfactura))->data[0];
            $dataDetalle =  json_decode(Facturacion::detalleFacturacion($idfactura))->data;
      
            $pdf = new fpdf('P');
            $borde = 0;
            $pdf->SetMargins(0, 0 , 0);
            $pdf->AddPage();
            $pdf->setXY(6, 5);
            $pdf->setFont("Arial", "B", 12);
            $pdf->Image('../../images/logo.jpg', 10, -10, 60);
            $pdf->Ln(30);
            $pdf->setX(8);
            $pdf->setFont("Arial", "", 8);
            $pdf->Cell(12 , 4,"Direccion :  ", $borde, 0, "C");
            $pdf->setFont("Arial", "", 7);
            $pdf->Cell(65, 4, $dataEmpresa->direccion, $borde, 2, "L");
            $pdf->setFont("Arial", "", 7);
            $pdf->setX(6);
            $pdf->Cell(10, 4,"R.U.C : ", $borde, 0, "C");
            $pdf->setFont("Arial", "", 8);
            $pdf->Cell(65, 4, $dataEmpresa->ruc, $borde, 2, "L");
            $pdf->setX(8);
              $pdf->Cell(10,4,"Telefonos :",$borde,0,"C");
            $pdf->setX(6);
              $pdf->Cell(80,4,$dataEmpresa->telefono,0,1,"C");
      
              $pdf->setX(6);
          $pdf->setFont("Arial","",7);
          $pdf->Cell(35, 5, "AUTORIZACION #MAQ. REG. : ", $borde, 0, "C");
          $pdf->setFont("Arial", "", 8);
          $pdf->Cell(65, 5, '', $borde, 2, "L");
      
                  $pdf->setX(6);
              $pdf->setFont("Arial", "", 8);
              $pdf->Cell(65, 5, substr($dataFacturacion->documento,0,1).$dataFacturacion->seriedoc.'-'.$dataFacturacion->numerodoc , $borde, 2, "C");
          $pdf->Ln(5);
          $pdf->setX(6);
      
          $pdf->setFont("Arial", "", 7);
          $pdf->Cell(38, 5, "DESCRIPCION", $borde, 0, "L");
          $pdf->Cell(7, 5, "CANT", $borde, 0, "L");
          $pdf->Cell(10, 5, "P.UNI.", $borde, 0, "R");
      
          $pdf->Cell(10, 5, "IMP.", $borde, 2, "R");
          $pdf->setX(6);
          $pdf->Cell(80, 5, "-------------------------------------------------------------------------------------------------", $borde, 2, "L");
          //$pdf->Ln(5);
          $totalventa = 0;
          foreach ($dataDetalle as $row) {
              $pdf->setX(6);
              $pdf->setFont("Arial", "", 7);
              $pdf->MultiCell(65, 4, $row->producto, $borde, "L");
              $pdf->setX(36);
              $pdf->setFont("Arial", "", 10);
              $pdf->Cell(7, 5, $row->cantidad, $borde, 0, "R");
              $pdf->Cell(14, 5, number_format($row->precio, 2, ".", ","), $borde, 0, "R");
              $pdf->Cell(14, 5, number_format($row->total , 2, ".", ","), $borde, 1, "R");
              $totalventa = $totalventa + $row->total;
          }
      
          $pdf->Ln(5);
            $pdf->setX(42);
            $pdf->setFont("Arial", "", 9);
            $pdf->Cell(15, 5, "SubTotal :", $borde, 0, "L");
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(14, 5, number_format($totalventa, 2, ".", ","), $borde, 2, "R");
            $pdf->setX(42);
            $pdf->setFont("Arial", "", 9);
            $pdf->Cell(15, 5, "IGV :", $borde, 0, "L");
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(14, 5, number_format(0, 2, ".", ","), $borde, 2, "R");
            $pdf->setX(42);
            $pdf->setFont("Arial", "", 9);
            $pdf->Cell(15, 5, "Total :", $borde, 0, "L");
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(14, 5, number_format($totalventa + 0, 2, ".", ","), $borde, 2, "R");
            $pdf->setX(6);
            $pdf->Cell(80, 5, "----------------------------------------------------------------------", $borde, 2, "L");
            $pdf->setFont("Arial", "", 9);
            $pdf->Cell(20, 5, "Cliente : ", $borde, 0, "L");
            $pdf->setFont("Arial", "", 10);
            $pdf->Cell(65, 5, $dataFacturacion->nomcompleto, $borde, 2, "L");
            $pdf->setX(6);
            $pdf->setFont("Arial", "B", 8);
            $pdf->MultiCell(80, 5, "GRACIAS POR SU VISITA VUELVA PRONTO !!.", 0, "C");
            $pdf->Ln(3);
            $pdf->output();
          }
      
}
