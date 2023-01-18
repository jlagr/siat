<?php 
    include_once 'config/database.php';
    include_once 'class/user.php';

    session_start();
    header("Content-Type: application/json");
    $_POST = json_decode(file_get_contents('php://input'), true);
    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            $database = new Database();
            $db = $database->getConnection();
            $user = new User($db);
            $user->email = $_POST['email'];
            $user->password = $_POST['password'];
            if(!$user->userIsValid()) {
                http_response_code(401);
                $response = array(
                    "codigo" => 0,
                    "mensaje" => "Usuario no valido o inactivo",
                );
                setcookie("user", "", time()-1, "/");
                setcookie("token", "", time()-1, "/");
                echo json_encode($response);
            } else {
                $userToken = $user->getToken();
                $response = array(
                    "codigo" => 1,
                    "mensaje" => "ok",
                    "token" => $userToken
                );
                $_SESSION["token"] = $userToken;
                setcookie("user", $user->getId()."|".sha1($user->email), time()+(60*30), "/");
                setcookie("token", $userToken, time()+(60*30), "/");
                echo json_encode($response);
            }
            
        break;
    }
?>
