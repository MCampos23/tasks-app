<?php
require_once('common.php');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
    exit();
}

// Leer el ID del usuario autenticado
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['userId'])) {
    echo json_encode(['error' => 'Falta el ID del usuario']);
    exit();
}

$userId = $data['userId'];

// Consultar proyectos del usuario autenticado
$query = "SELECT * FROM projects WHERE user_id = :user_id";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':user_id', $userId);
$stmt->execute();

$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Devolver los proyectos en formato JSON
echo json_encode($projects);
?>
