<?php
require "../db.php";
$g = $db->query("select * from game limit 1")->fetch();
if(!$g){
    echo json_encode(["current_question"=>1, "status"=>"waiting"]);
    exit;
}
echo json_encode($g);