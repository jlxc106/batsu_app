<?php

$token = $_GET['token'];

$stmt = $conn -> prepare("SELECT ID FROM accounts WHERE token=?");
$stmt -> bind_param("s", $token);
$stmt -> execute();
$stmt -> bind_result($id);
$stmt -> fetch();
$stmt -> close();


$upload_dir = 'upload_images/'; //variable to hold images directory on server

$target_file = $upload_dir; //.$_FILES['profile']['name'];

$uploadOK = false;

$file = $_FILES['profile']['tmp_name'];

// Check file size
if($_FILES['profile']['size'] == 0){
    array_push($output['errors'], 'No file uploaded or the selected file is too large (2MB)');
}
// Allow certain file formats
else{
    $extension_info = pathinfo($_FILES['profile']['name'],PATHINFO_EXTENSION);
    if($extension_info == "gif" || $extension_info == "jpeg" || $extension_info == "jpg" || $extension_info == "png" ){
        $uploadOK = true;

        //****************USING UNIQUE ID TO STORE FILES && AVOID DUPLICATES**********************
        $file_name_new = uniqid('',true).".".$extension_info;
        $target_file = "./".$upload_dir.$file_name_new;

        if($uploadOK){
            if(move_uploaded_file($file, $target_file)){
                $stmt = $conn->prepare("UPDATE accounts SET path = ? WHERE ID=?");
                $stmt->bind_param("si", $target_file, $id);
                $stmt->execute();

                if(mysqli_affected_rows($conn) > 0){
                    $output['success'] = true;
                    $output['data'] = (object)["path" =>$target_file];
                }
                else{
                    echo mysqli_error($conn);
                    echo "insert error";
                    array_push($output['errors'], 'insert error');
                }
                $stmt -> close();
            }
            else{
                array_push($output['errors'], 'There was an error uploading your file');
            }
        }

    }
    else{
        $uploadOK = false;
        $output['success'] = false;
        array_push($output['errors'], 'incorrect file type');
    }
}

?>