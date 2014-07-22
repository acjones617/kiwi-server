// must drop tables in appropriate order based on foreign keys
var qDropTables =
  "IF OBJECT_ID('dbo.kiwis', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwis;\n" +
  "IF OBJECT_ID('dbo.users', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.users;\n"
  "IF OBJECT_ID('dbo.account_level', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.account_level;\n"



var qCreateAccountLevel = 
  "CREATE TABLE dbo.account_level\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "level varchar(255),\n" +
    "permissions varchar(255))";

var qCreateUsers =
  "CREATE TABLE dbo.users\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "id_account_level int FOREIGN KEY REFERENCES account_level(id),\n" +
    "email varchar(255) NOT NULL,\n" +
    "hash_password varchar(255) NOT NULL,\n" +
    "notified bit,\n" +
    "created_at datetime DEFAULT GETDATE());";

var qCreateKiwis =
  "CREATE TABLE dbo.kiwis\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "user_id int FOREIGN KEY REFERENCES users(id),\n" +
    "title varchar(255),\n" +
    "path varchar(255),\n" +
    "url varchar(1000),\n" +
    "last_updated datetime,\n" +
    "update_frequency_in_minutes int DEFAULT 1440,\n" +
    "next_update AS DATEADD (minute, update_frequency_in_minutes, last_updated),\n" +
    "created_at datetime DEFAULT GETDATE())";

var queries = {
  dropTables: qDropTables,
  createAccountLevel: qCreateAccountLevel,
  createUsers: qCreateUsers,
  createKiwis: qCreateKiwis
};

module.exports = queries;

// -- ---
// -- Globals
// -- ---

// -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
// -- SET FOREIGN_KEY_CHECKS=0;

// -- ---
// -- Table 'users'
// -- 
// -- ---

// DROP TABLE IF EXISTS `users`;
    
// CREATE TABLE `users` (
//   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//   `id_account_level` INTEGER NULL DEFAULT NULL,
//   `email` VARCHAR(255) NULL DEFAULT NULL,
//   `hash_password` VARCHAR(255) NULL DEFAULT NULL,
//   `notified` TINYINT NULL DEFAULT NULL,
//   `created_at` DATETIME NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'account_level'
// -- 
// -- ---

// DROP TABLE IF EXISTS `account_level`;
    
// CREATE TABLE `account_level` (
//   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//   `level` VARCHAR(255) NULL DEFAULT NULL,
//   `permissions` VARCHAR(255) NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'kiwis'
// -- 
// -- ---

// DROP TABLE IF EXISTS `kiwis`;
    
// CREATE TABLE `kiwis` (
//   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//   `id_users` INTEGER NULL DEFAULT NULL,
//   `title` VARCHAR(255) NULL DEFAULT NULL,
//   `path` VARCHAR(255) NULL DEFAULT NULL,
//   `url` VARCHAR(1000) NULL DEFAULT NULL,
//   `created_at` DATETIME NULL DEFAULT NULL,
//   `last_updated` DATETIME NULL DEFAULT NULL,
//   `update_frequency_in_minutes` INTEGER NULL DEFAULT NULL,
//   `next_update` DATETIME NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'groups'
// -- 
// -- ---

// DROP TABLE IF EXISTS `groups`;
    
// CREATE TABLE `groups` (
//   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//   `id_users` INTEGER NULL DEFAULT NULL,
//   `name` VARCHAR(255) NULL DEFAULT NULL,
//   `description` VARCHAR(1000) NULL DEFAULT NULL,
//   `is_public` TINYINT NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'kiwi_group'
// -- 
// -- ---

// DROP TABLE IF EXISTS `kiwi_group`;
    
// CREATE TABLE `kiwi_group` (
//   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//   `id_groups` INTEGER NULL DEFAULT NULL,
//   `id_kiwis` INTEGER NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

// -- ---
// -- Table 'kiwi_values'
// -- 
// -- ---

// DROP TABLE IF EXISTS `kiwi_values`;
    
// CREATE TABLE `kiwi_values` (
//   `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
//   `id_kiwis` INTEGER NULL DEFAULT NULL,
//   `date` DATETIME NULL DEFAULT NULL,
//   `value` VARCHAR(255) NULL DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

// -- ---
// -- Foreign Keys 
// -- ---

// ALTER TABLE `users` ADD FOREIGN KEY (id_account_level) REFERENCES `account_level` (`id`);
// ALTER TABLE `kiwis` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
// ALTER TABLE `groups` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
// ALTER TABLE `kiwi_group` ADD FOREIGN KEY (id_groups) REFERENCES `groups` (`id`);
// ALTER TABLE `kiwi_group` ADD FOREIGN KEY (id_kiwis) REFERENCES `kiwis` (`id`);
// ALTER TABLE `kiwi_values` ADD FOREIGN KEY (id_kiwis) REFERENCES `kiwis` (`id`);

// -- ---
// -- Table Properties
// -- ---

// -- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `account_level` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `kiwis` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `groups` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `kiwi_group` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
// -- ALTER TABLE `kiwi_values` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

// -- ---
// -- Test Data
// -- ---

// -- INSERT INTO `users` (`id`,`id_account_level`,`email`,`hash_password`,`notified`,`created_at`) VALUES
// -- ('','','','','','');
// -- INSERT INTO `account_level` (`id`,`level`,`permissions`) VALUES
// -- ('','','');
// -- INSERT INTO `kiwis` (`id`,`id_users`,`title`,`path`,`url`,`created_at`,`last_updated`,`update_frequency_in_minutes`,`next_update`) VALUES
// -- ('','','','','','','','','');
// -- INSERT INTO `groups` (`id`,`id_users`,`name`,`description`,`is_public`) VALUES
// -- ('','','','','');
// -- INSERT INTO `kiwi_group` (`id`,`id_groups`,`id_kiwis`) VALUES
// -- ('','','');
// -- INSERT INTO `kiwi_values` (`id`,`id_kiwis`,`date`,`value`) VALUES
// -- ('','','','');

