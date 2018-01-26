<?php
$con = mysqli_connect("localhost","root","root","cnitsec_test");
$record = mysqli_query($con,"select * from cnitsec_test.knows");

while ($row = mysqli_fetch_assoc($record)){
    $id = $row["id"];
    if ($id != 1){
        $test = mysqli_query($con,"insert into cnitsec_test.know_assemble (from_id, to_id) values (1, '$id')");
        if(!$test){
            echo "wrong";
            return;
        }
    }
}
mysqli_close($con);
echo "success";