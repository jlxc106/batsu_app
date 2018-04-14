<?php
require("mysql_connect.php");

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
if(!preg_match( "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/", $_POST['password'])){
    array_push($output['errors'], "enter valid password");
    array_push($output['errors'], 'password must contain 1 uppercase, 1 lowercase, and 1 numeric characters. Password length must be between 8 and 32 characters.');
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
        $id = mysqli_stmt_insert_id($stmt);
        $time = time();
        $hash_input = (string)$id . (string)$time;
        $hash_output = password_hash($hash_input, PASSWORD_DEFAULT);
        $output['token'] = $hash_output;
        $stmt->close();

        $stmt1 = $conn->prepare("UPDATE accounts SET token=? WHERE ID=?");
        $stmt1->bind_param("si", $hash_output, $id);
        $stmt1->execute();
        $stmt1->close();

    } else {
        array_push($output["errors"], 'insert error');
    }

}
?>