-- MariaDB dump 10.19  Distrib 10.4.18-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: frameincam
-- ------------------------------------------------------
-- Server version	10.4.18-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aspnetroles`
--

DROP TABLE IF EXISTS `aspnetroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetroles` (
  `Id` varchar(128) NOT NULL,
  `Name` varchar(256) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetroles`
--

LOCK TABLES `aspnetroles` WRITE;
/*!40000 ALTER TABLE `aspnetroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserclaims`
--

DROP TABLE IF EXISTS `aspnetuserclaims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetuserclaims` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` varchar(128) NOT NULL,
  `ClaimType` longtext DEFAULT NULL,
  `ClaimValue` longtext DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserclaims`
--

LOCK TABLES `aspnetuserclaims` WRITE;
/*!40000 ALTER TABLE `aspnetuserclaims` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserclaims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserlogins`
--

DROP TABLE IF EXISTS `aspnetuserlogins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetuserlogins` (
  `LoginProvider` varchar(128) NOT NULL,
  `ProviderKey` varchar(128) NOT NULL,
  `UserId` varchar(128) NOT NULL,
  PRIMARY KEY (`LoginProvider`,`ProviderKey`,`UserId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserlogins`
--

LOCK TABLES `aspnetuserlogins` WRITE;
/*!40000 ALTER TABLE `aspnetuserlogins` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserlogins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetuserroles`
--

DROP TABLE IF EXISTS `aspnetuserroles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetuserroles` (
  `UserId` varchar(128) NOT NULL,
  `RoleId` varchar(128) NOT NULL,
  PRIMARY KEY (`UserId`,`RoleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetuserroles`
--

LOCK TABLES `aspnetuserroles` WRITE;
/*!40000 ALTER TABLE `aspnetuserroles` DISABLE KEYS */;
/*!40000 ALTER TABLE `aspnetuserroles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aspnetusers`
--

DROP TABLE IF EXISTS `aspnetusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aspnetusers` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(256) DEFAULT NULL,
  `EmailConfirmed` tinyint(4) NOT NULL,
  `PasswordHash` longtext DEFAULT NULL,
  `SecurityStamp` longtext DEFAULT NULL,
  `PhoneNumber` longtext DEFAULT NULL,
  `PhoneNumberConfirmed` tinyint(4) NOT NULL,
  `TwoFactorEnabled` tinyint(4) NOT NULL,
  `LockoutEnd` datetime(3) DEFAULT NULL,
  `LockoutEnabled` tinyint(4) NOT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  `UserName` varchar(256) NOT NULL,
  `ConcurrencyStamp` text DEFAULT NULL,
  `NormalizedEmail` varchar(256) DEFAULT NULL,
  `NormalizedUserName` varchar(256) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `Isactive` tinyint(4) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aspnetusers`
--

LOCK TABLES `aspnetusers` WRITE;
/*!40000 ALTER TABLE `aspnetusers` DISABLE KEYS */;
INSERT INTO `aspnetusers` VALUES (1,'suriyaprakash@mazeworkssolutions.com',1,'AQAAAAEAACcQAAAAEAh1GOOLJHIwaRiw6urjvrj5kIgLMVEsnWR9dMLS/t25vOJciiJ3G6EDmZcOBaJkDw==','MC3Q3L6GVVXQCUKEDNMN74PNTORTIMT6','8056322836',0,0,NULL,1,0,'suriyaprakash@mazeworkssolutions.com','d370aa3d-075f-4347-a14d-767f23aa3079','SURIYAPRAKASH@MAZEWORKSSOLUTIONS.COM','SURIYAPRAKASH@MAZEWORKSSOLUTIONS.COM','','2021-06-11 17:20:37',NULL,NULL,1,'Suriya Flims',NULL),(2,'pksteja@gmail.com',1,'AQAAAAEAACcQAAAAELYuvmSS0dAChcaR7jMFuoe2TwemNm1MZAnZiwuDIGgFSt79LQDDxeZrZLQuPcKAfg==','KBVYYII4M26PHJ4J5N5HI4VUCY72BMCD','9840444991',0,0,NULL,1,0,'pksteja@gmail.com','710b3a69-4236-4906-a850-9a53c3d38fe5','PKSTEJA@GMAIL.COM','PKSTEJA@GMAIL.COM','','2021-06-11 17:26:03',NULL,NULL,1,'Surya Images',NULL),(3,'suji2025@gmail.com',1,'AQAAAAEAACcQAAAAEPNVq8FuhONaNwbNJRmJyfzmC51D1HijVGlUbWDAhuWgEdWWi//a4wNUAh74BX462A==','Y5XV5Z3DZVDGRAQTHSTX6G7QHXZSWCOS','9387512474',0,0,NULL,1,0,'suji2025@gmail.com','0974c6df-4bd4-49ff-ab04-d8d7fb71dc2b','SUJI2025@GMAIL.COM','SUJI2025@GMAIL.COM','','2021-06-12 04:24:40',NULL,NULL,1,'Sujithkarad',NULL),(4,'steja2606@gmail.com',1,'AQAAAAEAACcQAAAAEIrQal9n0EqfIX+PDz5SnVX1XAawdKsfmT/Y7+YmVZuRoW5Gzc/CJqbR1rEtTaXl+w==','PVMV2R5EE3LCIZZRBAKCS6YLBLOB3CWC','8190955559',0,0,NULL,1,0,'steja2606@gmail.com','de640015-4bcd-4223-9a81-a1a1d58bbe65','STEJA2606@GMAIL.COM','STEJA2606@GMAIL.COM','','2021-07-08 07:35:51',NULL,NULL,1,'Surya',NULL),(5,'shahinck@gmail.com',1,'AQAAAAEAACcQAAAAEOmRmjx4qgZmBZshj2jUg3+cO1FjsQXus71a+CTJogwilNkTvXe27UmNSGS/ncwDRg==','VKMPPI7MN6UGZHLPG7S6GQ42FQXRTEK5','9447157707',0,0,NULL,1,0,'shahinck@gmail.com','a171a534-8e5f-4052-8f0f-9158f96fd832','SHAHINCK@GMAIL.COM','SHAHINCK@GMAIL.COM','','2021-07-08 07:45:39',NULL,NULL,1,'shahin',NULL),(6,'sivasuriyaprakash@gmail.com',1,'AQAAAAEAACcQAAAAEIv/6R/b2rbYZUnj3QEHO5gpIX66PL7GLCxo6SR0ZOOoEVxEksmK0JNmCN0BK5ESEA==','OMLLMF4NYJ2KN43OQFMLLUQW5ACKMN4B','8056322836',0,0,NULL,1,0,'sivasuriyaprakash@gmail.com','ca7a7774-7e61-4959-a1c7-3bd462970413','SIVASURIYAPRAKASH@GMAIL.COM','SIVASURIYAPRAKASH@GMAIL.COM','','2021-07-15 22:33:07',NULL,NULL,1,'Suriya RJPM',NULL),(7,'nabeel7666@gmail.com',1,'AQAAAAEAACcQAAAAEIsKwXVTDLHhJBddRrQcdapMz+VI/pbIVX6c2pq5ys1Z5EoLjiKwYpvru9KfYABQUQ==','AML3YOCINUNMPW243STXLMJNBZABBHWX','9048766653',0,0,NULL,1,0,'nabeel7666@gmail.com','862534ec-741a-4d54-842c-f44b98df422e','NABEEL7666@GMAIL.COM','NABEEL7666@GMAIL.COM','','2021-07-19 04:39:11',NULL,NULL,1,'Nabeelparappanangadi',NULL),(8,'dileepkumar@gamil.com',0,'AQAAAAEAACcQAAAAENFyCQHIXCWx+G5pah66E1AIVux63L9Bld+hr0tRClqHtb4EhdtsHgjdwpS9YiQzcw==','LH23XI2GC7QUCHYSHVHJ2XRSEW4BOB3H','9747720082',0,0,NULL,1,0,'dileepkumar@gamil.com','3a1a0a82-a3f1-43fa-8bb3-3665fb7bf9f9','DILEEPKUMAR@GAMIL.COM','DILEEPKUMAR@GAMIL.COM','','2021-07-19 05:14:35',NULL,NULL,1,'Dileep kumar vk',NULL),(9,'rageshphotographycalicut@gmail.com',1,'AQAAAAEAACcQAAAAEFTTwYd+bbc0uNraPXh0i6ES/N4Yh9vrKImMBrPZwZnTVSB2qER9RlBjJRuwy9+wDA==','CJOPRPM7TAKEJ6DQN3LMCU3NJH3IHUJM','9605848275',0,0,NULL,1,0,'rageshphotographycalicut@gmail.com','b40b182e-9564-4d7c-8c32-93a1d6d282b8','RAGESHPHOTOGRAPHYCALICUT@GMAIL.COM','RAGESHPHOTOGRAPHYCALICUT@GMAIL.COM','','2021-07-19 05:50:12',NULL,NULL,1,'Ragesh M K',NULL),(10,'ajicolonia1@gmail.com',1,'AQAAAAEAACcQAAAAEO0lEuey1odQ5vOu5G2DgXbIsGrLhdvqtbgrtUNgyccRNIs/G7SKDPMA+yDJlb+C+w==','QYRRVZ2JCSC2JSCQNZURWFFCRSD4HZCO','9447354654',0,0,NULL,1,0,'ajicolonia1@gmail.com','64b87793-e927-412f-841a-72f28cdb415f','AJICOLONIA1@GMAIL.COM','AJICOLONIA1@GMAIL.COM','','2021-07-21 07:55:06',NULL,NULL,1,'Ajicolonia',NULL),(11,'sajiweddingcompany@gmail.com',0,'AQAAAAEAACcQAAAAEGFmOt5Dl+/tDgyqqApfEvM8Gwz7E1txdsnI8+vH6+iN6lzkccAee0BNk5IrHUThxA==','R3SDBWC4YNHP6SISP7BLHOCQDGSGRPDB','9744436190',0,0,NULL,1,0,'sajiweddingcompany@gmail.com','d51de0e4-977c-432c-8f3f-26eab0182012','SAJIWEDDINGCOMPANY@GMAIL.COM','SAJIWEDDINGCOMPANY@GMAIL.COM','','2021-07-23 08:07:14',NULL,NULL,1,'SAJI Photography',NULL),(12,'muhammedyashif@gmail.com',1,'AQAAAAEAACcQAAAAEHwLKCvl7a/Yw7NC1z72mqZ6EiMPowafrm8fNAk9KFJzJMRQOdotnGERZD4BEzZTtQ==','2KGNGGVWOMOLQYH5QHXSI3WT5Y5TS44Y','8089064070',0,0,NULL,1,0,'muhammedyashif@gmail.com','6ac9cb6c-ade0-4452-9d57-e4c1ee213c9e','MUHAMMEDYASHIF@GMAIL.COM','MUHAMMEDYASHIF@GMAIL.COM','','2021-07-23 12:51:51',NULL,NULL,1,'Muhammed yashif c v',NULL);
/*!40000 ALTER TABLE `aspnetusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config_role`
--

DROP TABLE IF EXISTS `config_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config_role` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Isactive` smallint(6) NOT NULL DEFAULT 1,
  `NormalizedName` varchar(250) DEFAULT NULL,
  `ConcurrencyStamp` varchar(250) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_role`
--

LOCK TABLES `config_role` WRITE;
/*!40000 ALTER TABLE `config_role` DISABLE KEYS */;
INSERT INTO `config_role` VALUES (1,'Vendor','',1,NULL,NULL,NULL,'2021-01-23 07:11:59',NULL,NULL),(2,'Customer','',1,NULL,NULL,NULL,'2021-02-09 09:56:50',NULL,NULL),(3,'SecondShooter','',1,NULL,NULL,NULL,'2021-04-12 13:10:50',NULL,NULL);
/*!40000 ALTER TABLE `config_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config_user`
--

DROP TABLE IF EXISTS `config_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Email` varchar(150) NOT NULL,
  `Password` varchar(100) NOT NULL,
  `Isactive` smallint(6) NOT NULL DEFAULT 1,
  `LockoutEnd` timestamp NULL DEFAULT NULL,
  `TwoFactorEnabled` smallint(6) DEFAULT 0,
  `PhoneNumberConfirmed` smallint(6) DEFAULT 0,
  `PhoneNumber` varchar(150) DEFAULT NULL,
  `ConcurrencyStamp` varchar(250) DEFAULT NULL,
  `SecurityStamp` varchar(250) DEFAULT NULL,
  `PasswordHash` varchar(250) DEFAULT NULL,
  `EmailConfirmed` smallint(6) DEFAULT 0,
  `NormalizedEmail` varchar(150) DEFAULT NULL,
  `NormalizedUserName` varchar(250) DEFAULT NULL,
  `UserName` varchar(250) DEFAULT NULL,
  `LockoutEnabled` smallint(6) DEFAULT 0,
  `AccessFailedCount` int(11) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_user`
--

LOCK TABLES `config_user` WRITE;
/*!40000 ALTER TABLE `config_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `config_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `config_user_roles`
--

DROP TABLE IF EXISTS `config_user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `config_user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `config_user_roles`
--

LOCK TABLES `config_user_roles` WRITE;
/*!40000 ALTER TABLE `config_user_roles` DISABLE KEYS */;
INSERT INTO `config_user_roles` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,2),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1);
/*!40000 ALTER TABLE `config_user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_customer`
--

DROP TABLE IF EXISTS `master_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `email` varchar(300) CHARACTER SET utf8 NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `alternate_mobile` varchar(15) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `address_line_1` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `address_line_2` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `city_geo_id` int(11) DEFAULT NULL,
  `city` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `state_geo_id` int(11) DEFAULT NULL,
  `state` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_customer`
--

LOCK TABLES `master_customer` WRITE;
/*!40000 ALTER TABLE `master_customer` DISABLE KEYS */;
INSERT INTO `master_customer` VALUES (1,0,'Suriya RJPM','sivasuriyaprakash@gmail.com','8056322836',NULL,NULL,NULL,NULL,0,NULL,0,NULL,NULL,'2021-07-15 22:33:08',NULL,NULL,0);
/*!40000 ALTER TABLE `master_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer`
--

DROP TABLE IF EXISTS `master_freelancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `description` text DEFAULT NULL,
  `payment_terms` text DEFAULT NULL,
  `additional_cost` text DEFAULT NULL,
  `experience_lov_id` int(11) DEFAULT NULL,
  `site_url` varchar(250) DEFAULT NULL,
  `fb_url` varchar(250) DEFAULT NULL,
  `instagram_url` varchar(250) DEFAULT NULL,
  `youtube_url` varchar(250) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  `identifier` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer`
--

LOCK TABLES `master_freelancer` WRITE;
/*!40000 ALTER TABLE `master_freelancer` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_address`
--

DROP TABLE IF EXISTS `master_freelancer_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(11) NOT NULL,
  `pincode` varchar(50) NOT NULL,
  `address_line_1` varchar(250) DEFAULT NULL,
  `address_line_2` varchar(250) DEFAULT NULL,
  `landmark` varchar(200) DEFAULT NULL,
  `city_geo_id` int(11) DEFAULT NULL,
  `state_geo_id` int(11) DEFAULT NULL,
  `isprimary` smallint(6) DEFAULT 1,
  `isactive` smallint(6) DEFAULT 1,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_address`
--

LOCK TABLES `master_freelancer_address` WRITE;
/*!40000 ALTER TABLE `master_freelancer_address` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_album`
--

DROP TABLE IF EXISTS `master_freelancer_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_title` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `album_note` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `album_location` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_album`
--

LOCK TABLES `master_freelancer_album` WRITE;
/*!40000 ALTER TABLE `master_freelancer_album` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_album_files`
--

DROP TABLE IF EXISTS `master_freelancer_album_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_album_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `freelancer_file_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_album_files`
--

LOCK TABLES `master_freelancer_album_files` WRITE;
/*!40000 ALTER TABLE `master_freelancer_album_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer_album_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_files`
--

DROP TABLE IF EXISTS `master_freelancer_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `content_length` bigint(20) DEFAULT NULL,
  `content_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `freelancer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_files`
--

LOCK TABLES `master_freelancer_files` WRITE;
/*!40000 ALTER TABLE `master_freelancer_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_package`
--

DROP TABLE IF EXISTS `master_freelancer_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(11) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price_per_day` decimal(18,2) NOT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_package`
--

LOCK TABLES `master_freelancer_package` WRITE;
/*!40000 ALTER TABLE `master_freelancer_package` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_subscriptions`
--

DROP TABLE IF EXISTS `master_freelancer_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(11) NOT NULL,
  `subscription_id` int(11) NOT NULL,
  `valid_from` datetime NOT NULL,
  `valid_till` datetime DEFAULT NULL,
  `payment_id` int(10) unsigned DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `total_projects` int(10) unsigned DEFAULT NULL,
  `remaining_projects` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_subscriptions`
--

LOCK TABLES `master_freelancer_subscriptions` WRITE;
/*!40000 ALTER TABLE `master_freelancer_subscriptions` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_freelancer_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_freelancer_type`
--

DROP TABLE IF EXISTS `master_freelancer_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_freelancer_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_freelancer_type`
--

LOCK TABLES `master_freelancer_type` WRITE;
/*!40000 ALTER TABLE `master_freelancer_type` DISABLE KEYS */;
INSERT INTO `master_freelancer_type` VALUES (1,'Photographers',1),(2,'Cinema/Video',1),(3,'Pre wedding shoot',1);
/*!40000 ALTER TABLE `master_freelancer_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_geo`
--

DROP TABLE IF EXISTS `master_geo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_geo` (
  `Geo_Code` bigint(20) DEFAULT NULL,
  `Geo_Name` varchar(250) DEFAULT NULL,
  `Geo_Head` int(11) DEFAULT NULL,
  `Geo_Level` int(11) DEFAULT NULL,
  `Geo_type` int(11) DEFAULT NULL,
  `Geo_TinNo` tinyint(4) DEFAULT NULL,
  `Geo_StateCode` varchar(10) DEFAULT NULL,
  `Geo_Latitude` decimal(18,10) DEFAULT NULL,
  `Geo_Longitude` decimal(18,10) DEFAULT NULL,
  `Geo_Isactive` tinyint(4) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1089 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_geo`
--

LOCK TABLES `master_geo` WRITE;
/*!40000 ALTER TABLE `master_geo` DISABLE KEYS */;
INSERT INTO `master_geo` VALUES (1,'India',0,1,0,0,'',NULL,NULL,1,1),(2,'Jammu and Kashmir',1,2,0,1,'JK',NULL,NULL,1,2),(3,'Himachal Pradesh',1,2,0,2,'HP',NULL,NULL,1,3),(4,'Punjab',1,2,0,3,'PB',NULL,NULL,1,4),(5,'Chandigarh',1,2,0,4,'CH',NULL,NULL,1,5),(6,'Uttarakhand',1,2,0,5,'UK',NULL,NULL,1,6),(7,'Haryana',1,2,0,6,'HR',NULL,NULL,1,7),(8,'Delhi',1,2,0,7,'DL',NULL,NULL,1,8),(9,'Rajasthan',1,2,0,8,'RJ',NULL,NULL,1,9),(10,'Uttar Pradesh',1,2,0,9,'UP',NULL,NULL,1,10),(11,'Bihar',1,2,0,10,'BR',NULL,NULL,1,11),(12,'Sikkim',1,2,0,11,'SK',NULL,NULL,1,12),(13,'Arunachal Pradesh',1,2,0,12,'AR',NULL,NULL,1,13),(14,'Nagaland',1,2,0,13,'NL',NULL,NULL,1,14),(15,'Manipur',1,2,0,14,'MN',NULL,NULL,1,15),(16,'Mizoram',1,2,0,15,'MZ',NULL,NULL,1,16),(17,'Tripura',1,2,0,16,'TR',NULL,NULL,1,17),(18,'Meghalaya',1,2,0,17,'ML',NULL,NULL,1,18),(19,'Assam',1,2,0,18,'AS',NULL,NULL,1,19),(20,'West Bengal',1,2,0,19,'WB',NULL,NULL,1,20),(21,'Jharkhand',1,2,0,20,'JH',NULL,NULL,1,21),(22,'Odisha',1,2,0,21,'OD',NULL,NULL,1,22),(23,'Chattisgarh',1,2,0,22,'CG',NULL,NULL,1,23),(24,'Madhya Pradesh',1,2,0,23,'MP',NULL,NULL,1,24),(25,'Gujarat',1,2,0,24,'GJ',NULL,NULL,1,25),(26,'Daman and Diu',1,2,0,25,'DD',NULL,NULL,1,26),(27,'Dadra and Nagar Haveli',1,2,0,26,'DN',NULL,NULL,1,27),(28,'Maharashtra',1,2,0,27,'MH',NULL,NULL,1,28),(29,'Karnataka',1,2,0,29,'KA',NULL,NULL,1,29),(30,'Goa',1,2,0,30,'GA',NULL,NULL,1,30),(31,'Lakshadweep Islands',1,2,0,31,'LD',NULL,NULL,1,31),(32,'Kerala',1,2,0,32,'KL',NULL,NULL,1,32),(33,'Tamil Nadu',1,2,0,33,'TN',NULL,NULL,1,33),(34,'Pondicherry',1,2,0,34,'PY',NULL,NULL,1,34),(35,'Andaman and Nicobar Islands',1,2,0,35,'AN',NULL,NULL,1,35),(36,'Telangana',1,2,0,36,'TS',NULL,NULL,1,36),(37,'Andhra Pradesh',1,2,0,37,'AD',NULL,NULL,1,37),(38,'Ladakh',1,2,0,38,'LA',NULL,NULL,1,38),(39,'Other Territory',1,2,0,97,'OT',NULL,NULL,1,39),(40,'Ariyalur',33,3,0,0,' ',NULL,NULL,1,40),(41,'Chengalpet',33,3,0,0,' ',NULL,NULL,1,41),(42,'Chennai',33,3,0,0,' ',NULL,NULL,1,42),(43,'Coimbatore',33,3,0,0,' ',NULL,NULL,1,43),(44,'Cuddalore',33,3,0,0,' ',NULL,NULL,1,44),(45,'Dharmapuri',33,3,0,0,' ',NULL,NULL,1,45),(46,'Dindigul',33,3,0,0,' ',NULL,NULL,1,46),(47,'Erode',33,3,0,0,' ',NULL,NULL,1,47),(48,'Kallakurichi',33,3,0,0,' ',NULL,NULL,1,48),(49,'Kancheepuram',33,3,0,0,' ',NULL,NULL,1,49),(50,'Karur',33,3,0,0,' ',NULL,NULL,1,50),(51,'Krishnagiri',33,3,0,0,' ',NULL,NULL,1,51),(52,'Madurai',33,3,0,0,' ',NULL,NULL,1,52),(53,'Nagapattinam',33,3,0,0,' ',NULL,NULL,1,53),(54,'Kanyakumari',33,3,0,0,' ',NULL,NULL,1,54),(55,'Namakkal',33,3,0,0,' ',NULL,NULL,1,55),(56,'Perambalur',33,3,0,0,' ',NULL,NULL,1,56),(57,'Pudukottai',33,3,0,0,' ',NULL,NULL,1,57),(58,'Ramanathapuram',33,3,0,0,' ',NULL,NULL,1,58),(59,'Ranipet',33,3,0,0,' ',NULL,NULL,1,59),(60,'Salem',33,3,0,0,' ',NULL,NULL,1,60),(61,'Sivagangai',33,3,0,0,' ',NULL,NULL,1,61),(62,'Tenkasi',33,3,0,0,' ',NULL,NULL,1,62),(63,'Thanjavur',33,3,0,0,' ',NULL,NULL,1,63),(64,'Theni',33,3,0,0,' ',NULL,NULL,1,64),(65,'Thiruvallur',33,3,0,0,' ',NULL,NULL,1,65),(66,'Thiruvarur',33,3,0,0,' ',NULL,NULL,1,66),(67,'Tuticorin',33,3,0,0,' ',NULL,NULL,1,67),(68,'Trichirappalli',33,3,0,0,' ',NULL,NULL,1,68),(69,'Thirunelveli',33,3,0,0,' ',NULL,NULL,1,69),(70,'Tirupathur',33,3,0,0,' ',NULL,NULL,1,70),(71,'Tiruppur',33,3,0,0,' ',NULL,NULL,1,71),(72,'Thiruvannamalai',33,3,0,0,' ',NULL,NULL,1,72),(73,'The Nilgiris',33,3,0,0,' ',NULL,NULL,1,73),(74,'Vellore',33,3,0,0,' ',NULL,NULL,1,74),(75,'Viluppuram',33,3,0,0,' ',NULL,NULL,1,75),(76,'Virudhunagar',33,3,0,0,' ',NULL,NULL,1,76),(78,'Andimadam',40,4,0,0,' ',NULL,NULL,1,77),(79,'Ariyalur',40,4,0,0,' ',NULL,NULL,1,78),(80,'Sendurai',40,4,0,0,' ',NULL,NULL,1,79),(81,'Udayarpalayam',40,4,0,0,' ',NULL,NULL,1,80),(82,'CHENGALPATTU',41,4,0,0,' ',NULL,NULL,1,81),(83,'CHEYYUR',41,4,0,0,' ',NULL,NULL,1,82),(84,'MADHURANTAKAM',41,4,0,0,' ',NULL,NULL,1,83),(85,'PALLAVARAM',41,4,0,0,' ',NULL,NULL,1,84),(86,'TAMBARAM',41,4,0,0,' ',NULL,NULL,1,85),(87,'THIRUKKALUKUNDRAM',41,4,0,0,' ',NULL,NULL,1,86),(88,'THIRUPPORUR',41,4,0,0,' ',NULL,NULL,1,87),(89,'VANDALUR',41,4,0,0,' ',NULL,NULL,1,88),(90,'Alandur',42,4,0,0,' ',NULL,NULL,1,89),(91,'Ambattur',42,4,0,0,' ',NULL,NULL,1,90),(92,'Aminjikarai',42,4,0,0,' ',NULL,NULL,1,91),(93,'Ayanavaram',42,4,0,0,' ',NULL,NULL,1,92),(94,'Egmore',42,4,0,0,' ',NULL,NULL,1,93),(95,'Guindy',42,4,0,0,' ',NULL,NULL,1,94),(96,'Madhavaram',42,4,0,0,' ',NULL,NULL,1,95),(97,'Maduravoyal',42,4,0,0,' ',NULL,NULL,1,96),(98,'Mambalam',42,4,0,0,' ',NULL,NULL,1,97),(99,'Mylapore',42,4,0,0,' ',NULL,NULL,1,98),(100,'Perambur',42,4,0,0,' ',NULL,NULL,1,99),(101,'Purasawalkam',42,4,0,0,' ',NULL,NULL,1,100),(102,'Sholinganallur',42,4,0,0,' ',NULL,NULL,1,101),(103,'Thiruvottiyur',42,4,0,0,' ',NULL,NULL,1,102),(104,'Tondiarpet',42,4,0,0,' ',NULL,NULL,1,103),(105,'Velachery',42,4,0,0,' ',NULL,NULL,1,104),(106,'Anaimalai',43,4,0,0,' ',NULL,NULL,1,105),(107,'Annur',43,4,0,0,' ',NULL,NULL,1,106),(108,'Coimbatore(North)',43,4,0,0,' ',NULL,NULL,1,107),(109,'Coimbatore(South)',43,4,0,0,' ',NULL,NULL,1,108),(110,'Kinathukadavu',43,4,0,0,' ',NULL,NULL,1,109),(111,'Madukkarai',43,4,0,0,' ',NULL,NULL,1,110),(112,'Mettupalayam',43,4,0,0,' ',NULL,NULL,1,111),(113,'Perur',43,4,0,0,' ',NULL,NULL,1,112),(114,'Polllachi',43,4,0,0,' ',NULL,NULL,1,113),(115,'Sulur',43,4,0,0,' ',NULL,NULL,1,114),(116,'Valparai',43,4,0,0,' ',NULL,NULL,1,115),(117,'Bhuvanagiri',44,4,0,0,' ',NULL,NULL,1,116),(118,'Chidambaram',44,4,0,0,' ',NULL,NULL,1,117),(119,'Cuddalore',44,4,0,0,' ',NULL,NULL,1,118),(120,'Kattumannarkoil',44,4,0,0,' ',NULL,NULL,1,119),(121,'Kurinjipadi',44,4,0,0,' ',NULL,NULL,1,120),(122,'Panruti',44,4,0,0,' ',NULL,NULL,1,121),(123,'Srimushanam',44,4,0,0,' ',NULL,NULL,1,122),(124,'Titakudi',44,4,0,0,' ',NULL,NULL,1,123),(125,'Veppur',44,4,0,0,' ',NULL,NULL,1,124),(126,'Vridachalam',44,4,0,0,' ',NULL,NULL,1,125),(127,'Dharmapuri',45,4,0,0,' ',NULL,NULL,1,126),(128,'Harur',45,4,0,0,' ',NULL,NULL,1,127),(129,'Karimangalam',45,4,0,0,' ',NULL,NULL,1,128),(130,'Nallampalli',45,4,0,0,' ',NULL,NULL,1,129),(131,'Palakcode',45,4,0,0,' ',NULL,NULL,1,130),(132,'Pappireddipatti',45,4,0,0,' ',NULL,NULL,1,131),(133,'Pennagaram',45,4,0,0,' ',NULL,NULL,1,132),(134,'Attur',46,4,0,0,' ',NULL,NULL,1,133),(135,'Dindigul - East',46,4,0,0,' ',NULL,NULL,1,134),(136,'Dindigul -West',46,4,0,0,' ',NULL,NULL,1,135),(137,'Gujiliamparai',46,4,0,0,' ',NULL,NULL,1,136),(138,'Kodaikanal',46,4,0,0,' ',NULL,NULL,1,137),(139,'Natham',46,4,0,0,' ',NULL,NULL,1,138),(140,'Nilakottai',46,4,0,0,' ',NULL,NULL,1,139),(141,'Oddenchatram',46,4,0,0,' ',NULL,NULL,1,140),(142,'Palani',46,4,0,0,' ',NULL,NULL,1,141),(143,'Vedasandur',46,4,0,0,' ',NULL,NULL,1,142),(144,'Anthiyur',47,4,0,0,' ',NULL,NULL,1,143),(145,'Bhavani',47,4,0,0,' ',NULL,NULL,1,144),(146,'Erode',47,4,0,0,' ',NULL,NULL,1,145),(147,'Gobichettipalayam',47,4,0,0,' ',NULL,NULL,1,146),(148,'Kodumudi',47,4,0,0,' ',NULL,NULL,1,147),(149,'Modakkurichi',47,4,0,0,' ',NULL,NULL,1,148),(150,'Nambiyur',47,4,0,0,' ',NULL,NULL,1,149),(151,'Perundurai',47,4,0,0,' ',NULL,NULL,1,150),(152,'Sathyamangalam',47,4,0,0,' ',NULL,NULL,1,151),(153,'Thalavadi',47,4,0,0,' ',NULL,NULL,1,152),(154,'Chinnaselam',48,4,0,0,' ',NULL,NULL,1,153),(155,'Kallakurichi',48,4,0,0,' ',NULL,NULL,1,154),(156,'Kalvarayan Hills',48,4,0,0,' ',NULL,NULL,1,155),(157,'Sankarapuram',48,4,0,0,' ',NULL,NULL,1,156),(158,'Tirukkoilur',48,4,0,0,' ',NULL,NULL,1,157),(159,'Ulundurpet',48,4,0,0,' ',NULL,NULL,1,158),(160,'Kancheepuram',49,4,0,0,' ',NULL,NULL,1,159),(161,'KUNDRATHUR',49,4,0,0,' ',NULL,NULL,1,160),(162,'Sriperumbudur',49,4,0,0,' ',NULL,NULL,1,161),(163,'Uthiramerur',49,4,0,0,' ',NULL,NULL,1,162),(164,'WALAJABAD',49,4,0,0,' ',NULL,NULL,1,163),(165,'Aravakurichi',50,4,0,0,' ',NULL,NULL,1,164),(166,'Kadavur',50,4,0,0,' ',NULL,NULL,1,165),(167,'Karur',50,4,0,0,' ',NULL,NULL,1,166),(168,'Krishnarayapuram',50,4,0,0,' ',NULL,NULL,1,167),(169,'Kulithalai',50,4,0,0,' ',NULL,NULL,1,168),(170,'Manmangalam',50,4,0,0,' ',NULL,NULL,1,169),(171,'Pugalur',50,4,0,0,' ',NULL,NULL,1,170),(172,'Anchetty',51,4,0,0,' ',NULL,NULL,1,171),(173,'Bargur',51,4,0,0,' ',NULL,NULL,1,172),(174,'Denkanikottai',51,4,0,0,' ',NULL,NULL,1,173),(175,'Hosur',51,4,0,0,' ',NULL,NULL,1,174),(176,'Krishnagiri',51,4,0,0,' ',NULL,NULL,1,175),(177,'Pochampalli',51,4,0,0,' ',NULL,NULL,1,176),(178,'Shoolagiri',51,4,0,0,' ',NULL,NULL,1,177),(179,'Uthangarai',51,4,0,0,' ',NULL,NULL,1,178),(180,'Kalligudi',52,4,0,0,' ',NULL,NULL,1,179),(181,'Madurai - East',52,4,0,0,' ',NULL,NULL,1,180),(182,'Madurai - North',52,4,0,0,' ',NULL,NULL,1,181),(183,'Madurai(South)',52,4,0,0,' ',NULL,NULL,1,182),(184,'Madurai -West',52,4,0,0,' ',NULL,NULL,1,183),(185,'Melur',52,4,0,0,' ',NULL,NULL,1,184),(186,'Peraiyur',52,4,0,0,' ',NULL,NULL,1,185),(187,'Thirupparankundram',52,4,0,0,' ',NULL,NULL,1,186),(188,'Tirumangalam',52,4,0,0,' ',NULL,NULL,1,187),(189,'Usilampatti',52,4,0,0,' ',NULL,NULL,1,188),(190,'Vadipatti',52,4,0,0,' ',NULL,NULL,1,189),(191,'Kilvelur',53,4,0,0,' ',NULL,NULL,1,190),(192,'Kutthalam',53,4,0,0,' ',NULL,NULL,1,191),(193,'Mayiladuthurai',53,4,0,0,' ',NULL,NULL,1,192),(194,'Nagapattinam',53,4,0,0,' ',NULL,NULL,1,193),(195,'Sirkali',53,4,0,0,' ',NULL,NULL,1,194),(196,'Tharangambadi',53,4,0,0,' ',NULL,NULL,1,195),(197,'Thirukkuvalai',53,4,0,0,' ',NULL,NULL,1,196),(198,'Vedaranyam',53,4,0,0,' ',NULL,NULL,1,197),(199,'Agasteeswaram',54,4,0,0,' ',NULL,NULL,1,198),(200,'Kalkulam',54,4,0,0,' ',NULL,NULL,1,199),(201,'Killiyoor',54,4,0,0,' ',NULL,NULL,1,200),(202,'Thiruvattar',54,4,0,0,' ',NULL,NULL,1,201),(203,'Thovalai',54,4,0,0,' ',NULL,NULL,1,202),(204,'Vilavancode',54,4,0,0,' ',NULL,NULL,1,203),(205,'Kolli - Hills',55,4,0,0,' ',NULL,NULL,1,204),(206,'Kumarapalayam',55,4,0,0,' ',NULL,NULL,1,205),(207,'Mohanur',55,4,0,0,' ',NULL,NULL,1,206),(208,'Namakkal',55,4,0,0,' ',NULL,NULL,1,207),(209,'Paramathi Velur',55,4,0,0,' ',NULL,NULL,1,208),(210,'Rasipuram',55,4,0,0,' ',NULL,NULL,1,209),(211,'Sendamangalam',55,4,0,0,' ',NULL,NULL,1,210),(212,'Thiruchengode',55,4,0,0,' ',NULL,NULL,1,211),(213,'Alathur',56,4,0,0,' ',NULL,NULL,1,212),(214,'Kunnam',56,4,0,0,' ',NULL,NULL,1,213),(215,'Perambalur',56,4,0,0,' ',NULL,NULL,1,214),(216,'Veppanthattai',56,4,0,0,' ',NULL,NULL,1,215),(217,'Alangudi',57,4,0,0,' ',NULL,NULL,1,216),(218,'Aranthangi',57,4,0,0,' ',NULL,NULL,1,217),(219,'Avadaiyarkoil',57,4,0,0,' ',NULL,NULL,1,218),(220,'Gandarvakottai',57,4,0,0,' ',NULL,NULL,1,219),(221,'Illuppur',57,4,0,0,' ',NULL,NULL,1,220),(222,'Karambakudi',57,4,0,0,' ',NULL,NULL,1,221),(223,'Kulathur',57,4,0,0,' ',NULL,NULL,1,222),(224,'Manamelkudi',57,4,0,0,' ',NULL,NULL,1,223),(225,'Ponnamaravathi',57,4,0,0,' ',NULL,NULL,1,224),(226,'Pudukkottai',57,4,0,0,' ',NULL,NULL,1,225),(227,'Thirumayam',57,4,0,0,' ',NULL,NULL,1,226),(228,'Viralimalai',57,4,0,0,' ',NULL,NULL,1,227),(229,'Kadaladi',58,4,0,0,' ',NULL,NULL,1,228),(230,'Kamuthi',58,4,0,0,' ',NULL,NULL,1,229),(231,'Kilakarai',58,4,0,0,' ',NULL,NULL,1,230),(232,'Mudukulathur',58,4,0,0,' ',NULL,NULL,1,231),(233,'Paramakudi',58,4,0,0,' ',NULL,NULL,1,232),(234,'Rajasingamangalam',58,4,0,0,' ',NULL,NULL,1,233),(235,'Ramanathapuram',58,4,0,0,' ',NULL,NULL,1,234),(236,'Rameswaram',58,4,0,0,' ',NULL,NULL,1,235),(237,'Tiruvadanai',58,4,0,0,' ',NULL,NULL,1,236),(238,'Arakkonam',59,4,0,0,' ',NULL,NULL,1,237),(239,'Arcot',59,4,0,0,' ',NULL,NULL,1,238),(240,'Nemili',59,4,0,0,' ',NULL,NULL,1,239),(241,'Walajah',59,4,0,0,' ',NULL,NULL,1,240),(242,'Attur',60,4,0,0,' ',NULL,NULL,1,241),(243,'Edapady',60,4,0,0,' ',NULL,NULL,1,242),(244,'Gangavalli',60,4,0,0,' ',NULL,NULL,1,243),(245,'Kadayampatti',60,4,0,0,' ',NULL,NULL,1,244),(246,'Mettur',60,4,0,0,' ',NULL,NULL,1,245),(247,'Omalur',60,4,0,0,' ',NULL,NULL,1,246),(248,'Pethanaickenpalayam',60,4,0,0,' ',NULL,NULL,1,247),(249,'Salem',60,4,0,0,' ',NULL,NULL,1,248),(250,'Salem - South',60,4,0,0,' ',NULL,NULL,1,249),(251,'Salem -West',60,4,0,0,' ',NULL,NULL,1,250),(252,'Sangagiri',60,4,0,0,' ',NULL,NULL,1,251),(253,'Valapady',60,4,0,0,' ',NULL,NULL,1,252),(254,'Yercaud',60,4,0,0,' ',NULL,NULL,1,253),(255,'Devakottai',61,4,0,0,' ',NULL,NULL,1,254),(256,'Ilayankudi',61,4,0,0,' ',NULL,NULL,1,255),(257,'Kalaiyarkoil',61,4,0,0,' ',NULL,NULL,1,256),(258,'Karaikudi',61,4,0,0,' ',NULL,NULL,1,257),(259,'Manamadurai',61,4,0,0,' ',NULL,NULL,1,258),(260,'Sigampunari',61,4,0,0,' ',NULL,NULL,1,259),(261,'Sivaganga',61,4,0,0,' ',NULL,NULL,1,260),(262,'Thiruppuvanam',61,4,0,0,' ',NULL,NULL,1,261),(263,'Tirupathur',61,4,0,0,' ',NULL,NULL,1,262),(264,'Alangulam',62,4,0,0,' ',NULL,NULL,1,263),(265,'Kadayanallur',62,4,0,0,' ',NULL,NULL,1,264),(266,'Sankarankovil',62,4,0,0,' ',NULL,NULL,1,265),(267,'Shencottai',62,4,0,0,' ',NULL,NULL,1,266),(268,'Sivagiri',62,4,0,0,' ',NULL,NULL,1,267),(269,'Tenkasi',62,4,0,0,' ',NULL,NULL,1,268),(270,'Thiruvengadam',62,4,0,0,' ',NULL,NULL,1,269),(271,'V.K.Pudur',62,4,0,0,' ',NULL,NULL,1,270),(272,'Budalur',63,4,0,0,' ',NULL,NULL,1,271),(273,'Kumbakonam',63,4,0,0,' ',NULL,NULL,1,272),(274,'Orathanadu',63,4,0,0,' ',NULL,NULL,1,273),(275,'Papanasam',63,4,0,0,' ',NULL,NULL,1,274),(276,'Pattukkottai',63,4,0,0,' ',NULL,NULL,1,275),(277,'Peravurani',63,4,0,0,' ',NULL,NULL,1,276),(278,'Thanjavur',63,4,0,0,' ',NULL,NULL,1,277),(279,'Thiruvaiyaru',63,4,0,0,' ',NULL,NULL,1,278),(280,'Thiruvidaimarudur',63,4,0,0,' ',NULL,NULL,1,279),(281,'Andipatti',64,4,0,0,' ',NULL,NULL,1,280),(282,'Bodinayakanur',64,4,0,0,' ',NULL,NULL,1,281),(283,'Periyakulam',64,4,0,0,' ',NULL,NULL,1,282),(284,'Theni',64,4,0,0,' ',NULL,NULL,1,283),(285,'Uthamapalayam',64,4,0,0,' ',NULL,NULL,1,284),(286,'Avadi',65,4,0,0,' ',NULL,NULL,1,285),(287,'Gummidipoondi',65,4,0,0,' ',NULL,NULL,1,286),(288,'Pallipattu',65,4,0,0,' ',NULL,NULL,1,287),(289,'Ponneri',65,4,0,0,' ',NULL,NULL,1,288),(290,'Poonamallee',65,4,0,0,' ',NULL,NULL,1,289),(291,'R.K. Pettai',65,4,0,0,' ',NULL,NULL,1,290),(292,'Tiruttani',65,4,0,0,' ',NULL,NULL,1,291),(293,'Tiruvallur',65,4,0,0,' ',NULL,NULL,1,292),(294,'Uthukkotai',65,4,0,0,' ',NULL,NULL,1,293),(295,'Koothanallur',66,4,0,0,' ',NULL,NULL,1,294),(296,'Kudavasal',66,4,0,0,' ',NULL,NULL,1,295),(297,'Mannargudi',66,4,0,0,' ',NULL,NULL,1,296),(298,'Nannilam',66,4,0,0,' ',NULL,NULL,1,297),(299,'Needamanglam',66,4,0,0,' ',NULL,NULL,1,298),(300,'Thiruthuraipoondi',66,4,0,0,' ',NULL,NULL,1,299),(301,'Thiruvarur',66,4,0,0,' ',NULL,NULL,1,300),(302,'Valangaiman',66,4,0,0,' ',NULL,NULL,1,301),(303,'Eral',67,4,0,0,' ',NULL,NULL,1,302),(304,'Ettayapuram',67,4,0,0,' ',NULL,NULL,1,303),(305,'Kayathar',67,4,0,0,' ',NULL,NULL,1,304),(306,'Kovilpattai',67,4,0,0,' ',NULL,NULL,1,305),(307,'Ottapidaram',67,4,0,0,' ',NULL,NULL,1,306),(308,'Sathankulam',67,4,0,0,' ',NULL,NULL,1,307),(309,'Srivaikundam',67,4,0,0,' ',NULL,NULL,1,308),(310,'Thoothukkudi',67,4,0,0,' ',NULL,NULL,1,309),(311,'Tiruchendur',67,4,0,0,' ',NULL,NULL,1,310),(312,'Vilathikulam',67,4,0,0,' ',NULL,NULL,1,311),(313,'Lalgudi',68,4,0,0,' ',NULL,NULL,1,312),(314,'Manachanallur',68,4,0,0,' ',NULL,NULL,1,313),(315,'Manapparai',68,4,0,0,' ',NULL,NULL,1,314),(316,'Musiri',68,4,0,0,' ',NULL,NULL,1,315),(317,'Srirangam',68,4,0,0,' ',NULL,NULL,1,316),(318,'Thiruchirapalli-West',68,4,0,0,' ',NULL,NULL,1,317),(319,'Thiruverumpur',68,4,0,0,' ',NULL,NULL,1,318),(320,'Thottiyam',68,4,0,0,' ',NULL,NULL,1,319),(321,'Thuraiyur',68,4,0,0,' ',NULL,NULL,1,320),(322,'Tiruchirappalli-East',68,4,0,0,' ',NULL,NULL,1,321),(323,'Ambasamuthiram',69,4,0,0,' ',NULL,NULL,1,322),(324,'Cheranmahadevi',69,4,0,0,' ',NULL,NULL,1,323),(325,'Manur',69,4,0,0,' ',NULL,NULL,1,324),(326,'Nanguneri',69,4,0,0,' ',NULL,NULL,1,325),(327,'Palayamkottai',69,4,0,0,' ',NULL,NULL,1,326),(328,'Radhapuram',69,4,0,0,' ',NULL,NULL,1,327),(329,'Thisayanvilai',69,4,0,0,' ',NULL,NULL,1,328),(330,'Tirunelveli',69,4,0,0,' ',NULL,NULL,1,329),(331,'Ambur',70,4,0,0,' ',NULL,NULL,1,330),(332,'Natrampalli',70,4,0,0,' ',NULL,NULL,1,331),(333,'Tirupattur',70,4,0,0,' ',NULL,NULL,1,332),(334,'Vaniyambadi',70,4,0,0,' ',NULL,NULL,1,333),(335,'Avinashi',71,4,0,0,' ',NULL,NULL,1,334),(336,'Dharapuram',71,4,0,0,' ',NULL,NULL,1,335),(337,'Kangayam',71,4,0,0,' ',NULL,NULL,1,336),(338,'Madathukulam',71,4,0,0,' ',NULL,NULL,1,337),(339,'Palladam',71,4,0,0,' ',NULL,NULL,1,338),(340,'Tiruppur - North',71,4,0,0,' ',NULL,NULL,1,339),(341,'Tiruppur - South',71,4,0,0,' ',NULL,NULL,1,340),(342,'Udumalpet',71,4,0,0,' ',NULL,NULL,1,341),(343,'Uthukuli',71,4,0,0,' ',NULL,NULL,1,342),(344,'Arani',72,4,0,0,' ',NULL,NULL,1,343),(345,'Chengam',72,4,0,0,' ',NULL,NULL,1,344),(346,'Chetpet',72,4,0,0,' ',NULL,NULL,1,345),(347,'Jamunamarathoor',72,4,0,0,' ',NULL,NULL,1,346),(348,'Kalasapakkam',72,4,0,0,' ',NULL,NULL,1,347),(349,'Kilpennathur',72,4,0,0,' ',NULL,NULL,1,348),(350,'Periyakulam',72,4,0,0,' ',NULL,NULL,1,349),(351,'Polur',72,4,0,0,' ',NULL,NULL,1,350),(352,'Thandarampattu',72,4,0,0,' ',NULL,NULL,1,351),(353,'Tiruvannamalai',72,4,0,0,' ',NULL,NULL,1,352),(354,'Vandavasi',72,4,0,0,' ',NULL,NULL,1,353),(355,'Vembakkam',72,4,0,0,' ',NULL,NULL,1,354),(356,'Coonoor',73,4,0,0,' ',NULL,NULL,1,355),(357,'Gudalur',73,4,0,0,' ',NULL,NULL,1,356),(358,'Kotagiri',73,4,0,0,' ',NULL,NULL,1,357),(359,'Kundah',73,4,0,0,' ',NULL,NULL,1,358),(360,'Panthalur',73,4,0,0,' ',NULL,NULL,1,359),(361,'Udhagamandalam',73,4,0,0,' ',NULL,NULL,1,360),(362,'Anaicut',74,4,0,0,' ',NULL,NULL,1,361),(363,'Gudiyatham',74,4,0,0,' ',NULL,NULL,1,362),(364,'Katpadi',74,4,0,0,' ',NULL,NULL,1,363),(365,'K.V.Kuppam',74,4,0,0,' ',NULL,NULL,1,364),(366,'Pernambut',74,4,0,0,' ',NULL,NULL,1,365),(367,'Vellore',74,4,0,0,' ',NULL,NULL,1,366),(368,'Gingee',75,4,0,0,' ',NULL,NULL,1,367),(369,'Kandachipuram',75,4,0,0,' ',NULL,NULL,1,368),(370,'Marakkanam',75,4,0,0,' ',NULL,NULL,1,369),(371,'Melmalaiyanur',75,4,0,0,' ',NULL,NULL,1,370),(372,'Thiruvennainallur',75,4,0,0,' ',NULL,NULL,1,371),(373,'Tindivanam',75,4,0,0,' ',NULL,NULL,1,372),(374,'Vanur',75,4,0,0,' ',NULL,NULL,1,373),(375,'Vikkiravandi',75,4,0,0,' ',NULL,NULL,1,374),(376,'Villupuram',75,4,0,0,' ',NULL,NULL,1,375),(377,'Arupukottai',76,4,0,0,' ',NULL,NULL,1,376),(378,'Kariapattai',76,4,0,0,' ',NULL,NULL,1,377),(379,'Rajapalayam',76,4,0,0,' ',NULL,NULL,1,378),(380,'Sathur',76,4,0,0,' ',NULL,NULL,1,379),(381,'Sivakasi',76,4,0,0,' ',NULL,NULL,1,380),(382,'Srivilliputhur',76,4,0,0,' ',NULL,NULL,1,381),(383,'Tiruchuli',76,4,0,0,' ',NULL,NULL,1,382),(384,'Vembakkottai',76,4,0,0,' ',NULL,NULL,1,383),(385,'Virudhunagar',76,4,0,0,' ',NULL,NULL,1,384),(386,'Watrap',76,4,0,0,' ',NULL,NULL,1,385),(387,'Nicobar',35,3,NULL,NULL,NULL,NULL,NULL,1,386),(388,'North Middle Andaman',35,3,NULL,NULL,NULL,NULL,NULL,1,387),(389,'South Andaman',35,3,NULL,NULL,NULL,NULL,NULL,1,388),(390,'Anantapur',37,3,NULL,NULL,NULL,NULL,NULL,1,389),(391,'Chittoor',37,3,NULL,NULL,NULL,NULL,NULL,1,390),(392,'East Godavari',37,3,NULL,NULL,NULL,NULL,NULL,1,391),(393,'Guntur',37,3,NULL,NULL,NULL,NULL,NULL,1,392),(394,'Kadapa',37,3,NULL,NULL,NULL,NULL,NULL,1,393),(395,'Krishna',37,3,NULL,NULL,NULL,NULL,NULL,1,394),(396,'Kurnool',37,3,NULL,NULL,NULL,NULL,NULL,1,395),(397,'Nellore',37,3,NULL,NULL,NULL,NULL,NULL,1,396),(398,'Prakasam',37,3,NULL,NULL,NULL,NULL,NULL,1,397),(399,'Srikakulam',37,3,NULL,NULL,NULL,NULL,NULL,1,398),(400,'Visakhapatnam',37,3,NULL,NULL,NULL,NULL,NULL,1,399),(401,'Vizianagaram',37,3,NULL,NULL,NULL,NULL,NULL,1,400),(402,'West Godavari',37,3,NULL,NULL,NULL,NULL,NULL,1,401),(403,'Anjaw',13,3,NULL,NULL,NULL,NULL,NULL,1,402),(404,'Central Siang',13,3,NULL,NULL,NULL,NULL,NULL,1,403),(405,'Changlang',13,3,NULL,NULL,NULL,NULL,NULL,1,404),(406,'Dibang Valley',13,3,NULL,NULL,NULL,NULL,NULL,1,405),(407,'East Kameng',13,3,NULL,NULL,NULL,NULL,NULL,1,406),(408,'East Siang',13,3,NULL,NULL,NULL,NULL,NULL,1,407),(409,'Kamle',13,3,NULL,NULL,NULL,NULL,NULL,1,408),(410,'Kra Daadi',13,3,NULL,NULL,NULL,NULL,NULL,1,409),(411,'Kurung Kumey',13,3,NULL,NULL,NULL,NULL,NULL,1,410),(412,'Lepa Rada',13,3,NULL,NULL,NULL,NULL,NULL,1,411),(413,'Lohit',13,3,NULL,NULL,NULL,NULL,NULL,1,412),(414,'Longding',13,3,NULL,NULL,NULL,NULL,NULL,1,413),(415,'Lower Dibang Valley',13,3,NULL,NULL,NULL,NULL,NULL,1,414),(416,'Lower Siang',13,3,NULL,NULL,NULL,NULL,NULL,1,415),(417,'Lower Subansiri',13,3,NULL,NULL,NULL,NULL,NULL,1,416),(418,'Namsai',13,3,NULL,NULL,NULL,NULL,NULL,1,417),(419,'Pakke Kessang',13,3,NULL,NULL,NULL,NULL,NULL,1,418),(420,'Papum Pare',13,3,NULL,NULL,NULL,NULL,NULL,1,419),(421,'Shi Yomi',13,3,NULL,NULL,NULL,NULL,NULL,1,420),(422,'Tawang',13,3,NULL,NULL,NULL,NULL,NULL,1,421),(423,'Tirap',13,3,NULL,NULL,NULL,NULL,NULL,1,422),(424,'Upper Siang',13,3,NULL,NULL,NULL,NULL,NULL,1,423),(425,'Upper Subansiri',13,3,NULL,NULL,NULL,NULL,NULL,1,424),(426,'West Kameng',13,3,NULL,NULL,NULL,NULL,NULL,1,425),(427,'West Siang',13,3,NULL,NULL,NULL,NULL,NULL,1,426),(428,'Bajali',19,3,NULL,NULL,NULL,NULL,NULL,1,427),(429,'Baksa',19,3,NULL,NULL,NULL,NULL,NULL,1,428),(430,'Barpeta',19,3,NULL,NULL,NULL,NULL,NULL,1,429),(431,'Biswanath',19,3,NULL,NULL,NULL,NULL,NULL,1,430),(432,'Bongaigaon',19,3,NULL,NULL,NULL,NULL,NULL,1,431),(433,'Cachar',19,3,NULL,NULL,NULL,NULL,NULL,1,432),(434,'Charaideo',19,3,NULL,NULL,NULL,NULL,NULL,1,433),(435,'Chirang',19,3,NULL,NULL,NULL,NULL,NULL,1,434),(436,'Darrang',19,3,NULL,NULL,NULL,NULL,NULL,1,435),(437,'Dhemaji',19,3,NULL,NULL,NULL,NULL,NULL,1,436),(438,'Dhubri',19,3,NULL,NULL,NULL,NULL,NULL,1,437),(439,'Dibrugarh',19,3,NULL,NULL,NULL,NULL,NULL,1,438),(440,'Dima Hasao',19,3,NULL,NULL,NULL,NULL,NULL,1,439),(441,'Goalpara',19,3,NULL,NULL,NULL,NULL,NULL,1,440),(442,'Golaghat',19,3,NULL,NULL,NULL,NULL,NULL,1,441),(443,'Hailakandi',19,3,NULL,NULL,NULL,NULL,NULL,1,442),(444,'Hojai',19,3,NULL,NULL,NULL,NULL,NULL,1,443),(445,'Jorhat',19,3,NULL,NULL,NULL,NULL,NULL,1,444),(446,'Kamrup',19,3,NULL,NULL,NULL,NULL,NULL,1,445),(447,'Kamrup Metropolitan',19,3,NULL,NULL,NULL,NULL,NULL,1,446),(448,'Karbi Anglong',19,3,NULL,NULL,NULL,NULL,NULL,1,447),(449,'Karimganj',19,3,NULL,NULL,NULL,NULL,NULL,1,448),(450,'Kokrajhar',19,3,NULL,NULL,NULL,NULL,NULL,1,449),(451,'Lakhimpur',19,3,NULL,NULL,NULL,NULL,NULL,1,450),(452,'Majuli',19,3,NULL,NULL,NULL,NULL,NULL,1,451),(453,'Morigaon',19,3,NULL,NULL,NULL,NULL,NULL,1,452),(454,'Nagaon',19,3,NULL,NULL,NULL,NULL,NULL,1,453),(455,'Nalbari',19,3,NULL,NULL,NULL,NULL,NULL,1,454),(456,'Sivasagar',19,3,NULL,NULL,NULL,NULL,NULL,1,455),(457,'Sonitpur',19,3,NULL,NULL,NULL,NULL,NULL,1,456),(458,'South Salmara-Mankachar',19,3,NULL,NULL,NULL,NULL,NULL,1,457),(459,'Tinsukia',19,3,NULL,NULL,NULL,NULL,NULL,1,458),(460,'Udalguri',19,3,NULL,NULL,NULL,NULL,NULL,1,459),(461,'West Karbi Anglong',19,3,NULL,NULL,NULL,NULL,NULL,1,460),(462,'Araria',11,3,NULL,NULL,NULL,NULL,NULL,1,461),(463,'Arwal',11,3,NULL,NULL,NULL,NULL,NULL,1,462),(464,'Aurangabad',11,3,NULL,NULL,NULL,NULL,NULL,1,463),(465,'Banka',11,3,NULL,NULL,NULL,NULL,NULL,1,464),(466,'Begusarai',11,3,NULL,NULL,NULL,NULL,NULL,1,465),(467,'Bhagalpur',11,3,NULL,NULL,NULL,NULL,NULL,1,466),(468,'Bhojpur',11,3,NULL,NULL,NULL,NULL,NULL,1,467),(469,'Buxar',11,3,NULL,NULL,NULL,NULL,NULL,1,468),(470,'Darbhanga',11,3,NULL,NULL,NULL,NULL,NULL,1,469),(471,'East Champaran',11,3,NULL,NULL,NULL,NULL,NULL,1,470),(472,'Gaya',11,3,NULL,NULL,NULL,NULL,NULL,1,471),(473,'Gopalganj',11,3,NULL,NULL,NULL,NULL,NULL,1,472),(474,'Jamui',11,3,NULL,NULL,NULL,NULL,NULL,1,473),(475,'Jehanabad',11,3,NULL,NULL,NULL,NULL,NULL,1,474),(476,'Kaimur',11,3,NULL,NULL,NULL,NULL,NULL,1,475),(477,'Katihar',11,3,NULL,NULL,NULL,NULL,NULL,1,476),(478,'Khagaria',11,3,NULL,NULL,NULL,NULL,NULL,1,477),(479,'Kishanganj',11,3,NULL,NULL,NULL,NULL,NULL,1,478),(480,'Lakhisarai',11,3,NULL,NULL,NULL,NULL,NULL,1,479),(481,'Madhepura',11,3,NULL,NULL,NULL,NULL,NULL,1,480),(482,'Madhubani',11,3,NULL,NULL,NULL,NULL,NULL,1,481),(483,'Munger',11,3,NULL,NULL,NULL,NULL,NULL,1,482),(484,'Muzaffarpur',11,3,NULL,NULL,NULL,NULL,NULL,1,483),(485,'Nalanda',11,3,NULL,NULL,NULL,NULL,NULL,1,484),(486,'Nawada',11,3,NULL,NULL,NULL,NULL,NULL,1,485),(487,'Patna',11,3,NULL,NULL,NULL,NULL,NULL,1,486),(488,'Purnia',11,3,NULL,NULL,NULL,NULL,NULL,1,487),(489,'Rohtas',11,3,NULL,NULL,NULL,NULL,NULL,1,488),(490,'Saharsa',11,3,NULL,NULL,NULL,NULL,NULL,1,489),(491,'Samastipur',11,3,NULL,NULL,NULL,NULL,NULL,1,490),(492,'Saran',11,3,NULL,NULL,NULL,NULL,NULL,1,491),(493,'Sheikhpura',11,3,NULL,NULL,NULL,NULL,NULL,1,492),(494,'Sheohar',11,3,NULL,NULL,NULL,NULL,NULL,1,493),(495,'Sitamarhi',11,3,NULL,NULL,NULL,NULL,NULL,1,494),(496,'Siwan',11,3,NULL,NULL,NULL,NULL,NULL,1,495),(497,'Supaul',11,3,NULL,NULL,NULL,NULL,NULL,1,496),(498,'Vaishali',11,3,NULL,NULL,NULL,NULL,NULL,1,497),(499,'West Champaran',11,3,NULL,NULL,NULL,NULL,NULL,1,498),(500,'Chandigarh',5,3,NULL,NULL,NULL,NULL,NULL,1,499),(501,'Balod',23,3,NULL,NULL,NULL,NULL,NULL,1,500),(502,'Baloda Bazar',23,3,NULL,NULL,NULL,NULL,NULL,1,501),(503,'Balrampur',23,3,NULL,NULL,NULL,NULL,NULL,1,502),(504,'Bastar',23,3,NULL,NULL,NULL,NULL,NULL,1,503),(505,'Bemetara',23,3,NULL,NULL,NULL,NULL,NULL,1,504),(506,'Bijapur',23,3,NULL,NULL,NULL,NULL,NULL,1,505),(507,'Bilaspur',23,3,NULL,NULL,NULL,NULL,NULL,1,506),(508,'Dantewada',23,3,NULL,NULL,NULL,NULL,NULL,1,507),(509,'Dhamtari',23,3,NULL,NULL,NULL,NULL,NULL,1,508),(510,'Durg',23,3,NULL,NULL,NULL,NULL,NULL,1,509),(511,'Gariaband',23,3,NULL,NULL,NULL,NULL,NULL,1,510),(512,'Gaurela Pendra Marwahi',23,3,NULL,NULL,NULL,NULL,NULL,1,511),(513,'Janjgir Champa',23,3,NULL,NULL,NULL,NULL,NULL,1,512),(514,'Jashpur',23,3,NULL,NULL,NULL,NULL,NULL,1,513),(515,'Kabirdham',23,3,NULL,NULL,NULL,NULL,NULL,1,514),(516,'Kanker',23,3,NULL,NULL,NULL,NULL,NULL,1,515),(517,'Kondagaon',23,3,NULL,NULL,NULL,NULL,NULL,1,516),(518,'Korba',23,3,NULL,NULL,NULL,NULL,NULL,1,517),(519,'Koriya',23,3,NULL,NULL,NULL,NULL,NULL,1,518),(520,'Mahasamund',23,3,NULL,NULL,NULL,NULL,NULL,1,519),(521,'Mungeli',23,3,NULL,NULL,NULL,NULL,NULL,1,520),(522,'Narayanpur',23,3,NULL,NULL,NULL,NULL,NULL,1,521),(523,'Raigarh',23,3,NULL,NULL,NULL,NULL,NULL,1,522),(524,'Raipur',23,3,NULL,NULL,NULL,NULL,NULL,1,523),(525,'Rajnandgaon',23,3,NULL,NULL,NULL,NULL,NULL,1,524),(526,'Sukma',23,3,NULL,NULL,NULL,NULL,NULL,1,525),(527,'Surajpur',23,3,NULL,NULL,NULL,NULL,NULL,1,526),(528,'Surguja',23,3,NULL,NULL,NULL,NULL,NULL,1,527),(529,'Dadra and Nagar Haveli',27,3,NULL,NULL,NULL,NULL,NULL,1,528),(530,'Daman',26,3,NULL,NULL,NULL,NULL,NULL,1,529),(531,'Diu',26,3,NULL,NULL,NULL,NULL,NULL,1,530),(532,'Central Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,531),(533,'East Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,532),(534,'New Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,533),(535,'North Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,534),(536,'North East Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,535),(537,'North West Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,536),(538,'Shahdara',8,3,NULL,NULL,NULL,NULL,NULL,1,537),(539,'South Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,538),(540,'South East Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,539),(541,'South West Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,540),(542,'West Delhi',8,3,NULL,NULL,NULL,NULL,NULL,1,541),(543,'North Goa',30,3,NULL,NULL,NULL,NULL,NULL,1,542),(544,'South Goa',30,3,NULL,NULL,NULL,NULL,NULL,1,543),(545,'Ahmedabad',25,3,NULL,NULL,NULL,NULL,NULL,1,544),(546,'Amreli',25,3,NULL,NULL,NULL,NULL,NULL,1,545),(547,'Anand',25,3,NULL,NULL,NULL,NULL,NULL,1,546),(548,'Aravalli',25,3,NULL,NULL,NULL,NULL,NULL,1,547),(549,'Banaskantha',25,3,NULL,NULL,NULL,NULL,NULL,1,548),(550,'Bharuch',25,3,NULL,NULL,NULL,NULL,NULL,1,549),(551,'Bhavnagar',25,3,NULL,NULL,NULL,NULL,NULL,1,550),(552,'Botad',25,3,NULL,NULL,NULL,NULL,NULL,1,551),(553,'Chhota Udaipur',25,3,NULL,NULL,NULL,NULL,NULL,1,552),(554,'Dahod',25,3,NULL,NULL,NULL,NULL,NULL,1,553),(555,'Dang',25,3,NULL,NULL,NULL,NULL,NULL,1,554),(556,'Devbhoomi Dwarka',25,3,NULL,NULL,NULL,NULL,NULL,1,555),(557,'Gandhinagar',25,3,NULL,NULL,NULL,NULL,NULL,1,556),(558,'Gir Somnath',25,3,NULL,NULL,NULL,NULL,NULL,1,557),(559,'Jamnagar',25,3,NULL,NULL,NULL,NULL,NULL,1,558),(560,'Junagadh',25,3,NULL,NULL,NULL,NULL,NULL,1,559),(561,'Kheda',25,3,NULL,NULL,NULL,NULL,NULL,1,560),(562,'Kutch',25,3,NULL,NULL,NULL,NULL,NULL,1,561),(563,'Mahisagar',25,3,NULL,NULL,NULL,NULL,NULL,1,562),(564,'Mehsana',25,3,NULL,NULL,NULL,NULL,NULL,1,563),(565,'Morbi',25,3,NULL,NULL,NULL,NULL,NULL,1,564),(566,'Narmada',25,3,NULL,NULL,NULL,NULL,NULL,1,565),(567,'Navsari',25,3,NULL,NULL,NULL,NULL,NULL,1,566),(568,'Panchmahal',25,3,NULL,NULL,NULL,NULL,NULL,1,567),(569,'Patan',25,3,NULL,NULL,NULL,NULL,NULL,1,568),(570,'Porbandar',25,3,NULL,NULL,NULL,NULL,NULL,1,569),(571,'Rajkot',25,3,NULL,NULL,NULL,NULL,NULL,1,570),(572,'Sabarkantha',25,3,NULL,NULL,NULL,NULL,NULL,1,571),(573,'Surat',25,3,NULL,NULL,NULL,NULL,NULL,1,572),(574,'Surendranagar',25,3,NULL,NULL,NULL,NULL,NULL,1,573),(575,'Tapi',25,3,NULL,NULL,NULL,NULL,NULL,1,574),(576,'Vadodara',25,3,NULL,NULL,NULL,NULL,NULL,1,575),(577,'Valsad',25,3,NULL,NULL,NULL,NULL,NULL,1,576),(578,'Ambala',7,3,NULL,NULL,NULL,NULL,NULL,1,577),(579,'Bhiwani',7,3,NULL,NULL,NULL,NULL,NULL,1,578),(580,'Charkhi Dadri',7,3,NULL,NULL,NULL,NULL,NULL,1,579),(581,'Faridabad',7,3,NULL,NULL,NULL,NULL,NULL,1,580),(582,'Fatehabad',7,3,NULL,NULL,NULL,NULL,NULL,1,581),(583,'Gurugram',7,3,NULL,NULL,NULL,NULL,NULL,1,582),(584,'Hisar',7,3,NULL,NULL,NULL,NULL,NULL,1,583),(585,'Jhajjar',7,3,NULL,NULL,NULL,NULL,NULL,1,584),(586,'Jind',7,3,NULL,NULL,NULL,NULL,NULL,1,585),(587,'Kaithal',7,3,NULL,NULL,NULL,NULL,NULL,1,586),(588,'Karnal',7,3,NULL,NULL,NULL,NULL,NULL,1,587),(589,'Kurukshetra',7,3,NULL,NULL,NULL,NULL,NULL,1,588),(590,'Mahendragarh',7,3,NULL,NULL,NULL,NULL,NULL,1,589),(591,'Mewat',7,3,NULL,NULL,NULL,NULL,NULL,1,590),(592,'Palwal',7,3,NULL,NULL,NULL,NULL,NULL,1,591),(593,'Panchkula',7,3,NULL,NULL,NULL,NULL,NULL,1,592),(594,'Panipat',7,3,NULL,NULL,NULL,NULL,NULL,1,593),(595,'Rewari',7,3,NULL,NULL,NULL,NULL,NULL,1,594),(596,'Rohtak',7,3,NULL,NULL,NULL,NULL,NULL,1,595),(597,'Sirsa',7,3,NULL,NULL,NULL,NULL,NULL,1,596),(598,'Sonipat',7,3,NULL,NULL,NULL,NULL,NULL,1,597),(599,'Yamunanagar',7,3,NULL,NULL,NULL,NULL,NULL,1,598),(600,'Bilaspur',3,3,NULL,NULL,NULL,NULL,NULL,1,599),(601,'Chamba',3,3,NULL,NULL,NULL,NULL,NULL,1,600),(602,'Hamirpur',3,3,NULL,NULL,NULL,NULL,NULL,1,601),(603,'Kangra',3,3,NULL,NULL,NULL,NULL,NULL,1,602),(604,'Kinnaur',3,3,NULL,NULL,NULL,NULL,NULL,1,603),(605,'Kullu',3,3,NULL,NULL,NULL,NULL,NULL,1,604),(606,'Lahaul Spiti',3,3,NULL,NULL,NULL,NULL,NULL,1,605),(607,'Mandi',3,3,NULL,NULL,NULL,NULL,NULL,1,606),(608,'Shimla',3,3,NULL,NULL,NULL,NULL,NULL,1,607),(609,'Sirmaur',3,3,NULL,NULL,NULL,NULL,NULL,1,608),(610,'Solan',3,3,NULL,NULL,NULL,NULL,NULL,1,609),(611,'Una',3,3,NULL,NULL,NULL,NULL,NULL,1,610),(612,'Anantnag',2,3,NULL,NULL,NULL,NULL,NULL,1,611),(613,'Bandipora',2,3,NULL,NULL,NULL,NULL,NULL,1,612),(614,'Baramulla',2,3,NULL,NULL,NULL,NULL,NULL,1,613),(615,'Budgam',2,3,NULL,NULL,NULL,NULL,NULL,1,614),(616,'Doda',2,3,NULL,NULL,NULL,NULL,NULL,1,615),(617,'Ganderbal',2,3,NULL,NULL,NULL,NULL,NULL,1,616),(618,'Jammu',2,3,NULL,NULL,NULL,NULL,NULL,1,617),(619,'Kathua',2,3,NULL,NULL,NULL,NULL,NULL,1,618),(620,'Kishtwar',2,3,NULL,NULL,NULL,NULL,NULL,1,619),(621,'Kulgam',2,3,NULL,NULL,NULL,NULL,NULL,1,620),(622,'Kupwara',2,3,NULL,NULL,NULL,NULL,NULL,1,621),(623,'Poonch',2,3,NULL,NULL,NULL,NULL,NULL,1,622),(624,'Pulwama',2,3,NULL,NULL,NULL,NULL,NULL,1,623),(625,'Rajouri',2,3,NULL,NULL,NULL,NULL,NULL,1,624),(626,'Ramban',2,3,NULL,NULL,NULL,NULL,NULL,1,625),(627,'Reasi',2,3,NULL,NULL,NULL,NULL,NULL,1,626),(628,'Samba',2,3,NULL,NULL,NULL,NULL,NULL,1,627),(629,'Shopian',2,3,NULL,NULL,NULL,NULL,NULL,1,628),(630,'Srinagar',2,3,NULL,NULL,NULL,NULL,NULL,1,629),(631,'Udhampur',2,3,NULL,NULL,NULL,NULL,NULL,1,630),(632,'Bokaro',21,3,NULL,NULL,NULL,NULL,NULL,1,631),(633,'Chatra',21,3,NULL,NULL,NULL,NULL,NULL,1,632),(634,'Deoghar',21,3,NULL,NULL,NULL,NULL,NULL,1,633),(635,'Dhanbad',21,3,NULL,NULL,NULL,NULL,NULL,1,634),(636,'Dumka',21,3,NULL,NULL,NULL,NULL,NULL,1,635),(637,'East Singhbhum',21,3,NULL,NULL,NULL,NULL,NULL,1,636),(638,'Garhwa',21,3,NULL,NULL,NULL,NULL,NULL,1,637),(639,'Giridih',21,3,NULL,NULL,NULL,NULL,NULL,1,638),(640,'Godda',21,3,NULL,NULL,NULL,NULL,NULL,1,639),(641,'Gumla',21,3,NULL,NULL,NULL,NULL,NULL,1,640),(642,'Hazaribagh',21,3,NULL,NULL,NULL,NULL,NULL,1,641),(643,'Jamtara',21,3,NULL,NULL,NULL,NULL,NULL,1,642),(644,'Khunti',21,3,NULL,NULL,NULL,NULL,NULL,1,643),(645,'Koderma',21,3,NULL,NULL,NULL,NULL,NULL,1,644),(646,'Latehar',21,3,NULL,NULL,NULL,NULL,NULL,1,645),(647,'Lohardaga',21,3,NULL,NULL,NULL,NULL,NULL,1,646),(648,'Pakur',21,3,NULL,NULL,NULL,NULL,NULL,1,647),(649,'Palamu',21,3,NULL,NULL,NULL,NULL,NULL,1,648),(650,'Ramgarh',21,3,NULL,NULL,NULL,NULL,NULL,1,649),(651,'Ranchi',21,3,NULL,NULL,NULL,NULL,NULL,1,650),(652,'Sahebganj',21,3,NULL,NULL,NULL,NULL,NULL,1,651),(653,'Seraikela Kharsawan',21,3,NULL,NULL,NULL,NULL,NULL,1,652),(654,'Simdega',21,3,NULL,NULL,NULL,NULL,NULL,1,653),(655,'West Singhbhum',21,3,NULL,NULL,NULL,NULL,NULL,1,654),(656,'Bagalkot',29,3,NULL,NULL,NULL,NULL,NULL,1,655),(657,'Bangalore Rural',29,3,NULL,NULL,NULL,NULL,NULL,1,656),(658,'Bangalore Urban',29,3,NULL,NULL,NULL,NULL,NULL,1,657),(659,'Belgaum',29,3,NULL,NULL,NULL,NULL,NULL,1,658),(660,'Bellary',29,3,NULL,NULL,NULL,NULL,NULL,1,659),(661,'Bidar',29,3,NULL,NULL,NULL,NULL,NULL,1,660),(662,'Chamarajanagar',29,3,NULL,NULL,NULL,NULL,NULL,1,661),(663,'Chikkaballapur',29,3,NULL,NULL,NULL,NULL,NULL,1,662),(664,'Chikkamagaluru',29,3,NULL,NULL,NULL,NULL,NULL,1,663),(665,'Chitradurga',29,3,NULL,NULL,NULL,NULL,NULL,1,664),(666,'Dakshina Kannada',29,3,NULL,NULL,NULL,NULL,NULL,1,665),(667,'Davanagere',29,3,NULL,NULL,NULL,NULL,NULL,1,666),(668,'Dharwad',29,3,NULL,NULL,NULL,NULL,NULL,1,667),(669,'Gadag',29,3,NULL,NULL,NULL,NULL,NULL,1,668),(670,'Gulbarga',29,3,NULL,NULL,NULL,NULL,NULL,1,669),(671,'Hassan',29,3,NULL,NULL,NULL,NULL,NULL,1,670),(672,'Haveri',29,3,NULL,NULL,NULL,NULL,NULL,1,671),(673,'Kodagu',29,3,NULL,NULL,NULL,NULL,NULL,1,672),(674,'Kolar',29,3,NULL,NULL,NULL,NULL,NULL,1,673),(675,'Koppal',29,3,NULL,NULL,NULL,NULL,NULL,1,674),(676,'Mandya',29,3,NULL,NULL,NULL,NULL,NULL,1,675),(677,'Mysore',29,3,NULL,NULL,NULL,NULL,NULL,1,676),(678,'Raichur',29,3,NULL,NULL,NULL,NULL,NULL,1,677),(679,'Ramanagara',29,3,NULL,NULL,NULL,NULL,NULL,1,678),(680,'Shimoga',29,3,NULL,NULL,NULL,NULL,NULL,1,679),(681,'Tumkur',29,3,NULL,NULL,NULL,NULL,NULL,1,680),(682,'Udupi',29,3,NULL,NULL,NULL,NULL,NULL,1,681),(683,'Uttara Kannada',29,3,NULL,NULL,NULL,NULL,NULL,1,682),(684,'Vijayanagara',29,3,NULL,NULL,NULL,NULL,NULL,1,683),(685,'Vijayapura ',29,3,NULL,NULL,NULL,NULL,NULL,1,684),(686,'Yadgir',29,3,NULL,NULL,NULL,NULL,NULL,1,685),(687,'Alappuzha',32,3,NULL,NULL,NULL,NULL,NULL,1,686),(688,'Ernakulam',32,3,NULL,NULL,NULL,NULL,NULL,1,687),(689,'Idukki',32,3,NULL,NULL,NULL,NULL,NULL,1,688),(690,'Kannur',32,3,NULL,NULL,NULL,NULL,NULL,1,689),(691,'Kasaragod',32,3,NULL,NULL,NULL,NULL,NULL,1,690),(692,'Kollam',32,3,NULL,NULL,NULL,NULL,NULL,1,691),(693,'Kottayam',32,3,NULL,NULL,NULL,NULL,NULL,1,692),(694,'Kozhikode',32,3,NULL,NULL,NULL,NULL,NULL,1,693),(695,'Malappuram',32,3,NULL,NULL,NULL,NULL,NULL,1,694),(696,'Palakkad',32,3,NULL,NULL,NULL,NULL,NULL,1,695),(697,'Pathanamthitta',32,3,NULL,NULL,NULL,NULL,NULL,1,696),(698,'Thiruvananthapuram',32,3,NULL,NULL,NULL,NULL,NULL,1,697),(699,'Thrissur',32,3,NULL,NULL,NULL,NULL,NULL,1,698),(700,'Wayanad',32,3,NULL,NULL,NULL,NULL,NULL,1,699),(701,'Kargil',38,3,NULL,NULL,NULL,NULL,NULL,1,700),(702,'Leh',38,3,NULL,NULL,NULL,NULL,NULL,1,701),(703,'Lakshadweep',31,3,NULL,NULL,NULL,NULL,NULL,1,702),(704,'Agar Malwa',24,3,NULL,NULL,NULL,NULL,NULL,1,703),(705,'Alirajpur',24,3,NULL,NULL,NULL,NULL,NULL,1,704),(706,'Anuppur',24,3,NULL,NULL,NULL,NULL,NULL,1,705),(707,'Ashoknagar',24,3,NULL,NULL,NULL,NULL,NULL,1,706),(708,'Balaghat',24,3,NULL,NULL,NULL,NULL,NULL,1,707),(709,'Barwani',24,3,NULL,NULL,NULL,NULL,NULL,1,708),(710,'Betul',24,3,NULL,NULL,NULL,NULL,NULL,1,709),(711,'Bhind',24,3,NULL,NULL,NULL,NULL,NULL,1,710),(712,'Bhopal',24,3,NULL,NULL,NULL,NULL,NULL,1,711),(713,'Burhanpur',24,3,NULL,NULL,NULL,NULL,NULL,1,712),(714,'Chachaura',24,3,NULL,NULL,NULL,NULL,NULL,1,713),(715,'Chhatarpur',24,3,NULL,NULL,NULL,NULL,NULL,1,714),(716,'Chhindwara',24,3,NULL,NULL,NULL,NULL,NULL,1,715),(717,'Damoh',24,3,NULL,NULL,NULL,NULL,NULL,1,716),(718,'Datia',24,3,NULL,NULL,NULL,NULL,NULL,1,717),(719,'Dewas',24,3,NULL,NULL,NULL,NULL,NULL,1,718),(720,'Dhar',24,3,NULL,NULL,NULL,NULL,NULL,1,719),(721,'Dindori',24,3,NULL,NULL,NULL,NULL,NULL,1,720),(722,'Guna',24,3,NULL,NULL,NULL,NULL,NULL,1,721),(723,'Gwalior',24,3,NULL,NULL,NULL,NULL,NULL,1,722),(724,'Harda',24,3,NULL,NULL,NULL,NULL,NULL,1,723),(725,'Hoshangabad',24,3,NULL,NULL,NULL,NULL,NULL,1,724),(726,'Indore',24,3,NULL,NULL,NULL,NULL,NULL,1,725),(727,'Jabalpur',24,3,NULL,NULL,NULL,NULL,NULL,1,726),(728,'Jhabua',24,3,NULL,NULL,NULL,NULL,NULL,1,727),(729,'Katni',24,3,NULL,NULL,NULL,NULL,NULL,1,728),(730,'Khandwa',24,3,NULL,NULL,NULL,NULL,NULL,1,729),(731,'Khargone',24,3,NULL,NULL,NULL,NULL,NULL,1,730),(732,'Maihar',24,3,NULL,NULL,NULL,NULL,NULL,1,731),(733,'Mandla',24,3,NULL,NULL,NULL,NULL,NULL,1,732),(734,'Mandsaur',24,3,NULL,NULL,NULL,NULL,NULL,1,733),(735,'Morena',24,3,NULL,NULL,NULL,NULL,NULL,1,734),(736,'Nagda',24,3,NULL,NULL,NULL,NULL,NULL,1,735),(737,'Narsinghpur',24,3,NULL,NULL,NULL,NULL,NULL,1,736),(738,'Neemuch',24,3,NULL,NULL,NULL,NULL,NULL,1,737),(739,'Niwari',24,3,NULL,NULL,NULL,NULL,NULL,1,738),(740,'Panna',24,3,NULL,NULL,NULL,NULL,NULL,1,739),(741,'Raisen',24,3,NULL,NULL,NULL,NULL,NULL,1,740),(742,'Rajgarh',24,3,NULL,NULL,NULL,NULL,NULL,1,741),(743,'Ratlam',24,3,NULL,NULL,NULL,NULL,NULL,1,742),(744,'Rewa',24,3,NULL,NULL,NULL,NULL,NULL,1,743),(745,'Sagar',24,3,NULL,NULL,NULL,NULL,NULL,1,744),(746,'Satna',24,3,NULL,NULL,NULL,NULL,NULL,1,745),(747,'Sehore',24,3,NULL,NULL,NULL,NULL,NULL,1,746),(748,'Seoni',24,3,NULL,NULL,NULL,NULL,NULL,1,747),(749,'Shahdol',24,3,NULL,NULL,NULL,NULL,NULL,1,748),(750,'Shajapur',24,3,NULL,NULL,NULL,NULL,NULL,1,749),(751,'Sheopur',24,3,NULL,NULL,NULL,NULL,NULL,1,750),(752,'Shivpuri',24,3,NULL,NULL,NULL,NULL,NULL,1,751),(753,'Sidhi',24,3,NULL,NULL,NULL,NULL,NULL,1,752),(754,'Singrauli',24,3,NULL,NULL,NULL,NULL,NULL,1,753),(755,'Tikamgarh',24,3,NULL,NULL,NULL,NULL,NULL,1,754),(756,'Ujjain',24,3,NULL,NULL,NULL,NULL,NULL,1,755),(757,'Umaria',24,3,NULL,NULL,NULL,NULL,NULL,1,756),(758,'Vidisha',24,3,NULL,NULL,NULL,NULL,NULL,1,757),(759,'Ahmednagar',28,3,NULL,NULL,NULL,NULL,NULL,1,758),(760,'Akola',28,3,NULL,NULL,NULL,NULL,NULL,1,759),(761,'Amravati',28,3,NULL,NULL,NULL,NULL,NULL,1,760),(762,'Aurangabad',28,3,NULL,NULL,NULL,NULL,NULL,1,761),(763,'Beed',28,3,NULL,NULL,NULL,NULL,NULL,1,762),(764,'Bhandara',28,3,NULL,NULL,NULL,NULL,NULL,1,763),(765,'Buldhana',28,3,NULL,NULL,NULL,NULL,NULL,1,764),(766,'Chandrapur',28,3,NULL,NULL,NULL,NULL,NULL,1,765),(767,'Dhule',28,3,NULL,NULL,NULL,NULL,NULL,1,766),(768,'Gadchiroli',28,3,NULL,NULL,NULL,NULL,NULL,1,767),(769,'Gondia',28,3,NULL,NULL,NULL,NULL,NULL,1,768),(770,'Hingoli',28,3,NULL,NULL,NULL,NULL,NULL,1,769),(771,'Jalgaon',28,3,NULL,NULL,NULL,NULL,NULL,1,770),(772,'Jalna',28,3,NULL,NULL,NULL,NULL,NULL,1,771),(773,'Kolhapur',28,3,NULL,NULL,NULL,NULL,NULL,1,772),(774,'Latur',28,3,NULL,NULL,NULL,NULL,NULL,1,773),(775,'Mumbai City',28,3,NULL,NULL,NULL,NULL,NULL,1,774),(776,'Mumbai Suburban',28,3,NULL,NULL,NULL,NULL,NULL,1,775),(777,'Nagpur',28,3,NULL,NULL,NULL,NULL,NULL,1,776),(778,'Nanded',28,3,NULL,NULL,NULL,NULL,NULL,1,777),(779,'Nandurbar',28,3,NULL,NULL,NULL,NULL,NULL,1,778),(780,'Nashik',28,3,NULL,NULL,NULL,NULL,NULL,1,779),(781,'Osmanabad',28,3,NULL,NULL,NULL,NULL,NULL,1,780),(782,'Palghar',28,3,NULL,NULL,NULL,NULL,NULL,1,781),(783,'Parbhani',28,3,NULL,NULL,NULL,NULL,NULL,1,782),(784,'Pune',28,3,NULL,NULL,NULL,NULL,NULL,1,783),(785,'Raigad',28,3,NULL,NULL,NULL,NULL,NULL,1,784),(786,'Ratnagiri',28,3,NULL,NULL,NULL,NULL,NULL,1,785),(787,'Sangli',28,3,NULL,NULL,NULL,NULL,NULL,1,786),(788,'Satara',28,3,NULL,NULL,NULL,NULL,NULL,1,787),(789,'Sindhudurg',28,3,NULL,NULL,NULL,NULL,NULL,1,788),(790,'Solapur',28,3,NULL,NULL,NULL,NULL,NULL,1,789),(791,'Thane',28,3,NULL,NULL,NULL,NULL,NULL,1,790),(792,'Wardha',28,3,NULL,NULL,NULL,NULL,NULL,1,791),(793,'Washim',28,3,NULL,NULL,NULL,NULL,NULL,1,792),(794,'Yavatmal',28,3,NULL,NULL,NULL,NULL,NULL,1,793),(795,'Bishnupur',15,3,NULL,NULL,NULL,NULL,NULL,1,794),(796,'Chandel',15,3,NULL,NULL,NULL,NULL,NULL,1,795),(797,'Churachandpur',15,3,NULL,NULL,NULL,NULL,NULL,1,796),(798,'Imphal East',15,3,NULL,NULL,NULL,NULL,NULL,1,797),(799,'Imphal West',15,3,NULL,NULL,NULL,NULL,NULL,1,798),(800,'Jiribam',15,3,NULL,NULL,NULL,NULL,NULL,1,799),(801,'Kakching',15,3,NULL,NULL,NULL,NULL,NULL,1,800),(802,'Kamjong',15,3,NULL,NULL,NULL,NULL,NULL,1,801),(803,'Kangpokpi',15,3,NULL,NULL,NULL,NULL,NULL,1,802),(804,'Noney',15,3,NULL,NULL,NULL,NULL,NULL,1,803),(805,'Pherzawl',15,3,NULL,NULL,NULL,NULL,NULL,1,804),(806,'Senapati',15,3,NULL,NULL,NULL,NULL,NULL,1,805),(807,'Tamenglong',15,3,NULL,NULL,NULL,NULL,NULL,1,806),(808,'Tengnoupal',15,3,NULL,NULL,NULL,NULL,NULL,1,807),(809,'Thoubal',15,3,NULL,NULL,NULL,NULL,NULL,1,808),(810,'Ukhrul',15,3,NULL,NULL,NULL,NULL,NULL,1,809),(811,'East Garo Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,810),(812,'East Jaintia Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,811),(813,'East Khasi Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,812),(814,'North Garo Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,813),(815,'Ri Bhoi',18,3,NULL,NULL,NULL,NULL,NULL,1,814),(816,'South Garo Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,815),(817,'South West Garo Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,816),(818,'South West Khasi Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,817),(819,'West Garo Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,818),(820,'West Jaintia Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,819),(821,'West Khasi Hills',18,3,NULL,NULL,NULL,NULL,NULL,1,820),(822,'Aizawl',16,3,NULL,NULL,NULL,NULL,NULL,1,821),(823,'Champhai',16,3,NULL,NULL,NULL,NULL,NULL,1,822),(824,'Hnahthial',16,3,NULL,NULL,NULL,NULL,NULL,1,823),(825,'Kolasib',16,3,NULL,NULL,NULL,NULL,NULL,1,824),(826,'Khawzawl',16,3,NULL,NULL,NULL,NULL,NULL,1,825),(827,'Lawngtlai',16,3,NULL,NULL,NULL,NULL,NULL,1,826),(828,'Lunglei',16,3,NULL,NULL,NULL,NULL,NULL,1,827),(829,'Mamit',16,3,NULL,NULL,NULL,NULL,NULL,1,828),(830,'Saiha',16,3,NULL,NULL,NULL,NULL,NULL,1,829),(831,'Serchhip',16,3,NULL,NULL,NULL,NULL,NULL,1,830),(832,'Saitual',16,3,NULL,NULL,NULL,NULL,NULL,1,831),(833,'Dimapur',14,3,NULL,NULL,NULL,NULL,NULL,1,832),(834,'Kiphire',14,3,NULL,NULL,NULL,NULL,NULL,1,833),(835,'Kohima',14,3,NULL,NULL,NULL,NULL,NULL,1,834),(836,'Longleng',14,3,NULL,NULL,NULL,NULL,NULL,1,835),(837,'Mokokchung',14,3,NULL,NULL,NULL,NULL,NULL,1,836),(838,'Mon',14,3,NULL,NULL,NULL,NULL,NULL,1,837),(839,'Noklak',14,3,NULL,NULL,NULL,NULL,NULL,1,838),(840,'Peren',14,3,NULL,NULL,NULL,NULL,NULL,1,839),(841,'Phek',14,3,NULL,NULL,NULL,NULL,NULL,1,840),(842,'Tuensang',14,3,NULL,NULL,NULL,NULL,NULL,1,841),(843,'Wokha',14,3,NULL,NULL,NULL,NULL,NULL,1,842),(844,'Zunheboto',14,3,NULL,NULL,NULL,NULL,NULL,1,843),(845,'Angul',22,3,NULL,NULL,NULL,NULL,NULL,1,844),(846,'Balangir',22,3,NULL,NULL,NULL,NULL,NULL,1,845),(847,'Balasore',22,3,NULL,NULL,NULL,NULL,NULL,1,846),(848,'Bargarh',22,3,NULL,NULL,NULL,NULL,NULL,1,847),(849,'Bhadrak',22,3,NULL,NULL,NULL,NULL,NULL,1,848),(850,'Boudh',22,3,NULL,NULL,NULL,NULL,NULL,1,849),(851,'Cuttack',22,3,NULL,NULL,NULL,NULL,NULL,1,850),(852,'Debagarh',22,3,NULL,NULL,NULL,NULL,NULL,1,851),(853,'Dhenkanal',22,3,NULL,NULL,NULL,NULL,NULL,1,852),(854,'Gajapati',22,3,NULL,NULL,NULL,NULL,NULL,1,853),(855,'Ganjam',22,3,NULL,NULL,NULL,NULL,NULL,1,854),(856,'Jagatsinghpur',22,3,NULL,NULL,NULL,NULL,NULL,1,855),(857,'Jajpur',22,3,NULL,NULL,NULL,NULL,NULL,1,856),(858,'Jharsuguda',22,3,NULL,NULL,NULL,NULL,NULL,1,857),(859,'Kalahandi',22,3,NULL,NULL,NULL,NULL,NULL,1,858),(860,'Kandhamal',22,3,NULL,NULL,NULL,NULL,NULL,1,859),(861,'Kendrapara',22,3,NULL,NULL,NULL,NULL,NULL,1,860),(862,'Kendujhar',22,3,NULL,NULL,NULL,NULL,NULL,1,861),(863,'Khordha',22,3,NULL,NULL,NULL,NULL,NULL,1,862),(864,'Koraput',22,3,NULL,NULL,NULL,NULL,NULL,1,863),(865,'Malkangiri',22,3,NULL,NULL,NULL,NULL,NULL,1,864),(866,'Mayurbhanj',22,3,NULL,NULL,NULL,NULL,NULL,1,865),(867,'Nabarangpur',22,3,NULL,NULL,NULL,NULL,NULL,1,866),(868,'Nayagarh',22,3,NULL,NULL,NULL,NULL,NULL,1,867),(869,'Nuapada',22,3,NULL,NULL,NULL,NULL,NULL,1,868),(870,'Puri',22,3,NULL,NULL,NULL,NULL,NULL,1,869),(871,'Rayagada',22,3,NULL,NULL,NULL,NULL,NULL,1,870),(872,'Sambalpur',22,3,NULL,NULL,NULL,NULL,NULL,1,871),(873,'Subarnapur',22,3,NULL,NULL,NULL,NULL,NULL,1,872),(874,'Sundergarh',22,3,NULL,NULL,NULL,NULL,NULL,1,873),(875,'Karaikal',34,3,NULL,NULL,NULL,NULL,NULL,1,874),(876,'Mahe',34,3,NULL,NULL,NULL,NULL,NULL,1,875),(877,'Puducherry',34,3,NULL,NULL,NULL,NULL,NULL,1,876),(878,'Yanam',34,3,NULL,NULL,NULL,NULL,NULL,1,877),(879,'Amritsar',4,3,NULL,NULL,NULL,NULL,NULL,1,878),(880,'Barnala',4,3,NULL,NULL,NULL,NULL,NULL,1,879),(881,'Bathinda',4,3,NULL,NULL,NULL,NULL,NULL,1,880),(882,'Faridkot',4,3,NULL,NULL,NULL,NULL,NULL,1,881),(883,'Fatehgarh Sahib',4,3,NULL,NULL,NULL,NULL,NULL,1,882),(884,'Fazilka',4,3,NULL,NULL,NULL,NULL,NULL,1,883),(885,'Firozpur',4,3,NULL,NULL,NULL,NULL,NULL,1,884),(886,'Gurdaspur',4,3,NULL,NULL,NULL,NULL,NULL,1,885),(887,'Hoshiarpur',4,3,NULL,NULL,NULL,NULL,NULL,1,886),(888,'Jalandhar',4,3,NULL,NULL,NULL,NULL,NULL,1,887),(889,'Kapurthala',4,3,NULL,NULL,NULL,NULL,NULL,1,888),(890,'Ludhiana',4,3,NULL,NULL,NULL,NULL,NULL,1,889),(891,'Mansa',4,3,NULL,NULL,NULL,NULL,NULL,1,890),(892,'Moga',4,3,NULL,NULL,NULL,NULL,NULL,1,891),(893,'Mohali',4,3,NULL,NULL,NULL,NULL,NULL,1,892),(894,'Muktsar',4,3,NULL,NULL,NULL,NULL,NULL,1,893),(895,'Pathankot',4,3,NULL,NULL,NULL,NULL,NULL,1,894),(896,'Patiala',4,3,NULL,NULL,NULL,NULL,NULL,1,895),(897,'Rupnagar',4,3,NULL,NULL,NULL,NULL,NULL,1,896),(898,'Sangrur',4,3,NULL,NULL,NULL,NULL,NULL,1,897),(899,'Shaheed Bhagat Singh Nagar',4,3,NULL,NULL,NULL,NULL,NULL,1,898),(900,'Tarn Taran',4,3,NULL,NULL,NULL,NULL,NULL,1,899),(901,'Ajmer',9,3,NULL,NULL,NULL,NULL,NULL,1,900),(902,'Alwar',9,3,NULL,NULL,NULL,NULL,NULL,1,901),(903,'Banswara',9,3,NULL,NULL,NULL,NULL,NULL,1,902),(904,'Baran',9,3,NULL,NULL,NULL,NULL,NULL,1,903),(905,'Barmer',9,3,NULL,NULL,NULL,NULL,NULL,1,904),(906,'Bharatpur',9,3,NULL,NULL,NULL,NULL,NULL,1,905),(907,'Bhilwara',9,3,NULL,NULL,NULL,NULL,NULL,1,906),(908,'Bikaner',9,3,NULL,NULL,NULL,NULL,NULL,1,907),(909,'Bundi',9,3,NULL,NULL,NULL,NULL,NULL,1,908),(910,'Chittorgarh',9,3,NULL,NULL,NULL,NULL,NULL,1,909),(911,'Churu',9,3,NULL,NULL,NULL,NULL,NULL,1,910),(912,'Dausa',9,3,NULL,NULL,NULL,NULL,NULL,1,911),(913,'Dholpur',9,3,NULL,NULL,NULL,NULL,NULL,1,912),(914,'Dungarpur',9,3,NULL,NULL,NULL,NULL,NULL,1,913),(915,'Hanumangarh',9,3,NULL,NULL,NULL,NULL,NULL,1,914),(916,'Jaipur',9,3,NULL,NULL,NULL,NULL,NULL,1,915),(917,'Jaisalmer',9,3,NULL,NULL,NULL,NULL,NULL,1,916),(918,'Jalore',9,3,NULL,NULL,NULL,NULL,NULL,1,917),(919,'Jhalawar',9,3,NULL,NULL,NULL,NULL,NULL,1,918),(920,'Jhunjhunu',9,3,NULL,NULL,NULL,NULL,NULL,1,919),(921,'Jodhpur',9,3,NULL,NULL,NULL,NULL,NULL,1,920),(922,'Karauli',9,3,NULL,NULL,NULL,NULL,NULL,1,921),(923,'Kota',9,3,NULL,NULL,NULL,NULL,NULL,1,922),(924,'Nagaur',9,3,NULL,NULL,NULL,NULL,NULL,1,923),(925,'Pali',9,3,NULL,NULL,NULL,NULL,NULL,1,924),(926,'Pratapgarh',9,3,NULL,NULL,NULL,NULL,NULL,1,925),(927,'Rajsamand',9,3,NULL,NULL,NULL,NULL,NULL,1,926),(928,'Sawai Madhopur',9,3,NULL,NULL,NULL,NULL,NULL,1,927),(929,'Sikar',9,3,NULL,NULL,NULL,NULL,NULL,1,928),(930,'Sirohi',9,3,NULL,NULL,NULL,NULL,NULL,1,929),(931,'Sri Ganganagar',9,3,NULL,NULL,NULL,NULL,NULL,1,930),(932,'Tonk',9,3,NULL,NULL,NULL,NULL,NULL,1,931),(933,'Udaipur',9,3,NULL,NULL,NULL,NULL,NULL,1,932),(934,'East Sikkim',12,3,NULL,NULL,NULL,NULL,NULL,1,933),(935,'North Sikkim',12,3,NULL,NULL,NULL,NULL,NULL,1,934),(936,'South Sikkim',12,3,NULL,NULL,NULL,NULL,NULL,1,935),(937,'West Sikkim',12,3,NULL,NULL,NULL,NULL,NULL,1,936),(938,'Adilabad',36,3,NULL,NULL,NULL,NULL,NULL,1,937),(939,'Bhadradri Kothagudem',36,3,NULL,NULL,NULL,NULL,NULL,1,938),(940,'Hyderabad',36,3,NULL,NULL,NULL,NULL,NULL,1,939),(941,'Jagtial',36,3,NULL,NULL,NULL,NULL,NULL,1,940),(942,'Jangaon',36,3,NULL,NULL,NULL,NULL,NULL,1,941),(943,'Jayashankar',36,3,NULL,NULL,NULL,NULL,NULL,1,942),(944,'Jogulamba',36,3,NULL,NULL,NULL,NULL,NULL,1,943),(945,'Kamareddy',36,3,NULL,NULL,NULL,NULL,NULL,1,944),(946,'Karimnagar',36,3,NULL,NULL,NULL,NULL,NULL,1,945),(947,'Khammam',36,3,NULL,NULL,NULL,NULL,NULL,1,946),(948,'Komaram Bheem',36,3,NULL,NULL,NULL,NULL,NULL,1,947),(949,'Mahabubabad',36,3,NULL,NULL,NULL,NULL,NULL,1,948),(950,'Mahbubnagar',36,3,NULL,NULL,NULL,NULL,NULL,1,949),(951,'Mancherial',36,3,NULL,NULL,NULL,NULL,NULL,1,950),(952,'Medak',36,3,NULL,NULL,NULL,NULL,NULL,1,951),(953,'Medchal',36,3,NULL,NULL,NULL,NULL,NULL,1,952),(954,'Mulugu',36,3,NULL,NULL,NULL,NULL,NULL,1,953),(955,'Nagarkurnool',36,3,NULL,NULL,NULL,NULL,NULL,1,954),(956,'Nalgonda',36,3,NULL,NULL,NULL,NULL,NULL,1,955),(957,'Narayanpet',36,3,NULL,NULL,NULL,NULL,NULL,1,956),(958,'Nirmal',36,3,NULL,NULL,NULL,NULL,NULL,1,957),(959,'Nizamabad',36,3,NULL,NULL,NULL,NULL,NULL,1,958),(960,'Peddapalli',36,3,NULL,NULL,NULL,NULL,NULL,1,959),(961,'Rajanna Sircilla',36,3,NULL,NULL,NULL,NULL,NULL,1,960),(962,'Ranga Reddy',36,3,NULL,NULL,NULL,NULL,NULL,1,961),(963,'Sangareddy',36,3,NULL,NULL,NULL,NULL,NULL,1,962),(964,'Siddipet',36,3,NULL,NULL,NULL,NULL,NULL,1,963),(965,'Suryapet',36,3,NULL,NULL,NULL,NULL,NULL,1,964),(966,'Vikarabad',36,3,NULL,NULL,NULL,NULL,NULL,1,965),(967,'Wanaparthy',36,3,NULL,NULL,NULL,NULL,NULL,1,966),(968,'Warangal Rural',36,3,NULL,NULL,NULL,NULL,NULL,1,967),(969,'Warangal Urban',36,3,NULL,NULL,NULL,NULL,NULL,1,968),(970,'Yadadri Bhuvanagiri',36,3,NULL,NULL,NULL,NULL,NULL,1,969),(971,'Dhalai',17,3,NULL,NULL,NULL,NULL,NULL,1,970),(972,'Gomati',17,3,NULL,NULL,NULL,NULL,NULL,1,971),(973,'Khowai',17,3,NULL,NULL,NULL,NULL,NULL,1,972),(974,'North Tripura',17,3,NULL,NULL,NULL,NULL,NULL,1,973),(975,'Sepahijala',17,3,NULL,NULL,NULL,NULL,NULL,1,974),(976,'South Tripura',17,3,NULL,NULL,NULL,NULL,NULL,1,975),(977,'Unakoti',17,3,NULL,NULL,NULL,NULL,NULL,1,976),(978,'West Tripura',17,3,NULL,NULL,NULL,NULL,NULL,1,977),(979,'Agra',10,3,NULL,NULL,NULL,NULL,NULL,1,978),(980,'Aligarh',10,3,NULL,NULL,NULL,NULL,NULL,1,979),(981,'Ambedkar Nagar',10,3,NULL,NULL,NULL,NULL,NULL,1,980),(982,'Amethi',10,3,NULL,NULL,NULL,NULL,NULL,1,981),(983,'Amroha',10,3,NULL,NULL,NULL,NULL,NULL,1,982),(984,'Auraiya',10,3,NULL,NULL,NULL,NULL,NULL,1,983),(985,'Ayodhya',10,3,NULL,NULL,NULL,NULL,NULL,1,984),(986,'Azamgarh',10,3,NULL,NULL,NULL,NULL,NULL,1,985),(987,'Baghpat',10,3,NULL,NULL,NULL,NULL,NULL,1,986),(988,'Bahraich',10,3,NULL,NULL,NULL,NULL,NULL,1,987),(989,'Ballia',10,3,NULL,NULL,NULL,NULL,NULL,1,988),(990,'Balrampur',10,3,NULL,NULL,NULL,NULL,NULL,1,989),(991,'Banda',10,3,NULL,NULL,NULL,NULL,NULL,1,990),(992,'Barabanki',10,3,NULL,NULL,NULL,NULL,NULL,1,991),(993,'Bareilly',10,3,NULL,NULL,NULL,NULL,NULL,1,992),(994,'Basti',10,3,NULL,NULL,NULL,NULL,NULL,1,993),(995,'Bhadohi',10,3,NULL,NULL,NULL,NULL,NULL,1,994),(996,'Bijnor',10,3,NULL,NULL,NULL,NULL,NULL,1,995),(997,'Budaun',10,3,NULL,NULL,NULL,NULL,NULL,1,996),(998,'Bulandshahr',10,3,NULL,NULL,NULL,NULL,NULL,1,997),(999,'Chandauli',10,3,NULL,NULL,NULL,NULL,NULL,1,998),(1000,'Chitrakoot',10,3,NULL,NULL,NULL,NULL,NULL,1,999),(1001,'Deoria',10,3,NULL,NULL,NULL,NULL,NULL,1,1000),(1002,'Etah',10,3,NULL,NULL,NULL,NULL,NULL,1,1001),(1003,'Etawah',10,3,NULL,NULL,NULL,NULL,NULL,1,1002),(1004,'Farrukhabad',10,3,NULL,NULL,NULL,NULL,NULL,1,1003),(1005,'Fatehpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1004),(1006,'Firozabad',10,3,NULL,NULL,NULL,NULL,NULL,1,1005),(1007,'Gautam Buddha Nagar',10,3,NULL,NULL,NULL,NULL,NULL,1,1006),(1008,'Ghaziabad',10,3,NULL,NULL,NULL,NULL,NULL,1,1007),(1009,'Ghazipur',10,3,NULL,NULL,NULL,NULL,NULL,1,1008),(1010,'Gonda',10,3,NULL,NULL,NULL,NULL,NULL,1,1009),(1011,'Gorakhpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1010),(1012,'Hamirpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1011),(1013,'Hapur',10,3,NULL,NULL,NULL,NULL,NULL,1,1012),(1014,'Hardoi',10,3,NULL,NULL,NULL,NULL,NULL,1,1013),(1015,'Hathras',10,3,NULL,NULL,NULL,NULL,NULL,1,1014),(1016,'Jalaun',10,3,NULL,NULL,NULL,NULL,NULL,1,1015),(1017,'Jaunpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1016),(1018,'Jhansi',10,3,NULL,NULL,NULL,NULL,NULL,1,1017),(1019,'Kannauj',10,3,NULL,NULL,NULL,NULL,NULL,1,1018),(1020,'Kanpur Dehat',10,3,NULL,NULL,NULL,NULL,NULL,1,1019),(1021,'Kanpur Nagar',10,3,NULL,NULL,NULL,NULL,NULL,1,1020),(1022,'Kasganj',10,3,NULL,NULL,NULL,NULL,NULL,1,1021),(1023,'Kaushambi',10,3,NULL,NULL,NULL,NULL,NULL,1,1022),(1024,'Kheri',10,3,NULL,NULL,NULL,NULL,NULL,1,1023),(1025,'Kushinagar',10,3,NULL,NULL,NULL,NULL,NULL,1,1024),(1026,'Lalitpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1025),(1027,'Lucknow',10,3,NULL,NULL,NULL,NULL,NULL,1,1026),(1028,'Maharajganj',10,3,NULL,NULL,NULL,NULL,NULL,1,1027),(1029,'Mahoba',10,3,NULL,NULL,NULL,NULL,NULL,1,1028),(1030,'Mainpuri',10,3,NULL,NULL,NULL,NULL,NULL,1,1029),(1031,'Mathura',10,3,NULL,NULL,NULL,NULL,NULL,1,1030),(1032,'Mau',10,3,NULL,NULL,NULL,NULL,NULL,1,1031),(1033,'Meerut',10,3,NULL,NULL,NULL,NULL,NULL,1,1032),(1034,'Mirzapur',10,3,NULL,NULL,NULL,NULL,NULL,1,1033),(1035,'Moradabad',10,3,NULL,NULL,NULL,NULL,NULL,1,1034),(1036,'Muzaffarnagar',10,3,NULL,NULL,NULL,NULL,NULL,1,1035),(1037,'Pilibhit',10,3,NULL,NULL,NULL,NULL,NULL,1,1036),(1038,'Pratapgarh',10,3,NULL,NULL,NULL,NULL,NULL,1,1037),(1039,'Prayagraj',10,3,NULL,NULL,NULL,NULL,NULL,1,1038),(1040,'Raebareli',10,3,NULL,NULL,NULL,NULL,NULL,1,1039),(1041,'Rampur',10,3,NULL,NULL,NULL,NULL,NULL,1,1040),(1042,'Saharanpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1041),(1043,'Sambhal',10,3,NULL,NULL,NULL,NULL,NULL,1,1042),(1044,'Sant Kabir Nagar',10,3,NULL,NULL,NULL,NULL,NULL,1,1043),(1045,'Shahjahanpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1044),(1046,'Shamli',10,3,NULL,NULL,NULL,NULL,NULL,1,1045),(1047,'Shravasti',10,3,NULL,NULL,NULL,NULL,NULL,1,1046),(1048,'Siddharthnagar',10,3,NULL,NULL,NULL,NULL,NULL,1,1047),(1049,'Sitapur',10,3,NULL,NULL,NULL,NULL,NULL,1,1048),(1050,'Sonbhadra',10,3,NULL,NULL,NULL,NULL,NULL,1,1049),(1051,'Sultanpur',10,3,NULL,NULL,NULL,NULL,NULL,1,1050),(1052,'Unnao',10,3,NULL,NULL,NULL,NULL,NULL,1,1051),(1053,'Varanasi',10,3,NULL,NULL,NULL,NULL,NULL,1,1052),(1054,'Almora',6,3,NULL,NULL,NULL,NULL,NULL,1,1053),(1055,'Bageshwar',6,3,NULL,NULL,NULL,NULL,NULL,1,1054),(1056,'Chamoli',6,3,NULL,NULL,NULL,NULL,NULL,1,1055),(1057,'Champawat',6,3,NULL,NULL,NULL,NULL,NULL,1,1056),(1058,'Dehradun',6,3,NULL,NULL,NULL,NULL,NULL,1,1057),(1059,'Haridwar',6,3,NULL,NULL,NULL,NULL,NULL,1,1058),(1060,'Nainital',6,3,NULL,NULL,NULL,NULL,NULL,1,1059),(1061,'Pauri',6,3,NULL,NULL,NULL,NULL,NULL,1,1060),(1062,'Pithoragarh',6,3,NULL,NULL,NULL,NULL,NULL,1,1061),(1063,'Rudraprayag',6,3,NULL,NULL,NULL,NULL,NULL,1,1062),(1064,'Tehri',6,3,NULL,NULL,NULL,NULL,NULL,1,1063),(1065,'Udham Singh Nagar',6,3,NULL,NULL,NULL,NULL,NULL,1,1064),(1066,'Uttarkashi',6,3,NULL,NULL,NULL,NULL,NULL,1,1065),(1067,'Alipurduar',20,3,NULL,NULL,NULL,NULL,NULL,1,1066),(1068,'Bankura',20,3,NULL,NULL,NULL,NULL,NULL,1,1067),(1069,'Birbhum',20,3,NULL,NULL,NULL,NULL,NULL,1,1068),(1070,'Cooch Behar',20,3,NULL,NULL,NULL,NULL,NULL,1,1069),(1071,'Dakshin Dinajpur',20,3,NULL,NULL,NULL,NULL,NULL,1,1070),(1072,'Darjeeling',20,3,NULL,NULL,NULL,NULL,NULL,1,1071),(1073,'Hooghly',20,3,NULL,NULL,NULL,NULL,NULL,1,1072),(1074,'Howrah',20,3,NULL,NULL,NULL,NULL,NULL,1,1073),(1075,'Jalpaiguri',20,3,NULL,NULL,NULL,NULL,NULL,1,1074),(1076,'Jhargram',20,3,NULL,NULL,NULL,NULL,NULL,1,1075),(1077,'Kalimpong',20,3,NULL,NULL,NULL,NULL,NULL,1,1076),(1078,'Kolkata',20,3,NULL,NULL,NULL,NULL,NULL,1,1077),(1079,'Malda',20,3,NULL,NULL,NULL,NULL,NULL,1,1078),(1080,'Murshidabad',20,3,NULL,NULL,NULL,NULL,NULL,1,1079),(1081,'Nadia',20,3,NULL,NULL,NULL,NULL,NULL,1,1080),(1082,'North 24 Parganas',20,3,NULL,NULL,NULL,NULL,NULL,1,1081),(1083,'Paschim Bardhaman',20,3,NULL,NULL,NULL,NULL,NULL,1,1082),(1084,'Paschim Medinipur',20,3,NULL,NULL,NULL,NULL,NULL,1,1083),(1085,'Purba Bardhaman',20,3,NULL,NULL,NULL,NULL,NULL,1,1084),(1086,'Purba Medinipur',20,3,NULL,NULL,NULL,NULL,NULL,1,1085),(1087,'Purulia',20,3,NULL,NULL,NULL,NULL,NULL,1,1086),(1088,'South 24 Parganas',20,3,NULL,NULL,NULL,NULL,NULL,1,1087),(1089,'Uttar Dinajpur',20,3,NULL,NULL,NULL,NULL,NULL,1,1088);
/*!40000 ALTER TABLE `master_geo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_geo_level`
--

DROP TABLE IF EXISTS `master_geo_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_geo_level` (
  `Geo_Level_Code` int(11) DEFAULT NULL,
  `Geo_Level_Name` varchar(50) DEFAULT NULL,
  `Geo_Level_Isactive` tinyint(4) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_geo_level`
--

LOCK TABLES `master_geo_level` WRITE;
/*!40000 ALTER TABLE `master_geo_level` DISABLE KEYS */;
INSERT INTO `master_geo_level` VALUES (1,'Country',1,1),(2,'State',1,2),(3,'District',1,3),(4,'Taluk',1,4),(5,'Village/Area',1,5);
/*!40000 ALTER TABLE `master_geo_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_geo_type`
--

DROP TABLE IF EXISTS `master_geo_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_geo_type` (
  `Geo_Type_Code` int(11) DEFAULT NULL,
  `Geo_Type_Name` varchar(50) DEFAULT NULL,
  `Geo_Type_Isactive` tinyint(4) DEFAULT NULL,
  `Geo_Type_Batch` int(11) DEFAULT NULL,
  `Geo_Type_B_Batch` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_geo_type`
--

LOCK TABLES `master_geo_type` WRITE;
/*!40000 ALTER TABLE `master_geo_type` DISABLE KEYS */;
INSERT INTO `master_geo_type` VALUES (1,'Metropolitan City',1,NULL,NULL,1),(2,'Municipal Corporation',1,NULL,NULL,2),(3,'Municipality',1,NULL,NULL,3),(4,'Town panchayat',1,NULL,NULL,4),(5,'Village panchayat',1,NULL,NULL,5);
/*!40000 ALTER TABLE `master_geo_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_lov`
--

DROP TABLE IF EXISTS `master_lov`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_lov` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_lov`
--

LOCK TABLES `master_lov` WRITE;
/*!40000 ALTER TABLE `master_lov` DISABLE KEYS */;
INSERT INTO `master_lov` VALUES (1,'0 - 3 years','vendor_experience',NULL,1),(2,'3 - 5 years','vendor_experience',NULL,1),(3,'5 - 7 years','vendor_experience',NULL,1),(4,'7 - 10 years','vendor_experience',NULL,1),(5,'10+ years','vendor_experience',NULL,1);
/*!40000 ALTER TABLE `master_lov` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_subscription`
--

DROP TABLE IF EXISTS `master_subscription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_subscription` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `duration_months` int(10) unsigned NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `project_count` int(11) NOT NULL,
  `price_per_project` decimal(18,2) DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_subscription`
--

LOCK TABLES `master_subscription` WRITE;
/*!40000 ALTER TABLE `master_subscription` DISABLE KEYS */;
INSERT INTO `master_subscription` VALUES (1,'3 Months (Silver)','4500 Rs + 18% GST',3,5310.00,5,900.00,90,1),(2,'6 Months (Gold)','7200 Rs + 18% GST',6,8496.00,15,700.00,180,1),(3,'12 Months (Platinum)','11,760 Rs + 18% GST',12,13877.00,25,600.00,365,1),(6,'Trail','Trial For 7 Days',0,13877.00,25,600.00,7,0);
/*!40000 ALTER TABLE `master_subscription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_subscription_for_freelancer`
--

DROP TABLE IF EXISTS `master_subscription_for_freelancer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_subscription_for_freelancer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(191) DEFAULT NULL,
  `duration_months` int(10) unsigned NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `project_count` int(11) NOT NULL,
  `price_per_project` decimal(18,2) DEFAULT NULL,
  `duration_days` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_subscription_for_freelancer`
--

LOCK TABLES `master_subscription_for_freelancer` WRITE;
/*!40000 ALTER TABLE `master_subscription_for_freelancer` DISABLE KEYS */;
INSERT INTO `master_subscription_for_freelancer` VALUES (6,'1 Year Subscription','1,299 Rs + 18% GST',12,1533.00,25,600.00,365);
/*!40000 ALTER TABLE `master_subscription_for_freelancer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor`
--

DROP TABLE IF EXISTS `master_vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `type_id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `description` text DEFAULT NULL,
  `payment_terms` text DEFAULT NULL,
  `additional_cost` text DEFAULT NULL,
  `experience_lov_id` int(11) DEFAULT NULL,
  `site_url` varchar(250) DEFAULT NULL,
  `fb_url` varchar(250) DEFAULT NULL,
  `instagram_url` varchar(250) DEFAULT NULL,
  `youtube_url` varchar(250) DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  `identifier` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor`
--

LOCK TABLES `master_vendor` WRITE;
/*!40000 ALTER TABLE `master_vendor` DISABLE KEYS */;
INSERT INTO `master_vendor` VALUES (1,'Suriya Flims',1,'suriyaprakash@mazeworkssolutions.com','8056322836',NULL,NULL,NULL,5,NULL,NULL,NULL,NULL,NULL,'2021-06-11 17:20:38',NULL,NULL,0,'d7bc0a9f-b5d0-448b-a271-dbf9ea8fe310'),(2,'Surya Images',1,'pksteja@gmail.com','9840444991',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-06-11 17:26:03',NULL,NULL,0,'0d493e0b-5ed5-4bc7-866a-c275fc879038'),(3,'Sujithkarad',1,'suji2025@gmail.com','9387512474',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-06-12 04:24:40',NULL,NULL,0,'c6df633c-c008-415a-b236-26abae990cfa'),(4,'Surya',1,'steja2606@gmail.com','8190955559',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-08 07:35:52',NULL,NULL,0,'9435629e-1c45-459b-b340-521c2855f3be'),(5,'shahin',1,'shahinck@gmail.com','9447157707',NULL,'50% at booking balance on the day of event',NULL,5,NULL,NULL,NULL,NULL,NULL,'2021-07-08 07:45:39',NULL,NULL,0,'2f86764b-d416-468c-bd58-2f6df2f3ea7d'),(6,'Nabeelparappanangadi',1,'nabeel7666@gmail.com','9048766653',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-19 04:39:11',NULL,NULL,0,'18bb590c-d216-48f9-ad12-8ac30dd896f9'),(7,'Dileep kumar vk',1,'dileepkumar@gamil.com','9747720082',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-19 05:14:35',NULL,NULL,0,'cdd37133-14bc-4277-a30d-b355545bcc41'),(8,'Ragesh M K',1,'rageshphotographycalicut@gmail.com','9605848275',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-19 05:50:12',NULL,NULL,0,'d0b9c202-9fd2-4fe1-af86-cfbe644d258f'),(9,'Ajicolonia',1,'ajicolonia1@gmail.com','9447354654',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-21 07:55:06',NULL,NULL,0,'29a4a5a6-71c4-4e2c-891a-d62f37b504bc'),(10,'SAJI Photography',1,'sajiweddingcompany@gmail.com','9744436190',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-23 08:07:14',NULL,NULL,0,'58e33433-0eab-486a-bc73-ecbe2c852860'),(11,'Muhammed yashif c v',1,'muhammedyashif@gmail.com','8089064070',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2021-07-23 12:51:52',NULL,NULL,0,'6b2eae25-dd33-4c45-9f35-9a38f508cf54');
/*!40000 ALTER TABLE `master_vendor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_address`
--

DROP TABLE IF EXISTS `master_vendor_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `pincode` varchar(50) NOT NULL,
  `address_line_1` varchar(250) DEFAULT NULL,
  `address_line_2` varchar(250) DEFAULT NULL,
  `landmark` varchar(200) DEFAULT NULL,
  `city_geo_id` int(11) DEFAULT NULL,
  `state_geo_id` int(11) DEFAULT NULL,
  `isprimary` smallint(6) DEFAULT 1,
  `isactive` smallint(6) DEFAULT 1,
  `created_by` varchar(100) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_address`
--

LOCK TABLES `master_vendor_address` WRITE;
/*!40000 ALTER TABLE `master_vendor_address` DISABLE KEYS */;
INSERT INTO `master_vendor_address` VALUES (1,1,'626117','109,Pathiya Pillai Street',NULL,NULL,42,33,0,0,NULL,'2021-06-11 17:22:45',NULL,NULL),(2,5,'676319','sisiram',NULL,NULL,694,32,0,0,NULL,'2021-07-08 07:55:37',NULL,NULL);
/*!40000 ALTER TABLE `master_vendor_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_album`
--

DROP TABLE IF EXISTS `master_vendor_album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_album` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_title` varchar(150) CHARACTER SET utf8 DEFAULT NULL,
  `album_note` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `album_location` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_active` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_album`
--

LOCK TABLES `master_vendor_album` WRITE;
/*!40000 ALTER TABLE `master_vendor_album` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_vendor_album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_album_files`
--

DROP TABLE IF EXISTS `master_vendor_album_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_album_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `album_id` int(11) NOT NULL,
  `vendor_file_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_album_files`
--

LOCK TABLES `master_vendor_album_files` WRITE;
/*!40000 ALTER TABLE `master_vendor_album_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `master_vendor_album_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_files`
--

DROP TABLE IF EXISTS `master_vendor_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `content_length` bigint(20) DEFAULT NULL,
  `content_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `file_type` varchar(50) DEFAULT NULL,
  `updated_by` varchar(100) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `vendor_id` int(11) DEFAULT NULL,
  `is_selected_for_profile` tinyint(1) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_files`
--

LOCK TABLES `master_vendor_files` WRITE;
/*!40000 ALTER TABLE `master_vendor_files` DISABLE KEYS */;
INSERT INTO `master_vendor_files` VALUES (21,'https://www.youtube.com/embed/lD08CuUi_Ek',0,'videos','suriyaprakash@mazeworkssolutions.com','2021-06-12 09:17:35','videos',NULL,NULL,1,0),(22,'https://www.youtube.com/embed/qjfaoe847qQ',0,'videos','suriyaprakash@mazeworkssolutions.com','2021-06-12 09:17:35','videos',NULL,NULL,1,0),(23,'https://www.youtube.com/embed/4Zk5jsm5ZP0',0,'videos','suriyaprakash@mazeworkssolutions.com','2021-06-12 09:17:35','videos',NULL,NULL,1,0),(24,'DSC_4321.jpg',102209,'image/jpeg','suriyaprakash@mazeworkssolutions.com','2021-06-12 17:46:17','photos',NULL,NULL,1,0),(25,'20.jpg',3325317,'image/jpeg','shahinck@gmail.com','2021-07-08 08:15:38','photos',NULL,NULL,5,0),(26,'18.jpg',1541231,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:16','photos',NULL,NULL,5,0),(27,'11.jpg',2353882,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:16','photos',NULL,NULL,5,0),(28,'photo1.jpg',677893,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:17','photos',NULL,NULL,5,0),(29,'photo.jpg',1673077,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:17','photos',NULL,NULL,5,1),(30,'10.JPG',2958301,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:18','photos',NULL,NULL,5,0),(31,'11a.jpg',2661838,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:18','photos',NULL,NULL,5,0),(32,'9.JPG',2968116,'image/jpeg','shahinck@gmail.com','2021-07-08 08:17:19','photos',NULL,NULL,5,0),(33,'Screenshot 2020-09-21 at 1.04.36 PM.png',43388,'image/png','pksteja@gmail.com','2021-07-09 08:57:38','photos',NULL,NULL,2,0),(34,'Screenshot 2020-09-21 at 1.05.29 PM.png',291823,'image/png','pksteja@gmail.com','2021-07-09 08:57:39','photos',NULL,NULL,2,0),(35,'Screenshot 2020-09-21 at 1.08.42 PM.png',202394,'image/png','pksteja@gmail.com','2021-07-09 08:57:39','photos',NULL,NULL,2,0),(36,'Screenshot 2020-09-21 at 1.07.11 PM.png',400391,'image/png','pksteja@gmail.com','2021-07-09 08:57:39','photos',NULL,NULL,2,0),(37,'Screenshot 2020-09-21 at 1.05.02 PM.png',188392,'image/png','pksteja@gmail.com','2021-07-09 08:57:41','photos',NULL,NULL,2,0),(38,'Screenshot 2020-09-21 at 1.04.23 PM.png',158839,'image/png','pksteja@gmail.com','2021-07-09 08:57:41','photos',NULL,NULL,2,0),(39,'Screenshot 2020-09-21 at 1.05.58 PM.png',221488,'image/png','pksteja@gmail.com','2021-07-09 08:57:48','photos',NULL,NULL,2,0),(40,'Screenshot 2020-09-21 at 1.03.51 PM.png',396197,'image/png','pksteja@gmail.com','2021-07-09 08:58:05','photos',NULL,NULL,2,0),(41,'SpacexStarman.jpeg',63751,'image/jpeg','suriyaprakash@mazeworkssolutions.com','2021-07-15 22:00:51','photos',NULL,NULL,1,1),(42,'Drake Equation.png',249331,'image/png','suriyaprakash@mazeworkssolutions.com','2021-07-15 22:00:56','photos',NULL,NULL,1,0),(43,'august-26-2019-hubble-ultra-deep-field.jpg',1560592,'image/jpeg','suriyaprakash@mazeworkssolutions.com','2021-07-15 22:01:07','photos',NULL,NULL,1,0);
/*!40000 ALTER TABLE `master_vendor_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_package`
--

DROP TABLE IF EXISTS `master_vendor_package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_package` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `description` varchar(250) NOT NULL,
  `price_per_day` decimal(18,2) NOT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_package`
--

LOCK TABLES `master_vendor_package` WRITE;
/*!40000 ALTER TABLE `master_vendor_package` DISABLE KEYS */;
INSERT INTO `master_vendor_package` VALUES (1,1,'Star Shoot',100.00,'suriyaprakash@mazeworkssolutions.com','2021-06-11 17:22:45',NULL,NULL),(2,5,'wedding eve and day',30000.00,'shahinck@gmail.com','2021-07-08 07:55:37',NULL,NULL);
/*!40000 ALTER TABLE `master_vendor_package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_service`
--

DROP TABLE IF EXISTS `master_vendor_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_service` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `desc` varchar(100) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_service`
--

LOCK TABLES `master_vendor_service` WRITE;
/*!40000 ALTER TABLE `master_vendor_service` DISABLE KEYS */;
INSERT INTO `master_vendor_service` VALUES (1,'Wedding Photography',NULL,1),(2,'Pre Wedding Shoot',NULL,1),(3,'Baby Shoot ',NULL,1),(4,'Post-wedding photography',NULL,1),(5,'Concept photography',NULL,1),(6,'Destination wedding photography',NULL,1),(7,'Candid photography',NULL,1),(8,'Couple portraits',NULL,1),(9,'Bridal portraits',NULL,1),(10,'Traditional photography',NULL,1),(11,'Photo album',NULL,1),(12,'Digital album',NULL,1),(13,'Photo booth',NULL,1),(14,'Fashion Shoots',NULL,1),(15,'Wedding films',NULL,1),(16,'Video teasers',NULL,1),(17,'Image editing',NULL,1),(18,'Save the Date Videos',NULL,1),(19,'Wedding Films',NULL,1),(20,'Teaser Videos',NULL,1);
/*!40000 ALTER TABLE `master_vendor_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_service_map`
--

DROP TABLE IF EXISTS `master_vendor_service_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_service_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_service_map`
--

LOCK TABLES `master_vendor_service_map` WRITE;
/*!40000 ALTER TABLE `master_vendor_service_map` DISABLE KEYS */;
INSERT INTO `master_vendor_service_map` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,5,1),(22,5,2),(23,5,3),(24,5,4),(25,5,5),(26,5,6),(27,5,7),(28,5,8),(29,5,9),(30,5,10),(31,5,11),(32,5,12),(33,5,13),(34,5,14),(35,5,15),(36,5,16),(37,5,17),(38,5,18),(39,5,19),(40,5,20);
/*!40000 ALTER TABLE `master_vendor_service_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_subscriptions`
--

DROP TABLE IF EXISTS `master_vendor_subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `subscription_id` int(11) NOT NULL,
  `valid_from` datetime NOT NULL,
  `valid_till` datetime DEFAULT NULL,
  `payment_id` int(10) unsigned DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `total_projects` int(10) unsigned DEFAULT NULL,
  `remaining_projects` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_subscriptions`
--

LOCK TABLES `master_vendor_subscriptions` WRITE;
/*!40000 ALTER TABLE `master_vendor_subscriptions` DISABLE KEYS */;
INSERT INTO `master_vendor_subscriptions` VALUES (1,1,6,'2021-06-11 17:20:38','2021-06-18 17:20:38',0,1,25,25),(2,2,6,'2021-06-11 17:26:03','2021-06-18 17:26:03',0,1,25,25),(3,3,6,'2021-06-12 04:24:40','2021-06-19 04:24:40',0,1,25,25),(4,4,6,'2021-07-08 07:35:53','2021-07-15 07:35:52',0,1,25,25),(5,5,6,'2021-07-08 07:45:39','2021-07-15 07:45:39',0,1,25,25),(6,6,6,'2021-07-19 04:39:12','2021-07-26 04:39:11',0,1,25,25),(7,7,6,'2021-07-19 05:14:35','2021-07-26 05:14:35',0,1,25,25),(8,8,6,'2021-07-19 05:50:12','2021-07-26 05:50:12',0,1,25,25),(9,9,6,'2021-07-21 07:55:08','2021-07-28 07:55:06',0,1,25,25),(10,10,6,'2021-07-23 08:07:15','2021-07-30 08:07:14',0,1,25,25),(11,11,6,'2021-07-23 12:51:53','2021-07-30 12:51:52',0,1,25,25);
/*!40000 ALTER TABLE `master_vendor_subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `master_vendor_type`
--

DROP TABLE IF EXISTS `master_vendor_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `master_vendor_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(100) NOT NULL,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `master_vendor_type`
--

LOCK TABLES `master_vendor_type` WRITE;
/*!40000 ALTER TABLE `master_vendor_type` DISABLE KEYS */;
INSERT INTO `master_vendor_type` VALUES (1,'Photographers',1),(2,'Cinema/Video',0),(3,'Pre wedding shoot',0);
/*!40000 ALTER TABLE `master_vendor_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_customer_vendor_selection`
--

DROP TABLE IF EXISTS `trn_customer_vendor_selection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_customer_vendor_selection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_customer_vendor_selection`
--

LOCK TABLES `trn_customer_vendor_selection` WRITE;
/*!40000 ALTER TABLE `trn_customer_vendor_selection` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_customer_vendor_selection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_freelancer_vendor_reviews`
--

DROP TABLE IF EXISTS `trn_freelancer_vendor_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_freelancer_vendor_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `freelancer_id` int(10) unsigned NOT NULL,
  `created_by` varchar(191) NOT NULL,
  `title` varchar(191) CHARACTER SET latin1 NOT NULL,
  `body` text CHARACTER SET latin1 NOT NULL,
  `ratings` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `is_show` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_freelancer_vendor_reviews`
--

LOCK TABLES `trn_freelancer_vendor_reviews` WRITE;
/*!40000 ALTER TABLE `trn_freelancer_vendor_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_freelancer_vendor_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_payments`
--

DROP TABLE IF EXISTS `trn_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_payments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `created_by` varchar(191) NOT NULL,
  `updated_by` varchar(191) DEFAULT NULL,
  `receipt_id` varchar(191) NOT NULL,
  `order_id` varchar(191) DEFAULT NULL,
  `payment_id` varchar(191) DEFAULT NULL,
  `status` enum('pending','received') NOT NULL DEFAULT 'pending',
  `created_date` timestamp NULL DEFAULT current_timestamp(),
  `updated_date` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `response` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_payments`
--

LOCK TABLES `trn_payments` WRITE;
/*!40000 ALTER TABLE `trn_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_project`
--

DROP TABLE IF EXISTS `trn_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(200) CHARACTER SET utf8 NOT NULL,
  `P_Code` int(11) NOT NULL,
  `P_ProjectName` varchar(500) CHARACTER SET utf8 DEFAULT NULL,
  `P_Created_Date` datetime DEFAULT NULL,
  `P_Project_Date` datetime DEFAULT NULL,
  `P_Vendor_Id` int(11) NOT NULL,
  `P_Customer_Id` int(11) NOT NULL,
  `P_GSTNo` varchar(20) DEFAULT NULL,
  `P_Photographer` int(11) DEFAULT NULL,
  `P_Designer` int(11) DEFAULT NULL,
  `P_Project_Value` decimal(18,2) DEFAULT NULL,
  `P_AdvanceAmt` decimal(18,2) DEFAULT NULL,
  `P_Folder` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `P_Equipments` varchar(1000) DEFAULT NULL,
  `P_Key` varchar(6) DEFAULT NULL,
  `P_URL` varchar(1000) DEFAULT NULL,
  `P_Status` varchar(20) DEFAULT NULL,
  `P_Isactive` tinyint(4) DEFAULT NULL,
  `Batch` int(11) DEFAULT NULL,
  `B_Batch` int(11) DEFAULT NULL,
  `C_Code` int(11) DEFAULT NULL,
  `P_CustomerName` varchar(250) DEFAULT NULL,
  `P_EmailId` varchar(300) DEFAULT NULL,
  `P_MobileNo` varchar(15) DEFAULT NULL,
  `P_Alt_MobileNo` varchar(15) DEFAULT NULL,
  `P_Address1` varchar(250) DEFAULT NULL,
  `P_Address2` varchar(250) DEFAULT NULL,
  `P_City` varchar(250) DEFAULT NULL,
  `P_Pin` varchar(7) DEFAULT NULL,
  `P_SubscriptionId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_project`
--

LOCK TABLES `trn_project` WRITE;
/*!40000 ALTER TABLE `trn_project` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_project_files`
--

DROP TABLE IF EXISTS `trn_project_files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_project_files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `file_type` enum('image','thumbnail') NOT NULL DEFAULT 'image',
  `content_length` bigint(20) DEFAULT NULL,
  `content_type` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `created_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_by` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_approved` int(11) DEFAULT 0,
  `approved_by` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `approved_date` datetime DEFAULT NULL,
  `project_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_project_files`
--

LOCK TABLES `trn_project_files` WRITE;
/*!40000 ALTER TABLE `trn_project_files` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_project_files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_vendor_customer_review_replays`
--

DROP TABLE IF EXISTS `trn_vendor_customer_review_replays`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_vendor_customer_review_replays` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `review_id` int(10) unsigned NOT NULL,
  `vendor_id` int(10) unsigned DEFAULT NULL,
  `created_by` varchar(191) NOT NULL,
  `body` text NOT NULL,
  `updated_by` varchar(191) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_vendor_customer_review_replays`
--

LOCK TABLES `trn_vendor_customer_review_replays` WRITE;
/*!40000 ALTER TABLE `trn_vendor_customer_review_replays` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_vendor_customer_review_replays` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_vendor_customer_reviews`
--

DROP TABLE IF EXISTS `trn_vendor_customer_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_vendor_customer_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(10) unsigned NOT NULL,
  `created_by` varchar(191) NOT NULL,
  `title` varchar(191) CHARACTER SET latin1 NOT NULL,
  `body` text CHARACTER SET latin1 NOT NULL,
  `ratings` tinyint(3) unsigned NOT NULL DEFAULT 1,
  `is_show` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `updated_by` int(10) unsigned DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_vendor_customer_reviews`
--

LOCK TABLES `trn_vendor_customer_reviews` WRITE;
/*!40000 ALTER TABLE `trn_vendor_customer_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_vendor_customer_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trn_vendor_freelancer_selection`
--

DROP TABLE IF EXISTS `trn_vendor_freelancer_selection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trn_vendor_freelancer_selection` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vendor_id` int(11) NOT NULL,
  `freelancer_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_vendor_freelancer_selection`
--

LOCK TABLES `trn_vendor_freelancer_selection` WRITE;
/*!40000 ALTER TABLE `trn_vendor_freelancer_selection` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_vendor_freelancer_selection` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-02 12:01:30
