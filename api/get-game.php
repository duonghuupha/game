<?php
require "../db.php";
$g = $db->query("select * from game")->fetch();
echo json_encode($g);