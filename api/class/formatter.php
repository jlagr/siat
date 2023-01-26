<?php
    class Formatter {
        private $meses = array("enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre");

        public function getFechaLarga($date) {
            $mes = $this->meses[intval(date("m", strtotime($date)))-1];
            $dia = date("d", strtotime($date));
            $year = date("Y", strtotime($date));
            return $dia.' de '.$mes. ' de '.$year;
        }

        public function getHoraConsulta() {
            date_default_timezone_set('America/Mexico_City');
            return date("H:i");
        }
    }
?>