<?php

require "../db.php";

$game = $db->query("select * from game")->fetch();

$no = $game['current_question'];

$q = $db->query("
select * from questions 
where sort_order='$no'
")->fetch();

echo json_encode($q);