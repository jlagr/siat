<?php

    class Fisicas {
        private $conn;
        private $table = 'fisicas';

        public $rfc;
        public $folio;
        public $nombre;
        public $paterno;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getAll()  {
            $query = 'SELECT rfc, folio, concat(nombre, " ", paterno) as nombre, "fisica" as persona FROM ' . $this->table;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }

?>