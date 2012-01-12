<?php

# Copyright 2007 CardBoardFish
# http://www.cardboardfish.com/
# See readme.txt for terms of use. 

class SMS {
    var $dest_addr;
    var $source_addr;
    var $source_addr_ton;
    var $message;
    var $data_coding_scheme;
    var $delivery_receipt;
    var $user_data_header;
    var $user_reference;
    var $validity_period;
    var $delay_until;
    var $local_time;
    var $retry;
    var $errstr;
    var $errcode;
    var $systemtype;
    var $sms_username;
    var $sms_password;

    function SMS($da = "", $sa = "", $msg = "", $sat = "", $dcs = "", $dr = "", $udh = "", $ur = "", $vp = "", $du = "", $lt = "") {
        $this->errstr = "Construction failed.";

        if (!$this->setDA($da)) return false;
        $this->errstr = "DA, no error";
        if (!$this->setSA($sa)) return false;
        $this->errstr = "SA, no error";
        if (!$this->setMSG($msg)) return false;
        $this->errstr = "MSG, no error";
        if (!$this->setST($sat)) return false;
        $this->errstr = "ST, no error";
        if (!$this->setDC($dcs)) return false;
        $this->errstr = "DC, no error";
        if (!$this->setDR($dr)) return false;
        $this->errstr = "DR, no error";
        if (!$this->setUD($udh)) return false;
        $this->errstr = "UD, no error";
        if (!$this->setUR($ur)) return false;
        $this->errstr = "UR, no error";
        if (!$this->setVP($vp)) return false;
        $this->errstr = "VP, no error";
        if (!$this->setDU($du)) return false;
        $this->errstr = "DU, no error";
        if (!$this->setLT($lt)) return false;
        $this->errstr = "";

        $this->retry = true;
    }

    function setDA ($da) {

        if ($da == "") {
            $this->dest_addr = "";
            return true;
        }
        $das = explode(",", $da);

        $dests = array();

        foreach ($das as $dest) {
            if ($dest != "") {
                array_push ($dests, $dest);
            } else {
                $this->dest_addr = "";
                $this->errstr = "Destination not recognised.";
                return false;
            }
        }

        $this->dest_addr = implode(",",$dests);

        return true;
    }

    function setSA ($sa) {

        if ($sa == "") {
            $this->source_addr = "";
            return true;
        }

        if ($sa != "") {
            $this->source_addr = urlencode($sa);
            return true;
        } else {
            $this->errstr = "Source address not recognised.";
            return false;
        }
    }

    function setMSG ($msg) {
        $this->message = $msg;
        return true;
    }

    function setST ($st) {

        if ($st == "") {
            $this->source_addr_ton = "";
            return true;
        } else {
            preg_match("/^[105]$/", $st, $matches);
            if ($matches[0] != "") {
                $this->source_addr_ton = $st;
                return true;
            } else {
                $this->errstr = "Source type of number must be 1, 0 or 5.";
                return false;
            }
        }
    }

    function setDC ($dcs) {

        $dcs = "" . $dcs;

        if ($dcs == "") {
            $this->data_coding_scheme = "";
            return true;
        } else {
            preg_match("/^[0124567]$/", $dcs, $matches);
            if ($matches[0] != "") {
                $this->data_coding_scheme = $dcs;
                return true;
            } else {
                $this->errstr = "Data coding scheme must be one of:\n\t0 - Flash\n\t1 - Normal (default)\n\t2 - Binary\n\t4 - UCS2\n\t5 - Flash UCS2\n\t6 - Flash GSM\n\t7 - Normal GSM\n";
                return false;
            }
        }
    }

    function setDR ($dr) {

        if ($dr == "") {
            $this->delivery_receipt = "";
            return true;
        } else {
            preg_match("/^[012]$/", $dr, $matches);
            if ($matches[0] != "") {
                $this->delivery_receipt = $dr;
                return true;
            } else {
                $this->errstr = "Delivery receipt request must be 0, 1 or 2.";
                return false;
            }
        }
    }

    function setUD ($udh) {

        if ($udh == "") {
            $this->user_data_header = "";
            return true;
        } else {
            preg_match("/^[0-9a-fA-F]{1,17}$/", $udh, $matches);
            if ($matches[0] != "") {
                $this->user_data_header = $udh;
                return true;
            } else {
                $this->errstr = "User header data invalid.";
                return false;
            }
        }
    }

    function setUR ($ur) {

        if ($ur == "") {
            $this->user_reference = "";
            return true;
        } else {
            preg_match("/^\w{1,16}$/", $ur, $matches);
            if ($matches[0] != "") {
                $this->user_reference = $ur;
                return true;
            } else {
                $this->errstr = "User reference invalid. Must be 1-16 chars: " . $ur;
                return false;
            }
        }
    }

    function setVP ($vp) {

        if ($vp == "") {
            $this->validity_period = "";
            return true;
        } else {
            preg_match("/^\d+$/", $vp, $matches);
            if ($matches[0] != "" && $matches[0] > 0 && $matches[0] <= 10080) {
                $this->validity_period = $vp;
                return true;
            } else {
                $this->errstr = "Validity period must be a number between 0 and 10080.";
                return false;
            }
        }
    }

    function setDU ($du) {

        if ($du == "") {
            $this->delay_until = "";
            return true;
        } else {
            preg_match("/^\d{10}$/", $du, $matches);
            if ($matches[0] != "") {
                $this->delay_until = $du;
                $this->setLT("");
                return true;
            } else {
                $this->errstr = "Delay Until must be a 10 digit UCS timestamp.";
                return false;
            }
        }
    }

    function setLT ($lt) {

        if ($lt == "") {
            if ($this->delay_until != "") {
                $self->local_time = time();
                return true;
            } else {
                $self->local_time = "";
                return true;
            }
        } else {
            preg_match("/^\d{10}$/", $lt, $matches);
            if ($matches[0] != "") {
                $this->local_time = $lt;
                return true;
            } else {
                $this->errstr = "Local Time must be a 10 digit UCS timestamp.";
                return false;
            }
        }
    }

}
