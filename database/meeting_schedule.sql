-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 31 déc. 2023 à 09:20
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `meeting_schedule`
--

-- --------------------------------------------------------

--
-- Structure de la table `meetingschedule`
--

CREATE TABLE `meetingschedule` (
  `meetingId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizerId` int(11) DEFAULT NULL,
  `startTime` text DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('scheduled','in_progress','completed','canceled') DEFAULT 'scheduled',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` int(11) DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modifiedBy` int(11) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `deletedBy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `meetingschedule`
--

INSERT INTO `meetingschedule` (`meetingId`, `title`, `organizerId`, `startTime`, `duration`, `location`, `description`, `status`, `createdAt`, `createdBy`, `modifiedAt`, `modifiedBy`, `deleted`, `deletedAt`, `deletedBy`) VALUES
(2, 'Meeting 2', 1, '{{\"date\": \"2023-04-01 10:00:00\"},{\"date\": \"2023-04-02 15:30:00\"},{\"date\": \"2023-04-03 09:00:00\"}}', 60, 'Conference Room A', 'Discuss project updates', 'scheduled', '2023-12-30 17:32:38', 1, '2023-12-30 17:51:50', NULL, 0, NULL, NULL),
(3, 'Meeting 4', 1, '{ {\"date\": \"2023-05-01 10:00:00\"}, {\"date\": \"2023-05-02 15:30:00\"}, {\"date\": \"2023-05-03 09:00:00\"}}', 90, 'Conference Room B', 'Discuss project updates', 'scheduled', '2023-12-30 17:47:02', 1, '2023-12-30 17:47:02', NULL, 0, NULL, NULL),
(4, 'Evening Meeting AAA', 2, '{ {\"date\": \"2023-05-06 10:00:00\"}, {\"date\": \"2023-07-22 15:30:00\"}}', 90, 'Conference Room T', 'Discuss project updates', 'scheduled', '2023-12-31 03:09:53', 2, '2023-12-31 04:48:43', 2, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `response`
--

CREATE TABLE `response` (
  `responseId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `meetingId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `choice` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `response`
--

INSERT INTO `response` (`responseId`, `userId`, `meetingId`, `createdAt`, `modifiedAt`, `deleted`, `deletedAt`, `choice`) VALUES
(3, 2, 2, '2023-12-31 07:39:36', '2023-12-31 08:20:16', 0, '2023-12-31 08:20:06', '{{\"choice\": 0},{\"choice\": 1}, {\"choice\": 1}}'),
(5, 2, 3, '2023-12-31 07:44:38', NULL, 0, NULL, '{{\"choice\": 1},{\"choice\": 0}}');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `registrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastLogin` timestamp NULL DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `passwordHash`, `fullName`, `registrationDate`, `lastLogin`, `deleted`, `deletedAt`, `isAdmin`) VALUES
(1, 'john_doe', 'john.doe@example.com', '$2b$10$2H7IsyfXDiLgM5AAUDN8ge3DlAECXckmqkowtu/ev5gCQCjH8FLbq', 'John Doe', '2023-12-30 15:13:00', NULL, 0, NULL, 0),
(2, 'alice_smith', 'alice.smith@example.com', '$2b$10$G4Tq9gYJ2GB5i8PnGl6/q.qThMeaWcnQoFBQEuy5b98N8Xw9M00s.', 'Alice Smith Jeans', '2023-12-30 15:13:43', NULL, 0, NULL, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD PRIMARY KEY (`meetingId`);

--
-- Index pour la table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`responseId`),
  ADD UNIQUE KEY `unique_user_meeting_combination` (`userId`,`meetingId`),
  ADD KEY `meetingId` (`meetingId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `unique_user_name` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  MODIFY `meetingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `response`
--
ALTER TABLE `response`
  MODIFY `responseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `response_ibfk_1` FOREIGN KEY (`meetingId`) REFERENCES `meetingschedule` (`meetingId`),
  ADD CONSTRAINT `response_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
