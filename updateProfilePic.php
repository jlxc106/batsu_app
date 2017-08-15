<?php
require('mysql_connect.php');

$directory_needed = 'upload_images';

$upload_dir = 'upload_images/'; //variable to hold images directory on server

$target_file = $upload_dir.$_FILES['profile']['name'];

$uploadOK = true;

// if(is_dir($directory_needed)){
// 	echo 'the file exists';
// }else{
// 	echo 'the file does not exists';
// }

$output = ['success' => false];

$file = $_FILES['profile']['tmp_name'];

        // Check file size
        if($_FILES['profile']['size'] == 0){
            $output['errors'][] = 'No file uploaded or the selected file is too large (2MB)';
        }
        // Allow certain file formats
        else{
            $extension_info = pathinfo($_FILES['profile']['name'],PATHINFO_EXTENSION);
            // Check the file extension
                if($extension_info == gif || $extension_info ==jpeg || $extension_info ==jpg || $extension_info ==png ){
                    $output['uploaded image'] = 'correct file type';
                    $output['success'] = true;
                    $uploadOK = true;

                //Begin inserting image into file
                if($uploadOK){
                    if(move_uploaded_file($_FILES['profile']['tmp_name'], $target_file)){
                        $output['success'] = true;
                        $output['success msg'] = "The file".$_FILES['profile']['name']."has been uploaded.";

                        //begin UPDATE into the database
                        $query = " UPDATE `upload_images` SET `path` = '$target_file' WHERE id=4 ";
                        $result = mysqli_query($conn,$query);

                        if(mysqli_affected_rows($conn)>0){
                            $output['database insert'] = true;
                            $row = mysqli_insert_id($conn);
                            $output['insertID'] = $row;
                        }
                        else{
                          //print(mysqli_error($conn));
                            $output['errors'] ='insert error';
                        }
                    }
                else{
                    $output['errors'][] = 'There was an error uploading your file';
                    }
                }


            }
            else{
                $uploadOK = false;
                $output['success'] = false;
                $output['uploaded image'] = 'incorrect file type';
            }
        }

// $image = $_FILES['upload_file']['tmp_name']; //can wrap in addslashes() to prevent sql injections

// $image_name = $_FILES['upload_file']['name'];



            print_r(json_encode($output));



?>