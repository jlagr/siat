<?php
    class Persona  {
        private $conn;
        private $folio;
        private $rfc;
        private $isFisica;
        private $nombreCompleto;

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
                $this->nombreCompleto = $result[0]['nombre'].' '.$result[0]['paterno'].' '.$result[0]['materno'];
                return $result[0];
            }
            // Si no lo encontrĂ³ busca en personas morales
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
                $this->nombreCompleto = $result[0]['nombre'];
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

        public function getNombreCompleto() {
            return $this->nombreCompleto;
        }

        public function getAllRfcs() {
            $query = "SELECT rfc, folio, 'fisica' as persona FROM fisicas UNION SELECT rfc, folio, 'moral' as persona FROM morales";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll();
        }

        public function hasTables($rfc) {
            $query = "SELECT rfc FROM regimenes WHERE rfc = :rfc  UNION SELECT rfc FROM actividades WHERE rfc = :rfc UNION  SELECT rfc FROM obligaciones WHERE rfc = :rfc";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':rfc', $rfc);
            $stmt->execute();
            $num = $stmt->rowCount();
            return $num > 0;
        }
    }
?>