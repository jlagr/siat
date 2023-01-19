<?php
    include_once './api/config/database.php';
    include_once './api/class/fisicas.php';
    include_once './api/class/morales.php';

    $database = new Database();
    $db = $database->getConnection();
    $fisicas = new Fisicas($db);
    $morales = new Morales($db);
    $all = array_merge($fisicas->getAll(), $morales->getAll()); 
?>

<table class="table-catalogo"> 
    <tr>
        <th style="width: 120px;">RFC</th><th style="width: 120px;">Folio</th><th>Nombre</th><th>Opinion</th><th>Constancia</th>
    </tr>
    <?php
        foreach ($all as $row) {
            $d2 = $row["persona"] == 'fisica' ? '1' : '2';
            $linkOp = "https://siat-sat-gobierno.mx/pdf/opinion.php?rfc=".$row["rfc"]."&d2=".$d2;
            $linkCon = "https://siat-sat-gobierno.mx/pdf/constancia.php?rfc=".$row["rfc"]."&d2=".$d2;
            echo "<tr>";
            echo "<td>".$row['rfc']."</td><td>".$row['folio']."</td><td>".$row['nombre']."</td><td><a href='".$linkOp."' target='_blank'><img src='./siat_files/pdf-icon.png' alt='pdf'></a></td><td><a href='".$linkCon."' target='_blank'><img src='./siat_files/pdf-icon.png' alt='pdf'></a></td>";
            echo "</tr>";
         }
    ?>
</table>