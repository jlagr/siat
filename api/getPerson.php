<?php
    include_once 'config/database.php';
    include_once 'class/persona.php';
    include_once 'class/actividades.php';
    include_once 'class/regimenes.php';
    include_once 'class/obligaciones.php';

    header("Content-Type: application/json");
    $_POST = json_decode(file_get_contents('php://input'), true);
    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $database = new Database();
            $db = $database->getConnection();
            $persona = new Persona($database->getConnection());
            $actividades = new Actividades($database->getConnection());
            $regimenes = new Regimenes($database->getConnection());
            $obligaciones = new Obligaciones($database->getConnection());

            $rfc = $_POST['rfc'];
            $p = $persona->getPersonaByRfc($rfc);
            $act = $actividades->getActividadesByRfc($rfc);
            $reg = $regimenes->getRegimenesByRfc($rfc);
            $obl = $obligaciones->getObligacionesByRfc($rfc);
            $tipo = $persona->isFisica() ? 'fisica' : 'moral';

            if(!$p) {
                http_response_code(401);
                $response = array(
                    "codigo" => 0,
                    "mensaje" => "No se encontró el registro de ".$rfc,
                );
                echo json_encode($response);
            } else {
                $response = array(
                    "persona" => $p,
                    "tipo" => $tipo,
                    "actividades" => $act,
                    "regimenes" => $reg,
                    "obligaciones" => $obl,
                );
                echo json_encode($response);
            }
            
        break;
    }
?>