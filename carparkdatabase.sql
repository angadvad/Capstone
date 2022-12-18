CREATE DATABASE  IF NOT EXISTS `carparkdatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `carparkdatabase`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: carparkdatabase
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carpark`
--

DROP TABLE IF EXISTS `carpark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carpark` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `number_plate` varchar(255) DEFAULT NULL,
  `parking_space` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carpark`
--

LOCK TABLES `carpark` WRITE;
/*!40000 ALTER TABLE `carpark` DISABLE KEYS */;
INSERT INTO `carpark` VALUES (1,100,'ABC123','A1'),(2,3,'ABC450','A2'),(3,-1,'','A3'),(4,-1,'','A4'),(5,-1,'','B1'),(6,-1,'','C1'),(7,-1,'','C2'),(8,-1,'','C3'),(9,-1,'','C4'),(10,-1,'','D1'),(11,-1,'','D2'),(12,102,'XYZ999','D3'),(13,103,'DEF850','D4'),(14,-1,'','E1'),(15,-1,'','F1'),(16,-1,'','F2'),(17,104,'LOL222','F3'),(18,105,'CDX190','F4');
/*!40000 ALTER TABLE `carpark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `refresh_token` text,
  `number_plate` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Angad','one@gmail.com','$2b$10$2/FCcyDiCUeURwUyvcaB6updW7VLBTQlvhzpaUsz4XNX//DQ5AOp.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsIm5hbWUiOiJBbmdhZCIsImVtYWlsIjoib25lQGdtYWlsLmNvbSIsImlhdCI6MTY3MDgwMDExNiwiZXhwIjoxNjcwODg2NTE2fQ.s48gQC9p8v1Wihx2olDBBVPhmH0ciAZPsYAl2uSESCE',NULL),(4,'Bob Ross','bob@gmail.com','$2b$10$yJPrukujGd86T1Rf1nPMKusXEA6PajFzl3QI13O9at0TjrqJ.zYL.','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsIm5hbWUiOiJCb2IgUm9zcyIsImVtYWlsIjoiYm9iQGdtYWlsLmNvbSIsImlhdCI6MTY3MDcyOTQyMCwiZXhwIjoxNjcwODE1ODIwfQ.BPWm3uOADKuil7Hlz2lEG9osLBpiipU6FCC3f7ZfOzs',NULL),(8,'Bob','test@gmail.com','$2b$10$kkVU1L5PMa.HOKAKEo3c9.0L28A0xlQm/zkRmOWETzRNnzwFkzvja','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsIm5hbWUiOiJCb2IiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjcxMzYwMjEyLCJleHAiOjE2NzE0NDY2MTJ9.9VX_qIOJAxLAUdNyXJByTWl8Ejc-RGeANnuxanudD1I','VKL021'),(10,'admin','admin','$2b$10$AjdUXK3Xpe1oyGwgUZi6quTGStT6WR8Nk3ldUa4NdcrvP8zDMgRJ2','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluIiwiaWF0IjoxNjcxMzYwMzMwLCJleHAiOjE2NzE0NDY3MzB9.xPgBtgDm8ewWYy1SSdHEXZvh7RSp2a-B_7zR5DZ3e9k','EYE000');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-18 23:47:45
