<?php
require_once '../php-graph-sdk/src/Facebook/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
require("../mysql_connect.php");

$output = [
    'success'=> false, //we assume we will fail
    'errors'=>[]
];

//$facebook = new Facebook(array(
//'appId'  => "525805771147740",
//'secret' => "153ef1acd0cfd4598d2bb9a762f11ade",
//'cookie' => true,
//));
//
//$answer = $facebook->api("/{$row[$_POST["userID"]]}");
//$username = $answer['name'];
//print $username;


$fb = new Facebook\Facebook([
    'app_id' => '525805771147740',
    'app_secret' => '153ef1acd0cfd4598d2bb9a762f11ade',
    'default_graph_version' => 'v2.2',
]);

try {
    // Returns a `Facebook\FacebookResponse` object
    $response = $fb->get('/me?fields=id,first_name,last_name,email,birthday ', $_POST['accessToken']);
} catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
}

$user = $response->getGraphUser();

//echo 'name: ' . $user['name'];
//echo 'user: ' . $user;

$user_fname = $user['first_name'];
$user_lname = $user['last_name'];
$user_email = $user['email'];
if(array_key_exists('birthday', $user)){
    $user_dob = $user['birthday'];
}
else{
    $user_dob = null;
}

$result = mysqli_query($conn, "SELECT COUNT(ID) FROM accounts WHERE email='$user_email'");
//print_r($result);
if($result->num_rows > 0){
    echo("user has account with database");
}
else{
    $stmt = $conn->prepare("INSERT INTO accounts (first_name, last_name, email, DOB) VALUES (?,?,?,?)");
    $stmt->bind_param("ssss", $user_fname, $user_lname, $user_email, $user_dob);
    $stmt->execute();

    if (mysqli_affected_rows($conn) === 1) {
        $output['success'] = true;
    } else {
        $output["errors"] = mysqli_error($conn);
    }
    $stmt->close();

    print_r($output);
}
//echo 'Last Name: ' . $user->getLastName();
//echo "Email: ". $user->getEmail();
//echo "DOB: ". $user->getBirthday();

//required information to make an account: first name, last name,


//insert sql statement



?>