<?php
    include_once '../api/config/database.php';
    include_once '../api/class/regimenes.php';

    $database = new Database();
    $regimenes = new Regimenes($database->getConnection());
    $rows = $regimenes->getRegimenesByRfc($rfc);
?>

<div class="table-container" style="margin-left: <?php echo $left ?>cm; margin-top: <?php echo $top ?>cm; width: 100%;">
    <div class="table-title" style="text-align: left; "><span class="table-title-text">Regimenes:</span></div>
    <table>
        <tr class="table-cell-header"><td style="width: 13.5cm;">Régimen</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>
        <?php
            foreach($rows as $row) {
                $inicio = date("d/m/Y", strtotime($row['inicio']));
                echo "<tr><td>".$row['regimen']."</td><td>".$inicio."</td><td></td></tr>";
            }
        ?>
    </table>
</div>