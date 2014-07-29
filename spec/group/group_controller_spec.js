var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection');

var groupCtrl = require('../../server/group/group_controller');
var mockData = require('./group_mockData');
var authData = require('../../server/main/config_db_development');
var testData = require('../../server/schema/schema_mockData');
var kiwiData = require('../kiwi/kiwi_mockData');

var getTestGroup = function() {
  return dbRequest.queryAsync(mockData.queries.getTestGroup);
}

var getNewGroup = function() {
  return dbRequest.queryAsync(mockData.queries.getNewGroup);
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

  it('should return group info', function (done) {
    getTestGroup()
    .then(function(foundGroup) {
      request(app)
      .get('/api/group/info/' + foundGroup[0].id)
      .set('x-access-token', authData.validJwt)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res.body.group.name).toEqual(testData.group.groupData.name);
        done();
      });
    });
  });

  it('should return the group\'s kiwis', function (done) {
    getTestGroup()
    .then(function(foundGroup) {
      request(app)
      .get('/api/group/kiwis/' + foundGroup[0].id)
      .set('x-access-token', authData.validJwt)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res.body.kiwis[0].title).toEqual(testData.kiwi.kiwiData.title);
        done();
      })
    })
  });

  it('should create a new group', function (done) {
    // delete all kiwi group combos on kiwi_group if they exist
    dbRequest.queryAsync(mockData.queries.deleteKiwiGroups)
    .then(function() {
      // delete group if it exists
      return dbRequest.queryAsync(mockData.queries.deleteGroup)
    })
    .then(function() {
      request(app)
      .post('/api/group/create')
      .set('x-access-token', authData.validJwt)
      .send(mockData.group.valid)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        done();
      })
    });
  });

  it('should not allow user to create groups with same name', function (done) {
    request(app)
    .post('/api/group/create')
    .set('x-access-token', authData.validJwt)
    .send(mockData.group.invalid)
    .end(function(err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(403);
      expect(res.body.error).toEqual('user already has group by that name');
      done();
    });
  });

  it('should add kiwi to group', function (done) {
    var groupData;
    getNewGroup()
    .then(function(foundGroup) {
      groupData = foundGroup;
      return dbRequest.queryAsync(kiwiData.queries.getTestKiwi)
    })
    .then(function(kiwiData) {
      request(app)
      .post('/api/group/kiwis/' + groupData[0].id)
      .set('x-access-token', authData.validJwt)
      .send({ kiwiData: kiwiData[0] })
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(201);
        done();
      });
    })
  });

  it('should pull appropriate kiwis from group', function (done) {
    getNewGroup()
    .then(function(groupData) {
      request(app)
      .get('/api/group/kiwis/' + groupData[0].id)
      .set('x-access-token', authData.validJwt)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.statusCode).toEqual(200);
        expect(res.body.kiwis[0].title).toEqual(testData.kiwi.kiwiData.title);
        done();
      });
    })
  });

});
