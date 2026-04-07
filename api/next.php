<?php

require "../db.php";

$g = $db->query("select * from game")->fetch();

$next = $g['current_question'] + 1;

// tổng số câu
$total = $db->query("select count(*) c from questions")->fetch()['c'];

// nếu hết câu
if($next > $total){

$db->query("
update game 
set status='finished'
");

exit;
}

// xóa câu trả lời cũ
$db->query("delete from answers");

// sang câu mới
$db->query("
update game 
set current_question='$next',
status='answering'
");