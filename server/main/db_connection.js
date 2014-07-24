var sql = require('mssql');
var config = require('../main/config_db_development');

var connection;

module.exports = function() {
  if (!connection) {
    console.log('no connection');
    connection = new sql.Connection(config, function(err) {
      if (err) {
        console.log('API database connection error:');
        console.log(err);
        process.exit();
      } else {
        console.log('API database connection established.');
        return connection;
        // var request = new sql.Request(connection);
        // Promise.promisifyAll(request);
      }
    });
  } else {
    console.log('connection exists');
    return connection;
  }
}
