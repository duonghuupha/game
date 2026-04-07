<?php

require "../db.php";

$team = $_POST['team_id'];
$answer = $_POST['answer'];

$game = $db->query("select * from game")->fetch();
$qid = $game['current_question'];

$db->query("
insert into answers
(question_id,team_id,answer)
values
('$qid','$team','$answer')
");