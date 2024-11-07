<?php
require_once('common.php');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error en la conexión: " . $e->getMessage();
    exit();
}

// Leer los datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['name']) || !isset($data['userId'])) {
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit();
}

$name = $data['name'];
$userId = $data['userId'];

// Insertar el nuevo proyecto en la base de datos
$query = "INSERT INTO projects (name, user_id) VALUES (:name, :user_id)";
$stmt = $pdo->prepare($query);

$stmt->bindParam(':name', $name);
$stmt->bindParam(':user_id', $userId);

if ($stmt->execute()) {
    // Obtener el ID generado automáticamente
    $projectId = $pdo->lastInsertId();
    // Devolver los datos del proyecto recién creado
    echo json_encode(['id' => $projectId, 'name' => $name]);
} else {
    echo json_encode(['error' => 'Error al crear el proyecto']);
}
?>
