<?php

//$four = ;
$token = $_GET['token'];

$stmt = $conn -> prepare("SELECT ID FROM accounts WHERE token=?");
$stmt -> bind_param("s", $token);
$stmt -> execute();
$stmt -> bind_result($id);
$stmt -> fetch();
$stmt -> close();


$createdEventList = [];
$invitedEventList = [];
$stmt1 = $conn->prepare("SELECT e.Event_ID, e.Event_Name, ea.Attendee_Status, e.Event_DateTime, ea.Punishment, e.Creator_ID, ea.isCreator FROM event_attendees AS ea INNER JOIN events as e ON ea.Event_ID = e.Event_ID WHERE ea.Attendee_ID = ?");
$stmt1->bind_param("s", $id);
//$stmt1->bind_param("s", $four);

$stmt1->execute();
$stmt1->bind_result($eventID, $eventName, $Status, $DateTime, $punishment, $creatorID, $isCreator);
while($stmt1->fetch()){
    if($isCreator === 1){
        $createdtemp = (object)["event_name"=>$eventName, "creator_id"=>$creatorID, "event_id"=>$eventID, "event_dateTime"=>$DateTime, "attendee_status"=>$Status];
        array_push($createdEventList, $createdtemp);
    }
    else{
        //add onto invited list
        $invitedtemp = (object)["event_name"=>$eventName, "creator_id"=>$creatorID, "event_id"=>$eventID, "event_dateTime"=>$DateTime, "attendee_status"=>$Status];
        array_push($invitedEventList, $invitedtemp);
    }
}
$output['success'] = true;
$output['data'] = (object)["createdEventList"=>$createdEventList, "invitedEventList"=>$invitedEventList];
$stmt1->close();
?>