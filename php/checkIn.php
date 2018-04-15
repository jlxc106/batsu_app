<?php

$token = $_POST['token'];
$status = $_POST['myStatus'];
$eventID = $_POST['eventID'];
$stmt = $conn -> prepare("SELECT ID FROM accounts WHERE token=?");
$stmt -> bind_param("s", $token);
$stmt -> execute();
$stmt -> bind_result($id);
$stmt -> fetch();
$stmt -> close();

$stmt1 = $conn -> prepare("UPDATE event_attendees SET Attendee_Status=? WHERE Attendee_ID = ? AND Event_ID = ?");
$stmt1 -> bind_param("sii", $status, $id, $eventID);
$stmt1 -> execute();
$stmt1 -> close();

$stmt2 = $conn -> prepare("SELECT Attendee_Status FROM event_attendees WHERE Attendee_ID = ? AND Event_ID =?");
$stmt2 -> bind_param("ii", $id, $eventID);
$stmt2 -> execute();
$stmt2 -> bind_result($result);
$stmt2 -> fetch();
$stmt2 -> close();


if($result === $status){
    $output['success'] = true;
    array_push($output['data'], $result);
}
else{
    array_push($output["errors"], 'insert error');
}

?>