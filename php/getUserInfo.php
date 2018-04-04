<?php

$token = $_POST['token'];
$stmt = $conn -> prepare("SELECT ID, first_name, last_name, email, phone, path FROM accounts WHERE a.token = ?");
$stmt -> bind_param("s", $token);
$stmt -> execute();
$stmt -> bind_result($id, $first_name, $last_name, $email, $phone, $path);
$stmt -> fetch();

if(mysql_num_rows($conn) === 1){
    $stmt -> close();

    $createdEventList = [];
    $invitedEventList = [];

    $profile = (object)["fname" => $first_name, "lname" =>$last_name, "email" =>$email,"phone" =>$phone, "path" =>$path];
    $stmt1 = $conn -> prepare("SELECT e.EVENT_ID, e.Event_Name, e.Event_DateTime, e.Event_Address, ea.isCreator FROM events as e INNER JOIN event_attendees as ea on e.Event_ID = ea.Event_ID WHERE ea.Attendee_ID = ?");
    $stmt1 -> bind_param("i", $id);
    $stmt1 -> execute();
    $stmt1 -> bind_result($event_id, $event_name, $event_datetime, $event_address, $isCreator);
    while($stmt1->fetch()){
        if($isCreator === 1){
            $createdtemp = (object)["event_name"=>$event_name, "event_id"=>$eventID, "event_dateTime"=>$DateTime, "event_address"=>$event_address];
            array_push($createdEventList, $createdtemp);
        }
        else{
            $invitedtemp = (object)["event_name"=>$event_name, "event_id"=>$eventID, "event_dateTime"=>$DateTime, "event_address"=>$event_address];
            array_push($invitedEventList, $invitedtemp);
        }
    }
    $events = (object)["createdEvents"=> $createdEventList, "invitedEvents" => $invitedEventList];
    $output['data'] = (object)["profile" => $profile, "events"=> $events];
    $output['success'] = true;
    $stmt1->close();
}
else{
    $stmt -> close();
    array_push($output['errors'], "unable to identify/validate user");
    $output['success'] = false;
}

?>