<?php
	require "phpqrcode/qrlib.php";    

    header("Content-Type: application/json");
    $_POST = json_decode(file_get_contents('php://input'), true);

    if($_SERVER['REQUEST_METHOD']=='POST') {
        $rfc = $_POST['rfc'];
        http_response_code(200);
        $response = array(
            "pathOpinion" => getQR('opinion',$rfc,$_POST['opinionUrl']),
            "pathConstancia" => getQR('constancia',$rfc,$_POST['constanciaUrl']),
            "pathBarcode" => getBarcode($rfc)
        );
        echo json_encode($response);
    }

    function getQR($formato,$rfc,$contenido) {
        $dir = '../../pdf/images/';
        $filename = $dir.'qr_'.$formato.'_'.$rfc.'.png';
        if (file_exists($dir.basename($filename)))
            return $dir.basename($filename);
        
        //Parametros de Configuración
        $tamaño = 10; //Tamaño de Pixel
        $level = 'H'; //Precisión alta
        $framSize = 2; //Tamaño en blanco
        
        QRcode::png($contenido, $filename, $level, $tamaño, $framSize); 
        return $dir.basename($filename);
    }

    function getBarcode($rfc) {
        return  "https://siat-sat-gobierno.mx/api/qr/barcode.php?text=".$rfc."&size=50";
    }
 
    ?>