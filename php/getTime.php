<?php

$eventID = (int)$_GET['event'];

$stmt = $conn->prepare("SELECT Event_DateTime FROM events WHERE Event_ID = ?");
$stmt -> bind_param("i", $eventID);
$stmt -> execute();
$stmt -> bind_result($dateTime);
$stmt -> fetch();

//echo($dateTime);
$output["data"] = (object)["dateTime" => $dateTime];
$stmt -> close();


?>