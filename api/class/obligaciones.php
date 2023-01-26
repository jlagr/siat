<?php
    class Obligaciones  {
        private $conn;
        private $table = 'obligaciones';

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getObligacionesByRfc($rfc) {
            $query = 'SELECT  * FROM '. $this->table. ' WHERE rfc = :rfc LIMIT 5';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rfc', $rfc);
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }
?>