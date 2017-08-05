<?php

require("mysql_connect.php");

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

$encryped_pw = password_hash($_POST['password'], PASSWORD_DEFAULT);
$email = $_POST['email'];
$phone = $_POST['phone'];

$dob = strtotime($_POST['dob']);
$min = strtotime('+10 years', $dob);

//same password check
if($_POST['password'] !== $_POST['password_conf']){
    array_push($output['errors'], "enter two identical passwords");
}
//regex for password: atleast 1 uppercase, 1 lowercase, 1 number, between 8 and 32 characters
if(!preg_match( "/^[a-zA-Z](?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{7,31}$/", $_POST['password'])){
    array_push($output['errors'], "enter valid password");
}

//email regex - built in php
if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
    array_push($output['errors'], "invalid email");
}

//phone number regex
if(!preg_match("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/" ,$phone)){
    array_push($output['errors'], "invalid U.S. phone number");
}
if(time() < $min){
    //user must be atleast 10 years or older
    array_push($output['errors'], "must be older than 10 years old to sign up");
}
if(count($output['errors']) === 0 ){
    $output['data'] = [];
    $stmt = $conn->prepare("INSERT INTO accounts (first_name, last_name, email, phone, password, DOB) VALUES (?,?,?,?,?,?)");
    $stmt->bind_param("ssssss", $_POST['fname'], $_POST['lname'], $_POST['email'], $_POST['phone'], $encryped_pw, $_POST['dob']);
    $stmt->execute();

    if (mysqli_affected_rows($conn) === 1) {
        $output['success'] = true;
    } else {
        $output["errors"] = 'insert error';
    }
    $stmt->close();
}
?>