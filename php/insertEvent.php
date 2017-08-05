<?php

//$encryped_pw = password_hash($_POST['password'], PASSWORD_DEFAULT);
//$email = $_POST['email'];
//$phone = $_POST['phone'];
//
//if($_POST['password'] !== $_POST['password_conf']){
//    exit("enter two identical passwords");
//}
//
//if(!preg_match( "/^[a-zA-Z](?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,31}$/", $_POST['password'])){
//    exit("enter valid password");
//}
//
//if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
//    array_push($output["errors"], 'invalid email');
//    exit("invalid email");
//}
//
//if(!preg_match("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/" ,$phone)){
//    array_push($output["errors"], 'invalid phone');
//    exit("invalid phone");
//}
//
//$dob = strtotime($_POST['dob']);
//$min = strtotime('+10 years', $dob);
//if(time() < $min){
//    exit("must be older than 10 years old");
//}


$output['data'] = [];

$stmt = $conn->prepare("INSERT INTO events (Creator_ID, Event_Name, Event_DateTime, Event_Location, Event_Address, Event_Description) VALUES (?,?,?,?,?,?)");
$stmt->bind_param("ssssss", $_POST[], $_POST["event_name"], $_POST["event_date"] + $_POST["event_time"], $_POST["location"], $_POST["address"], $_POST["description"]);
$stmt = $conn->prepare("INSERT INTO accounts (first_name, last_name, email, phone, password, DOB) VALUES (?,?,?,?,?,?)");
$stmt->bind_param("ssssss", $_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['phone'], $encryped_pw, $_POST['dob']);

$stmt->execute();

if(mysqli_affected_rows($conn) === 1){
    $output['success'] = true;
    $output['data']=[
        'fname'=>$_POST['fname'],
        'lname' => $_POST['lname'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone']
    ];
}
else{
    array_push($output["errors"], 'insert error');
}
print_r($output);
$stmt->close();

?>