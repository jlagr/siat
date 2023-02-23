
<?php 
 
    class User {
        private $conn;
        private $table = 'users';
      
        // propiedades de usuario
        public $firstName;
        public $lastName;
        public $email;
        public $password;
        public $isActive;
       private $id;
        // constructor con conexión a la base de datos
        public function __construct($db) {
            $this->conn = $db;
        }
      
        // crear usuario
        public function create() {
            // query para insertar usuario
            $query = 'INSERT INTO ' . $this->table . '
                SET
                    firstName = :firstName,
                    lastName = :lastName,
                    email = :email,
                    password = :password';
      
            // preparar declaración
            $stmt = $this->conn->prepare($query);
      
            // limpiar los datos
            $this->firstName = htmlspecialchars(strip_tags($this->firstName));
            $this->lastName = htmlspecialchars(strip_tags($this->lastName));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->password = htmlspecialchars(strip_tags($this->password));
      
            // vincular valores
            $stmt->bindParam(':firstName', $this->firstName);
            $stmt->bindParam(':lastName', $this->lastName);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':password', $this->password);
      
            // ejecutar query
            if($stmt->execute()) {
                return true;
            }
      
            return false;
        }
      
        // verificar si el usuario existe
        public function userExists() {
            // query para verificar si el usuario existe
            $query = 'SELECT *
                FROM ' . $this->table . '
                WHERE email = :email
                LIMIT 0,1';
      
            // preparar declaración
            $stmt = $this->conn->prepare($query);
      
            // vincular valor
            $stmt->bindParam(':email', $this->email);
      
            // ejecutar query
            $stmt->execute();
      
            // obtener fila
            $num = $stmt->rowCount();
      
            // si el usuario existe
            if($num > 0) {
                return true;
            }
      
            return false;
        }

        // verifica si el password es igual que el de la base de datos
        public function userIsValid() {
            // query para verificar si el usuario existe
            $query = 'SELECT *
                FROM ' . $this->table . '
                WHERE email = :email and password = :password and isActive=1
                LIMIT 0,1';
      
            // preparar declaración
            $stmt = $this->conn->prepare($query);
      
            // vincular valor
            $stmt->bindParam(':email', $this->email);
           $stmt->bindParam(':password', $this->password);
      
            // ejecutar query
            $stmt->execute();
      
            // obtener fila
            $num = $stmt->rowCount();

            // obtiene un arreglo con el registro
            $result = $stmt->fetchAll();
        
            // si el usuario existe
            if($num > 0) {
                $this->id = $result[0][0];
                return true;
            }
      
            return false;
        }

        // verifica si el usuario es administrador
        public function userIsAdmin($id) {
            // query para verificar si el usuario existe
            $query = 'SELECT * FROM ' . $this->table . ' WHERE id=:id and isAdmin = 1 LIMIT 0,1';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $num = $stmt->rowCount();        
            
            if($num > 0) {
                return true;
            }
            return false;
        }

        // Genera un token unico
        public function getToken()  {
             return sha1(uniqid(rand(), true).$this->password.$this->email);
        }

        // Varifica si un usuario esta activo
        public function isUserActive($id) {
            $query = 'SELECT *
                FROM ' . $this->table . '
                WHERE id = :id and isActive=1
                LIMIT 0,1';
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $num = $stmt->rowCount();
            if($num > 0) {
                return true;
            }
            return false;
        }

        //Regresa e Id del usuario
        public function getId() {
            return $this->id;
        }
    }
    
?>