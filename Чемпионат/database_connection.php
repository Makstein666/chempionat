<?php
$servername = "localhost"; // Укажите ваш сервер БД, чаще всего это 'localhost'
$username = "User"; // Ваше имя пользователя для БД
$password = "46528755"; // Ваш пароль для БД
$dbname = "chempionat_dbase"; // Имя вашей БД

// Создание соединения
$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error); // Сообщение об ошибке
}
?>
