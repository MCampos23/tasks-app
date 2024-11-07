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

if (!isset($data['username']) || !isset($data['password'])) {
    echo json_encode(['error' => 'Faltan campos requeridos']);
    exit();
}

$username = $data['username'];
$password = $data['password'];

// Encriptar la contraseña
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insertar el nuevo usuario en la base de datos
$query = "INSERT INTO users (username, password) VALUES (:username, :password)";
$stmt = $pdo->prepare($query);

$stmt->bindParam(':username', $username);
$stmt->bindParam(':password', $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Usuario registrado']);
} else {
    echo json_encode(['error' => 'Error al registrar el usuario']);
}
?>
