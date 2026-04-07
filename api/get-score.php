<?php

require "../db.php";

$q = $db->query("select * from teams")->fetchAll();

echo json_encode($q);