<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require("./mysql_connect.php");

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[],
    'data'=>[]
];

$_POST = json_decode(file_get_contents('php://input'), true);

if($_GET['operation'] === "checkIn"){
    include("./checkIn.php");
}
if($_GET['operation'] === "insertUser"){
    include("./insertAccount.php");
}
else if($_GET['operation'] === "signin"){
    include("./authenticate_login.php");
}
else if($_GET['operation'] === "insertEvent"){
    include("./insertEvent.php");
}
else if($_GET['operation'] === "uploadImage"){
    include("./updateProfilePic.php");
}
elseif($_GET['operation'] === 'eventinfo'){
    include("./getEventInfo.php");
}
// elseif($_GET['operation'] === "profile"){
//     include("./getProfile.php");
// }
// elseif($_GET['operation'] === 'eventlist'){
//     include("./getEventList.php");
// }
elseif($_GET['operation'] === 'getUserInfo'){
    include('./getUserInfo.php');
}

$outputJSON = json_encode($output);
echo($outputJSON);
exit();

?>