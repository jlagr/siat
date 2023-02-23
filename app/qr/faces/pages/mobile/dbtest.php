<?php
    include_once '../../../../../api/config/database.php';
    include_once '../../../../../api/class/persona.php';
    include_once '../../../../../api/class/formatter.php';

    echo '<p>Archivo de prueba de conexion a la base de datos</p>';

    $database = new Database();
    $persona = new Persona($database->getConnection());
    $formatter = new Formatter();

    $p = $persona->getPersonaByRfc('EDU111103AR2');
    $tipo = $persona->isFisica() ? 'Fisica' : 'Moral';
    echo '<hr>';
    echo 'Persona '. $tipo .': </br>';
    var_dump($p);
    
?>