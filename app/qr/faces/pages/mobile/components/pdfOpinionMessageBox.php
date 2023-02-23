<?php
    $host = 'http://'.$_SERVER['HTTP_HOST'].'/pdf';
    $link = $host.'/opinion.php?rfc='.$rfc;
?>
<ul id="ubicacionForm:j_idt9" data-role="listview" data-inset="data-inset" style="margin: 1em -15px;" class="ui-listview ui-listview-inset ui-corner-all ui-shadow">
    <li class="ui-li ui-li-static ui-body-c ui-corner-top ui-corner-bottom">
        <div class="box-roudend-colored">
            <img src="./validador_files/message_icon.png"/>
            <span style="margin-left:10px; font-weight: bold;">Obtenga la opinión positiva para el RFC <a href="<?php echo $link ?>" target='blank'><?php echo $rfc ?></a></span>
        </div>
    </li>
</ul>