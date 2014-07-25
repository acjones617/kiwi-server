  "CREATE TABLE dbo.kiwis\n" +
    "(id int IDENTITY(1,1) PRIMARY KEY,\n" +
    "user_id int FOREIGN KEY REFERENCES users(id),\n" +
    "title varchar(255),\n" +
    "path varchar(255),\n" +
    "url varchar(1000),\n" +
    "last_updated datetime,\n" +
    "update_frequency_in_minutes int DEFAULT 1440,\n" +
    "next_update AS DATEADD (minute, update_frequency_in_minutes, last_updated),\n" +
    "deleted bit DEFAULT 0,\n" +
    "created_at datetime DEFAULT GETDATE())";

var qAddKiwi = function(email, kiwiData) {
  var query =  
  "INSERT INTO dbo.kiwis (user_id, title, path, url)\n" +
    "SELECT id,\n" +
      "'" + kiwiData.title + "',\n" +
      "'" + kiwiData.path + "',\n" +
      "'" + kiwiData.url + "'\n" +
    "FROM dbo.users\n" +
    "WHERE email = '" + email + "'";

  return query;
};

var qRemoveKiwi = function(kiwiData) {
  var query =  
  "INSERT INTO dbo.users (email, hash_password)\n" +
  "VALUES ('" + email + "', '" + hash_password + "');";

  return query;
};

var qCheckKiwiExistence = function(email, kiwiData) {
  var query =  
  "SELECT * \n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "AND u.email = '" + email + "'\n" +
  "AND k.title = '" + kiwiData.title + "'";

  return query;
};

var queries = {
  addKiwi: qAddKiwi,
  removeKiwi: qRemoveKiwi,
  checkKiwiExistence: qCheckKiwiExistence
};

module.exports = queries;
