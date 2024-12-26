<?php
session_start();
require 'database_connection.php'; // Подключение к вашей базе данных

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Подготовка запроса для получения данных пользователя
    $stmt = $conn->prepare("SELECT name, surname, gender, age FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Получение данных
        $userData = $result->fetch_assoc();
        echo json_encode($userData);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode([]);
}
?>