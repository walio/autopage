<?php
$con = mysqli_connect("localhost","root","root","cnitsec");
mysqli_set_charset($con,"utf8");
$con2 = mysqli_connect("localhost","root","root","cnitsec_test");
$record = mysqli_query($con,"select * from x2_questions");

function format($content){
    $content = strip_tags(html_entity_decode($content), '<img>');
    return str_replace('&nbsp;','',$content);
}
while ($row = mysqli_fetch_assoc($record)){
    $id = $row['questionid'];
    $stem = format($row['question']);
    $stem = preg_replace("/\r\n/",'',$stem);
    $stem = json_encode([$stem],JSON_UNESCAPED_UNICODE);
    $type = $row['questiontype'];
    $user = $row['questionuserid'];
    $questring = format($row['questionselect']);

    $questring = preg_replace("/A.\s+/",'',$questring);
    $questring = preg_replace("/B.\s+/",'',$questring);
    $questring = preg_replace("/C.\s+/",'',$questring);
    $questring = preg_replace("/D.\s+/",'',$questring);
    $questring = preg_replace("/E.\s+/",'',$questring);
    $questring = preg_replace("/F.\s+/",'',$questring);
    $questring = preg_replace("/A.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/B.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/C.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/D.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/E.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/F.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/A.\s+/",'',$questring);
    $questring = preg_replace("/B.\s+/",'',$questring);
    $questring = preg_replace("/C.\s+/",'',$questring);
    $questring = preg_replace("/D.\s+/",'',$questring);
    $questring = preg_replace("/E.\s+/",'',$questring);
    $questring = preg_replace("/F.\s+/",'',$questring);
    $questring = preg_replace("/A.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/B.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/C.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/D.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/E.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/F.(&amp;nbsp;)+/",'',$questring);
    $questring = preg_replace("/A./",'',$questring);
    $questring = preg_replace("/B./",'',$questring);
    $questring = preg_replace("/C./",'',$questring);
    $questring = preg_replace("/D./",'',$questring);
    $questring = preg_replace("/E./",'',$questring);
    $questring = preg_replace("/F./",'',$questring);
    $questring = preg_replace("/A．/",'',$questring);
    $questring = preg_replace("/B．/",'',$questring);
    $questring = preg_replace("/C．/",'',$questring);
    $questring = preg_replace("/D．/",'',$questring);
    $questring = preg_replace("/E．/",'',$questring);
    $questring = preg_replace("/F．/",'',$questring);
    $questring = iconv("UTF-8","UTF-8//IGNORE",$questring);
    $questring = trim($questring);
    $options = explode(chr(13).chr(10),$questring);
    $options = json_encode($options,JSON_UNESCAPED_UNICODE);
    $answer = (int)$row['questionanswer'];
    $digest = format($row['questiondescribe']);
    $status = $row['questionstatus'];
    $difficulty_level = $row['questionlevel'];
    $time = $row['questioncreatetime'];
    $re = mysqli_query($con2, "insert into questions (id,stem,type,user_id,options,answer,digest,status,difficulty_level,reference) values ('$id','$stem','$type','$user','$options','$answer','$digest','$status','$difficulty_level',0)");
    if($re){
        $tt = mysqli_query($con,"delete from x2_questions where questionid='$id'");
        if(!$tt){
            echo "fail in delete";
            var_dump($row);
            echo mysqli_error($con);
            return;
        }
    }else{
        echo "fail in insert";
        var_dump($row);
        echo(mysqli_error($con2));
        echo json_last_error_msg();
        echo "\n";
    };
}
echo "\n";
mysqli_close($con);
mysqli_close($con2);