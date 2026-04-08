<?php
require "../db.php";
$game = $db->query("select * from game")->fetch();
$qid = $game['current_question'];
$q = $db->query("select * from answers where question_id='$qid'")->fetchAll();
echo json_encode($q);