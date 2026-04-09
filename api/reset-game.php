<?php
require "../db.php";
// reset điểm
$db->query("update teams set score = 0");
// xóa answers
$db->query("delete from answers");
// random câu hỏi
$q = $db->query("select id from questions")->fetchAll();
shuffle($q);
$i = 1;
foreach($q as $row){
    $db->query("update questions set sort_order='$i'where id=".$row['id']);
    $i++;
}
// reset game
$db->query("update game set current_question=1,status='waiting'");

echo json_encode([
    "success"=> true
]);