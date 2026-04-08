<?php
require "../db.php";
$team = $_POST['team_id'];
$answer = $_POST['answer'];
$game = $db->query("select * from game")->fetch();
// chỉ cho trả lời khi OPEN
if($game['status'] != 'open'){
    exit;
}
$qid = $game['current_question'];
// đã trả lời rồi thì bỏ qua
$check = $db->query("select id from answers where question_id='$qid' and team_id='$team'")->fetch();
if($check){
    exit;
}
$db->query("insert into answers (question_id,team_id,answer) values ('$qid','$team','$answer')");