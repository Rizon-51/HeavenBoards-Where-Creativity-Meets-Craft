<?php
    include 'connection.php';
    $firstname = $_POST['first'];
    $lastname = $_POST['last'];
    $email = $_POST['email'];
    $district = $_POST['district'];
    $city = $_POST['city'];
    $address = $_POST['address'];
    $birthDate = $_POST['dateOfBirth'];
    $password = $_POST['password'];

    $sql = "INSERT INTO users(firstName, lastName, email, district, city, address, dob, password) VALUES('$firstname', '$lastname', '$email', '$district', '$city', '$address', '$birthDate', '$password')";

    $run = mysqli_query($con, $sql);

    if($run){
        header("Location: index.html");
    }else{
        echo 'submission failed';
    }
?>