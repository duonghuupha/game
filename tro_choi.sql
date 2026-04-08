-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 08, 2026 at 12:17 PM
-- Server version: 5.7.39-log
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tro_choi`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  `answer` text COLLATE utf8_unicode_ci,
  `is_correct` tinyint(4) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `current_question` int(11) DEFAULT '1',
  `status` varchar(20) COLLATE utf8_unicode_ci DEFAULT 'waiting'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `type` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` text COLLATE utf8_unicode_ci,
  `image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data_json` text COLLATE utf8_unicode_ci,
  `answer_json` text COLLATE utf8_unicode_ci,
  `sort_order` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `type`, `question`, `image`, `data_json`, `answer_json`, `sort_order`) VALUES
(1, 'truefalse', 'Dãy sắp xếp theo quy tắc 1-1 đúng hay sai?', 'c1.png', NULL, '{\"correct\":\"true\"}', 5),
(2, 'choice', 'Đâu là dãy theo quy tắc 1-1', 'c2.png', '{\r\n\"options\":[\r\n{\"id\":\"A\",\"img\":\"c2_a.png\"},\r\n{\"id\":\"B\",\"img\":\"c2_b.png\"}\r\n]\r\n}', '{\"correct\":\"A\"}', 3),
(3, 'drag', 'Hoàn thiện quy tắc 1-1', 'c3_q.png', '{\r\n\"items\":[\r\n{\"id\":1,\"img\":\"c3_a.png\"},\r\n{\"id\":2,\"img\":\"c3_b.png\"}\r\n]\r\n}', '{\"order\":[2]}', 4),
(4, 'drag', 'Hoàn thiện quy tắc 1-1', 'c4_q.png', '{\n \"pattern\":[\n   {\"img\":\"donut.png\"},\n   {\"img\":\"candy.png\"},\n   {\"img\":\"donut.png\"},\n   {\"drop\":true},\n   {\"img\":\"donut.png\"},\n   {\"drop\":true}\n ],\n \"items\":[\n   {\"id\":1,\"img\":\"donut.png\"},\n   {\"id\":2,\"img\":\"candy.png\"}\n ]\n}', '{\n \"order\":[2,2]\n}', 2),
(5, 'drag', 'Hoàn thiện quy tắc 1-1', 'c5_q.png', '{\n \"pattern\":[\n   {\"img\":\"stick.png\"},\n   {\"img\":\"icecream.png\"},\n   {\"img\":\"stick.png\"},\n   {\"drop\":true},\n   {\"drop\":true},\n   {\"img\":\"icecream.png\"}\n ],\n \"items\":[\n   {\"id\":1,\"img\":\"stick.png\"},\n   {\"id\":2,\"img\":\"icecream.png\"}\n ]\n}', '{\"order\":[2,1]}', 1);

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `icon` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `score` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `name`, `icon`, `score`) VALUES
(1, 'Đội 1', 'team1.png', 0),
(2, 'Đội 2', 'team2.png', 0),
(3, 'Đội 3', 'team3.png', 0),
(4, 'Đội 4', 'team4.png', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
