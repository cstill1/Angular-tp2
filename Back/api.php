<?php
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

// header("Access-Control-Allow-Origin: *");
/*$app->put ('/{id}', 'updateClient');
$app->delete ('/{id}', 'deleteClient');*/

// instantiate the App object
$app = new \Slim\App();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// Add route callbacks
$app->get('/api/products/{id}', 'getProduct');
$app->get('/api/products', 'getAllProducts'); 

$app->post('/api/account', 'createAccount');
$app->get('/api/login','authen');

$app->get('/api/account', 'getAccount');
$app->get('/api', function ($request, $response, $args) {
   
    return $response->withStatus(200)->write('Hello World!');
});

$app->get('/api/hello', function ($request, $response, $args) {
   
    return test($response);
});

function createAccount($request,$response,$args){
    $body = $request->getParsedBody(); // Parse le body
    file_put_contents("./resources/account.json",json_encode($body));
    $jsonencoded = json_encode($body); // put the object body in json format
    
    return $response->write($jsonencoded);
}

function getAccount($request,$response,$args){
    $usr = file_get_contents("./resources/account.json",true);
    
    return $response->write($usr);
    
}

function test($response){
    return $response->write("GJ you verstanden how it works");
}

function getAllProducts($request, $response,$args){
    $json = file_get_contents("./resources/produits.json",true); // get all products in json
    return $response->write($json);

}
function getProduct($request,$response,$args) {
    $id = $args['id'];    
    $json = file_get_contents("./resources/produits.json",true); // get all products in json
    $produit = json_decode($json, true); // array of products
    $selectedProduct = null;
    foreach ($produit as &$prd) { // each product in array
        if($prd['id'] == $id)
            $selectedProduct=$prd;    
    }
    if($selectedProduct != null)
        return $response->write(json_encode($selectedProduct));
    else{    
        $selectedProduct['id'] = -1;
        return $response->write(json_encode($selectedProduct));
    }

}
const SECRET = "makey1234567";
$jwt = new \Slim\Middleware\JwtAuthentication([
    "path" => "/api/secure",
    "secure" => false,
    "passthrough" => ["/login"],
    "secret" => SECRET,
    "attribute" => "decoded_token_data",
    "algorithm" => ["HS256"],
    "error" => function ($response, $arguments) {

        $data = array('ERREUR' => 'ERREUR', 'ERREUR' => 'AUTO');
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }

]);

$app->add($jwt);



function login($request, $response, $args) {
    $body = $request->getParsedBody();
    $userid = $body['login'] ;
    $email = $body['pwd'];
    $issuedAt = time();
    $expirationTime = $issuedAt + 100000; // jwt valid for 60 seconds from the issued time
    $payload = array(
        'userid' => $userid,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );
    $token_jwt = JWT::encode($payload,SECRET, "HS256");

    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}")->withHeader("Content-Type", "application/json");

    $data = array('name' => 'Emma', 'age' => 48,'token' => $token_jwt);
    return $response->withHeader("Content-Type", "application/json")->withJson($data);
}

$app->post('/login', 'login');


// Run application
$app->run();