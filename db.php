<?php

$host = "localhost";
$dbname = "tro_choi";
$user = "root";
$pass = "";

try{

$db = new PDO(
"mysql:host=$host;dbname=$dbname;charset=utf8",
$user,
$pass
);

$db->setAttribute(
PDO::ATTR_ERRMODE,
PDO::ERRMODE_EXCEPTION
);

}catch(PDOException $e){

echo "DB Error: " . $e->getMessage();
exit;

}