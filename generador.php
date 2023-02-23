<?php
    include_once('./api/token.php');

    if(!isUserLogged() || !isUserActive()) {
        header('Location: index.php');
        exit();
    } 
?>

<html class="ui-mobile">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<base href=".">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
	<title>Generdor</title>
	<link rel="shortcut icon" href="./siat_files/favicon.ico" type="image/vnd.microsoft.ico"/>
	<link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="./siat_files/mobile.css">
	<script type="text/javascript" src="./siat_files/jquery.js"></script>
	<script type="text/javascript" src="./siat_files/mobile.js"></script>
    <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
	<script type="text/javascript" src="./siat_files/siat.js"></script>
    <link href="./siat_files/prueba.css" rel="stylesheet" type="text/css">
</head>
<body class="ui-mobile-viewport ui-overlay-c" data-new-gr-c-s-check-loaded="14.1092.0" data-gr-ext-installed="">
	<div data-role="page" tabindex="0" class="ui-page ui-body-c ui-page-active" style="min-height: 959px;">
		<center><img id="j_idt5" src="./siat_files/HACIENDA-SAT.jpg" alt="" width="320px">
		</center>
		<div id="pageContent" data-role="content" class="ui-content" role="main">
			<div class="page-title">
				Generador de QR y Codigo de Barras
			</div>
			<?php
				include_once './components/generador_table.php';
			?>
			
		</div>
	</div>
	
</body>
<app-content ng-version="14.2.0"></app-content>
</html>