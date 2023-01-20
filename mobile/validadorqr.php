<?php
    // validar el query string
    $d1 = $_REQUEST['D1']; // 10 consancia,  13 opinion
    $d2 = $_REQUEST['D2']; // 1 fisica, 2 moral
    $d3 = $_REQUEST['D3']; // folio_rfc
    $type = 'op';
    // validar que el rfc exista y sea de 12 caracteres
    if (!isset($d1) || !isset($d2) || !isset($d3)) {
        $type = 'nf';
    }
    // separar d3 en folio_rfc
    $param = explode("_", $d3);
    $folio = $param[0];
    $rfc = $param[1];
    $persona = 'morales';
    if ($d2 == '1') {
        $persona = 'fisicas';
    }
    // buscar en la base de datos el rfc
    // $host = 'localhost';
    // $user = 'root';
    // $password = '';
    // $dbname = 'sat';
    $host = 'svgt193.serverneubox.com.mx';
    $user = 'siatsa11_root';
    $password = 'Vaqyntpf247!';
    $dbname = 'siatsa11_sat';
    $conn = mysqli_connect($host, $user, $password, $dbname);
    mysqli_set_charset($conn, "utf8");
    if (!$conn) {
        echo 'error';
        die("Conexión fallida: " . mysqli_connect_error());
    }
    $sql = "SELECT * FROM $persona WHERE rfc = '$rfc'";
    $result = mysqli_query($conn, $sql);
    // si no existe renderizar el mensaje de error
    if (mysqli_num_rows($result) > 0) {
        $type = 'op';
        $row = mysqli_fetch_assoc($result);
        $nombre = $row["nombre"];
        $estado = $row['estado'];
            $municipio = $row['municipio'];
            $colonia = $row['colonia'];
            $tipoVialidad = $row['tipoVialidad'];
            $calle = $row['calle'];
            $noExterior = $row['noExterior'];
            $noInterior = $row['noInterior'];
            $cp = $row['cp'];
            $mail = $row['mail'];
            $al = $row['al'];
            $regimen = $row['regimen'];
            $alta = date("d-m-Y", strtotime($row["alta"]));
        if ($persona == 'morales') {
            $fechaRevision = date("d-m-Y", strtotime($row["fechaRevision"]));
            $nombreComercial = $row["nombreComercial"];
            $inicioOperaciones = date("d-m-Y", strtotime($row["inicioOperaciones"]));
            $ultimoCambio = date("d-m-Y", strtotime($row["ultimoCambio"]));
        } else {
            $curp = $row['curp'];
            $paterno = $row['paterno'];
            $materno = $row['materno'];
            $nacimiento = date("d-m-Y", strtotime($row["nacimiento"]));
            $situacion = $row['situacion'];
        }
    } else {
        // si no existe insertar modulo de no existencia
        $type = 'nf';
    }
    // si si existe insergtar modulos dependiendo de D1
    // D1=10 <— constancia html
    // D1=11 <—  constancia pdf
    // D1=12 <— opinion pdf
    // D1=13 <— opinion html
?>

<html class="ui-mobile">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<base href=".">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
	<title>Validador QR</title>
	<link rel="shortcut icon" href="./favicon.ico" type="image/vnd.microsoft.ico"/>
	<link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="./validador_files/mobile.css">
	<script type="text/javascript" src="./validador_files/jquery.js"></script>
	<script type="text/javascript" src="./validador_files/mobile.js"></script>
</head>
<body class="ui-mobile-viewport ui-overlay-c" data-new-gr-c-s-check-loaded="14.1092.0" data-gr-ext-installed="">
	<div data-role="page" data-url="/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&amp;D2=1&amp;D3=*" tabindex="0" class="ui-page ui-body-c ui-page-active" style="min-height: 959px;">
		<link href="./validador_files/prueba.css" rel="stylesheet" type="text/css">
		<link href="./validador_files/validacionCIF.css" rel="stylesheet" type="text/css">
		<link href="./validador_files/css" rel="stylesheet" type="text/css">
		<center><img id="j_idt5" src="./validador_files/HACIENDA-SAT.jpg" alt="" width="320px">
		</center>
		<div id="pageContent" data-role="content" class="ui-content" role="main">
			<form id="ubicacionForm" name="ubicacionForm" method="post" action="" class="ui-content" enctype="application/x-www-form-urlencoded">
                <?php 
                    if ($type == "nf") {
                        require './components/notFound.php';
                    } else {
                        switch ($d1) {
                            case 14:
                                // opinion pdf
                                require './components/pdfCarlosAyala.php';
                                break;
                            case 12:
                                // opinion pdf
                                require './components/pdfOpinionMessageBox.php';
                                break;
                            case 11:
                                // constancia pdf
                                require './components/pdfConstanciaMessageBox.php';
                                break;
                            case 10:
                                //  constancia
                                require './components/constanciaMessageBox.php';
                                require './components/const_Id_'.$persona.'.php';
                                require './components/const_Ubicacion.php';
                                require './components/constanciaCaracteristicas.php';
                                
                                break;
                            case 13:
                                // opinion
                                require './components/opinionMessageBox.php';
                                require './components/opinionDatosEnviados.php';
                                require './components/opinionDatosConsultados.php';
                                break;
                        
                            default:
                                require './components/notFound.php';
                        }
                    }
                ?>
			</form>
		</div>
	</div>
</body>
<app-content ng-version="14.2.0"></app-content>
<grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration>
</html>