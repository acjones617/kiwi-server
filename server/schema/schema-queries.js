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
  "IF OBJECT_ID('dbo.account_level', 'U') IS NOT NULL\n" +
    "DROP TABLE dbo.account_level;\n";

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
    "created_at datetime DEFAULT GETDATE())";

var qCreateKiwiGroup =
  "CREATE TABLE dbo.kiwi_group\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "group_id int FOREIGN KEY REFERENCES groups(id),\n" +
    "kiwi_id int FOREIGN KEY REFERENCES kiwis(id),\n" +
    "created_at datetime DEFAULT GETDATE())";

var queries = {
  dropTables: qDropTables,
  createAccountLevel: qCreateAccountLevel,
  createUsers: qCreateUsers,
  createKiwis: qCreateKiwis,
  createKiwiValues: qCreateKiwiValues,
  createGroups: qCreateGroups,
  createKiwiGroup: qCreateKiwiGroup
};

module.exports = queries;
