<?php
require "../db.php";
$q = $db->query("select * from teams order by score desc")->fetchAll();
echo json_encode($q);