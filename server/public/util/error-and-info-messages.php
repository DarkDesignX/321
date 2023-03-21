<?php

    function error_function($status_code, $message) {
        $array = array("error" => $message);
        echo json_encode($array, true);
        http_response_code($status_code);
        die();
    }

    function message_function($status_code, $message) {
        $array = array("information" => $message);
        echo json_encode($array, true);
        http_response_code($status_code);
        die();
    }
?>