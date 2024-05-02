CREATE SCHEMA `hubspot-oauth-contacts`;

CREATE TABLE `hubspot-oauth-contacts`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `refresh_token` LONGTEXT NOT NULL,
  `access_token` LONGTEXT NOT NULL,
  `expires_in` INT NOT NULL,
  `expires_at` FLOAT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `hubspot-oauth-contacts`.`contacts` (
  `hubspot_id` VARCHAR(255) NOT NULL,
  `access_token` LONGTEXT NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `customer_date` INT NULL,
  `lead_date` INT NULL,
  `archived` TINYINT NULL,
  `created_at` VARCHAR(45) NULL,
  `updated_at` VARCHAR(45) NULL,
  PRIMARY KEY (`hubspot_id`));
