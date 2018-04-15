<?php

$token = $_POST['token'];

$stmt = $conn -> prepare("SELECT ID, first_name, last_name FROM accounts WHERE token=?");
$stmt -> bind_param("s", $token);
$stmt -> execute();
$stmt -> bind_result($id, $my_fname, $my_lname);
$stmt -> fetch();
$stmt -> close();

$date = $_POST['date'];
$time = $_POST['time'];

$datetime = strtotime($date.$time);

$attending = 'Attending';
$pending = 'Pending';
$true = 1;
$false = 0;

$combinedDT = date('Y-m-d H:i:s', $datetime);

$stmt1 = $conn->prepare("INSERT INTO events (Creator_ID, Event_Name, Event_DateTime, Event_Latitude, Event_Longitude, Event_Address, Event_Description) VALUES (?,?,?,?,?,?,?)");
$stmt1->bind_param("sssssss", $id, $_POST["event_name"], $combinedDT, $_POST["location"]["lat"], $_POST["location"]["lng"], $_POST["address"], $_POST["description"]);
$stmt1->execute();

if(mysqli_affected_rows($conn) === 1){
    $event_table_id = mysqli_stmt_insert_id($stmt1);
    $stmt1->close();

    $stmt2 = $conn->prepare("INSERT INTO event_attendees (Event_ID, Attendee_ID, Attendee_First_Name, Attendee_Last_Name, Attendee_Status, Punishment, isCreator) VALUES (?,?,?,?,?,?,?)");
    $stmt2->bind_param("iissssi", $event_table_id, $id, $my_fname, $my_lname, $attending, $_POST['punishment'], $true);
    $stmt2->execute();

    if(mysqli_affected_rows($conn) === 1) {
        $stmt2->close();
        if(isset($_POST['invitee'])){
            $listOfInvintees = str_replace(",","", $_POST['invitee']);
            $event_invitee_list = explode(" ", $listOfInvintees);
            foreach ($event_invitee_list as $invited_person){
                $query1 = "SELECT ID, first_name, last_name FROM accounts WHERE email=?";
                if($stmt = $conn->prepare($query1)){
                    $stmt->bind_param("s", $invited_person);
                    $stmt->execute();
                    $stmt->bind_result($invited_person_ID, $fname, $lname);
                    $stmt->fetch();
                    $stmt->close();

                }
                else{
                    array_push($output['errors'], mysqli_error($conn));
                }
                if(isset($invited_person_ID)){
                    $query = "INSERT INTO event_attendees (Event_ID, Attendee_ID, Attendee_First_Name, Attendee_Last_Name, Attendee_Status, Punishment, isCreator) VALUES (?,?,?,?,?,?,?)";
                    if($stmt3 = $conn->prepare($query)){
                        $stmt3->bind_param("iissssi", $event_table_id, $invited_person_ID, $fname, $lname, $pending, $_POST['punishment'], $false);
                        $stmt3->execute();
                        $stmt3->close();
                    }
                    else{
                        array_push($output['errors'], mysqli_error($conn));
                    }
                }
            }
        }
        $output['data'] = (object)["event_name"=>$_POST["event_name"], "event_id"=>$event_table_id, "event_dateTime"=>$combinedDT, "event_address"=>$_POST["address"], "latitude"=>$_POST["location"]["lat"], "longitude"=>$_POST["location"]["lng"]];
        $output['success'] = true;
    }
    else{
        array_push($output['errors'], mysqli_error($conn));
    }
}
else{
    array_push($output["errors"], 'insert error');
    array_push($output['errors'], mysqli_error($conn));
}

?>