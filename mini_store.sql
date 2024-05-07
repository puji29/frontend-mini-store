-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 06, 2024 at 06:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mini_store`
--

-- --------------------------------------------------------

--
-- Table structure for table `Cart`
--

CREATE TABLE `Cart` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Cart`
--

INSERT INTO `Cart` (`id`, `quantity`, `amount`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(42, 3, 54000, 23, 4, '2024-05-03 13:51:21', '0000-00-00 00:00:00'),
(44, 1, 28000, 23, 3, '2024-05-03 13:54:23', '0000-00-00 00:00:00'),
(49, 1, 4000, 23, 2, '2024-05-03 14:03:32', '0000-00-00 00:00:00'),
(50, 1, 10500, 23, 8, '2024-05-03 14:03:37', '0000-00-00 00:00:00'),
(51, 3, 31500, 23, 7, '2024-05-03 14:03:41', '0000-00-00 00:00:00'),
(52, 1, 8000, 23, 5, '2024-05-03 14:03:59', '0000-00-00 00:00:00'),
(53, 1, 8000, 23, 5, '2024-05-04 04:47:01', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`id`, `name`, `image`, `url`, `created_at`, `updated_at`) VALUES
(3, 'Milk & Juice', '5dc2d643f22b174d48b9e62f909767bc.png', 'http://localhost:3002/images/5dc2d643f22b174d48b9e62f909767bc.png', '2024-04-26 16:25:34', '0000-00-00 00:00:00'),
(4, 'Fruits', 'e74e3c676ca5d16065f95a0cc5cdfade.png', 'http://localhost:3002/images/e74e3c676ca5d16065f95a0cc5cdfade.png', '2024-04-27 06:25:19', '0000-00-00 00:00:00'),
(5, 'Bakery', '3068d46ac9108fe3b0564d74e938a4a9.png', 'http://localhost:3002/images/3068d46ac9108fe3b0564d74e938a4a9.png', '2024-04-29 14:36:00', '0000-00-00 00:00:00'),
(6, 'Chicken & Egg', 'f51850e1015f30114e534929da9fce0b.png', 'http://localhost:3002/images/f51850e1015f30114e534929da9fce0b.png', '2024-04-29 14:36:34', '0000-00-00 00:00:00'),
(7, 'Personal Care', '4353474e72f1c92cb36f36452fdbdf9e.png', 'http://localhost:3002/images/4353474e72f1c92cb36f36452fdbdf9e.png', '2024-04-29 14:36:59', '0000-00-00 00:00:00'),
(8, 'Vegetables', '737a3a4b2c5fec14603a895c5af48b46.png', 'http://localhost:3002/images/737a3a4b2c5fec14603a895c5af48b46.png', '2024-04-29 14:37:35', '0000-00-00 00:00:00'),
(9, 'Grains', '91d7298164fe3d9e17d9b0d1b49ad4a0.png', 'http://localhost:3002/images/91d7298164fe3d9e17d9b0d1b49ad4a0.png', '2024-04-29 14:37:55', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Order`
--

CREATE TABLE `Order` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `phone` varchar(25) NOT NULL,
  `zip` varchar(25) NOT NULL,
  `address` text NOT NULL,
  `total_order_amount` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `order_item_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_item_list`
--

CREATE TABLE `order_item_list` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Proudct`
--

CREATE TABLE `Proudct` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `sellingPrice` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Proudct`
--

INSERT INTO `Proudct` (`id`, `name`, `description`, `price`, `sellingPrice`, `stock`, `image`, `url`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'Product 1', 'ini product', 5000, 4000, 4, 'aa439ab9a6acad2eb507c87383d809cf.jpg', 'http://localhost:3002/images/aa439ab9a6acad2eb507c87383d809cf.jpg', 3, '2024-04-27 08:13:33', '0000-00-00 00:00:00'),
(2, 'Product 2', 'ini product 2', 5000, 4000, 4, 'aa439ab9a6acad2eb507c87383d809cf.jpg', 'http://localhost:3002/images/aa439ab9a6acad2eb507c87383d809cf.jpg', 4, '2024-04-27 10:07:27', '0000-00-00 00:00:00'),
(3, 'Chicken', 'Chicken', 30000, 28000, 10, '646233d094d2d70768fb7365ecd3ac14.jpg', 'http://localhost:3002/images/646233d094d2d70768fb7365ecd3ac14.jpg', 6, '2024-04-30 15:13:27', '0000-00-00 00:00:00'),
(4, 'Broccoli', 'Brocoli', 20000, 18000, 8, '791d2d2e2f8bac18de023e88d3a212f0.jpg', 'http://localhost:3002/images/791d2d2e2f8bac18de023e88d3a212f0.jpg', 8, '2024-04-30 15:15:37', '0000-00-00 00:00:00'),
(5, 'Bread', 'Bread', 10000, 8000, 5, '9a66085aa6463098b538a75492421a69.jpg', 'http://localhost:3002/images/9a66085aa6463098b538a75492421a69.jpg', 5, '2024-04-30 15:17:27', '0000-00-00 00:00:00'),
(6, 'Body Lotion', 'Body Lotion', 15000, 14000, 3, '22e6b745382c9d488cadc01b340f701e.jpg', 'http://localhost:3002/images/22e6b745382c9d488cadc01b340f701e.jpg', 7, '2024-04-30 15:18:27', '0000-00-00 00:00:00'),
(7, 'Milk', 'Milk', 10000, 10500, 20, 'bcc52df451f617f21282facd143f6ef4.jpg', 'http://localhost:3002/images/bcc52df451f617f21282facd143f6ef4.jpg', 3, '2024-04-30 15:19:27', '0000-00-00 00:00:00'),
(8, 'Wheat', 'Wheat', 11000, 10500, 22, 'b03a310e6a7858f7c8d84a8ccee88435.jpg', 'http://localhost:3002/images/b03a310e6a7858f7c8d84a8ccee88435.jpg', 9, '2024-04-30 15:20:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Slider`
--

CREATE TABLE `Slider` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` enum('banner','home') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Slider`
--

INSERT INTO `Slider` (`id`, `name`, `image`, `url`, `type`, `created_at`, `updated_at`) VALUES
(5, 'slider 1', '4eca264d2611f5e2ba781a810e751ab7.jpg', 'http://localhost:3002/images/4eca264d2611f5e2ba781a810e751ab7.jpg', 'banner', '2024-04-30 11:29:17', '0000-00-00 00:00:00'),
(6, 'slider 2', '2730b239971e44ba899377f6bae7cbc4.jpg', 'http://localhost:3002/images/2730b239971e44ba899377f6bae7cbc4.jpg', 'banner', '2024-04-30 11:39:59', '0000-00-00 00:00:00'),
(7, 'slider 3', '503f016bdf4b08c750def84b902b7b0d.jpg', 'http://localhost:3002/images/503f016bdf4b08c750def84b902b7b0d.jpg', 'home', '2024-04-30 11:40:25', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `username`, `email`, `password`, `created_at`, `updated_at`) VALUES
(21, 'adi', 'adiw@1gmail.com', '$2b$10$S3msrskS34z/xteOmMIf1Og1LKvzEc.Sxu1gO7vDI4w3GE9pXSq9G', '2024-04-29 11:56:08', '0000-00-00 00:00:00'),
(23, 'puji laksono', 'adiw@1gmail.com', '$2b$10$p4KRVB8ZrlDsXalYFpnaBeUFOqmOuOcwxgxt59TVs875O/AHpaxHO', '2024-04-29 11:57:36', '0000-00-00 00:00:00'),
(24, 'puji laksonologin', 'adiw@1gmail.com', '$2b$10$jYj4U0d0v8WNxFjRv7wBjeIxr36NuNQd39Ckn3m8bV6aDG8uo45HO', '2024-04-29 13:23:44', '0000-00-00 00:00:00'),
(25, 'test', 'test@puji.com', '$2b$10$VyK7Jcu40TzEO56UK0r3JuBYjBNAsA//xb3V5NtvxXLU.Jpcrnxp2', '2024-05-01 16:02:01', '0000-00-00 00:00:00'),
(29, 'adi w1', 'adiw1@gmail.com', '$2b$10$ghbWdynRTibHmcXU0KAqauQW1/j1vXTk3j6x2wAyfsSGUeADxzKve', '2024-05-02 05:14:23', '0000-00-00 00:00:00'),
(30, 'adi w2', 'adiw2@gmail.com', '$2b$10$DkCcA1ajrTOBtQLDy2KxKuBIf235aC/FKXYwGrXCLkUaoJgszQ7VC', '2024-05-02 05:15:45', '0000-00-00 00:00:00'),
(32, 'adi w3', 'adiw3@gmail.com', '$2b$10$M/xuGlkh/l.2t/1R80RcbOqMdqzeAzbvzMTg2VyNs6D.QnX7YNWAe', '2024-05-02 05:20:17', '0000-00-00 00:00:00'),
(33, 'aditya', 'aditya@gmail.com', '$2b$10$ZhPVwhSY1P9dKW4kUU9WBugnVmHA/0c4Gm7TNV0hf5csu5YbYF9EC', '2024-05-02 05:21:30', '0000-00-00 00:00:00'),
(36, 'puji2', 'puji2@gmail.com', '$2b$10$ljeFumE0jDv1vW.qzqugueRsCG7B0/nRLcbdfgTW6byZK58x4GnWq', '2024-05-02 05:25:30', '0000-00-00 00:00:00'),
(37, 'puji4', 'puji4@gmail.com', '$2b$10$K0pcvlgqI09gRybhitJa6Odw.M1f5mpRqZviaMbc3P7oeFyYtbywi', '2024-05-02 05:27:56', '0000-00-00 00:00:00'),
(39, 'aq', 'aq@gmail.com', '$2b$10$5v3n6/IhhnKjY/HxwEM8AukbhyO2H575GK8rYeaifayUDUDgdv/GW', '2024-05-02 05:43:04', '0000-00-00 00:00:00'),
(41, 'aq1', 'aq1@gmail.com', '$2b$10$WnIkIJSZ6/Hw2dHrZotImOn4k1em3WGvKpilIQWyGMi8igy2CF0YO', '2024-05-02 05:44:36', '0000-00-00 00:00:00'),
(42, 'septi', 'septi@gmail.com', '$2b$10$TnhLGRKrSbOXmqqOaGxcueeyZfivsik7NpnhOQNInxN8LBe7gYTVO', '2024-05-02 05:46:41', '0000-00-00 00:00:00'),
(43, 'sena', 'sena@gmail.com', '$2b$10$Hysn4qh33NYVQyKx8sIOeu0W1DK3Z.uVGSJdEBpUCi6jbkb7JgMqu', '2024-05-02 05:47:19', '0000-00-00 00:00:00'),
(45, 'aq11', 'aq1@gmail.com', '$2b$10$vmAiHfiirkedKRGTOucsguu0ZbSIZvKgDNts0eFY4vvZJU9Z8Rn9u', '2024-05-02 06:35:07', '0000-00-00 00:00:00'),
(46, 'aq111', 'aq1@gmail.com', '$2b$10$WhtfeaW0DwIa/.woFQ3D8.alxWaC0nK/b.14ZRhblIW0xTbv9F7nS', '2024-05-02 06:36:43', '0000-00-00 00:00:00'),
(48, 'aq1111', 'aq1@gmail.com', '$2b$10$LnzqTchP/a9opNWdaRKPd.D2bPnEnbLJjQWggIJh2C2QXK/BpYY.W', '2024-05-02 06:38:13', '0000-00-00 00:00:00'),
(49, 'adi w100', 'adiw@gmail.com', '$2b$10$4SjjXOA2.qBypy4GRrK8cOdKnVTh9NBVk2D1ZtTjJiiAS14AgpG0O', '2024-05-02 10:21:07', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Cart`
--
ALTER TABLE `Cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Cart_ibfk_1` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Order`
--
ALTER TABLE `Order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_item_id` (`order_item_id`);

--
-- Indexes for table `order_item_list`
--
ALTER TABLE `order_item_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `Proudct`
--
ALTER TABLE `Proudct`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `Slider`
--
ALTER TABLE `Slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Cart`
--
ALTER TABLE `Cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `Category`
--
ALTER TABLE `Category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Order`
--
ALTER TABLE `Order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_item_list`
--
ALTER TABLE `order_item_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Proudct`
--
ALTER TABLE `Proudct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Slider`
--
ALTER TABLE `Slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Cart`
--
ALTER TABLE `Cart`
  ADD CONSTRAINT `Cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `Proudct` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Order`
--
ALTER TABLE `Order`
  ADD CONSTRAINT `Order_ibfk_1` FOREIGN KEY (`order_item_id`) REFERENCES `order_item_list` (`id`);

--
-- Constraints for table `order_item_list`
--
ALTER TABLE `order_item_list`
  ADD CONSTRAINT `order_item_list_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `Proudct` (`id`);

--
-- Constraints for table `Proudct`
--
ALTER TABLE `Proudct`
  ADD CONSTRAINT `Proudct_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
