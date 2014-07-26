'use strict';

var mockData = require('./schema_mockData');

// must drop tables in appropriate order based on foreign keys
var qDropTables =
  "IF OBJECT_ID('dbo.kiwi_group', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwi_group;\n" +
  "IF OBJECT_ID('dbo.groups', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.groups;\n" +
  "IF OBJECT_ID('dbo.kiwi_values', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwi_values;\n" +
  "IF OBJECT_ID('dbo.kiwis', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwis;\n" +
  "IF OBJECT_ID('dbo.users', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.users;\n" +
  "IF OBJECT_ID('dbo.auth_strategy', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.auth_strategy;\n" +
  "IF OBJECT_ID('dbo.account_level', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.account_level;";

var qCreateAccountLevel = 
  "CREATE TABLE dbo.account_level\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "level varchar(255),\n" +
    "permissions varchar(255))";

var qCreateAuthStrategy = 
  "CREATE TABLE dbo.auth_strategy\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "strategy varchar(255))"

var qCreateUsers =
  "CREATE TABLE dbo.users\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "account_level_id int FOREIGN KEY REFERENCES account_level(id) DEFAULT 1,\n" +
    "email varchar(255) NOT NULL,\n" +
    "hash_password varchar(255) NOT NULL,\n" +
    "notified bit DEFAULT 0,\n" +
    "auth_strategy_id int FOREIGN KEY REFERENCES auth_strategy(id) DEFAULT 1,\n" +
    "created_at datetime DEFAULT GETDATE()\n" +
    "CONSTRAINT AK_users_email UNIQUE(email));";

var qCreateKiwis =
  "CREATE TABLE dbo.kiwis\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "user_id int FOREIGN KEY REFERENCES users(id),\n" +
    "title varchar(255),\n" +
    "path varchar(255),\n" +
    "url varchar(1000),\n" +
    "priority varchar(1) DEFAULT 'a',\n" +
    "deleted bit DEFAULT 0,\n" +
    "last_updated datetime DEFAULT GETDATE(),\n" +
    "update_frequency_in_minutes int DEFAULT 1440,\n" +
    "next_update AS DATEADD (minute, update_frequency_in_minutes, last_updated),\n" +
    "created_at datetime DEFAULT GETDATE(),\n" +
    "CONSTRAINT AK_kiwis_user_title UNIQUE(user_id, title))";

var qCreateKiwiValues =
  "CREATE TABLE dbo.kiwi_values\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "kiwi_id int FOREIGN KEY REFERENCES kiwis(id),\n" +
    "date datetime DEFAULT GETDATE(),\n" +
    "value float)";

var qCreateGroups =
  "CREATE TABLE dbo.groups\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "user_id int FOREIGN KEY REFERENCES users(id),\n" +
    "name varchar(255),\n" +
    "description varchar(1000),\n" +
    "is_public bit DEFAULT 0,\n" +
    "created_at datetime DEFAULT GETDATE()\n" +
    "CONSTRAINT AK_groups_user_name UNIQUE(user_id, name));";

var qCreateKiwiGroup =
  "CREATE TABLE dbo.kiwi_group\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "group_id int FOREIGN KEY REFERENCES groups(id),\n" +
    "kiwi_id int FOREIGN KEY REFERENCES kiwis(id),\n" +
    "created_at datetime DEFAULT GETDATE())";

var qInsertSeedData =
  "INSERT INTO dbo.account_level (level, permissions)\n" +
  "VALUES ('basic', 'all');\n" +
  "INSERT INTO dbo.account_level (level, permissions)\n" +
  "VALUES ('paid', 'all');\n" +
  "INSERT INTO dbo.auth_strategy (strategy)\n" +
  "VALUES ('local');\n";

var qInsertKiwi = 
  "INSERT INTO dbo.kiwis (user_id, title, path, url, last_updated)\n" +
    "SELECT id,\n" +
      "'" + mockData.kiwi.title + "',\n" +
      "'" + mockData.kiwi.path + "',\n" +
      "'" + mockData.kiwi.url + "',\n" +
      "'" + mockData.kiwi.last_updated + "'\n" +
    "FROM dbo.users\n" +
    "WHERE email = '" + mockData.signup.email + "';";

var qInsertKiwiValue = 
  "INSERT INTO dbo.kiwi_values (kiwi_id, value)\n" +
    "SELECT k.id, " + mockData.kiwi.value + "\n" +
    "FROM dbo.kiwis k\n" +
    "JOIN dbo.users u\n" +
    "ON u.id = k.user_id\n" +
    "WHERE k.title = '" + mockData.kiwi.title + "'\n" +
    "AND k.path ='" + mockData.kiwi.path + "'\n" +
    "AND k.url ='" + mockData.kiwi.url + "'\n" +
    "AND email = '" + mockData.signup.email + "';";

var qInsertGroup = 
  "INSERT INTO dbo.groups (user_id, name, description)\n" +
    "SELECT id,\n" +
      "'" + mockData.group.name + "',\n" +
      "'" + mockData.group.description + "'\n" +
    "FROM dbo.users\n" +
    "WHERE email = '" + mockData.signup.email + "';";

var qInsertKiwiGroup = 
  "INSERT INTO dbo.kiwi_group (group_id, kiwi_id)\n" +
    "SELECT g.id, k.id\n" +
    "FROM dbo.groups g\n" +
    "JOIN dbo.users u\n" +
    "ON u.id = g.user_id\n" +
    "JOIN dbo.kiwis k\n" +
    "ON u.id = k.user_id\n" +
    "WHERE u.email = '" + mockData.signup.email + "';";

var qInsertKiwiValue = 
  "INSERT INTO dbo.kiwi_values (kiwi_id, value)\n" +
    "SELECT k.id, " + mockData.kiwi.value + "\n" +
    "FROM dbo.kiwis k\n" +
    "JOIN dbo.users u\n" +
    "ON u.id = k.user_id\n" +
    "WHERE k.title = '" + mockData.kiwi.title + "'\n" +
    "AND k.path ='" + mockData.kiwi.path + "'\n" +
    "AND k.url ='" + mockData.kiwi.url + "'\n" +
    "AND email = '" + mockData.signup.email + "';";

  "IF OBJECT_ID('dbo.kiwi_group', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwi_group;\n" +
  "IF OBJECT_ID('dbo.groups', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.groups;\n" +
  "IF OBJECT_ID('dbo.kiwi_values', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwi_values;\n" +
  "IF OBJECT_ID('dbo.kiwis', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.kiwis;\n" +
  "IF OBJECT_ID('dbo.users', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.users;\n" +
  "IF OBJECT_ID('dbo.auth_strategy', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.auth_strategy;\n" +
  "IF OBJECT_ID('dbo.account_level', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.account_level;";

var qSelectAll =
  "SELECT al.*, auth.*, u.*, k.*, kv.*, g.*, kg.* FROM dbo.users u\n" +
  "JOIN dbo.account_level al\n" + 
  "ON u.account_level_id = al.id\n" +
  "JOIN dbo.auth_strategy auth\n" +
  "ON u.auth_strategy_id = auth.id\n" +
  "JOIN dbo.kiwis k\n" +
  "ON u.id = k.user_id\n" +
  "JOIN dbo.groups g\n" +
  "ON u.id = g.user_id\n" +
  "JOIN dbo.kiwi_values kv\n" +
  "ON k.id = kv.kiwi_id\n" +
  "JOIN dbo.kiwi_group kg\n" +
  "ON k.id = kg.kiwi_id\n" +
  "AND g.id = kg.group_id;";


var queries = {
  dropTables: qDropTables,
  createAccountLevel: qCreateAccountLevel,
  createAuthStrategy: qCreateAuthStrategy,
  createUsers: qCreateUsers,
  createKiwis: qCreateKiwis,
  createKiwiValues: qCreateKiwiValues,
  createGroups: qCreateGroups,
  createKiwiGroup: qCreateKiwiGroup,
  insertSeedData: qInsertSeedData,
  insertKiwi: qInsertKiwi,
  insertGroup: qInsertGroup,
  insertKiwiGroup: qInsertKiwiGroup,
  insertKiwiValue: qInsertKiwiValue,
  selectAll: qSelectAll
};

module.exports = queries;
