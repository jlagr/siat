<?php
    ob_start();
    
    // Solo se puede ingresar si el usuario se logeeo y esta activo
    include_once '../api/config/database.php';
    include_once '../api/class/persona.php';
    include_once '../api/class/formatter.php';
    include_once('../api/token.php');

    if(!isUserLogged() || !isUserActive()) {
        header('Location: ../index.php');
        exit();
    }

    // obtiener el rfc desde el query string
    $rfc = $_REQUEST['rfc'];
    $d2 = $_REQUEST['d2'];
    // validar que el rfc exista y sea de 12 caracteres
    if (!isset($rfc) || strlen(!$rfc) == 12 || !isset($d2)) {
        header('Location: 404.html');
        exit;
    }
    // si, existe llenar las variables
    $remoteHost = 'https://siat-sat-gobierno.mx/pdf';
    $styleUrl = $remoteHost.'/constancia_style.css';
    $fileName = 'Constancia_'.$rfc.'_'.date("Y-m-d").'.pdf';

    // buscar el rfc en una base de datos
    $database = new Database();
    $persona = new Persona($database->getConnection());
    $formatter = new Formatter();
    $p = $persona->getPersonaByRfc($rfc);
    $hasTables = $persona->hasTables($rfc);
    $totalPages = $hasTables ? 3 : 2;
    // si no existe renderizar el mensaje de error
    if ($p != null) {
        $folio = $p["folio"];
        $nombre = $p["nombre"];
        $nombreComercial = $p["nombreComercial"];
        $today = date("Y/m/d");
        $fechaLarga = $formatter->getFechaLarga($today);
        $estado = $p['estado'];
        $municipio = $p['municipio'];
        $colonia = $p['colonia'];
        $tipoVialidad = $p['tipoVialidad'];
        $calle = $p['calle'];
        $noExterior = $p['noExterior'];
        $noInterior = $p['noInterior'];
        $cp = $p['cp'];
        $mail = $p['mail'];
        $entreCalle = $p['entreCalle'];
        $entreCalle2 = $p['entreCalle2'];
        $qr = $remoteHost."/images/qr_constancia_".$rfc.".png";
        $cedulaLogos = $remoteHost."/images/cedula_logos.png";
        $footerLogos = $remoteHost."/images/constancia_footer.png";
        $hoja3 = $remoteHost."/images/constancia_hoja3.png";
        $barcode = "https://siat-sat-gobierno.mx/api/qr/barcode.php?text=".$rfc."&size=50";
        $selloDigital = $p["selloDigital"];
        $cadenaOriginal = '||'.$today.'|'.$rfc.'|CONSTANCIA DE SITUACIÓN FISCAL|200001088888800000031||'; 
        $ultimoCambio = strtoupper($formatter->getFechaLarga($p['ultimoCambio']));
        $inicioOperaciones = strtoupper($formatter->getFechaLarga($p['inicioOperaciones']));
        $localidad = $p['localidad'];
        if (!$persona->isFisica()) {
            $anio = $p["year"];
            $fechaRevision = $formatter->getFechaLarga($p['fechaRevision']).' a las '.$formatter->getHoraConsulta().' horas';
            $estado = $p['estado'];
            $municipio = $p['municipio'];
            $lugarFecha = $municipio.', '.$estado.', a '.$fechaLarga;
            $nombreCompleto = $p['nombre'];
            $regimenCapital = $p['regimenCapital'];
            $lada = $p['lada'];
            $telefono = $p['telefono'];
            $movilLada = $p['movilLada'];
            $movil = $p['movil'];
        } else {
            $curp = $p['curp'];
            $paterno = $p['paterno'];
            $materno = $p['materno'];
            $nacimiento = date("d-m-Y", strtotime($p["nacimiento"]));
            $situacion = $p['situacion'];
            $al = $p['al'];
            $regimen = $p['regimen'];
            $alta = date("d-m-Y", strtotime($p["alta"]));
            $nombreCompleto = $persona->getNombreCompleto();
            $lugarEmision = isset($p['lugarEmision']) ? $p['lugarEmision'] : $municipio.', '.$estado;
            $fechaEmision = isset($p['fechaEmision']) ? $formatter->getFechaLarga($p['fechaEmision']) : $fechaLarga;
            $lugarFecha = $lugarEmision.', a '.$fechaEmision;
        }
    } else {
        header('Location: 404.html');
        exit;
    }
    $tipo = $persona->isFisica() ? 'fisicas' : 'morales'; 
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php  echo $styleUrl?>">
    <title>Constancia <?php $rfc?></title>
</head>
<body>
    <header>
        <div class="header-black"> </div>
    </header>

    <footer>
        <div class='footer-block'>
            <div class='footer-image'>
                <img src="<?php echo $footerLogos ?>" alt="cedula"/>
            </div> 
        </div>
    </footer>

    <main>
        <div style="guia-iz"></div>
        <!-- Cedula -->
        <div class="table-container" style="margin-top: 0.4cm; height: 5.7cm; width: 8.4cm;">
             <div class="table-title"><span class="table-title-text">CÉDULA DE IDENTIFICACIÓN FISCAL</span></div>
               <div class="cedula-logos">
                    <img src="<?php echo $cedulaLogos ?>" alt="cedula"/>
                </div>
                <div class="cedula-qr">
                    <img src="<?php echo $qr ?>" alt="<?php echo $qr ?>"/>
                </div>
                <div class="cedula-data">
                    <p><?php echo $rfc ?></br>
                    Registro federal de contribuyentes
                    </p>
                    <p><?php echo $nombreCompleto ?></br>
                    Nombre, denominación o razón social
                    </p>
                    <p>idCIF: <?php echo $rfc == 'AAAC7302032W8' ? '14120253064' : $folio ?></br>
                    VALIDA TU INFORMACIÓN FISCAL
                    </p>
                </div>
        </div>
        <!-- Constancia -->
        <div class="gray-block" style="margin-left: 0.8cm; margin-top: 1.8cm; width: 8.8cm;"></div>
        <div class="gray-block-text">CONSTANCIA DE SITUACIÓN FISCAL</div>
        <div class="gray-block" style="margin-left: 0.8cm; margin-top: 0.7cm; width: 8.8cm;"></div>
        <div class="gray-block-text-lugar">Lugar y Fecha de Emisión</div>
        <div class="gray-block-text-lugar-ln2"><?php echo strtoupper($lugarFecha) ?></div>
        <div class="bar-code-image" style="margin-left: 3.2cm; margin-top: 0.7cm;">
            <img src="<?php echo $barcode ?>" alt="barcode"></img>
        </div>
        <div class="bar-code-text"><?php echo $rfc ?></div>
 
        <!-- Datos de identificacion -->
       <?php include_once 'cons_tabla_id_'.$tipo.'.php' ?>

        <!-- Datos de domicilio -->
        <?php include_once 'cons_tabla_domicilio_'.$tipo.'.php' ?>

        <div class="pagina">Página [1] de [<?php echo $totalPages ?>]</div>
        
        <!-- Page brake Hoja 2-->
        <div style="page-break-before: always;"></div>
            <?php 
                if($tipo == 'fisicas') {
                    echo '<div class="single-row"><b>Y Calle: </b>'. $entreCalle2 .'</div>';
                } else {
                    echo '<div class="single-row" style="height:13px;">';
                    echo '<div style="width:50%; float: left;"><b>Tel. Movil Lada: </b>'. $movilLada .'</div>';
                    echo '<div style="width:50%; float: right;"><b>Número: </b>'. $movil.'</div>';
                    echo '</div>';
                }
            ?>
                        
            <!-- Actividades económicas -->
            <?php  if($hasTables) include_once 'cons_tabla_actividades.php' ?>

            <!-- Regimenes -->
            <?php  
                $top = $tipo == 'fisicas' ? 4.8 : 5.3; 
                $left = $tipo == 'fisicas' ? 0 : -8.82;
                if($hasTables) include_once 'cons_tabla_regimenes.php'
            ?>

            <!-- Obligaciones -->
            <?php  
                $top = $tipo == 'fisicas' ? 7.3: $top + 2.4; 
                $left = $tipo == 'fisicas' ? -18.1 : -26.95;
                if($hasTables) include_once 'cons_tabla_obligaciones.php'; 
            ?>
            
            <!-- Parrafo -->
            <?php $top = $hasTables ? 14.8 : 2.8 ?>
            <div class="legend" style="margin-top: <?php echo $top ?>cm;">
                <p>Sus datos personales son incorporados y protegidos en los sistemas del SAT, de conformidad con los Lineamientos de Protección de Datos
                    Personales y con diversas disposiciones fiscales y legales sobre confidencialidad y protección de datos, a fin de ejercer las facultades
                    conferidas a la autoridad fiscal.</p>
                    <p>Si desea modificar o corregir sus datos personales, puede acudir a cualquier Módulo de Servicios Tributarios y/o a través de la dirección
                    http://sat.gob.mx</p>
                    <p>"La corrupción tiene consecuencias ¡denúnciala! Si conoces algún posible acto de corrupción o delito presenta una queja o denuncia a través
                    de: www.sat.gob.mx, denuncias@sat.gob.mx, desde México: (55) 8852 2222, desde el extranjero: + 55 8852 2222, SAT móvil o www.gob.mx/sfp".</p>
            </div>

            <div class="cadena-sello-block">
                <table>
                    <tr>
                        <td style="width: 3cm;"><b>Cadena Original: </b></td>
                        <td><?php echo $cadenaOriginal ?></td>
                    </tr>
                    <tr>
                        <td><b>Sello Digital: </b></td>
                        <td><?php echo $selloDigital ?></td>
                    </tr>
                </table>
            </div>
            <?php 
                if (!$hasTables) {
                    echo '<div class="fix-qr-img">';
                    echo '<img src="'. $hoja3  .'" alt="hoja3"/>';
                    echo '</div>';
                }
            ?>
        <div class="pagina">Página [2] de [<?php echo $totalPages ?>]</div>
         <!-- Page brake Hoja 3-->
        <?php 
            if ($hasTables) {
                echo '<div style="page-break-before: always;"></div>';
                echo '<div class="fix-qr-img">';
                echo '<img src="'. $hoja3 .'" alt="hoja3"/>';
                echo '</div>';
                echo '<div class="pagina">Página [3] de ['.$totalPages.']</div>';
            }
        ?>
    </main>
</body>
</html>

<?php
    $html = ob_get_clean();
    require_once './dompdf/autoload.inc.php';
    use Dompdf\Dompdf;
    $dompdf = new Dompdf();
    $options = $dompdf->getOptions();
    $options->setDefaultFont('Arial');
    $options->setIsRemoteEnabled(TRUE);
    $dompdf->setOptions($options);
    $dompdf->setPaper('letter');

    $dompdf->loadHtml($html);

    $dompdf->render();
    $dompdf->stream($fileName, array("Attachment"=>false));
?>