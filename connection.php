<?php
$host = "localhost";
$username = "root";
$password = "";
$database = "test";
$con = mysqli_connect($host, $username, $password, $database);
if(!$con){
    echo "connection failed!";
} 
?>