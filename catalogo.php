<?php
    include_once('./api/token.php');

    if(!isUserLogged() || !isUserActive()) {
        header('Location: index.php');
        exit();
    }
	$isAdmin = isUserAdmin();
?>

<html class="ui-mobile">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<base href=".">
	<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1">
	<title>Catalogo SIAT</title>
	<link rel="shortcut icon" href="./siat_files/favicon.ico" type="image/vnd.microsoft.ico"/>
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap&display=swap" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="./siat_files/mobile.css">
	<script type="text/javascript" src="./siat_files/jquery.js"></script>
    <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
	<script type="text/javascript" src="./siat_files/siat.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link href="./siat_files/prueba.css" rel="stylesheet" type="text/css">
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
</head>
<body class="ui-mobile-viewport ui-overlay-c" data-new-gr-c-s-check-loaded="14.1092.0" data-gr-ext-installed="">
	<div data-role="page" tabindex="0" class="ui-page ui-body-c ui-page-active" style="min-height: 959px;" id="top-page">
		<center><img src="./siat_files/HACIENDA-SAT.jpg" alt="" width="320px">
		</center>
		<div id="pageContent" data-role="content" class="ui-content" role="main">
			<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-header">
					<i class="fas fa-solid fa-triangle-exclamation rounded me-2"></i>
					<strong class="me-auto" id="toast-title"></strong>
					<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
				<div class="toast-body" id="toast-message">
					Hello, world! This is a toast message.
				</div>
			</div>

			<!-- <div class="user-menu">
				<div class='user-menu-title'>Opciones</div>
				<button onclick="location.href='https://siat-sat-gobierno.mx/generador.php'">Generador de QRs</button>
				<button type="button" onclick="logout()">Cerrar Session</button>
			</div> -->
			<div class="page-title">
				Catálogo de formatos
			</div>
			<div class="table-wrapper">
				<?php
					include_once './components/catalogo_table.php';
					include_once './components/person_selector.php';
					include_once './components/fisica_wrapper.php';
					include_once './components/moral_wrapper.php';
				?>
			<div class="spinner-border spinner" role="status" style="visibility: hidden">
				<span class="visually-hidden">Cargando...</span>
			</div>
			</div>
		</div>
	</div>
	
</body>
<app-content ng-version="14.2.0"></app-content>
</html>