<?php

    class Fisicas {
        private $conn;
        private $table = 'fisicas';

        public $rfc;
        public $folio;
        public $curp;
        public $nombre;
        public $paterno;
        public $cadenaOriginal;
        public $selloDigital;
        public $qr;
        public $nombreComercial;
        public $estado;
        public $municipio;
        public $colonia;
        public $tipoVialidad;
        public $calle;
        public $noExterior;
        public $noInterior;
        public $cp;
        public $mail;
        public $entreCalle;
        public $entreCalle2;
        public $ultimoCambio;
        public $situacion;
        public $al;
        public $regimen;
        public $inicioOperaciones;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getAll()  {
            $query = 'SELECT rfc, folio, concat(nombre, " ", paterno) as nombre, "fisica" as persona FROM ' . $this->table;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
        }

        public function getPersonByRfc($rfc) {
            $query = 'SELECT * FROM ' . $this->table;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }

?>