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
        <th style="width: 120px;">RFC</th><th style="width: 120px;">Folio</th><th>Nombre</th><th>Opinion</th><th>Constancia</th><th>Opinion</th><th>Constancia</th>
    </tr>
    <?php
        foreach ($all as $row) {
            $hostRoot = 'https://siat-sat-gobierno.mx/app/qr/faces/pages/mobile/validadorqr.php?';
            $d2 = $row["persona"] == 'fisica' ? '1' : '2';
            $d3 = $row["folio"].'_'.$row["rfc"];
            $linkOp = "https://siat-sat-gobierno.mx/pdf/opinion.php?rfc=".$row["rfc"]."&d2=".$d2;
            $linkCon = "https://siat-sat-gobierno.mx/pdf/constancia.php?rfc=".$row["rfc"]."&d2=".$d2;
            $linkOpHtml = $hostRoot.'D1=13&D2='.$d2.'&D3='.$d3;
            $linkConHtml = $hostRoot.'D1=10&D2='.$d2.'&D3='.$d3;
            echo "<tr>";
            echo "<td>".$row['rfc']."</td><td>".$row['folio']."</td><td>".$row['nombre']."</td>";
            echo "<td><a href='".$linkOp."' target='_blank'><img src='./siat_files/pdf-icon.png' alt='pdf'></a></td>";
            echo "<td><a href='".$linkCon."' target='_blank'><img src='./siat_files/pdf-icon.png' alt='pdf'></a></td>";
            echo "<td><a href='".$linkOpHtml."' target='_blank'><img src='./siat_files/html-icon.png' alt='html'></a></td>";
            echo "<td><a href='".$linkConHtml."' target='_blank'><img src='./siat_files/html-icon.png' alt='html'></a></td>";
            echo "</tr>";
         }
    ?>
</table>