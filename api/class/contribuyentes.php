<?php 
    include_once('/fisicas.php');
    include_once('morales.php');
    
    class Contribuyentes {
        private $conn;

        public function __construct($db) {
            $this->conn = $db;
        }
        
        public function getAll() {
            $fisicas = new Fisicas($this->conn);
            $morales = new Morales($this->conn);

            return array_merge($fisicas->getAll(), $morales->getAll());
        }
}

?>