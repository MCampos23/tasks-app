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

// Verificar si el usuario existe
$query = "SELECT id, password FROM users WHERE username = :username";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':username', $username);
$stmt->execute();

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    // Autenticación exitosa
    echo json_encode(['success' => true, 'userId' => $user['id']]);
} else {
    echo json_encode(['error' => 'Usuario o contraseña incorrectos']);
}
?>
