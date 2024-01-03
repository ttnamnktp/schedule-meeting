-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 02 jan. 2024 à 16:35
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
  `startTime` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `duration` int(11) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('scheduled','confirmed') DEFAULT 'scheduled',
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
(1, 'BirthDay Meeting', 1, '{\"0\":\"2024-05-01T11: 41: 41.318Z\",\"1\":\"2024-04-01T11: 46: 31.578Z\",\"2\":\"2024-04-12T11: 46: 31.578Z\"}', 120, 'Conference Room XXX', 'Discuss project updates', 'confirmed', '2024-01-01 14:01:04', 1, '2024-01-02 15:35:10', NULL, 0, NULL, NULL),
(2, 'Work Meeting', 1, '{\"0\":\"2024-05-04T11: 41: 41.318Z\",\"1\":\"2024-04-04T11: 46: 31.578Z\"}', 20, 'Conference Room T', 'Discuss project updates', 'scheduled', '2024-01-01 14:01:53', 1, '2024-01-01 14:01:53', NULL, 0, NULL, NULL),
(3, 'Sleep Party', 2, '{\"0\":\"2024-05-05T11: 41: 41.318Z\",\"1\":\"2024-05-06T11: 46: 31.578Z\"}', 20, 'Room U', 'Discuss project updates', 'scheduled', '2024-01-01 14:02:33', 2, '2024-01-02 15:34:21', NULL, 0, NULL, NULL),
(4, 'Night Meeting', 3, '{\"0\":\"2024-01-01T21: 41: 41.318Z\",\"1\":\"2024-01-01T20: 46: 31.578Z\"}', 90, 'Conference Room T', 'Discuss project updates', 'confirmed', '2024-01-01 14:08:13', 3, '2024-01-02 15:34:25', 3, 0, NULL, NULL);

--
-- Déclencheurs `meetingschedule`
--
DELIMITER $$
CREATE TRIGGER `tr_meetingschedule_deleted` AFTER UPDATE ON `meetingschedule` FOR EACH ROW BEGIN
    IF NEW.deleted = 1 AND OLD.deleted = 0 THEN
        -- Nếu trường deleted được thiết lập từ 0 thành 1
        UPDATE response
        SET deleted = 1,
        	deletedAt = CURRENT_TIMESTAMP
        WHERE meetingId = OLD.meetingId;
    END IF;
END
$$
DELIMITER ;

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
  `choice` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`choice`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `response`
--

INSERT INTO `response` (`responseId`, `userId`, `meetingId`, `createdAt`, `modifiedAt`, `deleted`, `deletedAt`, `choice`) VALUES
(1, 1, 1, '2024-01-01 14:01:04', '2024-01-02 15:33:54', 0, NULL, '{\"0\":\"yes\",\"1\":\"yes\",\"2\":\"yes\"}'),
(2, 1, 2, '2024-01-01 14:01:53', NULL, 0, NULL, '{\"0\":\"yes\",\"1\":\"yes\"}'),
(3, 2, 3, '2024-01-01 14:02:33', NULL, 0, NULL, '{\"0\":\"yes\",\"1\":\"yes\"}'),
(4, 3, 4, '2024-01-01 14:08:13', NULL, 0, NULL, '{\"0\":\"yes\",\"1\":\"yes\"}'),
(5, 2, 1, '2024-01-01 16:06:10', '2024-01-02 15:34:00', 0, NULL, '{\"0\":\"no\",\"1\":\"yes\",\"2\":\"no\"}'),
(6, 2, 2, '2024-01-01 16:07:53', NULL, 0, NULL, '{\"0\":\"no\",\"1\":\"yes\"}');

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
(1, 'john_doe', 'john.doe@example.com', '$2b$10$2H7IsyfXDiLgM5AAUDN8ge3DlAECXckmqkowtu/ev5gCQCjH8FLbq', 'John Doe', '2023-12-30 15:13:00', NULL, 0, '2023-12-31 17:33:09', 0),
(2, 'alice_smith', 'alice.smith@example.com', '$2b$10$G4Tq9gYJ2GB5i8PnGl6/q.qThMeaWcnQoFBQEuy5b98N8Xw9M00s.', 'Alice Smith Jeans', '2023-12-30 15:13:43', NULL, 0, NULL, 0),
(3, 'new_jeans', 'jeansnew@example.com', '$2b$10$1QcbO4rvUZmdbzDf1OGbDOz24oD0Wtk2zmbkpD6FEPx/uPqELNoPq', 'New Something Jeans', '2023-12-31 16:42:38', NULL, 0, '2023-12-31 16:54:40', 0),
(4, 'jhead', 'jhead.doe@example.com', '$2b$10$yk1.iqzxGwYYDBCfu/eKpep6kD.Sd5ObI8QSUN8qz40T5epqQaG3G', 'Jean Heash', '2023-12-31 17:40:31', NULL, 0, '2023-12-31 18:06:52', 0);

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
  MODIFY `responseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
