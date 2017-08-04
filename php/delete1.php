<?php

$stmt = $conn->prepare("DELETE FROM accounts WHERE email=?");
$stmt->bind_param("s", $_POST['email']);
$stmt->execute();

if(mysqli_affected_rows($conn) === 1){
    $output['success'] = true;
}
else{
    array_push($output["errors"], 'delete error');
}
$stmt->close();

?>