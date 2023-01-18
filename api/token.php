<?php
    include_once 'config/database.php';
    include_once 'class/user.php';
    
    session_start();    
    
    //Verifica que un usuario este logeado
    function isUserLogged() {
        $token = $_COOKIE['token'];

        if(isset($token)) {
            // Verifica que el token del usuario sera el mismo de la session
            if($_SESSION['token'] == $token) {
                return true;
            } else {
               return false;
            }
        }
        else {
            return false;
        }
    }

    // Verifica si el email del usuario está activo
    function isUserActive() {
        $database = new Database();
        $user = new User($database->getConnection());
        $userData = explode("|", urldecode($_COOKIE['user']));
        return $user->isUserActive($userData[0]);
    }
?>