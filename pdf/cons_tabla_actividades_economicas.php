<?php
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
   
    $sql = "SELECT * FROM actividades WHERE rfc = '$rfc' order by Orden ASC";
    $result = mysqli_query($conn, $sql);
    $num_rows = mysqli_num_rows($result);
    echo '<div class="table-container" style="margin-left: 0cm; margin-top: 2.3cm; width: 100%;">';
    echo '<div class="table-title" style="text-align: left; "><span class="table-title-text">Actividades Económicas:</span></div>';
    echo '<table>';
    echo '<tr class="table-cell-header"><td style="width: 1cm;">Orden</td><td style="width: 10cm;">Actividad Económica</td><td>Porcentaje</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>';
    while($row = mysqli_fetch_assoc($result)) {
        $inicio = date("d/m/Y", strtotime($row['inicio']));
        echo "<tr><td>".$row['orden']."</td><td>".$row['actividad']."</td><td>".$row['porcentaje']."</td><td>".$inicio."</td><td></td></tr>";
    }
    echo '</table>';
    echo '</div>';
?>
