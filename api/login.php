<?php 
    header("Content-Type: application/json");
    $_POST = json_decode(file_get_contents('php://input'), true);
    switch($_SERVER['REQUEST_METHOD']) {
        case 'POST':

        break;
    }
?>