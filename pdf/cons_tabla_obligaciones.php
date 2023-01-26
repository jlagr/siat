<?php
    include_once '../api/config/database.php';
    include_once '../api/class/obligaciones.php';

    $database = new Database();
    $obligaciones = new Obligaciones($database->getConnection());
    $rows = $obligaciones->getObligacionesByRfc($rfc);

    echo '<div class="table-container" style="margin-left:'.$left.'cm; margin-top: '.$top.'cm; width: 100%;">';
    echo '<div class="table-title" style="text-align: left; "><span class="table-title-text">Obligaciones:</span></div>';
    echo '<table>';
    echo '<tr class="table-cell-header"><td style="width: 7.5cm;">Descripción de la Obligación</td><td style="width: 5.5cm;">Descripción Vencimiento</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>';
    foreach($rows as $row) {
        $inicio = date("d/m/Y", strtotime($row['inicio']));
        echo "<tr><td>".$row['obligacion']."</td><td>".$row['vencimiento']."</td><td style='text-align: center;'>".$inicio."</td><td>".$row['fin']."</td></tr>";
    }

    echo '</table>';
    echo '</div>';
?>
   