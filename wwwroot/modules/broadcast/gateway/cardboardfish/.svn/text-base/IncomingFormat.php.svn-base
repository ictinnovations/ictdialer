<?php

# Copyright 2007 CardBoardFish
# http://www.cardboardfish.com/
# See readme.txt for terms of use. 

function processIncoming ($input) {
    if ($input == "0#") {
        return true;
    }
    $receipts = explode("#", $input);

    array_shift($receipts);

    $to_return = array();

    foreach ($receipts as $receipt) {
        if ($receipt == "") {
            continue;
        }
        $field = explode(":", $receipt);
        array_push($to_return, $field);
    }
    return $to_return;
}

function deliveryReceipt($receipt) {
    echo "MSGID: $receipt[0]\n";
    echo "SOURCE: $receipt[1]\n";
    echo "DESTINATION: $receipt[2]\n";
    echo "STATUS: $receipt[3]\n";
    echo "ERRORCODE: $receipt[4]\n";
    echo "DATETIME: $receipt[5]\n";
    echo "USERREF: $receipt[6]\n";
}

function incomingSMS($sms) {
    echo "SOURCE: $sms[1]\n";
    echo "DESTINATION: $sms[2]\n";
    echo "DCS: $sms[3]\n";
    echo "DATETIME: $sms[5]\n";
    echo "UDH: $sms[6]\n";
    echo "MESSAGE: ", pack("H*", $sms[7]), "\n";
}

function determineType ($responses) {
    if (!is_array($responses)) {
        return;
    }
    if (count($responses) > 0) {
        foreach ($responses as $response) {
            if ($response[0] == "-1") {
                incomingSMS($response);
            } else {
                deliveryReceipt($response);
            }
            echo "\n";
        }
    }
}

?>
