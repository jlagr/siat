<?php

// Conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "sat";

// Crear conexión
$conn = mysqli_connect($host, $user, $password, $dbname);

// Verificar conexión
if (!$conn) {
  die("Conexión fallida: " . mysqli_connect_error());
}

// Obtener el valor del parámetro "rfc" del query string
$rfc = $_GET['rfc'];
echo $rfc;
// Crear la consulta
$sql = "SELECT * FROM morales WHERE rfc = '$rfc'";

// Ejecutar la consulta
$result = mysqli_query($conn, $sql);

// Verificar si se obtuvieron resultados
if (mysqli_num_rows($result) > 0) {
  // Obtener los resultados
  $row = mysqli_fetch_assoc($result);
} else {
  echo "No se encontraron resultados";
}

// Cerrar la conexión
mysqli_close($conn);

?>