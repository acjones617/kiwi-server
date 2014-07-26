var query = require('./schema_queries');
var dbRequest = require('../main/db_connection');
var request = require('supertest');
var authData = require('../main/config_db_development');

module.exports = function(app) {
  return {
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
        // create new user
        request(app)
        .post('/auth/signup')
        .send({ email: 'test@test.com',password: 'verysecure password' })
        .end(function (err, res) {
          // sample user created, create sample kiwi
          request(app)
          request(app)
          .post('/api/kiwi/add')
          .set('x-access-token', authData.validJwt)
          .send({ kiwiData: {
              title: "Bitcoin Charts / Charts",
              path: "html>body>div>div>div>div.column>table>tbody>tr>td:eq(1)",
              url: "http://bitcoincharts.com/charts/bitstampUSD#rg60ztgSzm1g10zm2g25zv" 
            }
          })
          .end(function (err, res) {
            // donezo
            res.end('success!');
          });
        });
      })
      .catch(function(err) {
        console.log('error!!!!', err);
        res.send('error!');
      });
    }
  };
};
