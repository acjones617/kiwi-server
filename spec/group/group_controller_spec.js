var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection');

var groupCtrl = require('../../server/group/group_controller');
var mockData = require('./group_mockData');
var authData = require('../../server/main/config_db_development');
var testData = require('../../server/schema/schema_mockData');

var getTestGroup = function() {
  return dbRequest.queryAsync(mockData.queries.getTestGroup);
}

describe('Group Controller', function () {

  it('should have a getGroupInfo method', function () {
    expect(groupCtrl.getGroupInfo).toEqual(jasmine.any(Function));
  });

  it('should have a getKiwis method', function () {
    expect(groupCtrl.getKiwis).toEqual(jasmine.any(Function));
  });

  it('should have an addKiwi method', function () {
    expect(groupCtrl.addKiwi).toEqual(jasmine.any(Function));
  });

  it('should have a createGroup method', function () {
    expect(groupCtrl.createGroup).toEqual(jasmine.any(Function));
  });

});

describe('Group Controller', function () {

  // it('should return group info', function (done) {
  //   getTestGroup()
  //   .then(function(foundGroup) {
  //     request(app)
  //     .get('/api/group/info/' + foundGroup[0].id)
  //     .set('x-access-token', authData.validJwt)
  //     .end(function (err, res) {
  //       if (err) return done(err);
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body.group.name).toEqual(testData.group.name);
  //       done();
  //     });
  //   });
  // });

  // it('should return the group\'s kiwis', function (done) {
  //   getTestGroup()
  //   .then(function(foundGroup) {
  //     request(app)
  //     .get('/api/group/kiwis/' + foundGroup[0].id)
  //     .set('x-access-token', authData.validJwt)
  //     .end(function(err, res) {
  //       if (err) return done(err);
  //       console.log(res.body);
  //       expect(res.statusCode).toEqual(200);
  //       expect(res.body.kiwis[0].title).toEqual(testData.kiwi.title);
  //       done();
  //     })
  //   })
  // });



});
