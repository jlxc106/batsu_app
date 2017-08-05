<?php
//require the connect file
require_once('mysqlconnect.php');

//grab the object values passed through the axios call?
$username = $_POST['username'];
$password = $_POST['password']; //password_hash($_POST['password'],PASSWORD_DEFAULT);

$query = "SELECT * from accounts where email = '$username' and password = '$password'";

$result = mysqli_query($conn,$query);

//the database should return 1 row equal to the query
if(mysqli_num_rows($result) == 1){
    //session_start();
    //$_SESSION['authorized'] = 'true';
    //header('location: redirect_page.html');
    print('logged in');
}
else{
    print('not logged in');
}

//can use the 'isset($_SESSION['auhorized'])' variable on other pages to confirm user is logged in.
// session_destroy(); when a user logs out

?>