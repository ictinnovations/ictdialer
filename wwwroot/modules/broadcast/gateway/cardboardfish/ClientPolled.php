<?php

# Copyright 2007 CardBoardFish
# http://www.cardboardfish.com/
# See readme.txt for terms of use. 

require_once("IncomingFormat.php");

$errstr = "";

function poll () {
    global $sms_username, $sms_password, $errstr;

    $username = urlencode($sms_username);
    $password = urlencode($sms_password);

    $request = "http://sms1.cardboardfish.com:9001/ClientDR/ClientDR?&UN=${username}&P=${password}";
    $ch = curl_init($request);

    if (!ch) {
        $errstr = "Could not connect to server.";
        return false;
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $serverresponse = curl_exec($ch);

    if ($serverresponse == "") {
        $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $errstr = "HTTP error: $code\n";
        return false;
    }

    return processIncoming($serverresponse);
}

?>
