<?php
    include_once '../api/config/database.php';
    include_once '../api/class/persona.php';
    include_once '../api/class/formatter.php';

    $database = new Database();
    $persona = new Persona($database->getConnection());
    $formatter = new Formatter();

    // EDU111103AR2
    $p = $persona->getPersonaByRfc('EDU111103AR2');
    $tipo = $persona->isFisica() ? 'Fisica' : 'Moral';
    echo '<hr>';
    echo 'Persona '. $tipo .': </br>';
    var_dump($p);
    echo '<hr>';
    echo '<a href="'.$persona->getURL('opinion').'" target="_blank">Opinion</a>';
    echo '<br>';
    echo '<a href="'.$persona->getURL('constancia').'" target="_blank">Constancia</a>';
    echo '<br>';
    echo 'Nombre: '.$p['nombre'];
    echo '<br>';
    echo 'Fecha Larga: '.$formatter->getFechaLarga($p['fechaRevision']).' a las '.$formatter->getHoraConsulta().' horas';
?>