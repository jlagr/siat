<?php
    class Persona  {
        private $conn;
        private $folio;
        private $rfc;
        private $isFisica;
        

        public function __construct($db) {
            $this->conn = $db;
        }

        public function getPersonaByRfc($rfc) {
            // Busca primero como persona fisica
            $query = 'SELECT  * FROM fisicas WHERE rfc = :rfc LIMIT 1';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rfc', $rfc);
            $stmt->execute();
            $num = $stmt->rowCount();
            if($num > 0) {
                $this->isFisica = true;
                $result = $stmt->fetchAll();
                $this->folio = $result[0]['folio'];
                $this->rfc = $rfc;
                return $result[0];
            }
            // Si no lo encontró busca en personas morales
            $query = 'SELECT  * FROM morales WHERE rfc = :rfc LIMIT 1';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rfc', $rfc);
            $stmt->execute();
            $num = $stmt->rowCount();
            if($num > 0) {
                $this->isFisica = false;
                $result = $stmt->fetchAll();
                $this->folio = $result[0]['folio'];
                $this->rfc = $rfc;
                return $result[0];
            }
            // No se encontro ninguno
            $this->isFisica = false;
            return null;
        }

        public function isFisica() {
            return $this->isFisica;
        }

        public function getURL($formato) {
            $hostRoot = 'https://siat-sat-gobierno.mx/app/qr/faces/pages/mobile/validadorqr.php?';
            $d1 = $formato == 'opinion' ? '13' : '10'; // Opinion o constancia
            $d2 = $this->isFisica ? '1' : '2';
            $d3 = $this->folio.'_'.$this->rfc;
            return $hostRoot.'D1='.$d1.'&D2='.$d2.'&D3='.$d3;
        }

    }
?>