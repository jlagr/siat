<div class="new-edit-title" style="display:none">Agregar un nuevo registro</div>
<div class="persona-selector" style="visibility: hidden">
    <div class="persona-selector-label">Persona: </div>
    <select id='tipo-persona' style='width: 200px;' onchange=personSeleccionChanged()>
        <option value='x'>Seleccione... </option>
        <option value='fisica'>Física</option>
        <option value='moral'>Moral</option>
    </select>
    <div class="persona-selector-cancel">
        <button type="button" class="btn btn-outline-primary" onclick="addCancel()"><i class="fas fa-light fa-xmark fa-xl"></i></button>
    </div>
</div>


