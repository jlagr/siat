<?php
    include_once '../api/config/database.php';
    include_once '../api/class/actividades.php';

    $database = new Database();
    $actividades = new Actividades($database->getConnection());
    $rows = $actividades->getActividadesByRfc($rfc);

    echo '<div class="table-container" style="margin-left: 0cm; margin-top: 2.3cm; width: 100%;">';
    echo '<div class="table-title" style="text-align: left; "><span class="table-title-text">Actividades Económicas:</span></div>';
    echo '<table>';
    echo '<tr class="table-cell-header"><td style="width: 1cm;">Orden</td><td style="width: 10cm;">Actividad Económica</td><td>Porcentaje</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>';
    foreach($rows as $row) {
        $inicio = date("d/m/Y", strtotime($row['inicio']));
        echo "<tr><td>".$row['orden']."</td><td>".$row['actividad']."</td><td>".$row['porcentaje']."</td><td>".$inicio."</td><td></td></tr>";
    }
    echo '</table>';
    echo '</div>';
?>
