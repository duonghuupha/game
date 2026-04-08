<?php
require "../db.php";
$db->query("update game set status='open'");