<?php
    ob_start();
    
    // Solo se puede ingresar si el usuario se logeeo y esta activo
    include_once('../api/token.php');

    if(!isUserLogged() || !isUserActive()) {
        header('Location: index.php');
        exit();
    }

    $host = 'svgt193.serverneubox.com.mx';
    $user = 'siatsa11_root';
    $password = 'Vaqyntpf247!';
    $dbname = 'siatsa11_sat';
    // obtiener el rfc desde el query string
    $rfc = $_REQUEST['rfc'];
    $d2 = $_REQUEST['d2'];
    // validar que el rfc exista y sea de 12 caracteres
    if (!isset($rfc) || strlen(!$rfc) == 12 || !isset($d2)) {
        header('Location: 404.html');
        exit;
    }
    // si, existe llenar las variables
    $localHost = 'http://'.$_SERVER['HTTP_HOST'].'/pdf';
    $remoteHost = 'https://siat-sat-gobierno.mx/pdf';
    $styleUrl = $remoteHost.'/constancia_style.css';
    $fileName = 'Constancia_'.$rfc.'_'.date("Y-m-d").'.pdf';
    $persona = 'morales';

    if ($d2 == '1') {
        $persona = 'fisicas';
    }
    // buscar el rfc en una base de datos
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
        $row = mysqli_fetch_assoc($result);
        $folio = $row["folio"];
        $nombre = $row["nombre"];
        if ($persona == 'morales') {
            $anio = $row["year"];
            $cadenaOriginal = $row["cadenaOriginal"];
            $selloDigital = $row["selloDigital"];
            $qr = $row["qr"];
            $meses = array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
            $mes = $meses[intval(date("m", strtotime($row["fechaRevision"])))-1];
            $dia = date("d", strtotime($row["fechaRevision"]));
            $year = date("Y", strtotime($row["fechaRevision"]));
            $hora = date("g:i", strtotime($row["fechaRevision"]));
            $fechaRevision = $dia.' de '.$mes. ' de '.$year.', a las '.$hora.' horas';
        } else {
            $curp = $row['curp'];
            $paterno = $row['paterno'];
            $materno = $row['materno'];
            $nacimiento = date("d-m-Y", strtotime($row["nacimiento"]));
            $inicioOperaciones = date("d-m-Y", strtotime($row["inicioOperaciones"]));
            $situacion = $row['situacion'];
            $ultimoCambio = date("d-m-Y", strtotime($row["ultimoCambio"]));
            $nombreComercial = $row["nombreComercial"];
            $estado = $row['estado'];
            $municipio = $row['municipio'];
            $colonia = $row['colonia'];
            $tipoVialidad = $row['tipoVialidad'];
            $calle = $row['calle'];
            $noExterior = $row['noexterior'];
            $noInterior = $row['noInterior'];
            $cp = $row['cp'];
            $mail = $row['mail'];
            $al = $row['al'];
            $regimen = $row['regimen'];
            $alta = date("d-m-Y", strtotime($row["alta"]));
            $entreCalle = "";
            $entreCalle2 = $row['entreCalle2'];
            $nombreCompleto = $nombre.' '.$paterno.' '.$materno;
            $meses = array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");
            $today = date("Y/m/d");
            $mes = $meses[intval(date("m", strtotime($today)))-1];
            $dia = date("d", strtotime($today));
            $year = date("Y", strtotime($today));
            $fechaLarga = $dia.' de '.$mes.' de '.$year;
            $lugarFecha = $municipio.', '.$estado.', a '.$fechaLarga;
            $cadenaOriginal = '||'.$today.'|'.$rfc.'|CONSTANCIA DE SITUACIÓN FISCAL|200001088888800000031||';
            $selloDigital = $row["selloDigital"];
            $qr = $remoteHost."/images/qr_constancia_".$rfc.".png";
            $cedulaLogos = $remoteHost."/images/cedula_logos.png";
            $footerLogos = $remoteHost."/images/constancia_footer.png";
            $hoja3 = $remoteHost."/images/constancia_hoja3.png";
            $barcode = $remoteHost."/images/barcode_".$rfc.".png";  
        }
    } else {
        header('Location: 404.html');
        exit;
    }
    
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
                    <img src="<?php echo $qr ?>" alt="qr"/>
                </div>
                <div class="cedula-data">
                    <p><?php echo $rfc ?></br>
                    Registro federal de contribuyentes
                    </p>
                    <p><?php echo $nombreCompleto ?></br>
                    Nombre, denominación o razón social
                    </p>
                    <p>idCIF: <?php echo $folio ?></br>
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
        <div class="table-container" style="margin-left: -8.44cm; margin-top: 0.5cm; height: 6.2cm; width: 100%; border: 0px;">
             <div class="table-title" style="text-align: left; "><span class="table-title-text">Datos de identificación del contribuyente:</span></div>
             <table>
                 <tr><td style="width: 6.5cm"><b>RFC:</b></td><td><?php echo $rfc ?></td></tr>
                 <tr><td><b>CURP:</b></td><td><?php echo $curp ?></td></tr>
                 <tr><td><b>Nombre (s):</b></td><td><?php echo $nombre ?></td></tr>
                 <tr><td><b>Primer Apellido:</b></td><td><?php echo $paterno ?></td></tr>
                 <tr><td><b>Segundo Apellido:</b></td><td><?php echo $materno ?></td></tr>
                 <tr><td><b>Fecha de inicio de operaciones:</b></td><td><?php echo $inicioOperaciones ?></td></tr>
                 <tr><td><b>Estatus en el padrón:</b></td><td><?php echo $situacion ?></td></tr>
                 <tr><td><b>Fecha de último cambio de estado:</b></td><td><?php echo $ultimoCambio ?></td></tr>
                 <tr><td><b>Nombre comercial:</b></td><td><?php echo $nombreComercial ?></td></tr>
             </table>
        </div>

        <!-- Datos de domicilio -->
        <div class="table-container" style="margin-left: -18.1cm; margin-top: 7.4cm; height: 6.5cm; width: 100%; border: 0px;">
             <div class="table-title" style="text-align: left; "><span class="table-title-text">Datos del domicilio registrado</span></div>
             <table>
                 <tr><td style="width: 9cm"><b>Código Postal:</b> <?php echo $cp ?></td><td><b>Tipo de Vialidad: </b><?php echo $tipoVialidad ?></td></tr>
                 <tr><td><b>Nombre de Vialidad:</b> <?php echo $calle ?></td><td><b>Número Exterior:</b> <?php echo $noExterior ?></td></tr>
                 <tr><td><b>Número interior:</b><?php echo $noInterior ?></td><td><b>Nombre de la Colonia: </b><?php echo $tipoVialidad ?></td></tr>
                 <tr><td><b>Nombre de Localidad:</b><?php echo $municipio ?></td><td><b>Nombre del Municipio o Demarcacion Territorial:</b> <?php echo $municipio ?></td></tr>
                 <tr><td><b>Nombre de la Entidad Federativa:</b><?php echo $estado ?></td><td><b>Entre Calle: </b><?php echo $entreCalle ?></td></tr>
             </table>
        </div>

        <div class="pagina">Página [1] de [3]</div>
        
        <!-- Page brake Hoja 2-->
        <div style="page-break-before: always;"></div>
            <div class="single-row"><b>Y Calle: </b><?php echo $entreCalle2 ?></div>
            
            <!-- Actividades económicas -->
            <div class="table-container" style="margin-left: 0cm; margin-top: 2.3cm; width: 100%;">
                <div class="table-title" style="text-align: left; "><span class="table-title-text">Actividades Económicas:</span></div>
                <table>
                    <tr class="table-cell-header"><td style="width: 1cm;">Orden</td><td style="width: 10cm;">Actividad Económica</td><td>Porcentaje</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>
                    <tr><td>1</td><td>Otro autotrasportes de carga en general</td><td>100</td><td>19/09/1994</td><td></td></tr>
                </table>
            </div>

            <!-- Regimenes -->
            <div class="table-container" style="margin-left: 0cm; margin-top: 4.8cm; width: 100%;">
                <div class="table-title" style="text-align: left; "><span class="table-title-text">Regimenes:</span></div>
                <table>
                    <tr class="table-cell-header"><td style="width: 13.5cm;">Régimen</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>
                    <tr><td>Regimen de las Personas Físicas con Actividades Empresariales y Profesionales</td><td>01/01/2003</td><td></td></tr>
                </table>
            </div>

            <!-- Obligaciones -->
            <?php include_once './obligaciones.php'; ?>
            
            <!-- Parrafo -->
            <div class="legend" style="margin-top: 14.8cm;">
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

        <div class="pagina">Página [2] de [3]</div>
        
        <!-- Page brake Hoja 3-->
        <div style="page-break-before: always;"></div>
            <div class='fix-qr-img'>
                <img src="<?php echo $hoja3 ?>" alt="hoja3"/>
            </div>
        <div class="pagina">Página [3] de [3]</div>
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