-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: task_manager2
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `assignments`
--

DROP TABLE IF EXISTS `assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `task_id` bigint unsigned NOT NULL,
  `assigned_date` date NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `assignments_user_id_foreign` (`user_id`),
  KEY `assignments_task_id_foreign` (`task_id`),
  CONSTRAINT `assignments_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `taches` (`id`) ON DELETE CASCADE,
  CONSTRAINT `assignments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignments`
--

LOCK TABLES `assignments` WRITE;
/*!40000 ALTER TABLE `assignments` DISABLE KEYS */;
INSERT INTO `assignments` VALUES (1,18,1,'2024-12-31','cancelled','2024-12-31 10:35:19','2025-01-09 21:33:04'),(2,22,1,'2024-12-31','pending','2024-12-31 14:08:52','2025-01-04 06:21:38'),(3,34,2,'2025-01-04','pending','2025-01-04 21:13:47','2025-01-04 21:13:47'),(4,35,7,'2025-01-04','pending','2025-01-04 21:13:58','2025-01-04 21:13:58'),(5,29,7,'2025-01-04','pending','2025-01-04 21:14:19','2025-01-04 21:14:19'),(6,35,10,'2025-01-04','completed','2025-01-04 21:14:32','2025-01-04 21:18:47'),(7,27,3,'2025-01-04','pending','2025-01-04 21:14:44','2025-01-04 21:14:44'),(8,35,5,'2025-01-04','completed','2025-01-04 21:14:59','2025-01-04 21:18:53'),(9,18,2,'2025-01-04','in-progress','2025-01-04 21:15:39','2025-01-09 21:33:00'),(10,18,4,'2025-01-04','in-progress','2025-01-04 21:15:56','2025-01-09 21:32:58'),(11,18,11,'2025-01-08','completed','2025-01-08 10:46:42','2025-01-08 10:47:12');
/*!40000 ALTER TABLE `assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES ('9e6a55b6b4563e652a23be9d623ca5055c356940','i:1;',1735643769),('9e6a55b6b4563e652a23be9d623ca5055c356940:timer','i:1735643769;',1735643769);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2024_12_26_205109_create_projects_table',1),(5,'2024_12_26_205122_create_taches_table',1),(6,'2024_12_26_205256_create_assignments_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `priority` enum('low','medium','high') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('pending','completed','cancelled','in-progress') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_user_id_foreign` (`user_id`),
  CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Gestion des taches',NULL,'2025-01-01','2025-01-02','medium','in-progress',18,'2024-12-31 10:28:30','2024-12-31 10:35:19'),(2,'Laravel',NULL,'2025-01-05','2025-01-06','medium','in-progress',32,'2025-09-04 20:53:15','2025-01-04 20:53:15'),(3,'Traitement des images',NULL,'2025-01-11','2025-01-17','medium','cancelled',18,'2025-09-04 20:53:49','2025-01-04 21:20:17'),(4,'Python',NULL,'2025-01-06','2025-01-12','medium','in-progress',18,'2025-01-04 20:54:15','2025-01-04 21:14:44'),(5,'Machine learning',NULL,'2025-01-06','2025-01-12','medium','in-progress',18,'2025-09-04 20:54:44','2025-01-04 21:13:58'),(6,'Deep learning',NULL,'2025-01-11','2025-01-18','medium','in-progress',18,'2025-01-04 20:55:08','2025-01-04 21:14:32'),(7,'Laravel with react js',NULL,'2025-01-05','2025-01-07','medium','in-progress',18,'2025-01-04 20:55:47','2025-01-04 21:15:56'),(8,'Soft skills',NULL,'2025-01-05','2025-01-11','medium','pending',18,'2025-08-04 20:57:20','2025-01-04 20:57:20'),(9,'Didactique',NULL,'2025-01-05','2025-01-11','medium','in-progress',18,'2025-08-04 20:57:46','2025-01-04 21:14:59'),(10,'Django project',NULL,'2025-01-05','2025-01-11','medium','in-progress',18,'2025-01-04 20:58:14','2025-01-08 10:46:42'),(11,'Streamlit',NULL,'2025-01-12','2025-01-17','medium','pending',18,'2025-05-04 20:58:40','2025-01-04 20:58:40');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('f57MzulWvN5ZvRZLHZNX0ek5jMWbz32TRcGMcxOV',18,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiRFhDT29ZdGhhTXNSSGZuMlYzRFB2NXJSQWJVSHZkM1pJcVN6b3dzSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9maWxlL3Rhc2tzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTg7fQ==',1736462880),('VI4qdbXW4JnmCTRxwnaeTI3mGpt2zxo3D9coKnaH',35,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiem82MElpV0Q5b2JIbHBjS1d2amJVRnJCNFdQOUhOaE16cFVXaUp6OCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MzU7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fX0=',1736348976);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taches`
--

DROP TABLE IF EXISTS `taches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taches` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `project_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` enum('pending','completed','cancelled','in-progress') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `priority` enum('low','medium','high') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `taches_project_id_foreign` (`project_id`),
  CONSTRAINT `taches_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taches`
--

LOCK TABLES `taches` WRITE;
/*!40000 ALTER TABLE `taches` DISABLE KEYS */;
INSERT INTO `taches` VALUES (1,1,'install Laravel',NULL,'pending','medium','2025-01-01','2025-01-07','2024-12-31 10:34:30','2025-01-09 21:33:04'),(2,2,'Install',NULL,'in-progress','low','2025-01-11','2025-01-12','2025-05-04 20:59:41','2025-01-04 21:13:47'),(3,4,'Install python',NULL,'in-progress','low','2025-01-05','2025-01-09','2025-05-04 21:00:04','2025-01-04 21:14:44'),(4,7,'install with laravel installer',NULL,'in-progress','low','2025-01-11','2025-01-18','2025-06-04 21:00:35','2025-01-09 21:32:58'),(5,9,'Contrat didactique',NULL,'completed','low','2025-01-07','2025-01-10','2025-01-04 21:01:07','2025-01-04 21:18:53'),(6,4,'django documentation',NULL,'completed','low','2025-01-11','2025-01-13','2025-07-04 21:01:33','2025-01-09 21:39:00'),(7,5,'Banking interest',NULL,'in-progress','low','2025-01-05','2025-01-07','2025-07-04 21:02:34','2025-01-04 21:13:58'),(9,11,'Deploy ml',NULL,'pending','low','2025-01-11','2025-01-18','2025-01-04 21:03:31','2025-01-08 10:44:37'),(10,6,'recrusive neural network',NULL,'completed','low','2025-01-05','2025-01-08','2025-01-04 21:04:03','2025-01-04 21:18:47'),(11,10,'installation',NULL,'completed','low','2025-01-15','2025-01-16','2025-01-08 10:45:36','2025-01-08 10:47:12');
/*!40000 ALTER TABLE `taches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('designer','developer','tester','manager','analyst') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'developer',
  `status` enum('active','inactive','pending','suspended') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'active',
  `is_superuser` tinyint(1) NOT NULL DEFAULT '0',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (18,'bouba ahmed','ahmedbouba383@gmail.com','2024-12-31 10:15:09','$2y$12$OEprnOOrXhiy9guq8kdL.u4xJGKhikMy0teeXw7ucjJ2LjdxWzkF2','0628987577','manager','active',1,NULL,'2024-12-31 10:12:34','2025-01-04 07:45:30'),(19,'Mr. Bobby Fritsch','giuseppe.kub@example.net','2024-12-31 10:24:49','$2y$12$yRk9YyWLzABmnaY60tNiheeC5jEVOX0gC4lNqazwolG4txlzDG0WW','+13168926094','analyst','inactive',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(20,'Mr. Josh Walker','stefanie.walsh@example.net','2024-12-31 10:24:50','$2y$12$oZMHRCAyUssW24bXUKpTHeTc9dWThS/I8m7q3Dhx9LqpTRuagLYFu','+1989526-1010','developer','suspended',0,NULL,'2024-12-31 10:24:57','2025-01-04 06:58:51'),(21,'Destiney Shields','gcormier@example.net','2024-12-31 10:24:50','$2y$12$qooOfh2f/0xLdYniVyJjYOdvc/YrKlDEDw9gOt2x0ZvRHdFtVl9.G','1-239-917-2769','analyst','inactive',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(22,'Marcos Hyatt','mcglynn.hector@example.org','2024-12-31 10:24:51','$2y$12$FJc9uydUPH46PlgMLaR4XeIqDZ5ZjBXRNNZgIidvQdblWsrm9VK3O','1-603-837-3959','tester','active',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(23,'Adriana Fay','ankunding.gust@example.org','2024-12-31 10:24:51','$2y$12$qcBDncXeT7wJyne0J9Q4UunEW22YDoIPRWCqTTqQAxEPkiXDQh2XW','+1 (251) 415-1943','tester','inactive',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(24,'Miss Bessie Wunsch DVM','kcarroll@example.net','2024-12-31 10:24:52','$2y$12$RXMISqrdUXWtTXLDOgcEF.pLqAHf8CLyi/ZKk3cpfqR.bydwd54wm','+1-305-988-2215','analyst','pending',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(25,'Cecile Mills IV','shaylee.cummerata@example.net','2024-12-31 10:24:52','$2y$12$3DCCip73XTGqNceSYbhkQ.OiOP1.Tjjk2WKGP.sm680tT6YfApQ/G','+13318462073','designer','suspended',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(26,'Immanuel McLaughlin','gschuppe@example.org','2024-12-31 10:24:53','$2y$12$3Vp3YYyUkyt4dXDlDiWCie3K3S6/I39FA4xZ7/LALBJOjvHEizgAW','820.587.7993','manager','active',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(27,'Grace Toy','marty64@example.com','2024-12-31 10:24:53','$2y$12$WKd0Wv0F.SZGGjlG59lxquQSSw9bdRbEWin0ipNwMA3vj9nlOhpfy','+1 (401) 223-6826','developer','pending',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(28,'King Ruecker','alia29@example.net','2024-12-31 10:24:54','$2y$12$4nVPEZHmNogV.xjvQmAH..Ux/CrTCkpDjglxwIWXXTQ0s14eMzMKi','+1-660-552-7545','manager','pending',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(29,'Samir Ritchie III','raynor.paolo@example.org','2024-12-31 10:24:54','$2y$12$3IfSAdaFeBqyKDLrVMJjuOT2y0.sNrl1OyFXwe1JMaQFAMPsgpSty','+1 (806) 510-7247','tester','pending',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(30,'Prof. Jeffrey Welch MD','reese.oberbrunner@example.net','2024-12-31 10:24:55','$2y$12$FHZPYaIuG5g4GUBb/lbZ/.ogKF.BQu31308j2r/j8DZyhovpEjE6m','+1-952-646-2545','designer','suspended',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(31,'Evelyn Nicolas','sklein@example.com','2024-12-31 10:24:55','$2y$12$XkZkT87Am3V1SaUw4IweT.1dSsiW5IGKhHSeKWjBMRApLDeONUH3O','310.849.4278','designer','pending',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(32,'Diamond Bernier','mkiehn@example.net','2024-12-31 10:24:56','$2y$12$DMkZGnemhe3t4LtusqTH/eWJdBQ5yz/kSQF5Zo6iKzdFDzhuE0xT2','480.975.8350','analyst','active',1,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(33,'Fleta Schulist','alex.dietrich@example.com','2024-12-31 10:24:56','$2y$12$tqR6K3JyJQV4tBrU79QGouN9fWc72.aV4Kbf4oOjP4NGgi1nnSv8K','754-880-8149','analyst','pending',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(34,'Eldridge Dibbert II','mireya29@example.net','2024-12-31 10:24:57','$2y$12$XkeRpZmw7rSUJqnlJzJuBuFvkoft/FIqaZWj/CZcEwQoZfRiOZ4je','1-681-768-7847','developer','suspended',0,NULL,'2024-12-31 10:24:57','2024-12-31 10:24:57'),(35,'Pau cubarsi','cubarsi@gmail.com',NULL,'$2y$12$xL96QIU8PBIlZemeXryzn.r9JywyAfvF5xx0xItJ0CYW5ox7IvYA6',NULL,'developer','active',0,NULL,'2024-12-31 15:13:14','2025-01-08 11:32:25'),(36,'test','test@ens.com',NULL,'$2y$12$5N18ws.u8gIlBEebrfzABeA37.1Rvxogl4NYWg0o.3Gw9yignRQRW',NULL,'developer','active',0,NULL,'2025-01-08 10:35:35','2025-01-08 10:35:35');
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

-- Dump completed on 2025-01-09 23:54:21
