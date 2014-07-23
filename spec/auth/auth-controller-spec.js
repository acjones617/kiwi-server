// var request = require('supertest');
// var app = require('../../server/main/app.js');

// var userCtrl = require('../../server/auth/auth_controllers.js');
// var mockData = require('./auth-mockData');
// var mongoose = require('mongoose');
// var conn = mongoose.connection;


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

// describe('User Controller', function () {

//   it('should have a get method', function () {
//     expect(userCtrl.get).toEqual(jasmine.any(Function));
//   });

//   it('should have a post method', function () {
//     expect(userCtrl.post).toEqual(jasmine.any(Function));
//   });

//   it('should have a getById method', function () {
//     expect(userCtrl.getById).toEqual(jasmine.any(Function));
//   });

//   it('should have a putById method', function () {
//     expect(userCtrl.putById).toEqual(jasmine.any(Function));
//   });

// });

// describe('User Controller', function () {

//   beforeEach(function (done) {
//     checkState(done);
//   });

//   it('should be able to POST', function (done) {
//     request(app)
//     .post('/api/users')
//     .send(userMockData.valid)
//     .end(function (err, res) {
//       if (err) return done(err);
//       expect(res.statusCode).toEqual(201);
//       done();
//     });
//   });