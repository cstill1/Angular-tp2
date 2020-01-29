<?php

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

function getEntityManager()
{
    date_default_timezone_set('America/Lima');
    require_once "vendor/autoload.php";
    $isDevMode = true;
    $config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "\config\yaml"), $isDevMode);
    $conn = array(
        'driver' => 'pdo_mysql',
        'user' => 'root',
        'password' => '',
        'dbname' => 'shop',
        'port' => '3308'
    );
    $entityManager = EntityManager::create($conn, $config);
    return $entityManager;
}
