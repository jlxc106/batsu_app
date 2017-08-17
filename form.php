<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require("mysql_connect.php");

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

$_POST = json_decode(file_get_contents('php://input'), true);


if($_GET['operation'] === "insertUser"){
    include("./php/insertAccount.php");
}
else if($_GET['operation'] === "getTime"){
    include("./php/getTime.php");
}
else if($_GET['operation'] === "signin"){
    include("./php/authenticate_login.php");
}
else if($_GET['operation'] === "insertEvent"){
    include("./php/insertEvent.php");
}
else if($_GET['operation'] === "readAll"){
    include("./php/read.php");
}
else if($_GET['operation'] === "delete"){
    include("./php/delete1.php");
}
else if($_GET['operation'] === "update"){
    include("./php/update1.php");
}

else if($_GET['operation'] === "authenticateUser"){
    include("./authenticate_login.php");
}
else if($_GET['operation'] === "uploadImage"){
    include("./updateProfilePic.php");

}


if($output['success'] === false){
    array_push($output['errors'], mysqli_error($conn));
}

$outputJSON = json_encode($output);
echo($outputJSON);
exit();

?>