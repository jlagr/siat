<?php
    class Actividades  {
        private $conn;
        private $table = 'actividades';

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getActividadesByRfc($rfc) {
            $query = 'SELECT  * FROM '. $this->table. ' WHERE rfc = :rfc order by Orden ASC';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rfc', $rfc);
            $stmt->execute();
            return $stmt->fetchAll();
        }
    }
?>