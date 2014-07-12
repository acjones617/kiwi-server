var sql = require('mssql'); 
var config = require('../main/config_db_development');
var Promise = require('bluebird');
var query = require('./schema-queries');

var connection = new sql.Connection(config, function(err) {
    if (err) {
      console.log('API database connection error:');
      console.log(err);
      process.exit();
    } else {
      console.log('API database connection established.');
      var request = new sql.Request(connection);
      Promise.promisify(request.query);

      request.queryAsync(query.createUsers)
      .then(function() {
        return request.queryAsync(query.createKiwis)
      });
    }
});