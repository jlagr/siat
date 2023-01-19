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
   
    $sql = "SELECT * FROM regimenes WHERE rfc = '$rfc' order by inicio ASC";
    $result = mysqli_query($conn, $sql);
    $num_rows = mysqli_num_rows($result);
?>

<div class="table-container" style="margin-left: <?php echo $left ?>cm; margin-top: <?php echo $top ?>cm; width: 100%;">
    <div class="table-title" style="text-align: left; "><span class="table-title-text">Regimenes:</span></div>
    <table>
        <tr class="table-cell-header"><td style="width: 13.5cm;">Régimen</td><td>Fecha Inicio</td><td>Fecha Fin</td></tr>
        <?php
            while($row = mysqli_fetch_assoc($result)) {
                $inicio = date("d/m/Y", strtotime($row['inicio']));
                echo "<tr><td>".$row['regimen']."</td><td>".$inicio."</td><td></td></tr>";
            }
        ?>
    </table>
</div>