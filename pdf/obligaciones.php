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
   
    $sql = "SELECT * FROM obligaciones WHERE rfc = '$rfc'";
    $result = mysqli_query($conn, $sql);
    $num_rows = mysqli_num_rows($result);
    echo '<div class="table-container" style="margin-left: -18.1cm; margin-top: 7.3cm; width: 100%;">';
    echo '<div class="table-title" style="text-align: left; "><span class="table-title-text">Obligaciones:</span></div>';
    echo '<table>';
    echo '<tr class="table-cell-header"><td style="width: 7.5cm;">Descripción de la Obligación</td><td style="width: 5.5cm;">Descripción Vencimiento</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>';
    while($row = mysqli_fetch_assoc($result)) {
        $inicio = date("d/m/Y", strtotime($row['inicio']));
        echo "<tr><td>".$row['obligacion']."</td><td>".$row['vencimiento']."</td><td style='text-align: center;'>".$inicio."</td><td>".$row['fin']."</td></tr>";
    }
    echo '</table>';
    echo '</div>';
?>
   