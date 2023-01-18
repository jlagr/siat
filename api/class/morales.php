<?php

class Morales {
        private $conn;
        private $table = 'morales';

        public $rfc;
        public $folio;
        public $nombre;

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getAll()  {
            $query = 'SELECT  rfc, folio, nombre, "moral" as persona FROM ' . $this->table;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }

?>