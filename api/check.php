<?php

require "../db.php";

$game = $db->query("select * from game")->fetch();
$qid = $game['current_question'];

$q = $db->query("select * from questions where id=$qid")->fetch();

$correct = json_decode($q['answer_json'],true);

$answers = $db->query("
select * from answers 
where question_id='$qid'
")->fetchAll();

foreach($answers as $a){

$team = $a['team_id'];
$ans = json_decode($a['answer'],true);

$isCorrect = 0;


// TRUE FALSE
if($q['type'] == "truefalse"){

if($ans == $correct['correct']){
$isCorrect = 1;
}

}


// CHOICE
if($q['type'] == "choice"){

if($ans == $correct['correct']){
$isCorrect = 1;
}

}


// DRAG
if($q['type'] == "drag"){

if($ans == $correct['order']){
$isCorrect = 1;
}

}


// update answers
$db->query("
update answers 
set is_correct='$isCorrect'
where id=".$a['id']
);


// cộng điểm
if($isCorrect){

$db->query("
update teams 
set score = score + 1
where id='$team'
");

}

}


// update game status
$db->query("
update game 
set status='checked'
");