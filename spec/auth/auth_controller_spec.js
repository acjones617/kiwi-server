var request = require('supertest');
var app = require('../../server/main/app.js');
var sql = require('mssql');
var connection = require('../../server/main/db_connection')();
var Promise = require('bluebird');

var authCtrl = require('../../server/auth/auth_controller');
var mockData = require('./auth_mockData');

// var User = require('../../server/user/user_model.js');
// var Tag = require('../../server/tag/tag_model.js');
// var Company = require('../../server/company/company_model.js');
// var Opp = require('../../server/opportunity/opportunity_model.js');
// var Match = require('../../server/match/match_model.js');
// var userMockData = require('./user_model_MockData.js');
// var tagMockData = require('../tag/tag_model_MockData.js');
// var companyMockData = require('../company/company_model_MockData.js');
// var oppMockData = require('../opportunity/opportunity_model_MockData.js');
// var matchMockData = require('../match/match_model_MockData.js');

// var removeCollections = function (done) {
//   var numCollections = Object.keys(conn.collections).length;
//   var collectionsRemoved = 0;
//   for (var i in conn.collections) {
//     (function (i) {
//       conn.collections[i].remove(function (err, results){
//         collectionsRemoved += 1;
//         if (numCollections === collectionsRemoved) {
//           done();
//         }
//       });
//     })(i);
//   }
// };

// var reconnect = function (done) {
//   mongoose.connect('mongodb://localhost/myApp', function (err) {
//     if (err) {
//       console.log('reconnect error');
//       throw err;
//     }
//     return removeCollections(done);
//   });
// };

// var checkState = function (done) {
//   switch (conn.readyState) {
//   case 0:
//     reconnect(done);
//     break;
//   case 1:
//     removeCollections(done);
//     break;
//   default:
//     setTimeout(checkState.bind(this, done), 100);
//   }
// }; 

describe('User Controller', function () {

  it('should have a login method', function () {
    expect(authCtrl.login).toEqual(jasmine.any(Function));
  });

  it('should have a signup method', function () {
    expect(authCtrl.signup).toEqual(jasmine.any(Function));
  });

});

describe('User Controller', function () {

//   beforeEach(function (done) {
//     checkState(done);
//   });

  it('should be able to signup', function (done) {
    var dbRequest = new sql.Request(connection);
    Promise.promisifyAll(dbRequest);
    console.log(connection);

    // delete test user if it exists
    dbRequest.queryAsync(mockData.queries.deleteTestUser)
    .then(function() {
      request(app)
      .post('/auth/signup')
      .send(mockData.signup)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        expect(typeof res.body.kiwiToken).toEqual("string");
        done();
      });
    })
  });

  it('should 401 if signing up and email already taken', function (done) {
    request(app)
    .post('/auth/signup')
    .send(mockData.signup)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toEqual('user already exists');
      done();
    });
  });

  it('should login successfully if valid credentials given', function (done) {
    request(app)
    .post('/auth/login')
    .send(mockData.login.valid)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(201);
      expect(typeof res.body.kiwiToken).toEqual("string");
      done();
    });
  });

  it('should not login successfully if invalid credentials given', function (done) {
    request(app)
    .post('/auth/login')
    .send(mockData.login.invalid)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(401);
      expect(res.body.kiwiToken).toEqual(undefined);
      expect(res.body.error).toEqual(undefined);
      done();
    });
  });

});