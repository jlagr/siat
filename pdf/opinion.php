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
    // validar que el rfc exista y sea de 12 caracteres
    if (!isset($rfc) || strlen(!$rfc) == 12) {
        header('Location: 404.html');
        exit;
    }
    $remoteHost = 'https://siat-sat-gobierno.mx/pdf';

    // buscar el rfc en una base de datos
    $database = new Database();
    $persona = new Persona($database->getConnection());
    $formatter = new Formatter();
    $p = $persona->getPersonaByRfc($rfc);

    // si no existe renderizar el mensaje de error
    if ($p != null) {
        $folio = $p["folio"];
        $nombre = $persona->getNombreCompleto();
        $today = date("d-m-Y");
        $cadenaOriginal = '||'.$rfc.'|'.$folio.'|'.$today.'|P|00001088888800000031||'; 
        $selloDigital = $p["selloDigital"];
        $fechaRevision = $formatter->getFechaLarga($today).' a las '.$formatter->getHoraConsulta().' horas';
        $anio = date("Y", strtotime($today));
        $qr =  $remoteHost."/images/qr_opinion_".$rfc.".png";
    } else {
        header('Location: 404.html');
        exit;
    }
    // si si existe llenar las variables
    
    $styleUrl = $remoteHost.'/style.css';
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php  echo $styleUrl?>">
    <!-- <link rel="stylesheet" href="style.css"> -->
    <title>Generador PDF</title>
</head>
<body>
    <header>
        <div class="header-black">
            <img class='header-logo' src="<?php echo $remoteHost.'/images/logo.png'?>" alt="" />
        </div>
        <div class="header-gray"><div class="header-title">Servicio de Administraci??n Tributaria</div></div>
    </header>

    <footer>
        <div class='footer-block'>
            <div class='footer-data'>
                <div class="footer-cadena-label">Cadena Original:</div>
                <div class="footer-cadena"><?php echo $cadenaOriginal ?></div>
                <div class="footer-sello-label">Sello Digital:</div>
                <div class="footer-sello"><?php echo $selloDigital?></div>
            </div>
            <div class="footer-qr" style="margin-top: -80px;">
                <img src="<?php echo $qr ?>" alt="" />
            </div>
        </div>
        <div class="footer-block-inst">
            <div class="footer-imagen-block">
                <img class="footer-imagen" src="<?php echo $remoteHost.'/images/footer-img.png' ?>"  alt=""/>
            </div>
            <div class="footer-direccion-block">
                <p><b>Contacto:</b></br>
                Av. Hidalgo 77, col. Guerrero, c.p. 06300, Ciudad de M??xico. Atenci??n telef??nica 01 55 627 22 728, desde Estados Unidos y Canad?? 01 877 44 88 728.
                </p>
            </div>
        </div>
    </footer>

    <main>
        <div class="doc-title">Opini??n del cumplimiento de obligaciones fiscales</div>
        <!-- Folio -->
        <?php $box_width=9.46 ?>
        <div class="table-container" style="margin-left: 0cm; margin-top: 0.4cm; height: 1.2cm; width: <?php echo $box_width?>cm;">
            <div class="table-title"><span class="table-title-text">Folio</span></div>
            <div class="table-content">
                <div class="field" style='margin-left: 5px; margin-top:15px;'><?php echo $folio ?></div>
            </div>
        </div>
        <!-- RFC -->
        <div class="table-container" style="margin-left: 0.5cm; margin-top: 0.4cm; height: 1.2cm; width:<?php echo $box_width?>cm;">
            <div class="table-title"><span class="table-title-text">Clave de R.F.C.</span></div>
            <div class="table-content">
                <div class="field" style='margin-left: 5px; margin-top:15px;'><?php echo $rfc ?></div>
            </div>
        </div>

        <!-- nombre -->
        <div class="table-container" style="margin-left: -19.55cm; margin-top:2.3cm; height: 1.2cm; width: 19.5cm;">
            <div class="table-title"><span class="table-title-text">Nombre, Denominaci??n o Raz??n social</span></div>
                <div class="table-content">
                    <div class="field" style='margin-left: 5px; margin-top:15px;'><?php echo $nombre ?></div>
                </div>
            </div>
        </div>
        <!-- estimado -->
        <div class="table-container" style="margin-left: -19.55cm; margin-top:4.2cm; height: 4.8cm; width: 19.5cm;">
            <div class="table-title"><span class="table-title-text">Estimado contribuyente</span></div>
                <div class="table-content">
                        <p>Respuesta de opini??n:</p>
                        <p>En atenci??n a su consulta sobre el Cumplimiento de Obligaciones, se le informa lo siguiente:</p>
                        <p style="text-align: justify;">En los controles electr??nicos institucionales del Servicio de Administraci??n Tributaria, se observa que en el momento en que se realiza esta revisi??n, se encuentra al corriente en el cumplimiento de los puntos que se revisa la opini??n del cumplimiento de obligaciones fiscales, contenidos en la Resoluci??n Miscel??nea Fiscal vigente. Por lo que se emite esta opini??n del cumplimiento de obligaciones fiscales, en sentido POSITIVO. La presente opini??n no es una constancia del correcto entero de los impuestos declarados, para lo cual el SAT se reserva sus facultades de verificaci??n previstas en el C??digo Fiscal de la Federaci??n.</p>
                        <p>Revisi??n practicada el d??a <?php echo $fechaRevision ?> horas</p> 
                </div>
        </div>
            
        <!-- notas -->
        <div class="table-container" style="margin-left: -19.55cm; margin-top:9.7cm; height: 4.3cm; width: 19.5cm;">
            <div class="table-title"><span class="table-title-text">Notas</span></div>
                <div class="table-content" style="margin-top: 3px;">
                        <p style="text-align: justify;">1.- La opini??n del cumplimiento, se genera atendiendo a la situaci??n fiscal del contribuyente en los siguientes sentidos: POSITIVA. - Cuando el
contribuyente est?? inscrito y al corriente en el cumplimiento de las obligaciones que se consideran en los numerales 1 a 12 de la regla 2.1.37. de la Resoluci??n Miscel??nea Fiscal para <?php echo $anio ?>; NEGATIVA. - Cuando el contribuyente no est?? al corriente en el cumplimiento de las obligaciones que se consideran en los numerales 1 a 12 de la regla 2.1.37. de la Resoluci??n Miscel??nea Fiscal para <?php echo $anio ?>; INSCRITO SIN OBLIGACIONES.-
Cuando el contribuyente est?? inscrito en el RFC pero no tiene obligaciones fiscales.</p>
                        <p>2.- Para est??mulos o subsidios, la opini??n que se genere indicando que es Inscrito SIN OBLIGACIONES fiscales, se tomar?? como Positiva
cuando el monto del subsidio no rebase de 40 UMAS elevado al a??o, en caso contrario se considera como resultado Negativo.</p>
                        <p>3.- La presente opini??n se emite considerando lo establecido en la regla 2.1.37. de la Resoluci??n Miscel??nea Fiscal para <?php echo $anio ?>.</p>
                </div>
        </div>
        
        <div class="pagina">P??gina 1 de 2</div>
        <!-- Page brake -->
        <div style="page-break-before: always;"></div>

        <div class="table-container" style="margin-top:3.5cm; height: 4cm; width: 19.5cm;">
            <div class="table-title"><span class="table-title-text">Notas</span></div>
                <div class="table-content">
                        <p style="text-align: justify;">4.- Trat??ndose de est??mulos o subsidios, tiene una vigencia de 3 meses contada a partir del d??a en que se emite seg??n lo establecido en la regla 2.1.28. y 30 d??as naturales a partir de su emisi??n para tr??mites diferentes al se??alado, de acuerdo a la regla 2.1.37. de la Resoluci??n Miscel??nea Fiscal para <?php echo $anio?>.</p>
                        <p>5.- La opini??n que se genere indicando que es INSCRITO SIN OBLIGACIONES fiscales, se considera Opini??n Negativa para efectos de contrataci??n de adquisiciones, arrendamientos, servicios u obra p??blica.</p>
                        <p>6.- La presente opini??n se emite de conformidad con lo establecido en el art??culo 32-D del C??digo Fiscal de la Federaci??n, regla 2.1.37. de la Resoluci??n Miscel??nea Fiscal para <?php echo $anio?> y no constituye respuesta favorable respecto a contribuyentes que se ubican en los supuestos del art??culo 69 del C??digo Fiscal de la Federaci??n..</p>
                </div>
        </div>

        <div class="table-final" style="width: 19.5cm; margin-top:8.2cm;">
                <div class="table-content" style="margin-top:10px">
                    <p>Este servicio es gratuito, en el SAT nuestra misi??n es servirle.</p>
                    <p>Sus datos personales son incorporados y protegidos en los sistemas del SAT, de conformidad con los lineamientos de protecci??n de Datos Personales y con las diversas disposiciones fiscales y legales sobre confidencialidad y protecci??n de datos, a fin de ejercer las facultades conferidas a la autoridad fiscal.</p>
                    <p>Si desea modificar o corregir sus datos personales, puede acudir a la Administraci??n Desconcentrada de Servicios al Contribuyente de su preferencia y/o a trav??s del Portal del SAT.</p>
                </div>
                
        </div>

        <div class="pagina">P??gina 2 de 2</div>
    </main>
</body>
</html>
<?php
    $html = ob_get_clean();
    require_once './dompdf/autoload.inc.php';
    use Dompdf\Dompdf;
    $dompdf = new Dompdf();
    $options = $dompdf->getOptions();
    $options->setDefaultFont('ArialMT');
    $options->setIsRemoteEnabled(TRUE);
    $dompdf->setOptions($options);
    $dompdf->setPaper('letter');

    $dompdf->loadHtml($html);

    $dompdf->render();
    $dompdf->stream("opinion_".$rfc."_".$today.".pdf", array("Attachment"=>false));
?>