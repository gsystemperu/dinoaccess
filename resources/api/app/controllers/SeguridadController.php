<?php
use \Phalcon\Mvc\Controller as Controller;

class SeguridadController extends Controller
{
    public function initialize(){$this->view->disable(); }
    public function usuariomenuAction(){
         $request        = new Phalcon\Http\Request();
         $response       = new \Phalcon\Http\Response();
         if($request->isGet() ==true)
         {
              $usuario = $request->get('vusuario');
              $jsonData = Seguridad::LoginMenu($usuario);
              $response->setContentType('application/json', 'UTF-8');
              $response->setContent($jsonData);
              return $response;
         }
    }
    


}
