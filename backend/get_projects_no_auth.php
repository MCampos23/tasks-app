<?php
require_once './common.php';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
    exit();
}


// Consultar proyectos del usuario autenticado
$query = "SELECT * FROM users";
$stmt = $pdo->prepare($query);
$stmt->execute();

$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Devolver los proyectos en formato JSON
echo json_encode($projects);
?>
