<?php
	function customError($errno, $errstr)
	{
		echo "";
	}

	use Psr\Http\Message\ResponseInterface as Response;
	use Psr\Http\Message\ServerRequestInterface as Request;
	use Slim\Factory\AppFactory;
	use ReallySimpleJWT\Token;

	require __DIR__ . "/../vendor/autoload.php";

	require_once "util/validation.php";
	require_once "util/error-and-info-messages.php";
	require_once "model/sql.php";

	header("Content-Type: application/json");

	$app = AppFactory::create();

	$app->setBasePath("/server");

	$app->post("/Login", function (Request $request, Response $response, $args) {
		$body_content = file_get_contents("php://input");
		$JSON_data = json_decode($body_content, true);
	
		if (isset($JSON_data["user_name"]) && isset($JSON_data["user_password"])) {
		} else {
			error_function(400, "Empty request");
		}
	
		$user_name = validate_string($JSON_data["user_name"]);
		$user_password = validate_string($JSON_data["user_password"]);
	
			if (!$user_password) {
				error_function(400, "user_password is invalid, must contain at least 5 characters");
			}
			if (!$user_name) {
				error_function(400, "user_name is invalid, must contain at least 5 characters");
			}
	
		$user_password = hash("sha256", $user_password);
	
		$user = get_user_by_user_name($user_name);
	
		if ($user["user_password"] !==  $user_password) {
			error_function(404, "not Found");
		}
	
		$token = create_token($user_name, $user_password, $user["ID"]);
	
		setcookie("token", $token);
	
		message_function(200, "Succesfuly created Token");
	
		return $response;
	});
	
	function user_validation()
	{
		$current_user = validate_token();
		if ($current_user === false) {
			error_function(403, "unauthenticated");
		}
		return $current_user;
	}

	$app->run();
?>