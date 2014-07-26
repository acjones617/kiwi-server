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
        console.log('insert first seed data success!!!!');
        // create new user
        request(app)
        .post('/auth/signup')
        .send({ email: 'test@test.com',password: 'verysecure password' })
        .end(function (err, response) {
          // sample user created, create sample kiwi
          console.log('dummy user created!!');
          dbRequest.queryAsync(query.insertKiwi)
          .then(function() {
            console.log('insert seed kiwi success!!!');
            return dbRequest.queryAsync(query.insertKiwiValue);
          })
          .then(function() {
            console.log('insert seed kiwi value success!!!');
            return dbRequest.queryAsync(query.insertGroup);
          })
          .then(function() {
            console.log('insert seed group success!!!');
            return dbRequest.queryAsync(query.insertKiwiGroup);
          })
          .then(function() {
            console.log('added seed kiwi group!!!')
            return dbRequest.queryAsync(query.selectAll);
            // donezo
          })
          .then(function(foundAll) {
            console.log('FOUND DUMMY DATA!!', foundAll);
            res.send(foundAll);
          })
          .catch(function(err) {
            console.log('error!!!!', err);
            res.send('error!');
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
