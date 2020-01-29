<?php

use \Firebase\JWT\JWT;
use Slim\Http\Response;

require_once "vendor/autoload.php";
require_once "bootstrap.php";

require 'src/Utilisateurs.php';
require 'src/Panier.php';
require 'src/Produits.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

error_reporting(E_ALL);

// header("Access-Control-Allow-Origin: *");
/*$app->put ('/{id}', 'updateClient');
$app->delete ('/{id}', 'deleteClient');*/

// instantiate the App object
$app = new \Slim\App([
    'settings' => [
        'displayErrorDetails' => true
    ]
]);
global $user_co;

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
$app->get('/api/login', 'authen');

$app->get('/api/account/{login}/{token}', 'getAccount');
$app->get('/api', function ($request, $response, $args) {

    return $response->withStatus(200)->write('Hello World!');
});

$app->get('/api/hello', function ($request, $response, $args) {

    return test($response);
});

function createAccount($request, $response, $args)
{
    $body_decoded = json_decode($request->getBody());

    $user =  new Utilisateurs();

    $user->setNom($body_decoded->nom);
    $user->setPrenom($body_decoded->prenom);
    $user->setEmail($body_decoded->email);
    $user->setAdresse($body_decoded->addresse);
    $user->setPassword($body_decoded->pwd);
    $user->setLogin($body_decoded->login);
    $user->setVille($body_decoded->ville);
    $user->setCivilite($body_decoded->civ);
    $user->setCodePostal($body_decoded->cp);
    $user->setTelephone($body_decoded->tel);
    $user->setPays($body_decoded->pays);

    $new_pass = "";
    $new_pass = hash("sha256", $body_decoded->pwd);


    $user->setPassword($new_pass);
    $em = getEntityManager();

    $repoUser = $em->getRepository(Utilisateurs::class);

    $response_users = $repoUser->findBy(array("login" => $user->getLogin()));

    if ($response_users == null) {
        if ($repoUser->findBy(array("email" => $user->getEmail())) != null) {
            $json = array("Erreur" => "Email déjà existant");
            return $response->write(json_encode($json));
        } else {
            $em->persist($user);
            $em->flush();
            $json = array("Ready" => "Vous êtes ready to go!!");
            return $response->write(json_encode($json));
        }
    } else {
        $json = array("Erreur" => "Login déjà existant");
        return $response->write(json_encode($json));
    }
}

function getAccount($request, $response, $args)
{
    $em = getEntityManager();
    $repoUser = $em->getRepository(Utilisateurs::class);
    $response_users = $repoUser->findBy(array("login" => $args['login']));

    $usr = array();

    $usr['login'] = $response_users[0]->getLogin();
    $usr['token'] = $args['token'];
    $usr['nom'] = $response_users[0]->getNom();
    $usr['prenom'] = $response_users[0]->getPrenom();
    $usr['addresse'] = $response_users[0]->getAdresse();
    $usr['email'] = $response_users[0]->getEmail();
    $usr['pwd'] = $response_users[0]->getPassword();
    $usr['ville'] = $response_users[0]->getVille();
    $usr['cp'] = $response_users[0]->getCodePostal();
    $usr['civ'] = $response_users[0]->getCivilite();
    $usr['tel'] = $response_users[0]->getTelephone();
    $usr['pays'] = $response_users[0]->getPays();
    $usr['panier'] = array();

    $panier_repo = $em->getRepository(Panier::class);
    $response_panier = $panier_repo->findBy(array('userid' => $response_users[0]->getId()));
    $produit_repo = $em->getRepository("Produits");
    foreach ($response_panier as $produit) {
        $prod_res = $produit_repo->findBy(array("id" => $produit->getProduitid()));
        if ($prod_res != null) {
            if ($produit->getQuantite() > 0) {
                array_push($usr['panier'], array(
                    "name" => $prod_res[0]->getNom(),
                    "id" => $prod_res[0]->getId(),
                    "prix" => $prod_res[0]->getPrix(),
                    "type" => $prod_res[0]->getType(),
                    "description" => $prod_res[0]->getDescription(),
                    "qtn" => $produit->getQuantite()
                ));
            }
        }
    }

    $json = json_encode($usr);
    return $response->write($json);
}

function test($response)
{
    return $response->write("GJ you verstanden how it works");
}

function getAllProducts($request, $response, $args)
{
    $repo = getEntityManager()->getRepository("Produits");
    $clients = $repo->findAll();
    $json_str =  array();
    foreach ($clients as $client) {
        array_push($json_str, array(
            "id" => $client->getId(),
            "name" => $client->getNom(),
            "type" => $client->getType(),
            "prix" => $client->getPrix(),
            "description" => $client->getDescription()
        ));
    }
    $json = json_encode($json_str);

    return $response->write($json);
}

function getProduct($request, $response, $args)
{
    $identifiant = $args['id'];
    $repo = getEntityManager()->getRepository("Produits");
    $produit = $repo->findBy(array("id" => intval($identifiant)));
    $json_str = array();
    foreach ($produit as $client) {
        array_push($json_str, array(
            "id" => $client->getId(),
            "name" => $client->getNom(),
            "type" => $client->getType(),
            "prix" => $client->getPrix(),
            "description" => $client->getDescription()
        ));
    }

    $json = json_encode($json_str);

    return $response->write($json);
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



function  login($request, $response, $args)
{
    $body = $request->getParsedBody();
    $userid = $body['login'];
    $pwd = $body['pwd'];

    $new_pass = "";
    $new_pass = hash("sha256", $body['pwd']);

    $em = getEntityManager();
    $repoUser = $em->getRepository(Utilisateurs::class);
    $response_users = $repoUser->findBy(array("login" => $userid));
    if ($response_users != null) {
        if ($new_pass === $response_users[0]->getPassword()) {
            $issuedAt = time();
            $expirationTime = $issuedAt + 100000; // jwt valid for 60 seconds from the issued time
            $payload = array(
                'userid' => $userid,
                'iat' => $issuedAt,
                'exp' => $expirationTime
            );
            $token_jwt = JWT::encode($payload, SECRET, "HS256");

            $response = $response->withHeader("Authorization", "Bearer {$token_jwt}")->withHeader("Content-Type", "application/json");

            $data = array('login' => $response_users[0]->getLogin(),  'token' => $token_jwt);
            return $response->withHeader("Content-Type", "application/json")->withJson($data);
        } else {
            $data = array('Erreur' => "Mauvais login ou password!");

            return $response->withHeader("Content-Type", "application/json")->withJson($data);
        }
    } else {
        $data = array('Erreur' => "Mauvais login ou password!");

        return $response->withHeader("Content-Type", "application/json")->withJson($data);
    }
}

function modifyPanier($request, $response, $args)
{
    $body = $request->getParsedBody();
    $userid = $body['login'];
    $pwd = $body['pwd'];
    $typePost = $body['typePost'];


    $new_pass = "";
    $new_pass = hash("sha256", $pwd);

    $em = getEntityManager();
    $repoUser = $em->getRepository(Utilisateurs::class);
    $response_users = $repoUser->findBy(array("login" => $userid));
    if ($response_users != null) {

        $panier_repo = $em->getRepository(Panier::class);
        if ($typePost == "vente") {
            if ($panier_repo != null) {
                $response_panier = $panier_repo->findBy(array('userid' => $response_users[0]->getId()));
                foreach ($response_panier as $prd) {
                    $em->remove($prd);
                    $em->flush();
                }
            }
        } else if ($typePost == "ajout") {
            if ($body['produitid'] != null) {

                $response_panier = $panier_repo->findBy(array('userid' => $response_users[0]->getId(), 'produitid' => intval($body['produitid'])));

                if ($response_panier == null) {
                    $produit_to_add = new Panier();
                    $produit_to_add->setUserid($response_users[0]->getId());
                    $produit_to_add->setProduitid(intval($body['produitid']));
                    $produit_to_add->setQuantite(intval($body['quantite']));
                    $em->persist($produit_to_add);
                    $em->flush();
                } else {
                    $response_panier[0]->setQuantite($response_panier[0]->getQuantite() + intval($body['quantite']));
                    $em->persist($response_panier[0]);
                    $em->flush();
                }
            }
        }
    }
    return $response->withHeader("Content-Type", "application/json")->withJson($body);
}

$app->post('/login', 'login');
$app->post('/api/panier', 'modifyPanier');

// Run application
$app->run();
