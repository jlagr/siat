<?php
    class Regimenes  {
        private $conn;
        private $table = 'regimenes';

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getRegimenesByRfc($rfc) {
            $query = 'SELECT  * FROM '. $this->table. ' WHERE rfc = :rfc order by inicio ASC';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rfc', $rfc);
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }
?>