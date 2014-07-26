var query = require('./schema_queries');
var dbRequest = require('../main/db_connection');

module.exports = {
  rebuild: function(req, res) {
    dbRequest.queryAsync(query.dropTables)
    .then(function() {
      console.log('dropped tables');
      return dbRequest.queryAsync(query.createAccountLevel);
    })
    .then(function() {
      console.log('create account level');
      return dbRequest.queryAsync(query.createAuthStrategy);
    })
    .then(function() {
      console.log('create auth strategy');
      return dbRequest.queryAsync(query.createUsers);
    })
    .then(function() {
      console.log('user success!!!');
      return dbRequest.queryAsync(query.createKiwis);
    })
    .then(function() {
      console.log('kiwi success!!!!');
      return dbRequest.queryAsync(query.createKiwiValues);
    })
    .then(function() {
      console.log('kiwi-values success!!!!');
      return dbRequest.queryAsync(query.createGroups);
    })
    .then(function() {
      console.log('group success!!!!');
      return dbRequest.queryAsync(query.createKiwiGroup);
    })
    .then(function() {
      console.log('kiwi-group success!!!!');
      return dbRequest.queryAsync(query.insertSeedData);
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
