<div class="tab-container" id="morales-wrapper" style="display:none">
  <div class="tab-header">
    <button class="tab-btn" id="tab-btn-id"><i class="fas fa-thin fa-id-card me-2"></i>Identificación</button>
    <button class="tab-btn" id="tab-btn-direccion"><i class="fas fa-light fa-map-location me-2"></i>Domicilio</button>
    <button class="tab-btn" id="tab-btn-actividades"><i class="fas fa-thin fa-chart-line me-2"></i></i>Actividades</button>
    <button class="tab-btn" id="tab-btn-regimenes"><i class="fas fa-light fa-list-ol me-2"></i>Regímenes</button>
    <button class="tab-btn" id="tab-btn-obligaciones"><i class="fas fa-light fa-calendar-check me-2"></i>Obligaciones</button>
    <div class="tab-contols">
      <button type="button" class="btn btn-outline-primary" id="fisicas-btn-cancel"><i class="fas fa-regular fa-xmark fa-xl"></i></button>
      <button type="button" class="btn btn-outline-primary" id="fisicas-btn-save"><i class="fas fa-light fa-floppy-disk fa-xl"></i></button>
    </div>
  </div>
  <div class="tab-content">
    <div class="tab-pane" id="tab-pane-id">
      <?php  include_once 'form_fisicas_id.php'; ?>
    </div>
    <div class="tab-pane" id="tab-pane-direccion">
      <?php include_once 'form_fisicas_domicilio.php'; ?>
    </div>
    <div class="tab-pane" id="tab-pane-actividades">
      <?php include_once 'form_actividades.php'; ?>
    </div>
    <div class="tab-pane" id="tab-pane-regimenes">
      <?php include_once 'form_regimenes.php';?>
    </div>
    <div class="tab-pane" id="tab-pane-obligaciones">
    <?php  include_once 'form_obligaciones.php'; ?>
    </div>
  </div>
</div>