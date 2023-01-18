<?php
    class Database {
        // propiedades de la base de datos
        private $host = 'svgt193.serverneubox.com.mx';
        private $db_name = 'siatsa11_sat';
        private $username = 'siatsa11_root';
        private $password = 'Vaqyntpf247!';
        
        public $conn;

        // obtener conexión a la base de datos
        public function getConnection() {
            $this->conn = null;

            try {
                $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
                $this->conn->exec("set names utf8");
            } catch(PDOException $exception) {
                echo "Error de conexión: " . $exception->getMessage();
            }

            return $this->conn;
        }
}
?>
