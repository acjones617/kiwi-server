var sql = require('mssql'); 
var Promise = require('bluebird');
var query = require('./schema-queries');
var connection = require('../main/db_connection')();

module.exports = {
  rebuild: function(req, res) {
    var request = new sql.Request(connection);
    Promise.promisifyAll(request);

    request.queryAsync(query.dropTables)
    .then(function() {
      console.log('dropped tables');
      return request.queryAsync(query.createAccountLevel);
    })
    .then(function() {
      console.log('create account level');
      return request.queryAsync(query.createAuthStrategy);
    })
    .then(function() {
      console.log('create auth strategy');
      return request.queryAsync(query.createUsers);
    })
    .then(function() {
      console.log('user success!!!');
      return request.queryAsync(query.createKiwis);
    })
    .then(function() {
      console.log('kiwi success!!!!');
      return request.queryAsync(query.createKiwiValues);
    })
    .then(function() {
      console.log('kiwi-values success!!!!');
      return request.queryAsync(query.createGroups);
    })
    .then(function() {
      console.log('group success!!!!');
      return request.queryAsync(query.createKiwiGroup);
    })
    .then(function() {
      console.log('kiwi-group success!!!!');
      return request.queryAsync(query.insertSeedData);
    })
    .then(function() {
      console.log('insert success!!!!');
      res.end('success!');
    })
    .catch(function(err) {
      console.log('error!!!!', err);
      res.send('error!');
    });
  }
};
