<?php

// need to add session data to this file
//require the connect file
require_once('mysql_connect.php');

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

//grab the object values passed through the axios call
$email = $_POST['email'];
$password = $_POST['password']; //password_hash($_POST['password'],PASSWORD_DEFAULT);

$query = "SELECT * from accounts where email = '$email' ";

$result = mysqli_query($conn,$query);

//the database should return 1 row equal to the query
if(mysqli_num_rows($result) === 1){

    //turn the result into an associated array snd compare password in database to $_POST['password']
    while($row = mysqli_fetch_array($result)){
        if(password_verify($password, $row["password"])){
            $output['success'] = true;
            //session_start();
            //$_SESSION['authorized'] = 'true';
            //print("You are logged in");
        }
        else{
            //print('password does not match');
        }
    }
}
else{
    //print("Incorrect username or login");
}

print_r(json_encode($output));

//can use the 'isset($_SESSION['auhorized'])' variable on other pages to confirm user is logged in.
// session_destroy(); when a user logs out

?>