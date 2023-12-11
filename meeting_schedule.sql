-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 10:02 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `meeting_schedule`
--

-- --------------------------------------------------------

--
-- Table structure for table `meetingschedule`
--

CREATE TABLE `meetingschedule` (
  `meetingId` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `organizerId` varchar(50) DEFAULT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('scheduled','in_progress','completed','canceled') DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `createdBy` varchar(50) DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modifiedBy` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NOT NULL DEFAULT '2000-10-10 03:10:10',
  `deletedBy` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `response`
--

CREATE TABLE `response` (
  `responseId` varchar(50) NOT NULL,
  `userId` varchar(50) DEFAULT NULL,
  `meetingId` varchar(50) DEFAULT NULL,
  `responseStatus` enum('accepted','declined','pending') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `modifiedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NOT NULL DEFAULT '2000-12-31 17:00:00',
  `startTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `endTime` timestamp NOT NULL DEFAULT '1999-12-31 17:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(50) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `registrationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `lastLogin` timestamp NOT NULL DEFAULT '2000-10-10 03:10:10',
  `deleted` tinyint(1) DEFAULT 0,
  `deletedAt` timestamp NOT NULL DEFAULT '2000-10-10 03:10:10',
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `username`, `email`, `passwordHash`, `fullName`, `registrationDate`, `lastLogin`, `deleted`, `deletedAt`, `isAdmin`) VALUES
('jd', 'jd', 'jon@gmail.com', '$2b$10$HWLNHD7X0XwILmi5A7Xi0OwWm4lfxqYxg8OHh0xzJOV6RJAQ6.djG', 'John Doe', '2023-12-08 17:35:08', '2000-10-10 03:10:10', 0, '2000-10-10 03:10:10', 0),
('rj3d', 'rj3d', 'n@gmail.com', '$2b$10$E8c0iegwWQ5dnp9IdOXPxeIXFlggWwgJa4LIz1SiTXWC0liBWncLS', 'Joh Run Doe', '2023-12-09 04:25:16', '2000-10-10 03:10:10', 0, '2000-10-10 03:10:10', 0),
('rjd', 'rjd', 'jorrrn@gmail.com', '$2b$10$VQSwr4.PIvEdnSU/W1Y7RuyOYTKpWCRGB4CBbeM9EAY1sWwf.r7Wi', 'Joh Run Doe', '2023-12-09 04:24:32', '2000-10-10 03:10:10', 0, '2000-10-10 03:10:10', 0),
('rjdr', 'rjdr', 'jorrrn@gmail.com', '$2b$10$I.QZrhpQgSAdgKmKYnFlXeI.D5w1tEWh2gaXvVNVHg2AT0dN/ZX92', 'Joh Run Doe rr', '2023-12-09 05:04:53', '2000-10-10 03:10:10', 0, '2000-10-10 03:10:10', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD PRIMARY KEY (`meetingId`),
  ADD KEY `organizerId` (`organizerId`),
  ADD KEY `createdBy` (`createdBy`),
  ADD KEY `modifiedBy` (`modifiedBy`),
  ADD KEY `deletedBy` (`deletedBy`);

--
-- Indexes for table `response`
--
ALTER TABLE `response`
  ADD PRIMARY KEY (`responseId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `meetingId` (`meetingId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `meetingschedule`
--
ALTER TABLE `meetingschedule`
  ADD CONSTRAINT `meetingschedule_ibfk_1` FOREIGN KEY (`organizerId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `meetingschedule_ibfk_2` FOREIGN KEY (`createdBy`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `meetingschedule_ibfk_3` FOREIGN KEY (`modifiedBy`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `meetingschedule_ibfk_4` FOREIGN KEY (`deletedBy`) REFERENCES `users` (`userId`);

--
-- Constraints for table `response`
--
ALTER TABLE `response`
  ADD CONSTRAINT `response_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `response_ibfk_2` FOREIGN KEY (`meetingId`) REFERENCES `meetingschedule` (`meetingId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
