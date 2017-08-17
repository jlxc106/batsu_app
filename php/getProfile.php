<?php

//check with db for token

    $token = $_GET['token'];
    $stmt = $conn -> prepare("SELECT ID FROM accounts WHERE token=?");
    $stmt -> bind_param("s", $token);
    $stmt -> execute();
    $stmt -> bind_result($id);
    $stmt -> fetch();
    $stmt -> close();

    $stmt1 = $conn->prepare("SELECT first_name, last_name, email, phone FROM accounts WHERE ID=?");
    $stmt1->bind_param("s", $id);
    $stmt1->execute();
    $stmt1->bind_result($fname, $lname, $email, $phone);
    $stmt1->fetch();
    if(empty($fname)){
        array_push($output["errors"], 'database error');
        array_push($output['errors'], 'no data');
    }
    else{
        $output['success'] = true;
        $output['data'] = (object)["fname" => $fname, "lname" => $lname, "email"=>$email, "phone"=>$phone];
    }

    $stmt1->close();
?>