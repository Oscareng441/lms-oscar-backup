-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 10-06-2025 a las 13:38:48
-- Versión del servidor: 10.11.10-MariaDB
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `u325827088_lms`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `answer_sets`
--

CREATE TABLE `answer_sets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `problem_id` bigint(20) UNSIGNED NOT NULL,
  `display_type` varchar(255) NOT NULL DEFAULT 'numeric',
  `answer_text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `answer_sets`
--

INSERT INTO `answer_sets` (`id`, `problem_id`, `display_type`, `answer_text`, `is_correct`, `created_at`, `updated_at`) VALUES
(1, 1, 'numeric', '2', 0, NULL, NULL),
(2, 1, 'numeric', '3', 0, NULL, NULL),
(3, 1, 'numeric', '5', 1, NULL, NULL),
(4, 1, 'numeric', '4', 0, NULL, NULL),
(5, 2, 'numeric', '62', 0, NULL, NULL),
(6, 2, 'numeric', '65', 1, NULL, NULL),
(7, 2, 'numeric', '59', 0, NULL, NULL),
(8, 2, 'numeric', '74', 0, NULL, NULL),
(9, 4, 'numeric', '2', 1, NULL, NULL),
(10, 4, 'numeric', '6', 0, NULL, NULL),
(11, 4, 'numeric', '-5', 0, NULL, NULL),
(12, 4, 'numeric', '1', 0, NULL, NULL),
(13, 3, 'numeric', '122', 0, NULL, NULL),
(14, 3, 'numeric', '96', 0, NULL, NULL),
(15, 3, 'numeric', '105', 0, NULL, NULL),
(16, 3, 'numeric', '91', 1, NULL, NULL),
(17, 5, 'numeric', '2', 1, NULL, NULL),
(18, 5, 'numeric', '8', 0, NULL, NULL),
(19, 6, 'numeric', '8', 0, NULL, NULL),
(20, 6, 'numeric', '7', 1, NULL, NULL),
(21, 7, 'numeric', '685', 0, NULL, NULL),
(22, 7, 'numeric', '695', 1, NULL, NULL),
(23, 8, 'numeric', '8040', 0, NULL, NULL),
(24, 8, 'numeric', '7150', 0, NULL, NULL),
(25, 8, 'numeric', '8340', 1, NULL, NULL),
(26, 9, 'numeric', '320', 0, NULL, NULL),
(27, 9, 'numeric', '282', 1, NULL, NULL),
(28, 10, 'numeric', '477', 1, NULL, NULL),
(29, 10, 'numeric', '23', 0, NULL, NULL),
(149, 13, 'numeric', '-5', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(150, 13, 'numeric', '-7', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(151, 13, 'numeric', '-4', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(152, 13, 'numeric', '2', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(157, 15, 'numeric', '11', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(158, 15, 'numeric', '17', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(159, 15, 'numeric', '25', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(160, 15, 'numeric', '-17', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(161, 16, 'numeric', '2', 0, '2025-04-12 00:07:58', '2025-04-12 19:09:30'),
(162, 16, 'numeric', '4', 1, '2025-04-12 00:07:58', '2025-04-12 19:09:30'),
(163, 16, 'numeric', '1', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(164, 16, 'numeric', '-4', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(165, 17, 'numeric', '3', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(166, 17, 'numeric', '2', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(167, 17, 'numeric', '1', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(168, 17, 'numeric', '0', 1, '2025-04-12 00:07:58', '2025-04-14 14:33:28'),
(169, 18, 'numeric', '4', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(170, 18, 'numeric', '-4', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(171, 18, 'numeric', '1', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(172, 18, 'numeric', '2', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(173, 19, 'numeric', '-4', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(174, 19, 'numeric', '-2', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(175, 19, 'numeric', '2', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(176, 19, 'numeric', '4', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(181, 21, 'numeric', '-5', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(182, 21, 'numeric', '3', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(183, 21, 'numeric', '0', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(184, 21, 'numeric', '-3', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(185, 22, 'numeric', 'They intersect', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(186, 22, 'numeric', 'They are the same line', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(187, 22, 'numeric', 'They are parallel', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(188, 22, 'numeric', 'They form a triangle', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(193, 24, 'numeric', '$ 4x^6 $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(194, 24, 'numeric', '$ 2x^6 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(195, 24, 'numeric', '$ 6x^5 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(196, 24, 'numeric', '$ 4x^5 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(197, 25, 'numeric', '0', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(198, 25, 'numeric', '1', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(199, 25, 'numeric', 'x', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(200, 25, 'numeric', 'Undefined', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(201, 26, 'numeric', '$ 8x^2 + x $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(202, 26, 'numeric', '$ 8x^2 + x^2 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(203, 26, 'numeric', '$ 2x^2 + x $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(204, 26, 'numeric', '$ 8x^2 - x $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(205, 27, 'numeric', '$ (x - 3)(x + 3) $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(206, 27, 'numeric', '$ (x - 9)(x + 1) $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(207, 27, 'numeric', '$ (x - 1)^2 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(208, 27, 'numeric', 'Prime', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(209, 28, 'numeric', '$ x^2 - 3x - 10 $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(210, 28, 'numeric', '$ x^2 - 3x + 10 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(211, 28, 'numeric', '$ x^2 - 10x + 2 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(212, 28, 'numeric', '$ x^2 - 5x + 2 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(217, 30, 'numeric', '1', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(218, 30, 'numeric', '3', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(219, 30, 'numeric', '-3', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(220, 30, 'numeric', '0', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(225, 32, 'numeric', '6', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(226, 32, 'numeric', '8', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(227, 32, 'numeric', '7', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(228, 32, 'numeric', '9', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(229, 33, 'numeric', '5', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(230, 33, 'numeric', '10', 0, '2025-04-12 00:07:58', '2025-04-13 15:59:57'),
(231, 33, 'numeric', '13', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(232, 33, 'numeric', '7', 1, '2025-04-12 00:07:58', '2025-04-13 15:59:57'),
(233, 34, 'numeric', '$ \\sqrt{13} $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(234, 34, 'numeric', '$ \\sqrt{10} $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(235, 34, 'numeric', '$ \\sqrt{12} $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(236, 34, 'numeric', '$ \\sqrt{5} $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(237, 35, 'numeric', '5', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(238, 35, 'numeric', '-5', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(239, 35, 'numeric', '$ \\pm 5 $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(240, 35, 'numeric', '0', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(241, 36, 'numeric', '(3, 2)', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(242, 36, 'numeric', '(-3, 2)', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(243, 36, 'numeric', '(2, 3)', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(244, 36, 'numeric', '(3, -2)', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(245, 37, 'numeric', '$ x = -2 $', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(246, 37, 'numeric', '$ x = 2 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(247, 37, 'numeric', '$ x = 4 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(248, 37, 'numeric', '$ x = -4 $', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(249, 38, 'numeric', '5', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(250, 38, 'numeric', '6', 0, '2025-04-12 00:07:58', '2025-04-13 16:01:34'),
(251, 38, 'numeric', '7', 1, '2025-04-12 00:07:58', '2025-04-13 16:01:34'),
(252, 38, 'numeric', '8', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(253, 39, 'numeric', '5', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(254, 39, 'numeric', '6', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(255, 39, 'numeric', '7', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(256, 39, 'numeric', '8', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(257, 40, 'numeric', '180 miles', 1, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(258, 40, 'numeric', '120 miles', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(259, 40, 'numeric', '200 miles', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(260, 40, 'numeric', '150 miles', 0, '2025-04-12 00:07:58', '2025-04-12 00:07:58'),
(261, 42, 'numeric', 'the orange or red one', 0, '2025-04-12 20:02:07', '2025-04-16 11:56:48'),
(262, 42, 'numeric', 'the  blue one', 1, '2025-04-12 20:02:07', '2025-04-16 11:56:48'),
(263, 42, 'numeric', 'the green one', 0, '2025-04-12 20:02:07', '2025-04-12 20:02:07'),
(264, 42, 'numeric', 'the purple one', 0, '2025-04-12 20:02:07', '2025-04-13 00:11:38'),
(265, 43, 'numeric', '$10a^2b^4\\sqrt{3b^9}$', 0, '2025-04-14 09:50:57', '2025-04-14 10:05:49'),
(266, 43, 'numeric', '$10a^2b^4\\sqrt{3ab}$', 0, '2025-04-14 09:50:57', '2025-04-14 10:03:23'),
(267, 43, 'latex', '$10a^2b^4\\sqrt{3b}$', 1, '2025-04-14 10:05:49', '2025-04-14 10:05:49'),
(268, 43, 'latex', '$10a^2b^3\\sqrt{3ab}$', 0, '2025-04-14 10:05:49', '2025-04-14 10:05:49'),
(269, 44, 'latex', '$3x^2y^2\\sqrt[3]{2xy^2}$', 1, '2025-04-14 10:10:54', '2025-04-14 10:10:54'),
(270, 44, 'latex', '$27x^2y^3\\sqrt[3]{2xy^2}$', 0, '2025-04-14 10:14:41', '2025-04-14 10:14:41'),
(271, 44, 'latex', '$27x^3y^2\\sqrt[3]{6x^2y^2}$', 0, '2025-04-14 10:14:41', '2025-04-14 10:14:41'),
(272, 44, 'latex', '$3x^3y^3\\sqrt[3]{6x^2y^2}$', 0, '2025-04-14 10:14:41', '2025-04-14 10:14:41'),
(273, 45, 'text', 'Conjunto de datos obtenidos en todos los elementos en estudio.', 0, '2025-04-23 18:07:11', '2025-04-23 18:07:11'),
(274, 45, 'text', 'Aquella en la que no se tiene determinado el número de elementos en estudio.', 0, '2025-04-23 18:07:11', '2025-04-23 18:07:11'),
(275, 45, 'text', 'Formada por un número determinado de elementos.', 0, '2025-04-23 18:07:11', '2025-04-23 18:07:11'),
(276, 45, 'text', 'Parte de la población estadística.', 0, '2025-04-23 18:07:11', '2025-04-23 18:07:11'),
(277, 48, 'latex', '$ 3x - 5 + x + 7 $', 0, '2025-04-24 15:09:19', '2025-04-24 15:11:21'),
(278, 48, 'latex', '$ 3x - 5 + x - 7 $', 0, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(279, 48, 'latex', '$ 4x - 12 $', 0, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(280, 48, 'latex', '$ 2x + 2 $', 1, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(281, 49, 'latex', '$ y = 13 $', 0, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(282, 49, 'latex', '$ y = |13| $', 0, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(283, 49, 'latex', '$ y = 25 $', 1, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(284, 49, 'latex', '$ y = -25 $', 0, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(285, 49, 'latex', '$ y = 1 $', 1, '2025-04-24 15:09:19', '2025-04-24 15:09:19'),
(342, 11, 'numeric', '16', 1, '2025-04-28 23:05:45', '2025-04-28 23:05:45'),
(343, 11, 'numeric', '4', 0, '2025-04-28 23:05:45', '2025-04-28 23:05:45'),
(344, 11, 'numeric', '9.5', 0, '2025-04-28 23:05:45', '2025-04-28 23:05:45'),
(345, 11, 'numeric', '18', 0, '2025-04-28 23:05:45', '2025-04-28 23:05:45'),
(451, 104, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(452, 104, 'latex', 'ans b', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(453, 104, 'latex', 'ans c', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(454, 105, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(455, 105, 'latex', 'ans b', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(456, 105, 'latex', 'ans c', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(457, 105, 'latex', 'ans d', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(458, 106, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(459, 106, 'latex', 'ans b', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(460, 106, 'latex', 'ans c', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(461, 107, 'latex', 'ans 1', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(462, 107, 'latex', 'ans b', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(463, 107, 'latex', 'ans c', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(464, 108, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(465, 108, 'latex', 'ans b', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(466, 108, 'latex', 'ans c', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(467, 108, 'latex', 'ans d', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(468, 109, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(469, 109, 'latex', 'ans b', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(470, 109, 'latex', 'ans c', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(471, 110, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(472, 110, 'latex', 'ans b', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(473, 110, 'latex', 'ans c', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(474, 111, 'latex', 'ans 1', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(475, 111, 'latex', 'ans b', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(476, 111, 'latex', 'ans c', 0, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(477, 111, 'latex', 'ans d', 1, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(478, 112, 'latex', 'Dato aleatorio', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(479, 112, 'latex', 'Dato variable', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(480, 112, 'latex', 'Dato simple', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(481, 112, 'latex', 'Dato estad', 1, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(482, 113, 'latex', 'Diagrama de Venn', 1, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(483, 113, 'latex', 'Diagrama de dispersi', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(484, 113, 'latex', 'Diagrama de ', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(485, 113, 'latex', 'Diagrama de regresi', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(486, 114, 'latex', 'Rango', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(487, 114, 'latex', 'Variaci', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(488, 114, 'latex', 'Frecuencia', 1, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(489, 114, 'latex', 'Intervalo', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(490, 115, 'latex', 'Media', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(491, 115, 'latex', 'Centro de gravedad', 1, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(492, 115, 'latex', 'Pendiente', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(493, 115, 'latex', 'Covarianza', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(494, 116, 'latex', 'Discreta', 1, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(495, 116, 'latex', 'Continua', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(496, 116, 'latex', 'Cualitativa', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(497, 116, 'latex', 'Ordinaria', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(498, 117, 'latex', 'Probabilidad', 1, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(499, 117, 'latex', 'Media', 0, '2025-05-01 11:39:47', '2025-05-01 11:39:47'),
(500, 117, 'latex', 'Moda', 0, '2025-05-01 11:39:48', '2025-05-01 11:39:48'),
(501, 117, 'latex', 'Mediana', 0, '2025-05-01 11:39:48', '2025-05-01 11:39:48'),
(502, 118, 'latex', 'Dato aleatorio', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(503, 118, 'latex', 'Dato variable', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(504, 118, 'latex', 'Dato simple', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(505, 118, 'latex', 'Dato estadístico', 1, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(506, 119, 'latex', 'Diagrama de Venn', 1, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(507, 119, 'latex', 'Diagrama de dispersión', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(508, 119, 'latex', 'Diagrama de árbol', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(509, 119, 'latex', 'Diagrama de regresión', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(510, 120, 'latex', 'Rango', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(511, 120, 'latex', 'Variación', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(512, 120, 'latex', 'Frecuencia', 1, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(513, 120, 'latex', 'Intervalo', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(514, 121, 'latex', 'Media', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(515, 121, 'latex', 'Centro de gravedad', 1, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(516, 121, 'latex', 'Pendiente', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(517, 121, 'latex', 'Covarianza', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(518, 122, 'latex', 'Discreta', 1, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(519, 122, 'latex', 'Continua', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(520, 122, 'latex', 'Cualitativa', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(521, 122, 'latex', 'Ordinaria', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(522, 123, 'latex', 'Probabilidad', 1, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(523, 123, 'latex', 'Media', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(524, 123, 'latex', 'Moda', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(525, 123, 'latex', 'Mediana', 0, '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(526, 12, 'numeric', '$ 4 + 3 $', 1, '2025-05-02 20:26:47', '2025-05-02 20:26:47'),
(527, 12, 'numeric', '$ 3 \\times 3 $', 0, '2025-05-02 20:26:47', '2025-05-02 20:26:47'),
(528, 12, 'numeric', 'half of fourteen', 1, '2025-05-02 20:26:47', '2025-05-02 20:26:47'),
(578, 23, 'numeric', '$ x^6 $', 0, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(579, 23, 'numeric', '$ x^5 $', 1, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(580, 23, 'numeric', '$ x $', 0, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(581, 23, 'numeric', '$ x^3 $', 0, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(582, 23, 'latex', '$ x^9 $', 0, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(587, 142, 'latex', '$ \\frac{3}{2x} $', 0, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(588, 142, 'latex', '$ \\frac{3x}{2} $', 1, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(589, 142, 'latex', '$ \\frac{6}{x} $', 0, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(590, 142, 'latex', '$ \\frac{3x}{2x} $', 0, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(595, 14, 'numeric', '$ \\frac{3}{4} $', 0, '2025-05-06 02:21:14', '2025-05-06 02:21:14'),
(596, 14, 'numeric', '$ \\sqrt{2} $', 1, '2025-05-06 02:21:14', '2025-05-06 02:21:14'),
(597, 14, 'numeric', '0.5', 0, '2025-05-06 02:21:14', '2025-05-06 02:21:14'),
(598, 14, 'numeric', '-6', 0, '2025-05-06 02:21:14', '2025-05-06 02:21:14'),
(607, 50, 'latex', '$ 3w + 3 $', 0, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(608, 50, 'latex', '$ 7 - w $', 1, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(609, 50, 'latex', '$ 7 - 7w $', 0, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(610, 50, 'latex', '$ 7w - 7 $', 0, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(611, 50, 'latex', '$ -w + 7 $', 1, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(617, 20, 'numeric', '(0, 0)', 0, '2025-05-06 05:14:33', '2025-05-06 05:14:33'),
(618, 20, 'numeric', '(2, 2)', 1, '2025-05-06 05:14:33', '2025-05-06 05:14:33'),
(619, 20, 'numeric', '(4, 3)', 1, '2025-05-06 05:14:33', '2025-05-06 05:14:33'),
(620, 20, 'numeric', '(1, 3)', 0, '2025-05-06 05:14:33', '2025-05-06 05:14:33'),
(629, 146, 'latex', '(6, 3)', 0, '2025-05-06 05:21:03', '2025-05-06 05:21:03'),
(630, 146, 'latex', '(8, 5)', 0, '2025-05-06 05:21:03', '2025-05-06 05:21:03'),
(631, 146, 'latex', '(8, 1)', 0, '2025-05-06 05:21:03', '2025-05-06 05:21:03'),
(632, 146, 'latex', '(4, 5)', 1, '2025-05-06 05:21:03', '2025-05-06 05:21:03'),
(655, 147, 'latex', '$ x > \\frac{1}{3} $', 0, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(656, 147, 'latex', '$ x > - \\frac{1}{3} $', 0, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(657, 147, 'latex', '$ x < - \\frac{1}{3} $', 0, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(658, 147, 'latex', '$ x < \\frac{1}{3} $', 1, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(659, 29, 'numeric', '$ \\frac{1}{2x} $', 1, '2025-05-09 03:54:44', '2025-05-09 03:54:44'),
(660, 29, 'numeric', '$ \\frac{1}{2x^2} $', 0, '2025-05-09 03:54:44', '2025-05-09 03:54:44'),
(661, 29, 'numeric', '$ \\frac{4x}{8} $', 0, '2025-05-09 03:54:44', '2025-05-09 03:54:44'),
(662, 29, 'numeric', '$ \\frac{x}{2x^3} $', 0, '2025-05-09 03:54:44', '2025-05-09 03:54:44'),
(667, 148, 'latex', '$ \\frac{1}{2} $', 0, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(668, 148, 'latex', '$ \\frac{2}{x} $', 0, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(669, 148, 'latex', '$ \\frac{1}{x} $', 1, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(670, 148, 'latex', '$ \\frac{1}{x^2} $', 0, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(687, 151, 'latex', '$ \\frac{3}{2x} $', 0, '2025-05-12 18:23:58', '2025-05-12 18:23:58'),
(688, 151, 'latex', '$ \\frac{3x}{2} $', 0, '2025-05-12 18:23:58', '2025-05-12 18:23:58'),
(689, 151, 'latex', '$ \\frac{24}{3x} $', 0, '2025-05-12 18:23:58', '2025-05-12 18:23:58'),
(690, 151, 'latex', '$ \\frac{2}{3x} $', 1, '2025-05-12 18:23:58', '2025-05-12 18:23:58'),
(691, 31, 'numeric', '-1', 0, '2025-05-13 16:03:47', '2025-05-13 16:03:47'),
(692, 31, 'numeric', '0', 0, '2025-05-13 16:03:47', '2025-05-13 16:03:47'),
(693, 31, 'numeric', '2', 1, '2025-05-13 16:03:47', '2025-05-13 16:03:47'),
(694, 31, 'numeric', '1', 0, '2025-05-13 16:03:47', '2025-05-13 16:03:47'),
(695, 31, 'latex', '-2', 0, '2025-05-13 16:03:47', '2025-05-13 16:03:47'),
(696, 150, 'latex', '(7, 0)', 0, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(697, 150, 'latex', '(3, -4)', 0, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(698, 150, 'latex', '(-3, -10)', 1, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(699, 150, 'latex', '(-7, 0)', 0, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(764, 154, 'latex', 'Dato aleatorio', 0, '2025-05-21 15:59:14', '2025-05-21 15:59:14'),
(765, 154, 'latex', 'Dato variable', 0, '2025-05-21 15:59:14', '2025-05-21 15:59:14'),
(766, 154, 'latex', 'Dato simple', 0, '2025-05-21 15:59:14', '2025-05-21 15:59:14'),
(767, 154, 'latex', 'Dato estadístico', 1, '2025-05-21 15:59:14', '2025-05-21 15:59:14'),
(772, 156, 'latex', 'Diagrama de Venn', 1, '2025-05-21 16:14:37', '2025-05-21 16:14:37'),
(773, 156, 'latex', 'Diagrama de dispersión', 0, '2025-05-21 16:14:37', '2025-05-21 16:14:37'),
(774, 156, 'latex', 'Diagrama de árbol', 0, '2025-05-21 16:14:37', '2025-05-21 16:14:37'),
(775, 156, 'latex', 'Diagrama regresión', 0, '2025-05-21 16:14:37', '2025-05-21 16:14:37'),
(776, 149, 'latex', '$ \\frac{4}{3} $', 1, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(777, 149, 'latex', '$ -4 $', 0, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(778, 149, 'latex', '$ \\frac{3}{4} $', 0, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(779, 149, 'latex', '$ - \\frac{3}{4} $', 0, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(780, 145, 'latex', '$ \\frac{3}{2} $', 1, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(781, 145, 'latex', '$ \\frac{2}{1} $', 0, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(782, 145, 'latex', '$ \\frac{-3}{2} $', 0, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(783, 145, 'latex', '$ -2 $', 0, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(784, 145, 'latex', '$ \\frac{2}{3} $', 0, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(785, 160, 'latex', '$ -10w^3 $', 0, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(786, 160, 'latex', '$ 10w^{-3} $', 0, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(787, 160, 'latex', '$ -10w^{-3} $', 0, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(788, 160, 'latex', '$ -10w $', 0, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(789, 160, 'latex', '$ 10 w^3 $', 0, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(790, 161, 'latex', '$ 20w $', 0, '2025-05-28 17:50:33', '2025-05-28 17:50:33'),
(791, 161, 'latex', '$ \\frac{20}{w} $', 0, '2025-05-28 17:50:33', '2025-05-28 17:50:33'),
(792, 161, 'latex', '$ 20w^{-7} $', 0, '2025-05-28 17:50:33', '2025-05-28 17:50:33'),
(793, 161, 'latex', '$ \\frac{w}{20} $', 0, '2025-05-28 17:50:33', '2025-05-28 17:50:33'),
(798, 164, 'latex', 'Dato aleatorio', 0, '2025-06-03 18:35:23', '2025-06-03 18:35:23'),
(799, 164, 'latex', 'Dato variable', 0, '2025-06-03 18:35:23', '2025-06-03 18:35:23'),
(800, 164, 'latex', 'Datos simple', 0, '2025-06-03 18:35:23', '2025-06-03 18:35:23'),
(801, 164, 'latex', 'Dato estadístico', 1, '2025-06-03 18:35:23', '2025-06-03 18:35:23'),
(814, 165, 'latex', 'Discreta', 1, '2025-06-03 18:53:27', '2025-06-03 18:53:27'),
(815, 165, 'latex', 'Continua', 0, '2025-06-03 18:53:27', '2025-06-03 18:53:27'),
(816, 165, 'latex', 'Cualitativa', 0, '2025-06-03 18:53:27', '2025-06-03 18:53:27'),
(817, 165, 'latex', 'Ordinaria', 0, '2025-06-03 18:53:27', '2025-06-03 18:53:27'),
(818, 166, 'latex', '1', 1, '2025-06-04 19:58:19', '2025-06-04 19:58:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'ceneval exani 1 math', 'In this course we will explore the blah blah of blah. The foreignIdFor method adds a {column}_id equivalent column for a given model class. The column type will be UNSIGNED BIGINT, CHAR(36), or CHAR(26) depending on the model key type abcdef...', NULL, '2025-04-11 16:07:28'),
(2, 'ceneval exani 2 math', 'In this course we will explore the blah blah of blah. Also there will be donuts. uidado con los estafadores que se hacen pasar por Indeed. El uso de Indeed es gratuito para los candidatos. Nunca debes aceptar enviar pagos a una posible empresa o tercero que asegure estar representando a Indeed. Si crees que puedes haber sido víctima de una estafa...', NULL, '2025-04-11 16:07:28'),
(3, 'english', 'In this course we will explore the blah blah of blah. Also there will be donuts. And cute girls. A safe way is to duplicate the column. i.e. rename the old one, create a new one with the original\'s name, make it unique AND nullable, then write a method to copy the data from the old column into the new column. But your method should only keep the first occurrence of a value, and leave the subsequent occurrences as NULL.', NULL, '2025-04-11 16:07:28'),
(4, 'Precalculus', 'From Algebra One through everything you\'ll need to get started in, and succeed with, Calculus.', '2025-04-11 21:38:46', '2025-04-11 21:38:46'),
(5, 'Estadística', 'tbi', '2025-04-14 15:17:45', '2025-04-14 15:17:45'),
(10, 'Pensamiento Matemático 1', 'TBI', '2025-05-21 15:55:23', '2025-05-21 15:55:23'),
(11, 'Cálculo Diferencial', 'tbi', '2025-04-14 15:17:45', '2025-04-14 15:17:45'),
(12, 'Pensamiento Matemático 3', 'Similar a Cálculo diferencial con un nivel más accesible.', '2025-05-21 15:55:23', '2025-05-21 15:55:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `courses_users`
--

CREATE TABLE `courses_users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `is_premium` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enrollments`
--

CREATE TABLE `enrollments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `is_premium` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `enrollments`
--

INSERT INTO `enrollments` (`id`, `user_id`, `course_id`, `is_premium`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, NULL, NULL),
(2, 1, 4, 0, '2025-04-11 23:39:27', '2025-04-11 23:39:27'),
(3, 1, 2, 0, '2025-04-15 16:48:44', '2025-04-15 16:48:44'),
(4, 1, 2, 0, '2025-04-15 16:50:54', '2025-04-15 16:50:54'),
(5, 1, 2, 0, '2025-04-15 16:51:50', '2025-04-15 16:51:50'),
(6, 1, 5, 0, '2025-04-15 16:52:13', '2025-04-15 16:52:13'),
(7, 1, 6, 0, '2025-04-28 21:37:28', '2025-04-28 21:37:28'),
(8, 1, 7, 0, '2025-04-29 21:08:41', '2025-04-29 21:08:41'),
(9, 3, 4, 0, '2025-05-11 17:32:08', '2025-05-11 17:32:08'),
(10, 4, 5, 0, '2025-05-12 18:54:19', '2025-05-12 18:54:19'),
(11, 1, 10, 0, '2025-05-24 21:23:48', '2025-05-24 21:23:48'),
(12, 4, 10, 0, '2025-06-03 18:35:13', '2025-06-03 18:35:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lessons`
--

CREATE TABLE `lessons` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lesson_set_id` bigint(20) UNSIGNED NOT NULL,
  `sequence_id` int(11) NOT NULL,
  `is_premium` int(11) NOT NULL,
  `lesson_text` text NOT NULL,
  `lesson_type` varchar(255) NOT NULL DEFAULT 'text',
  `lesson_page` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `lessons`
--

INSERT INTO `lessons` (`id`, `name`, `lesson_set_id`, `sequence_id`, `is_premium`, `lesson_text`, `lesson_type`, `lesson_page`, `created_at`, `updated_at`) VALUES
(1, 'easy addition', 1, 0, 0, 'just add', 'text', '', NULL, NULL),
(2, 'not-so-easy addition', 1, 0, 0, 'We elected a man everyone who matters in this country knew was an idiot. The bulk of them refused to say so openly and directly — either because they thought he could do something for them or because there are political and journalistic norms against speaking that way.', 'text', '', NULL, NULL),
(3, 'easy subtraction', 2, 0, 0, 'Chief Justice Roberts has issued an administrative stay in the Abrego Garcia case, temporarily relieving the <span class=\"text-green-600\">Trump</span> administration of its duty to return him from El Salvador.', 'text', '', NULL, NULL),
(4, 'not-so-easy subtraction', 2, 0, 0, 'Unrest continues at Mount Spurr volcano. Seismicity remains elevated with occasional small, shallow volcanic earthquakes detected beneath the volcano over the past day. No significant activity detected in satellite data or web camera data.', 'text', '', NULL, NULL),
(5, 'intro to order of ops', 3, 0, 0, 'PEMDAS', 'text', '', NULL, NULL),
(6, 'image test', 1, 100, 0, 'Bowser is such a nice dog:<div className=\"py-10 mx-auto\"><img src=\"/storage/dog.jpg\"  alt=\"Dog Image\" /></div>', 'text', '', NULL, '2025-04-12 15:22:46'),
(7, 'test latex lesson type', 1, 0, 0, 'Let\'s solve for x: $$ \\frac{1}{2}x = 1 $$ To do this, we must get $ x $ by itself. Recall, we can multiply both sides of an equation by a number, and the results will be equal. In this case, one side is $ \\frac{1}{2}x $. If we multiply that by $2$, we sould have $ x $ by itself. So we have $$ \\frac{1}{2}x = 1 $$ $$ 2 \\times \\frac{1}{2}x = 2 \\times 1 $$ $$ x = 2 $$', 'latex', '', NULL, NULL),
(8, 'test pdf type', 1, 50, 0, '', 'pdf', 'precalc/pdf/stfhlthfrm', NULL, '2025-04-15 20:19:32'),
(9, 'ltx', 1, 51, 0, '\ndocumentclass[12pt]{article}\nusepackage{amsmath}\nusepackage{geometry}\ngeometry{margin=1in}\n	itle{Algebra One Review -- Multiple Choice Questions}\ndate{}\negin{document}\n\nmaketitle\n\nsection*{1. Operations with Real Numbers}\n\negin{enumerate}\nitem What is the value of: ( 3 - 5 	imes 2 + 6 div 3 )\negin{itemize}\n    item[(A)] -5 hfill 	extbf{(Correct)}\n    item[(B)] -7\n    item[(C)] -4\n    item[(D)] 2\nend{itemize}\n\nend{document}\n', 'latex', '', '2025-04-11 21:31:40', '2025-04-11 21:32:32'),
(10, 'Operations with Real Numbers', 4, 0, 0, '<div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>1. Number Systems</h2><p>There are different types of numbers, and we use them for different purposes:</p><ul><li><strong>Whole Numbers:</strong> 0, 1, 2, 3, 4... (no fractions or negatives)</li><li><strong>Integers:</strong> ... -3, -2, -1, 0, 1, 2, 3 ... (includes negatives)</li><li><strong>Rational Numbers:</strong> Numbers that can be written as a fraction like 1/2, 3/4, or even 5 (because 5 = 5/1)</li><li><strong>Irrational Numbers:</strong> Numbers that can\'t be written as a simple fraction, like π (pi) or √2</li><li><strong>Real Numbers:</strong> All rational and irrational numbers</li></ul></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>2. Absolute Value</h2><p>Absolute value means how far a number is from 0 on the number line. It is always positive!</p><p><strong>Examples:</strong></p><ul><li>|5| = 5</li><li>|-3| = 3</li><li>|0| = 0</li></ul></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>3. Order of Operations</h2><p>When solving math expressions, we follow a specific order. You might have heard of <strong>PEMDAS</strong>:</p><ul><li><strong>P</strong> - Parentheses</li><li><strong>E</strong> - Exponents</li><li><strong>MD</strong> - Multiplication and Division (left to right)</li><li><strong>AS</strong> - Addition and Subtraction (left to right)</li></ul><p><strong>Example:</strong> <br />Solve: 3 + 6 × (5 + 4) ÷ 3 - 7<br />Step 1: Parentheses → 3 + 6 × 9 ÷ 3 - 7<br />Step 2: Multiply/Divide → 3 + 54 ÷ 3 - 7 → 3 + 18 - 7<br />Step 3: Add/Subtract → 14</p></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>4. Subtraction is just adding the opposite</h2><p>You never need to subtract -- just add the opposite. The opposite of 4 is -4, so 13 - 4 we can think of as 13 + (-4). That might not seemeasier, but it can be. The opposite of -17 is 17, so 100 - (-17) = 100 + 17.</p><p><strong>Examples:</strong></p><ul><li>The opposite of 5 - x is -5 + x, so 2x - 3 - (5 - x) = 2x + -3 + -5 + x = 3x + -8</li><li>4 - 2a - 3(2a - 7) = 4 + -2a - (6a - 21) = 4 + -2a + (-6a + 21) = 4 + -2a + -6a + 21 = 25 + -8a</li></ul></div>', 'text', '', '2025-04-11 21:53:33', '2025-04-12 19:03:06'),
(11, 'Solving Linear Equations and Inequalities', 4, 0, 0, '<h1>Solving Linear Equations and Inequalities</h1><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>1. What Is a Linear Equation?</h2><p>A linear equation is an equation where the highest power of the variable (usually x) is 1. These equations look like this:</p><p><strong>Examples:</strong> <br />x + 3 = 7 <br />2x - 4 = 10</p></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>2. Solving Simple Linear Equations</h2><p>The goal is to get the variable (like x) alone on one side of the equation. Let\'s go step by step:</p><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve x + 5 = 12<br />Step 1: Subtract 5 from both sides → x + 5 - 5 = 12 - 5<br />Step 2: x = 7</div><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve 3x = 15<br />Step 1: Divide both sides by 3 → x = 15 ÷ 3<br />Step 2: x = 5</div></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>3. Solving More Complicated Equations</h2><p>Sometimes you’ll need to do more than one step, like using the distributive property or combining like terms.</p><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve 2(x + 3) = 10<br />Step 1: Distribute → 2x + 6 = 10<br />Step 2: Subtract 6 from both sides → 2x = 4<br />Step 3: Divide by 2 → x = 2</div><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve 3x - 4 = 2x + 1<br />Step 1: Subtract 2x from both sides → x - 4 = 1<br />Step 2: Add 4 to both sides → x = 5</div></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>4. What Is an Inequality?</h2><p>Inequalities are like equations, but instead of \"=\", they use these symbols:</p><ul><li><strong>&lt;</strong> less than</li><li><strong>&gt;</strong> greater than</li><li><strong>&le;</strong> less than or equal to</li><li><strong>&ge;</strong> greater than or equal to</li></ul></div><div class=\"bg-white p-2 rounded-sm shadow mb-2\"><h2>5. Solving Inequalities</h2><p>Solving inequalities works just like solving equations—until you multiply or divide by a negative number. Then you must flip the inequalitysign!</p><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve x + 4 &lt; 10<br />Step 1: Subtract 4 → x &lt; 6</div><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve -2x &gt; 8<br />Step 1: Divide both sides by -2 (flip the sign!) → x &lt; -4</div><div class=\"bg-slate-100 border-l2 border-black p-1 mb-1\"><strong>Example:</strong> Solve 4x - 2(x + 1) &lt; 3(x + 3)<br />Step 1: Simplify both sides → 4x + -2x + -2 &lt; 3x + 9<br />Step 2: Simplify further → 2x + -2 &lt; 3x + 9<br />Step 3: Subtract 3x from both sides → -x + -2 &lt; 9<br />Step 3: Add 2 to both sides → -x &lt; 11<br />Step 4: Divide both sides by -1 → x &gt; -11<br /></div></div>', 'text', '', '2025-04-11 21:53:33', '2025-04-12 19:47:02'),
(12, 'Graphing Linear Equations and Functions', 4, 0, 0, 'Linear functions are typically written in slope-intercept form: $ y = mx + b $, where $ m $ is the slope and $ b $ is the y-intercept. The slope describes the steepness of the line and is calculated as the change in $ y $ over the change in $ x $. To graph a line, start at the y-intercept and use the slope to find another point. Plotting several points helps ensure accuracy. Graphing allows visualization of solutions and relationships.', 'latex', '', '2025-04-11 21:53:33', '2025-04-12 00:40:03'),
(13, 'Systems of Linear Equations and Inequalities', 4, 0, 0, 'A system of equations consists of two or more equations with the same variables. Solutions to these systems are the set of values that satisfy all equations. Methods of solving include graphing, substitution, and elimination. Systems can have one solution (intersecting lines), no solution (parallel lines), or infinitely many solutions (same line). Systems of inequalities use shading to represent all possible solutions on the coordinate plane.', 'pdf', 'precalc/pdf/systems', '2025-04-11 21:53:33', '2025-04-15 20:22:55'),
(14, 'Laws of Exponents', 4, 0, 0, '[HHH]Exponents are a way to show repeated multiplication. For example, [LLL]$$3^4 = 3 \\times 3 \\times 3 \\times 3 = 81$$. [HHH]The number 3 is called the base, and 4 is the exponent. Understanding the laws of exponents helps simplify expressions and solve equations more easily. Let\'s go over the most important rules, with step-by-step examples.<div class=\"font-bold my-1 text-lg\">Exponent Laws and Examples</div><div class=\"font-bold my-1\">1. Product of Powers Rule</div>[LLL]$$a^m \\cdot a^n = a^{m+n}$$Example 1:$$2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$$Example 2:$$x^2 \\cdot x^5 = x^{2+5} = x^7$$[HHH]<div class=\"font-bold my-1\">2. Quotient of Powers Rule</div>[LLL]$$\\frac{a^m}{a^n} = a^{m-n}$$Example 3:$$\\frac{5^6}{5^2} = 5^{6-2} = 5^4 = 625$$Example 4:$$\\frac{y^8}{y^3} = y^{8-3} = y^5$$[HHH]<div class=\"font-bold my-1\">3. Power of a Power Rule</div>[LLL]$$(a^m)^n = a^{mn}$$Example 5:$$(3^2)^4 = 3^{2 \\times 4} = 3^8 = 6561$$Example 6:$$(x^3)^2 = x^{3 \\cdot 2} = x^6$$[HHH]<div class=\"font-bold my-1\">4. Power of a Product Rule</div>[LLL]$$(ab)^n = a^n \\cdot b^n$$Example 7:$$(2x)^3 = 2^3 \\cdot x^3 = 8x^3$$[HHH]<div class=\"font-bold my-1\">5. Power of a Quotient Rule</div>[LLL]$$\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$$Example 8:$$\\left(\\frac{3}{4}\\right)^2 = \\frac{3^2}{4^2} = \\frac{9}{16}$$[HHH]<div class=\"font-bold my-1\">6. Zero Exponent Rule</div>[LLL]$$a^0 = 1 (a \\neq 0)$$Example 9:$$7^0 = 1$$$$x^0 = 1$$[HHH]<div class=\"\">Why does this make sense? Let´s use the Product of Powers Rule to calculate it:</div>[LLL]$$x^0 \\cdot x^a = x^{0+a} = x^a$$Since multiplying by $x^0$ leaves $x^a$ unchanged, it follows that it is equal to 1 [HHH]<div class=\"font-bold my-1\">7. Negative Exponent Rule</div>[LLL]$$a^{-n} = \\frac{1}{a^n}$$Example 10:$$2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}$$', 'hybrid', '', '2025-04-11 21:53:33', '2025-04-12 23:02:18'),
(15, 'Polynomials: Operations and Factoring', 4, 0, 0, 'Polynomials are expressions that consist of variables and coefficients, using operations of addition, subtraction, and multiplication. Terms are separated by plus or minus signs. Operations include combining like terms and using distributive property. Factoring is the reverse of multiplication and is used to simplify or solve polynomial equations. Common techniques include factoring out the greatest common factor, difference of squares, and trinomial factoring.', 'pdf', 'precalc/pdf/polynomials', '2025-04-11 21:53:33', '2025-04-15 20:19:32'),
(16, 'Rational Expressions and Equations', 4, 10, 0, 'Rational expressions are fractions where the numerator and/or denominator are polynomials. To simplify, factor both numerator and denominator and cancel common factors. When adding or subtracting, find a common denominator. Equations involving rational expressions may require multiplying both sides by the least common denominator to eliminate fractions. Always check for values that make any denominator zero, as they are excluded from the solution set.', 'pdf', 'precalc/pdf/rational', '2025-04-11 21:53:33', '2025-04-15 20:19:32'),
(17, 'Radical Expressions and Equations', 4, 6, 0, 'Radical expressions involve roots, such as square roots or cube roots. The principal square root of a number $ x $ is written $ \\sqrt{x} $. Simplifying radicals often involves factoring the number and simplifying using perfect squares. Equations with radicals require isolating the radical and then squaring both sides, taking care to check for extraneous solutions caused by squaring. Radicals can also be expressed using rational exponents.', 'pdf', 'precalc/pdf/radical', '2025-04-11 21:53:33', '2025-04-15 20:20:24'),
(18, 'Quadratic Equations and Functions', 4, 4, 0, '[HHH]<p>Quadratic equations have the standard form [LLL]$ ax^2 + bx + c = 0 $. [HHH]They can be solved using factoring, completing the square, or the quadratic formula.</p><br /><h2><strong>1. Solving by Factoring</strong></h2><p>Remember factoring? Basically we rewrite something like </p>[LLL]$ ax^2 + bx + c $ in the form $(x + q)(x + p)$[HHH]<p>Don\'t let the variable names bother you -- x is the only variable above; the others just represent numbers</p><p><strong>Example:</strong> <br />[LLL]$ x^2 - 5x + 4 = (x - 4)(x - 1) $[HHH]</p><p>We are essentially multiplying in reverse. Check that our factorization is correct by multiplying the right hand side.</p><p>If two things multiply to zero, at least one of them must be zero.</p><p><strong>Example:</strong> <br />[LLL]Solve $ x^2 - 5x + 4 = 0 $ <br />$ (x - 4)(x - 1) = 0 $ <br />$ x = 4 $ or $ x = 1 $ <br />[HHH]</p><br /><h2><strong>2. Solving by Completing the Square</strong></h2><p>A perfect square has the form </p>[LLL]$ x^2 + bx + (\\frac{b}{2})^2 $[HHH]<p>and this factors to</p>[LLL]$ (x + \\frac{b}{2})^2 $<p><strong>Example:</strong> <br />[LLL]Solve $ x^2 + 6x - 7 = 0 $[HHH]</p><p>Move the 7 to the right hand side.</p>[LLL]$ x^2 + 6x = 7 $[HHH]<p>Square half of six to get 9. Add to each side</p>[LLL]$ x^2 + 6x + 9 = 16 $[HHH]<p>The left-hand side is now a perfect square. Factor it</p>[LLL]$ (x + 3)^2 = 16 $[HHH]<p>Square-root both sides. One side takes two values</p>[LLL]$ x + 3 = \\pm4 $[HHH]<p>This is a short way of wrting two problems</p>[LLL]$ x + 3 = 4 $ and $ x + 3 = -4 $<br />$ x = 1 $ or $ x = -7 $', 'pdf', 'precalc/pdf/quadratic', '2025-04-11 21:53:33', '2025-04-15 20:20:24'),
(19, 'Word Problems and Applications', 4, 0, 0, 'Algebra is often used to model and solve real-world problems. Word problems typically involve translating a situation into an equation or system of equations. Key steps include identifying known and unknown quantities, writing expressions or equations to represent relationships, and solving the equations. Units and logical reasoning are important. Practice is essential to become proficient at applying algebra to various scenarios.', 'latex', '', '2025-04-11 21:53:33', '2025-04-12 00:40:03'),
(22, 'Concepto y clasificación de la estadística.', 12, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(23, 'Dato estadístico, variable y su clasificación.', 12, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(24, 'Población y muestra.', 12, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(25, 'Registro y ordenamiento de datos.', 12, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(26, 'Tabla de distribución de frecuencia.', 12, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(27, 'Representación gráfica de datos.', 12, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(28, 'Media aritmética. Medida de Tendencia Central.', 13, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(29, 'Mediana. Medida de Tendencia Central.', 13, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(30, 'Moda. Medida de Tendencia Central.', 13, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(31, 'Cuartiles. Medida de Posición.', 13, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(32, 'Deciles. Medida de Posición.', 13, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(33, 'Percentiles. Medida de Posición.', 13, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(34, 'Desviación media y su Interpretación.', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(35, 'Varianza y desviación estándar.', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(36, 'Varianza y su interpretación.', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(37, 'Desviación estándar y su Interpretación.', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(38, 'Diagrama de dispersión y centro de gravedad.', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(39, 'Covarianza', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(40, 'Coeficiente de correlación', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(41, 'Ecuación de la recta de regresión y aplicación a serie de tiempos.', 14, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(42, 'Conceptos de Probabilidad, Evento y Espacio muestral; ejercicios de Espacio muestral.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(43, 'Ejercicos de probabilidad de enfoque clasico y enfoque de frecuencia relativa.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(44, 'Ejercicios de Problemas de conteo', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(45, 'Factorial. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(46, 'Combinaciones. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(47, 'Permutaciones. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(48, 'Diagrama de Árbol. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(49, 'Clasificación de la probabilidad', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(50, 'Eventos mutuamente excluyentes o disjuntos. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(51, 'Eventos Independientes. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(52, 'Eventos dependientes. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(53, 'Eventos no excluyentes entre si. Concepto y ejercicios.', 15, 0, 0, '', 'text', '', '2025-04-15 15:26:25', '2025-04-15 15:26:25'),
(61, 'Lec 1', 21, 0, 0, '', 'text', '', '2025-05-21 15:57:48', '2025-05-21 15:57:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lesson_sets`
--

CREATE TABLE `lesson_sets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `sequence_id` int(11) NOT NULL,
  `is_premium` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `lesson_sets`
--

INSERT INTO `lesson_sets` (`id`, `name`, `course_id`, `sequence_id`, `is_premium`, `created_at`, `updated_at`) VALUES
(1, 'one', 1, 0, 0, '2025-04-11 21:49:11', '2025-04-11 21:49:11'),
(2, 'two', 1, 0, 0, '2025-04-11 21:49:11', '2025-04-11 21:49:11'),
(3, 'three', 1, 0, 0, '2025-04-11 21:49:11', '2025-04-11 21:49:11'),
(4, 'Review of Algebra', 4, 0, 0, '2025-04-11 21:52:25', '2025-04-15 17:14:53'),
(5, 'Functions', 4, 0, 0, '2025-04-11 21:52:25', '2025-04-11 21:52:25'),
(6, 'Complex Numbers', 4, 0, 0, '2025-04-11 21:52:25', '2025-04-15 17:14:53'),
(7, 'Trigonometry', 4, 0, 0, '2025-04-11 21:52:25', '2025-04-15 17:14:53'),
(8, 'Logarithms', 4, 0, 0, '2025-04-11 21:52:25', '2025-04-11 21:52:25'),
(9, 'Sequences and Series', 4, 10, 0, '2025-04-11 21:52:25', '2025-04-15 17:14:53'),
(10, 'Systems of Equations and Matrices', 4, 0, 0, '2025-04-11 21:52:25', '2025-04-15 17:14:53'),
(12, 'La Estadística y su aplicación.', 5, 0, 0, '2025-04-15 15:10:22', '2025-04-15 15:10:22'),
(13, 'Medidas de Tendencia Central y Medidas de Posición.', 5, 0, 0, '2025-04-15 15:10:22', '2025-04-15 15:10:22'),
(14, 'Las medidas de dispersión en la estadística descriptiva y recta de regresión.', 5, 0, 0, '2025-04-15 15:10:22', '2025-04-15 15:10:22'),
(15, 'Introducción a la Probabilidad.', 5, 0, 0, '2025-04-15 15:10:22', '2025-04-15 15:10:22'),
(21, '1. Introducción a la estadística y probabilidad.', 10, 0, 0, '2025-05-21 15:56:13', '2025-06-09 13:58:08'),
(22, '2. Variabilidad y representación gráfica.', 10, 0, 0, '2025-05-21 15:56:13', '2025-06-09 13:59:13'),
(23, '3. Métodos de muestreo.', 10, 0, 0, '2025-05-21 15:56:13', '2025-06-09 13:59:13'),
(24, '4. Medidas numéricas.', 10, 0, 0, '2025-05-21 15:56:13', '2025-06-09 13:59:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2025_05_20_200858_create_open_answers_numeric_table', 1),
(2, '2025_05_21_162649_add_open_answer_to_results', 2),
(3, '2025_05_21_162649_add_defaults_to_results', 3),
(4, '2025_05_22_200858_create_open_answers_alpha_table', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `open_answers_alpha`
--

CREATE TABLE `open_answers_alpha` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `problem_id` bigint(20) UNSIGNED NOT NULL,
  `answer` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `open_answers_numeric`
--

CREATE TABLE `open_answers_numeric` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `problem_id` bigint(20) UNSIGNED NOT NULL,
  `answer` decimal(12,6) NOT NULL,
  `pct_tolerance` decimal(4,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `open_answers_numeric`
--

INSERT INTO `open_answers_numeric` (`id`, `problem_id`, `answer`, `pct_tolerance`, `created_at`, `updated_at`) VALUES
(1, 167, 0.200000, 0.10, '2025-06-06 15:09:45', '2025-06-06 15:09:45'),
(2, 166, 1.000000, 0.00, '2025-06-06 15:14:03', '2025-06-06 15:14:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `problems`
--

CREATE TABLE `problems` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `lesson_id` text NOT NULL,
  `problem_type_id` bigint(20) UNSIGNED NOT NULL,
  `display_type` varchar(255) NOT NULL DEFAULT 'text',
  `sequence_id` int(11) NOT NULL,
  `is_premium` int(11) NOT NULL DEFAULT 0,
  `problem_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `problems`
--

INSERT INTO `problems` (`id`, `name`, `lesson_id`, `problem_type_id`, `display_type`, `sequence_id`, `is_premium`, `problem_text`, `created_at`, `updated_at`) VALUES
(1, 'simple addition', '1', 1, 'latex', 0, 0, '2+3', NULL, '2025-04-12 16:51:24'),
(2, 'less simple addition', '1', 1, 'latex', 0, 0, '28+37', NULL, '2025-04-12 16:51:24'),
(3, 'less simple subtraction', '3', 1, 'latex', 0, 0, '128-37', NULL, '2025-04-12 16:51:24'),
(4, 'simple subtraction', '3', 1, 'latex', 0, 0, '7-5', NULL, '2025-04-12 16:51:24'),
(5, 'oordops1', '5', 1, 'latex', 0, 0, '10-5-3', NULL, '2025-04-12 16:51:24'),
(6, 'oordops2', '5', 1, 'latex', 0, 0, '1+3*2', NULL, '2025-04-12 16:51:24'),
(7, 'add', '2', 1, 'latex', 0, 0, '456 + 239', NULL, '2025-04-12 16:51:24'),
(8, 'add', '2', 1, 'latex', 0, 0, '1018 + 7322', NULL, '2025-04-12 16:51:24'),
(9, 'subtr', '4', 1, 'latex', 0, 0, '301 - 19', NULL, '2025-04-12 16:51:24'),
(10, 'subtr', '4', 1, 'latex', 0, 0, '1874 - 1397', NULL, '2025-04-12 16:51:24'),
(11, 'latex prob', '1', 1, 'latex', 0, 1, 'Solve for $ x $: $$ \\frac{1}{2}x = 9 $$', NULL, '2025-04-28 23:03:06'),
(12, '', '7', 2, 'latex', 1, 0, 'select all that are equal to $ 7 $', NULL, '2025-05-02 20:26:47'),
(13, '', '10', 1, 'latex', 0, 0, 'What is the value of: $$ 3 - 5 	\\times 2 + 6 \\div 3 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(14, '', '10', 2, 'latex', 0, 0, 'Which number is NOT a rational number?', '2025-04-11 22:09:13', '2025-05-06 02:20:36'),
(15, '', '10', 1, 'latex', 0, 0, 'Simplify: $$ |-8| + (-3)^2 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(16, '', '11', 1, 'latex', 0, 0, 'Solve: $$ 4x - 7 = 9 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(17, '', '11', 2, 'latex', 0, 0, 'Which values of $ x $ satisfy the inequality $$ 2x + 3 < 7 $$?', '2025-04-11 22:09:13', '2025-04-26 12:42:59'),
(18, '', '11', 1, 'latex', 0, 0, 'Solve: $$ 5x + 2 = 3x + 10 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(19, '', '12', 1, 'latex', 0, 0, 'What is the slope of the line $$ y = -2x + 4 $$?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(20, '', '12', 2, 'latex', 0, 0, 'Which points lie on the line $$ y = \\frac{1}{2}x + 1 $$?', '2025-04-11 22:09:13', '2025-05-06 05:14:33'),
(21, '', '12', 1, 'latex', 0, 0, 'What is the y-intercept of the line $$ y = 3x - 5 $$?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(22, '', '13', 1, 'latex', 0, 0, 'A system of equations has no solution. What does this mean about the lines?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(23, '', '14', 1, 'latex', 0, 0, 'Simplify: $$ x^3 \\cdot x^2 $$', '2025-04-11 22:09:13', '2025-05-03 18:54:14'),
(24, '', '14', 1, 'latex', 0, 0, 'Simplify: $$ (2x^3)^2 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(25, '', '14', 1, 'latex', 0, 0, 'What is $ x^0 $ (for $ x \\neq 0 $)?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(26, '', '15', 1, 'latex', 0, 0, 'Simplify: $$ (3x^2 + 2x) + (5x^2 - x) $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(27, '', '15', 1, 'latex', 0, 0, 'Factor: $$ x^2 - 9 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(28, '', '15', 1, 'latex', 0, 0, 'Multiply: $$ (x + 2)(x - 5) $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(29, '', '16', 1, 'latex', 0, 0, 'Simplify: $$ \\frac{4x}{8x^2} $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(30, '', '16', 1, 'latex', 0, 0, 'Solve: $$ \\frac{1}{x} = \\frac{1}{3} $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(31, '', '16', 1, 'latex', 0, 0, 'What value of $$ x $$ makes $$ \\frac{x+1}{x-2} $$ undefined?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(32, '', '17', 1, 'latex', 0, 0, 'Simplify: $$ \\sqrt{49} $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(33, '', '17', 1, 'latex', 0, 0, 'What is the value of $$ \\sqrt{16} + \\sqrt{9} $$?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(34, '', '17', 1, 'latex', 0, 0, 'Simplify: $$ \\sqrt{2^2 + 3^2} $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(35, '', '18', 1, 'latex', 0, 0, 'Solve: $$ x^2 = 25 $$', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(36, '', '18', 1, 'latex', 0, 0, 'What is the vertex of $$ y = (x - 3)^2 + 2 $$?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(37, '', '18', 1, 'latex', 0, 0, 'What is the axis of symmetry of $$ y = x^2 + 4x + 1 $$?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(38, '', '19', 1, 'latex', 0, 0, 'A number increased by 5 is 12. What is the number?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(39, '', '19', 1, 'latex', 0, 0, 'If the perimeter of a rectangle is 24 and the length is 7, what is the width?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(40, '', '19', 1, 'latex', 0, 0, 'A train travels at 60 mph for 3 hours. How far does it go?', '2025-04-11 22:09:13', '2025-04-12 16:51:24'),
(41, '', '1', 1, 'hybrid', 1, 0, '[LLL]$ x = \\frac{1}{2} $[HHH]<image src=\"/storage/dog.jpg\"> <p>ok</p>[LLL] $$ x \\neq 2 $$', '2025-04-12 02:07:06', '2025-04-12 16:51:24'),
(42, '', '12', 1, 'hybrid', 2, 0, '[LLL]Which of the lines represents $ y = 2x - 1 $ ?[HHH]<image src=\"/storage/135317.png\">', '2025-04-12 19:59:28', '2025-04-13 00:11:09'),
(43, '', '17', 1, 'latex', 4, 0, 'Simplify $\\sqrt{300a^4b^9}$', '2025-04-14 09:49:39', '2025-04-14 09:49:39'),
(44, '', '17', 1, 'latex', 5, 0, 'Simplify $\\sqrt[3]{54x^7y^8}$', '2025-04-14 10:07:51', '2025-04-14 10:11:28'),
(47, '', '1', 1, 'text', 0, 0, 'Cuándo se emplea la escala de Razón?', '2025-04-23 18:12:34', '2025-04-23 18:12:34'),
(48, '', '10', 2, 'latex', 0, 0, 'Which expressions are equal to $ 3x - 5 - (x - 7) $', '2025-04-24 15:02:05', '2025-04-24 15:02:05'),
(49, '', '10', 2, 'latex', 0, 0, 'Find all solutions to $ | y - 13 | = 12 $', '2025-04-24 15:02:05', '2025-04-24 15:02:05'),
(50, '', '10', 2, 'latex', 0, 0, 'Which expressions are equal to $ 4 + 3w - (4w - 3) $', '2025-04-24 15:02:05', '2025-04-24 15:02:05'),
(118, '', '22', 1, 'latex', 0, 0, 'Es un valor, medida o característica que permite ser observada o contada para su posterior análisis:', '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(119, '', '22', 1, 'latex', 0, 0, 'Diagrama gráfico usado para visualizar relaciones entre colecciones de objetos:', '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(120, '', '22', 1, 'latex', 0, 0, 'Es el número de elementos que contiene cada categoría o clase del conjunto de datos:', '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(121, '', '22', 1, 'latex', 0, 0, 'Es el punto de equilibrio de un conjunto de datos en un diagrama de dispersión:', '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(122, '', '22', 1, 'latex', 0, 0, 'El número de hermanos que tiene una persona es un ejemplo de variable:', '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(123, '', '22', 1, 'latex', 0, 0, 'Es una medida de la certidumbre asociada a un suceso o evento futuro y suele expresarse como un número con valor desde 0 y hasta 1:', '2025-05-01 12:15:30', '2025-05-01 12:15:30'),
(124, '', '0', 1, 'text', 10, 0, '', '2025-05-01 19:21:57', '2025-05-01 19:21:57'),
(125, '', '0', 1, 'text', 10, 0, '', '2025-05-01 19:24:50', '2025-05-01 19:24:50'),
(126, '', '0', 1, 'text', 10, 0, '', '2025-05-01 19:27:11', '2025-05-01 19:27:11'),
(127, '', '0', 1, 'text', 10, 0, '', '2025-05-01 19:40:00', '2025-05-01 19:40:00'),
(128, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:00:38', '2025-05-01 22:00:38'),
(129, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:01:20', '2025-05-01 22:01:20'),
(130, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:01:48', '2025-05-01 22:01:48'),
(131, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:05:03', '2025-05-01 22:05:03'),
(132, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:11:44', '2025-05-01 22:11:44'),
(133, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:53:39', '2025-05-01 22:53:39'),
(134, '', '0', 1, 'text', 10, 0, '', '2025-05-01 22:56:34', '2025-05-01 22:56:34'),
(135, '', '0', 1, 'text', 10, 0, '', '2025-05-01 23:04:03', '2025-05-01 23:04:03'),
(136, '', '0', 1, 'text', 10, 0, '', '2025-05-01 23:04:40', '2025-05-01 23:04:40'),
(137, '', '0', 1, 'text', 10, 0, '', '2025-05-01 23:05:19', '2025-05-01 23:05:19'),
(138, '', '0', 1, 'text', 10, 0, '', '2025-05-01 23:10:13', '2025-05-01 23:10:13'),
(139, '', '0', 1, 'text', 10, 0, '', '2025-05-02 05:10:52', '2025-05-02 05:10:52'),
(140, '', '0', 1, 'text', 10, 0, '', '2025-05-02 05:57:06', '2025-05-02 05:57:06'),
(141, '', '0', 1, 'text', 10, 0, '', '2025-05-02 20:27:06', '2025-05-02 20:27:06'),
(142, '', '16', 1, 'latex', 10, 0, 'Simplify: $$ \\frac{6x^3}{4x^2} $$', '2025-05-06 01:36:28', '2025-05-05 19:46:51'),
(143, '', '0', 1, 'text', 10, 0, '', '2025-05-06 01:44:36', '2025-05-06 01:44:36'),
(144, '', '0', 1, 'text', 10, 0, '', '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(145, '', '12', 1, 'latex', 10, 0, 'find the slope of $$ 2y - 3x = 22 $$', '2025-05-06 02:56:10', '2025-05-24 21:27:02'),
(146, '', '12', 1, 'latex', 10, 0, 'Where do the lines $ y = 2x - 3 $ and $ x + y = 9 $ intersect?', '2025-05-06 02:57:26', '2025-05-05 23:21:49'),
(147, '', '11', 1, 'latex', 10, 0, 'solve for x $$ 2 - 3x > 1 $$', '2025-05-06 05:12:26', '2025-05-06 19:42:47'),
(148, '', '16', 1, 'latex', 10, 0, '$$ Reduce \\frac{x}{x^2} $$', '2025-05-09 03:55:04', '2025-05-09 04:00:04'),
(149, '', '12', 1, 'latex', 10, 0, 'Find the slope of the line $ 3y - 4x + 17 = 9 $', '2025-05-12 11:15:22', '2025-05-12 11:20:52'),
(150, '', '13', 1, 'latex', 10, 0, 'Find the point where the lines $ y = 3x - 1 $ and $ x = y + 7 $ intersect', '2025-05-12 13:34:49', '2025-05-12 13:39:54'),
(151, '', '16', 1, 'latex', 10, 0, 'Simplify: $$ \\frac{16x^4}{24x^5} $$', '2025-05-12 18:19:47', '2025-05-12 18:23:58'),
(152, '', '10', 1, 'text', 10, 0, '', '2025-05-12 19:15:36', '2025-05-12 19:15:36'),
(153, '', '22', 1, 'text', 10, 0, '', '2025-05-21 14:29:33', '2025-05-21 14:29:33'),
(154, '', '61', 1, 'text', 10, 0, 'Es un valor, medida o característica que permite ser observada o contada para su posterior análisis.', '2025-05-21 14:38:24', '2025-05-21 15:59:06'),
(156, '', '61', 1, 'text', 10, 0, 'Diagrama gráfico usado para visualizar relaciones entre colecciones de objetos:', '2025-05-21 16:01:11', '2025-05-21 16:14:37'),
(160, '', '14', 1, 'latex', 10, 0, '$ (5w^3)(-2w^{-2}) $', '2025-05-28 17:42:09', '2025-05-28 17:44:42'),
(161, '', '14', 1, 'latex', 10, 0, '$ (5w^3)(-2w^{-2})^2 $', '2025-05-28 17:44:50', '2025-05-28 17:50:33'),
(162, '', '0', 1, 'text', 10, 0, '', '2025-06-03 17:41:17', '2025-06-03 17:41:17'),
(163, '', '0', 1, 'text', 10, 0, '', '2025-06-03 17:41:21', '2025-06-03 17:41:21'),
(164, '', '61', 1, 'latex', 10, 0, 'Es un valor, medida o característica que permite ser observada o contada para su posterior análisis:', '2025-06-03 18:12:26', '2025-06-03 18:19:15'),
(165, '', '61', 1, 'latex', 10, 0, 'El número de hermanos que tiene una persona es un ejemplo de variable:', '2025-06-03 18:32:54', '2025-06-03 18:53:27'),
(166, '', '12', 4, 'latex', 10, 0, '$ 3 - 2 $', '2025-06-04 19:56:16', '2025-06-04 19:58:19'),
(167, '', '22', 4, 'hybrid', 10, 0, '[HHH]Encuentra la frecuencia relativa para el intervalo #3:<image src=\"/storage/t1.png\"><image src=\"/storage/t2.png\">', '2025-06-06 14:48:28', '2025-06-06 14:51:35'),
(168, '', '22', 1, 'latex', 10, 0, '', '2025-06-07 14:11:13', '2025-06-07 14:11:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `problem_hints`
--

CREATE TABLE `problem_hints` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `problem_id` bigint(20) UNSIGNED NOT NULL,
  `hint` text NOT NULL,
  `sequence_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `problem_hints`
--

INSERT INTO `problem_hints` (`id`, `problem_id`, `hint`, `sequence_id`, `created_at`, `updated_at`) VALUES
(1, 18, '$$ 5x + 2 - 3x = 3x + 10 - 3x $$', 10, '2025-04-26 11:16:06', '2025-04-26 11:16:06'),
(2, 18, '$$ 2x + 2 = 10 $$', 20, '2025-04-26 11:16:06', '2025-04-26 11:16:06'),
(3, 18, '$$ 2x + 2 - 2 = 10 - 2 $$', 30, '2025-04-26 11:41:42', '2025-04-26 11:41:42'),
(4, 18, '$$ 2x = 8 $$', 40, '2025-04-26 11:41:42', '2025-04-26 11:41:42'),
(5, 18, '$$ x = 4 $$', 50, '2025-04-26 12:20:19', '2025-04-26 12:20:19'),
(7, 11, '$$ 2 * \\frac{1}{2}x =  2 * 9 $$', 10, '2025-04-28 23:05:45', '2025-04-28 23:05:45'),
(8, 11, '$$ x =  18 $$', 20, '2025-04-28 23:05:45', '2025-04-28 23:05:45'),
(69, 104, 'step one', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(70, 104, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(71, 105, 'step one 1', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(72, 105, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(73, 106, 'step one', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(74, 106, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(75, 107, 'step one', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(76, 107, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(77, 108, 'step one 1', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(78, 108, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(79, 109, 'step one', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(80, 109, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(81, 110, 'step one', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(82, 110, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(83, 111, 'step one 1', 10, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(84, 111, 'step two', 20, '2025-04-30 13:48:06', '2025-04-30 13:48:06'),
(100, 23, '$$ (x^3) \\cdot (x^2) $$', 10, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(101, 23, '$$ (x \\cdot x \\cdot x) \\cdot (x \\cdot x) $$', 20, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(102, 23, '$$ x \\cdot x \\cdot x \\cdot x \\cdot x $$', 30, '2025-05-03 18:54:14', '2025-05-03 18:54:14'),
(106, 142, '$$ \\frac{6}{4} \\cdot  \\frac{x^3}{x^2} $$', 10, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(107, 142, '$$ \\frac{3}{2} \\cdot  \\frac{x}{1} $$', 20, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(108, 142, '$$ \\frac{3x}{2} $$', 30, '2025-05-06 01:44:56', '2025-05-06 01:44:56'),
(109, 14, 'A rational number cannot be written as the ratio of two integers', 10, '2025-05-06 02:21:14', '2025-05-06 02:21:14'),
(111, 50, '$ 4 + 3w + (-4w + 3) $', 10, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(112, 50, '$ 4 + 3w + -4w + 3 $', 20, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(113, 50, '$ 3w + -4w + 4 + 3 $', 30, '2025-05-06 03:58:36', '2025-05-06 03:58:36'),
(117, 146, 'If a point is on both lines, it is where they intersect', 10, '2025-05-06 05:21:03', '2025-05-06 05:21:03'),
(133, 147, '$$ 2 - 3x - 2 > 1 - 2 $$', 10, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(134, 147, '$$ -3x > -1 $$', 20, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(135, 147, 'Divide both sides by $ -3 $ and remember to flip the sign', 30, '2025-05-06 20:15:09', '2025-05-06 20:15:09'),
(136, 29, '$$ \\frac{4}{8} \\cdot  \\frac{x}{x^2} $$', 10, '2025-05-09 03:54:44', '2025-05-09 03:54:44'),
(137, 29, '$$ \\frac{1}{2} \\cdot  \\frac{1}{x} $$', 20, '2025-05-09 03:54:44', '2025-05-09 03:54:44'),
(141, 148, '$$ \\frac{x}{x \\cdot x} $$', 10, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(142, 148, '$$ \\frac{x \\cdot 1}{x \\cdot x} $$', 20, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(143, 148, '$$ \\frac{x}{x} \\cdot \\frac{1}{x} $$', 30, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(144, 148, '$$ 1 \\cdot \\frac{1}{x} $$', 40, '2025-05-09 04:01:03', '2025-05-09 04:01:03'),
(170, 151, '$$ \\frac{16}{24}  \\cdot \\frac{x^4}{x^5}$$', 10, '2025-05-12 18:23:58', '2025-05-12 18:23:58'),
(171, 151, '$$ \\frac{2}{3}  \\cdot \\frac{1}{x}$$', 20, '2025-05-12 18:23:58', '2025-05-12 18:23:58'),
(172, 150, 'We need to find x and y that satisfy both $ y = 3x - 1 $ and $ x = y + 7 $', 10, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(173, 150, 'One way to do this is substitution: if $ y = 3x - 1 $ and $ x = y + 7 $, replace the $ y $ in the second equation with $ 3x - 1 $', 20, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(174, 150, '$ x = y + 7 $ becomes $ x = 3x - 1 + 7 $', 30, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(175, 150, '$ x = 3x + 6 $', 40, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(176, 150, '$ -2x = 6 $', 50, '2025-05-15 16:37:38', '2025-05-15 16:37:38'),
(177, 149, '$ 3y - 4x + 17 - 17 = 9 - 17 $', 10, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(178, 149, '$ 3y - 4x = -8 $', 20, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(179, 149, '$ 3y = 4x - 8 $', 30, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(180, 149, '$ y = \\frac{4}{3}x - \\frac{8}{3} $', 40, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(181, 149, '$ m = \\frac{4}{3} $', 50, '2025-05-24 21:25:49', '2025-05-24 21:25:49'),
(182, 145, '$$ 2y = 3x + 22 $$', 10, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(183, 145, '$$ y = \\frac{3}{2}x + 11 $$', 20, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(184, 145, 'once we have solved for y, the coefficient of x is the slope', 30, '2025-05-24 21:27:02', '2025-05-24 21:27:02'),
(185, 160, '$ (5w^3)(\\frac{-2}{w^2}) $', 10, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(186, 160, '$ \\frac{-10w^3}{w^2} $', 20, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(187, 160, '$-10 \\frac{w^3}{w^2} $', 30, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(188, 160, '$ -10w $', 40, '2025-05-28 17:44:42', '2025-05-28 17:44:42'),
(189, 161, '$ 5w^3 \\cdot (-2w^{-2}) \\cdot (-2w^{-2}) $', 10, '2025-05-28 17:50:33', '2025-05-28 17:50:33'),
(190, 161, '$ 5 \\cdot (-2) \\cdot (-2) \\cdot w^3 \\cdot w^{-2} \\cdot w^{-2}$', 20, '2025-05-28 17:50:33', '2025-05-28 17:50:33'),
(191, 161, '20w^{-1}', 30, '2025-05-28 17:50:33', '2025-05-28 17:50:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `problem_scores`
--

CREATE TABLE `problem_scores` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `problem_id` bigint(20) UNSIGNED NOT NULL,
  `score` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `problem_scores`
--

INSERT INTO `problem_scores` (`id`, `user_id`, `problem_id`, `score`, `created_at`, `updated_at`) VALUES
(16, 1, 1, 100.00, '2025-04-12 14:41:29', '2025-04-12 14:41:29'),
(17, 1, 2, 100.00, '2025-04-12 14:41:58', '2025-04-12 14:41:58'),
(19, 1, 7, 100.00, '2025-04-12 14:42:23', '2025-04-12 14:42:23'),
(20, 1, 8, 100.00, '2025-04-12 14:42:29', '2025-04-12 14:42:29'),
(22, 1, 3, 100.00, '2025-04-12 14:47:49', '2025-04-12 14:47:49'),
(23, 1, 4, 100.00, '2025-04-12 14:47:54', '2025-04-12 14:47:54'),
(24, 1, 9, 100.00, '2025-04-12 14:48:10', '2025-04-12 14:48:10'),
(25, 1, 10, 100.00, '2025-04-12 14:48:17', '2025-04-12 14:48:17'),
(26, 1, 5, 100.00, '2025-04-12 14:49:08', '2025-04-12 14:49:08'),
(27, 1, 6, 100.00, '2025-04-12 14:49:13', '2025-04-12 14:49:13'),
(28, 1, 41, 100.00, '2025-04-12 14:51:12', '2025-04-12 14:51:12'),
(45, 1, 40, 100.00, '2025-04-13 17:53:01', '2025-04-13 17:53:01'),
(47, 1, 24, 100.00, '2025-04-13 22:02:11', '2025-04-13 22:02:11'),
(48, 1, 25, 0.00, '2025-04-13 22:02:22', '2025-04-13 22:02:22'),
(56, 1, 38, 100.00, '2025-04-14 12:45:45', '2025-04-14 12:45:45'),
(57, 1, 39, 100.00, '2025-04-14 12:50:52', '2025-04-14 12:50:52'),
(76, 1, 12, 100.00, '2025-04-23 20:10:27', '2025-04-23 20:10:27'),
(144, 1, 55, 0.00, '2025-04-25 19:42:23', '2025-04-25 19:42:23'),
(145, 1, 54, 0.00, '2025-04-25 20:44:40', '2025-04-25 20:44:40'),
(163, 1, 11, 0.00, '2025-04-28 17:06:12', '2025-04-28 17:06:12'),
(165, 1, 80, 0.00, '2025-04-28 21:37:28', '2025-04-28 21:37:28'),
(166, 1, 81, 0.00, '2025-04-28 21:37:45', '2025-04-28 21:37:45'),
(167, 1, 99, 0.00, '2025-04-29 13:25:56', '2025-04-29 13:25:56'),
(168, 1, 103, 0.00, '2025-04-29 21:08:41', '2025-04-29 21:08:41'),
(169, 1, 102, 0.00, '2025-04-29 21:08:50', '2025-04-29 21:08:50'),
(172, 1, 97, 0.00, '2025-04-30 13:46:42', '2025-04-30 13:46:42'),
(173, 1, 96, 100.00, '2025-04-30 13:46:46', '2025-04-30 13:46:46'),
(174, 1, 106, 0.00, '2025-04-30 13:49:19', '2025-04-30 13:49:19'),
(175, 1, 51, 0.00, '2025-05-01 11:41:25', '2025-05-01 11:41:25'),
(176, 1, 56, 0.00, '2025-05-01 11:41:36', '2025-05-01 11:41:36'),
(177, 1, 120, 100.00, '2025-05-01 12:16:11', '2025-05-01 12:16:11'),
(179, 1, 123, 100.00, '2025-05-01 12:25:54', '2025-05-01 12:25:54'),
(180, 1, 118, 100.00, '2025-05-02 14:28:21', '2025-05-02 14:28:21'),
(182, 1, 23, 100.00, '2025-05-03 11:30:56', '2025-05-03 11:30:56'),
(222, 1, 21, 100.00, '2025-05-06 14:32:35', '2025-05-06 14:32:35'),
(223, 1, 146, 100.00, '2025-05-06 14:32:41', '2025-05-06 14:32:41'),
(224, 1, 42, 0.00, '2025-05-06 14:32:46', '2025-05-06 14:32:46'),
(225, 1, 145, 0.00, '2025-05-06 14:32:55', '2025-05-06 14:32:55'),
(227, 1, 20, 25.00, '2025-05-06 14:33:07', '2025-05-06 14:33:07'),
(247, 1, 28, 100.00, '2025-05-08 15:43:54', '2025-05-08 15:43:54'),
(248, 1, 27, 100.00, '2025-05-08 21:50:44', '2025-05-08 21:50:44'),
(249, 1, 26, 100.00, '2025-05-08 21:50:45', '2025-05-08 21:50:45'),
(254, 1, 14, 100.00, '2025-05-12 11:10:51', '2025-05-12 11:10:51'),
(255, 1, 50, 100.00, '2025-05-12 11:11:30', '2025-05-12 11:11:30'),
(256, 1, 49, 100.00, '2025-05-12 11:11:39', '2025-05-12 11:11:39'),
(257, 1, 13, 100.00, '2025-05-12 11:11:48', '2025-05-12 11:11:48'),
(258, 1, 15, 100.00, '2025-05-12 11:11:53', '2025-05-12 11:11:53'),
(259, 1, 48, 100.00, '2025-05-12 11:12:06', '2025-05-12 11:12:06'),
(262, 1, 18, 100.00, '2025-05-12 11:14:01', '2025-05-12 11:14:01'),
(263, 1, 17, 100.00, '2025-05-12 11:14:33', '2025-05-12 11:14:33'),
(264, 1, 19, 100.00, '2025-05-12 11:15:07', '2025-05-12 11:15:07'),
(265, 1, 22, 100.00, '2025-05-12 13:34:12', '2025-05-12 13:34:12'),
(271, 1, 30, 100.00, '2025-05-12 18:18:38', '2025-05-12 18:18:38'),
(273, 4, 123, 100.00, '2025-05-12 18:54:19', '2025-05-12 18:54:19'),
(274, 4, 122, 100.00, '2025-05-12 18:55:24', '2025-05-12 18:55:24'),
(276, 1, 148, 100.00, '2025-05-13 16:03:10', '2025-05-13 16:03:10'),
(277, 1, 29, 100.00, '2025-05-13 16:03:16', '2025-05-13 16:03:16'),
(278, 1, 142, 100.00, '2025-05-13 16:03:23', '2025-05-13 16:03:23'),
(279, 1, 31, 100.00, '2025-05-13 16:04:06', '2025-05-13 16:04:06'),
(280, 1, 151, 100.00, '2025-05-14 07:49:32', '2025-05-14 07:49:32'),
(281, 1, 43, 100.00, '2025-05-14 07:50:28', '2025-05-14 07:50:28'),
(282, 1, 34, 100.00, '2025-05-14 07:50:38', '2025-05-14 07:50:38'),
(283, 1, 44, 100.00, '2025-05-14 07:51:01', '2025-05-14 07:51:01'),
(284, 1, 33, 100.00, '2025-05-14 07:51:07', '2025-05-14 07:51:07'),
(285, 1, 32, 100.00, '2025-05-14 07:51:11', '2025-05-14 07:51:11'),
(286, 1, 37, 0.00, '2025-05-14 15:51:09', '2025-05-14 15:51:09'),
(287, 1, 36, 0.00, '2025-05-14 15:51:19', '2025-05-14 15:51:19'),
(288, 1, 35, 0.00, '2025-05-14 15:51:32', '2025-05-14 15:51:32'),
(289, 1, 150, 100.00, '2025-05-15 16:37:54', '2025-05-15 16:37:54'),
(290, 4, 121, 100.00, '2025-05-21 14:45:38', '2025-05-21 14:45:38'),
(291, 4, 119, 100.00, '2025-05-21 14:46:10', '2025-05-21 14:46:10'),
(292, 1, 16, 100.00, '2025-05-22 22:31:10', '2025-05-22 22:31:10'),
(293, 1, 147, 100.00, '2025-05-22 22:31:51', '2025-05-22 22:31:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `problem_types`
--

CREATE TABLE `problem_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `problem_types`
--

INSERT INTO `problem_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'single-answer multiple choice', NULL, NULL),
(2, 'multi-answer multiple choice', NULL, NULL),
(3, 'open answer', NULL, NULL),
(4, 'numeric', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `results`
--

CREATE TABLE `results` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `problem_id` bigint(20) UNSIGNED NOT NULL,
  `answer_id` int(11) NOT NULL DEFAULT 0,
  `open_answer_alpha` varchar(255) NOT NULL,
  `open_answer_numeric` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `results`
--

INSERT INTO `results` (`id`, `user_id`, `problem_id`, `answer_id`, `open_answer_alpha`, `open_answer_numeric`, `created_at`, `updated_at`) VALUES
(26, 1, 1, 3, '', 0, '2025-04-12 14:41:29', '2025-04-12 14:41:29'),
(27, 1, 2, 6, '', 0, '2025-04-12 14:41:58', '2025-04-12 14:41:58'),
(29, 1, 7, 22, '', 0, '2025-04-12 14:42:23', '2025-04-12 14:42:23'),
(30, 1, 8, 25, '', 0, '2025-04-12 14:42:29', '2025-04-12 14:42:29'),
(33, 1, 3, 16, '', 0, '2025-04-12 14:47:49', '2025-04-12 14:47:49'),
(34, 1, 4, 9, '', 0, '2025-04-12 14:47:54', '2025-04-12 14:47:54'),
(35, 1, 9, 27, '', 0, '2025-04-12 14:48:10', '2025-04-12 14:48:10'),
(36, 1, 10, 28, '', 0, '2025-04-12 14:48:17', '2025-04-12 14:48:17'),
(37, 1, 5, 17, '', 0, '2025-04-12 14:49:08', '2025-04-12 14:49:08'),
(38, 1, 6, 20, '', 0, '2025-04-12 14:49:13', '2025-04-12 14:49:13'),
(55, 1, 40, 257, '', 0, '2025-04-13 17:53:01', '2025-04-13 17:53:01'),
(66, 1, 38, 251, '', 0, '2025-04-14 12:45:45', '2025-04-14 12:45:45'),
(67, 1, 39, 253, '', 0, '2025-04-14 12:50:52', '2025-04-14 12:50:52'),
(88, 1, 12, 36, '', 0, '2025-04-23 20:10:27', '2025-04-23 20:10:27'),
(89, 1, 12, 34, '', 0, '2025-04-23 20:10:27', '2025-04-23 20:10:27'),
(181, 1, 55, 310, '', 0, '2025-04-25 19:42:23', '2025-04-25 19:42:23'),
(182, 1, 54, 305, '', 0, '2025-04-25 20:44:40', '2025-04-25 20:44:40'),
(201, 1, 11, 343, '', 0, '2025-04-28 17:06:12', '2025-04-28 17:06:12'),
(203, 1, 80, 388, '', 0, '2025-04-28 21:37:28', '2025-04-28 21:37:28'),
(204, 1, 81, 393, '', 0, '2025-04-28 21:37:45', '2025-04-28 21:37:45'),
(205, 1, 99, 439, '', 0, '2025-04-29 13:25:56', '2025-04-29 13:25:56'),
(206, 1, 103, 449, '', 0, '2025-04-29 21:08:41', '2025-04-29 21:08:41'),
(207, 1, 102, 446, '', 0, '2025-04-29 21:08:50', '2025-04-29 21:08:50'),
(210, 1, 97, 434, '', 0, '2025-04-30 13:46:42', '2025-04-30 13:46:42'),
(211, 1, 96, 432, '', 0, '2025-04-30 13:46:46', '2025-04-30 13:46:46'),
(212, 1, 106, 458, '', 0, '2025-04-30 13:49:19', '2025-04-30 13:49:19'),
(213, 1, 51, 292, '', 0, '2025-05-01 11:41:24', '2025-05-01 11:41:24'),
(214, 1, 56, 312, '', 0, '2025-05-01 11:41:36', '2025-05-01 11:41:36'),
(215, 1, 120, 512, '', 0, '2025-05-01 12:16:11', '2025-05-01 12:16:11'),
(217, 1, 123, 522, '', 0, '2025-05-01 12:25:54', '2025-05-01 12:25:54'),
(218, 1, 118, 505, '', 0, '2025-05-02 14:28:21', '2025-05-02 14:28:21'),
(272, 1, 42, 263, '', 0, '2025-05-06 14:32:46', '2025-05-06 14:32:46'),
(302, 1, 14, 596, '', 0, '2025-05-12 11:10:51', '2025-05-12 11:10:51'),
(303, 1, 50, 596, '', 0, '2025-05-12 11:11:30', '2025-05-12 11:11:30'),
(304, 1, 50, 608, '', 0, '2025-05-12 11:11:30', '2025-05-12 11:11:30'),
(305, 1, 50, 611, '', 0, '2025-05-12 11:11:30', '2025-05-12 11:11:30'),
(306, 1, 49, 596, '', 0, '2025-05-12 11:11:39', '2025-05-12 11:11:39'),
(307, 1, 49, 608, '', 0, '2025-05-12 11:11:39', '2025-05-12 11:11:39'),
(308, 1, 49, 611, '', 0, '2025-05-12 11:11:39', '2025-05-12 11:11:39'),
(309, 1, 49, 283, '', 0, '2025-05-12 11:11:39', '2025-05-12 11:11:39'),
(310, 1, 49, 285, '', 0, '2025-05-12 11:11:39', '2025-05-12 11:11:39'),
(311, 1, 13, 149, '', 0, '2025-05-12 11:11:48', '2025-05-12 11:11:48'),
(312, 1, 15, 158, '', 0, '2025-05-12 11:11:53', '2025-05-12 11:11:53'),
(313, 1, 48, 280, '', 0, '2025-05-12 11:12:06', '2025-05-12 11:12:06'),
(316, 1, 18, 169, '', 0, '2025-05-12 11:14:01', '2025-05-12 11:14:01'),
(317, 1, 17, 167, '', 0, '2025-05-12 11:14:33', '2025-05-12 11:14:33'),
(318, 1, 17, 168, '', 0, '2025-05-12 11:14:33', '2025-05-12 11:14:33'),
(326, 1, 30, 218, '', 0, '2025-05-12 18:18:38', '2025-05-12 18:18:38'),
(328, 4, 123, 522, '', 0, '2025-05-12 18:54:19', '2025-05-12 18:54:19'),
(329, 4, 122, 518, '', 0, '2025-05-12 18:55:24', '2025-05-12 18:55:24'),
(331, 1, 148, 669, '', 0, '2025-05-13 16:03:10', '2025-05-13 16:03:10'),
(332, 1, 29, 659, '', 0, '2025-05-13 16:03:16', '2025-05-13 16:03:16'),
(333, 1, 142, 588, '', 0, '2025-05-13 16:03:23', '2025-05-13 16:03:23'),
(334, 1, 31, 693, '', 0, '2025-05-13 16:04:06', '2025-05-13 16:04:06'),
(335, 1, 151, 690, '', 0, '2025-05-14 07:49:32', '2025-05-14 07:49:32'),
(336, 1, 43, 267, '', 0, '2025-05-14 07:50:28', '2025-05-14 07:50:28'),
(337, 1, 34, 233, '', 0, '2025-05-14 07:50:38', '2025-05-14 07:50:38'),
(338, 1, 44, 269, '', 0, '2025-05-14 07:51:01', '2025-05-14 07:51:01'),
(339, 1, 33, 232, '', 0, '2025-05-14 07:51:07', '2025-05-14 07:51:07'),
(340, 1, 32, 227, '', 0, '2025-05-14 07:51:11', '2025-05-14 07:51:11'),
(341, 1, 37, 246, '', 0, '2025-05-14 15:51:09', '2025-05-14 15:51:09'),
(342, 1, 36, 244, '', 0, '2025-05-14 15:51:19', '2025-05-14 15:51:19'),
(343, 1, 35, 240, '', 0, '2025-05-14 15:51:32', '2025-05-14 15:51:32'),
(345, 4, 121, 515, '', 0, '2025-05-21 14:45:38', '2025-05-21 14:45:38'),
(346, 4, 119, 506, '', 0, '2025-05-21 14:46:10', '2025-05-21 14:46:10'),
(347, 1, 16, 162, '', 0, '2025-05-22 22:31:10', '2025-05-22 22:31:10'),
(348, 1, 147, 658, '', 0, '2025-05-22 22:31:51', '2025-05-22 22:31:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('2CXeUrpHIloQHBcBTyBKwqqDsM91xAhaBS9HbDKr', NULL, '46.17.174.173', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:98.0) Gecko/20100101 Firefox/98.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiemVpbmJORmlGak5YT3dEajB5ZndoUlY5S1ZCcDBuT3lZNEJxVlhRciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749364960),
('CmZZjjGbsgGe10xVXUubUY3x25ZnK0WXOkAcB4h8', NULL, '2a02:4780:b:b::2', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVHVibWNxcFJSZ1k5MjBDNTNYWmdwNHAyVGNTNThPNnkzWXllbUZQSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749347225),
('dLBLKOs3iBjAjLSRqwGo1TsAwBwBWchRIN4Yr16j', NULL, '2a02:4780:b:b::2', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVTRyT1k0NElWQlZIZ05sYnlTczRVVlJoN0N3N0tBSXBYVjdVM1NsRiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749284666),
('gGNXxMvzS9cp5lJxZEOhCE18KbZLMy9zOPUntkcI', 4, '2806:265:481:966a:3dc3:93a6:849b:e75f', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiN1N0TmNVQXhneUdwdWZHb29ZMDM2b1BESGdPemRETngwN3JlUXdiViI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2NDoiaHR0cHM6Ly9zYWxtb24tZmFsY29uLTcxNzMzNS5ob3N0aW5nZXJzaXRlLmNvbS9jb3Vyc2UvNS9jaGFwdGVycyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749305474),
('IU5AksTPFX1rPvAkvn9Iti4IiFllpVRw74KOKPoH', 4, '2806:265:481:966a:de7:67a8:7907:de8', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidHY1R2tDUnY0RTA1cGJMeDl4a0Z1bEQ2cEdraW9jMFhTdVd3MzhIOSI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo1NjoiaHR0cHM6Ly9zYWxtb24tZmFsY29uLTcxNzMzNS5ob3N0aW5nZXJzaXRlLmNvbS9jb3Vyc2UvMTEiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749477852),
('L8CF3yWcVvUO1kYrJrep9Er8MOO0Ldmu3FQ5tp0g', NULL, '2a02:4780:b:7::9', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieElpRXJDRXJFQTVyWjRycUFqZktEU0pWcG84a082UGlaZGt4ekQ5USI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749343320),
('lK5hq6zXB8wfY9AWS9IFXYGqVYkc0uuS5UhjFakP', NULL, '2a02:4780:b:7::9', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZFM2SmJNYUpnZ3h2RnpnNmI4eEsybHZ6MzIzMWNObndIQW9jb1l3OSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749523310),
('oVkk2Pia9tU4eV1UxnZ20SkO6kgI8LMR4W0cV4mP', 1, '187.168.113.236', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoieDYxV3JXalZleXFzWHpCUmtmb0FNeUFpNmpPYnNZbTM0YjJqZ3lSOCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2MToiaHR0cHM6Ly9zYWxtb24tZmFsY29uLTcxNzMzNS5ob3N0aW5nZXJzaXRlLmNvbS9wcm9ibGVtLXNldC82MSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749497606),
('oWFyQrhFOnI5rzxwZdlrAKQrYzNl35tUrO9MXcCK', NULL, '2a02:4780:b:7::9', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWk1xbzljY0NzdEcxQ3ZxQ1F6VGZ2ZEdNeXFzZUFRWEhYRFFzRDZqMyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749261316),
('phksBwNeEGlsd4ETTupgsWlpXIBXjAQjE6VccjLC', NULL, '2a02:4780:b:b::2', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMHlwSWtwRGFueXlORHBIWnJRSEMyMnpvSWpJOWlYdXVHTDlEV1RQRSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749516224),
('ShR4IzfxriL9CB51VTJcndebb73uEkV8RwP9minG', NULL, '2a02:4780:b:7::9', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNHVHdUU1N0RzRHFrMWlseEZ2MHg5eURXNWZ6WXh2UTdIU0RMR0JJViI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749428757),
('snoU0Bf23zIDTPv1zq2ACzGVNyQhqWtp0fw1nOtW', 4, '190.123.13.59', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiODM5c1JGMkZFYmpQU1pXZzU0QUlVRFZLNzc2S2pzMmNaaTVuNWZ2RCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0NjoiaHR0cHM6Ly9zYWxtb24tZmFsY29uLTcxNzMzNS5ob3N0aW5nZXJzaXRlLmNvbSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1749231169),
('z3IHlWyrNjjV1qnkSwfrZWN6JJbOOOyBjaJsbVDd', 1, '187.168.113.236', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQmoweFlXYjkwU3NQRjlKQ0l6OEVsdURadVdCalhCcDhMeFVEOFBNVCI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2NToiaHR0cHM6Ly9zYWxtb24tZmFsY29uLTcxNzMzNS5ob3N0aW5nZXJzaXRlLmNvbS9jaGFwdGVyLzEyL2xlc3NvbnMiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749237624),
('ZA6ggQnNPO5kzloHZa0dHRvTSew3yBIUiEiiWVtb', NULL, '2a02:4780:b:b::2', 'Go-http-client/2.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiclJLNUpGd1BIb3NITlRsRTFlbUQxRWVpTmdpdHpyaDZLYllFS1N3bSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDY6Imh0dHBzOi8vc2FsbW9uLWZhbGNvbi03MTczMzUuaG9zdGluZ2Vyc2l0ZS5jb20iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1749435429);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'John Farmer', 'futiaz@gmail.com', NULL, '$2y$12$g7VyTfTEksmqDqWk1Yv1w.A5SYI7OHibK4ZVLwP.Wi8tG/.IWlHNi', 'nb5GdOxtjj3VWtuldKNsaZddusLLlFfpcSCv9EbaHzT2DzemRafyAsxgkNjb', '2025-04-06 23:19:22', '2025-05-12 13:32:45'),
(2, 'John Beckwith Farmer', 'john.beckwith.farmer@gmail.com', NULL, '$2y$12$W5zwBMT0ywlsai2LXISGV.5jfDnUsyyRuoHKcZx2jPWecU8./ltmC', NULL, '2025-05-11 14:59:39', '2025-05-11 14:59:39'),
(3, 'Farmer', 'futiaz@yahoo.com', NULL, '$2y$12$INoPpZ584TmoEN71ztv3jeRmSTCxCuxqncPx3Exe.Mnnv1WM5P0/S', NULL, '2025-05-11 17:31:50', '2025-05-11 17:31:50'),
(4, 'Oscar', 'oscar441@hotmail.com', NULL, '$2y$12$px5rJh.JqB14St4ZFyyXnu1iYsrblM9AlPSpjC3nobT4OsKVv8OdC', 'eyA1l6Do1hzu46FDdKCjorSqI2ddVJNw5wtA74m93IaGIWF4iDgbZCnfmDKD', '2025-05-12 18:48:42', '2025-05-21 14:25:05');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `answer_sets`
--
ALTER TABLE `answer_sets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `courses_users`
--
ALTER TABLE `courses_users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `lessons`
--
ALTER TABLE `lessons`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `lesson_sets`
--
ALTER TABLE `lesson_sets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `open_answers_alpha`
--
ALTER TABLE `open_answers_alpha`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `open_answers_numeric`
--
ALTER TABLE `open_answers_numeric`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `problems`
--
ALTER TABLE `problems`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `problem_hints`
--
ALTER TABLE `problem_hints`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `problem_scores`
--
ALTER TABLE `problem_scores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `problem_types`
--
ALTER TABLE `problem_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `results`
--
ALTER TABLE `results`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `answer_sets`
--
ALTER TABLE `answer_sets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=820;

--
-- AUTO_INCREMENT de la tabla `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `courses_users`
--
ALTER TABLE `courses_users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `lessons`
--
ALTER TABLE `lessons`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `lesson_sets`
--
ALTER TABLE `lesson_sets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `open_answers_alpha`
--
ALTER TABLE `open_answers_alpha`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `open_answers_numeric`
--
ALTER TABLE `open_answers_numeric`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `problems`
--
ALTER TABLE `problems`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT de la tabla `problem_hints`
--
ALTER TABLE `problem_hints`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=192;

--
-- AUTO_INCREMENT de la tabla `problem_scores`
--
ALTER TABLE `problem_scores`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=294;

--
-- AUTO_INCREMENT de la tabla `problem_types`
--
ALTER TABLE `problem_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `results`
--
ALTER TABLE `results`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=349;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
