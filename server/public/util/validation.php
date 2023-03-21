<?php
    function validate_string($_string) {
        $_string = addslashes($_string);
        $_string = strip_tags($_string);
        if (!(isset($_string) && !(strlen($_string) < 1) && !(empty($_string)))) {
            return false;
        }
        return $_string;
    }

    function validate_array($_array) {
        if (!(is_array($_array))) {
            return false;
        }
        foreach($_array as $key => $value) {
            $_array[$key] = validate_string($value);
            if (validate_string($key) === false) {
                return false;
            }
        }
        return $_array;
    }

    function validate_number($_integer) {
        $_integer = intval($_integer);
        return $_integer;
    }

    function validate_float($_float) {
        $_float = floatval($_float);
        return $_float;
    }

    function validate_boolean($_bool) {
        $_bool = filter_var($_bool, FILTER_VALIDATE_BOOLEAN);
        return $_bool;
    }
    require_once "util/secret.php";

    function create_token($user_name, $user_password, $id) {
        global $secret;
        $token = $user_name . $secret . $user_password;
        $token = hash("sha256", $token);
        $token = $token . "[tr]" . $id;
        return $token;
    }

    function validate_token() {
        $the_set_token = validate_string($_COOKIE["token"]);
        
        if ($the_set_token === false) {
            error_function(403, "no token");
        }

        $token_exploded = explode("[tr]", $the_set_token);

        $user = get_user_by_id($token_exploded[1]);

        $user_token = create_token($user["user_name"], $user["user_password"], $token_exploded[1]);

        if ($user_token === $the_set_token) {
            return $token_exploded[1];
        }
        error_function(403, "Authentication Failed");
    }
?>
