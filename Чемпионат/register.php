<?php
session_start(); // Запускессии для использования
require 'database_connection.php'; // Подключение к базе данных

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получение данных из формы
    $email = $_POST['email'];
    $surname = $_POST['surname'];
    $name = $_POST['name'];
    $gender = $_POST['gender'];
    $age = $_POST['age'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    // Проверка на совпадение паролей
    if ($password !== $confirm_password) {
        die('Пароли не совпадают.');
    }

    // Хеширование пароля
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Подготовленный запрос для вставки данных
    $stmt = $conn->prepare("INSERT INTO users (email, surname, name, gender, age, password) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $email, $surname, $name, $gender, $age, $hashed_password);

    // Выполнение и проверка на ошибки
    if ($stmt->execute()) {
        echo 'Регистрация успешна!';
        // Возможно, дальнейшая логика: авторизация пользователя, редирект и т.д.
    } else {
        echo 'Ошибка регистрации: ' . $stmt->error;
    }

    // Закрытие соединения
    $stmt->close();
    $conn->close();
}
?>