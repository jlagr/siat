<?php
    include_once './api/config/database.php';
    include_once './api/class/persona.php';

    $database = new Database();
    $db = $database->getConnection();
    $persona = new Persona($db);
    $rows = $persona->getAllRfcs();
?>

<table class="table-catalogo"> 
    <tr>
        <th style="width: 120px;">Selecciona el RFC</th><th></th>
        <tr>
            <td>
                <select id='rfcSelector'>
                    <option value='X'>---------------</option>;
                    <?php
                    
                         foreach ($rows as $row) {
                            echo "<option value='".$row['rfc']."|".$row['folio'].'|'.$row['persona']."'>".$row['rfc']."</option>";
                         }
                    ?>
                </select>
            </td>
            <td>
                <button type="button" name="generar" onclick="generateImages()">Generar</button>
            </td>
        </tr>
    </tr>
</table>
<table class="table-catalogo" style="margin-top:20px;" id='table-results'> 
    <tr style="width: 120px;">
        <th style="width: 120px;">Imagen</th><th>Valor</th>
        <tr>
            <td>
                <img id="qr-opinion" src='' alt='qr opinion' style="width: 120px;">
            </td>
            <td>
                <span id="label-opinion">http://....</span>
            </td>
        </tr>
        <tr>
            <td>
                <img id="qr-constancia" src='' alt='qr constancia' style="width: 120px;">
            </td>
            <td>
                <span id="label-constancia">http://....</span>
            </td>
        </tr>
        <tr>
            <td>
                <img id="barcode" src=''<?php ?> alt='barcode' style="width: 120px;">
            </td>
            <td>
                <span id="label-barcode"></span>
            </td>
        </tr>
    </tr>
</table>
<div id="error" class="error-box"></div>