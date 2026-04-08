<?php
require "../db.php";

$game = $db->query("select * from game")->fetch();
$qid = $game['current_question'];

$q = $db->query("select * from questions where sort_order=$qid")->fetch();
$correct = json_decode($q['answer_json'],true);

$answers = $db->query("select * from answers where question_id='$qid'")->fetchAll();

foreach($answers as $a){

    $team = $a['team_id'];
    $ans = json_decode($a['answer'],true);

    $isCorrect = 0;

    if($q['type']=="truefalse" && $ans==$correct['correct']) $isCorrect=1;
    if($q['type']=="choice" && $ans==$correct['correct']) $isCorrect=1;
    if($q['type']=="drag" && $ans==$correct['order']) $isCorrect=1;

    $db->query("update answers set is_correct='$isCorrect' where id=".$a['id']);

    if($isCorrect){
        $db->query("update teams set score = score + 1 where id='$team'");
    }
}

$db->query("update game set status='checked'");

// trả kết quả
echo json_encode([
    "success"=> $correct
]);