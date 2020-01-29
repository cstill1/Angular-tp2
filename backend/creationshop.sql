-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  mer. 29 jan. 2020 à 20:36
-- Version du serveur :  8.0.18
-- Version de PHP :  7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `shop`
--

-- --------------------------------------------------------

--
-- Structure de la table `panier`
--

DROP TABLE IF EXISTS `panier`;
CREATE TABLE IF NOT EXISTS `panier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL,
  `produitid` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `Nom` varchar(200) NOT NULL,
  `Prix` int(11) NOT NULL,
  `Description` varchar(200) NOT NULL,
  `Type` varchar(20) NOT NULL,
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`Nom`, `Prix`, `Description`, `Type`, `Id`) VALUES
('Pc', 1000, 'Il faut bien faire le projet de web avec quelque chose!', 'informatique', 1),
('Café', 1, 'Pour bien commencer la journée rien ne vaut un bon café', 'carburant', 2),
('Connexion internet', 50, 'Une bonne fibre ça fait toujours du bien!', 'outil', 3),
('Sopalin', 5, 'C\'est quoi cette tâche bizarre?', 'outil', 4),
('Nintendo Switch', 300, 'Vous ne savez plus comment perdre de l\'argent et du temps?', 'outil', 5),
('The Lord Of The Ring', 10, 'Comment-ça vous ne l\'avez pas encore acheté ??! Vous me décevez grandement !! Tout le monde le connait!!', 'outil', 6),
('Teh Lurd Of Teh Reings', 1, 'Pâle parodie d\'un film vraiment très connu! Mais si vous voulez mourir de rire foncez!!!!', 'outil', 7);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(20) NOT NULL,
  `Prenom` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Adresse` varchar(100) NOT NULL,
  `Civilite` varchar(11) NOT NULL,
  `Ville` varchar(100) NOT NULL,
  `Code_postal` int(5) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Login` varchar(20) NOT NULL,
  `Telephone` varchar(10) NOT NULL,
  `Pays` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `utilisateurs`
--


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
