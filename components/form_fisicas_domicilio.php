<?php
$estados = array("AGUASCALIENTES", "BAJA CALIFORNIA", "BAJA CALIFORNIA SUR", "CAMPECHE", "CHIAPAS", "CHIHUAHUA", 
"COAHUILA", "COLIMA", "DISTRITO FEDERAL", "DURANGO", "GUANAJUATO", "GUERRERO", "HIDALGO", "JALISCO", 
"MÉXICO", "MICHOACÁN", "MORELOS", "NAYARIT", "NUEVO LEÓN", "OAXACA", "PUEBLA", "QUERÉTARO", "QUINTANA ROO", 
"SAN LUIS POTOSÍ", "SINALOA", "SONORA", "TABASCO", "TAMAULIPAS", "TLAXCALA", "VERACRUZ", "YUCATÁN", "ZACATECAS");
?>


<div class="container">
    <div class="row" style="margin-top: 5px;">
        <div class="col-2" style="width: 105px;">
            <label for="input-fisicas-tipo-calle" class="form-label">Tipo de Calle</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px; width:80px;" id="input-fisicas-tipo-calle" placeholder="Calle">
        </div>
        <div class="col-4" style="width: 220px;">
            <label for="input-fisicas-nombre-vialidad" class="form-label">Nombre de la Vialidad</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px; width:200px;" id="input-fisicas-nombre-vialidad" placeholder="Nombre de la Vialidad">
        </div>
        <div class="col-2" style="width: 105px;">
            <label for="input-fisicas-no-ext" class="form-label">No. Ext.</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;  width:80px;" id="input-fisicas-no-ext" placeholder="No.Ext">
        </div>
        <div class="col-2" style="width: 105px;">
            <label for="input-fisicas-no-int" class="form-label">No. Int.</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;  width:80px;" id="input-fisicas-no-int" placeholder="No.Int">
        </div>
        <div class="col-6" style="width: 180px;">
            <label for="input-fisicas-colonia" class="form-label">Colonia</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;  width:150px;" id="input-fisicas-colonia" placeholder="Colonia">
        </div>
        <div class="col-6" style="width: 180px;">
            <label for="input-fisicas-fisicas-localidad" class="form-label">Localidad</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;  width:150px;" id="input-fisicas-localidad" placeholder="Localidad">
        </div>
    </div>
    <div class="row" style="margin-top: 10px;">
        <div class="col mb-2">
            <label for="input-fisicas-entre-calle" class="form-label">Entre Calle</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;" id="input-fisicas-entre-calle" placeholder="Entre Calle">
        </div>
        <div class="col mb-2">
            <label for="input-fisicas-entre-calle2" class="form-label">Y Calle</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;" id="input-fisicas-entre-calle2" placeholder="Y Calle">
        </div>
        <div class="col mb-2">
            <label for="input-fisicas-estado" class="form-label">Estado</label>
            <select class="form-select form-select-sm" id="input-fisicas-estado" name="input-estado" style="font-size: x-small;">
                <?php
                foreach ($estados as $estado) {
                    echo "<option value='" . $estado . "'>" . $estado . "</option>";
                }
                ?>
            </select>
        </div>
        <div class="col mb-2">
            <label for="input-fisicas-municipio" class="form-label">Municipio</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;" id="input-fisicas-municipio" placeholder="Municipio">
        </div>
        <div class="col mb-2">
            <label for="input-fisicas-cp" class="form-label">CP</label>
            <input type="text" class="form-control form-control-sm" style="font-size: 12px;" id="input-fisicas-cp" placeholder="C.P.">
        </div>
        
    </div>
</div>