var request = require('supertest');
var app = require('../../server/main/app.js');
var dbRequest = require('../../server/main/db_connection');

var groupCtrl = require('../../server/group/group_controller');
var mockData = require('./group_mockData');
var authData = require('../../server/main/config_db_development');

describe('Group Controller', function () {

  it('should have a getGroupInfo method', function () {
    expect(groupCtrl.getGroupInfo).toEqual(jasmine.any(Function));
  });

  it('should have a getKiwis method', function () {
    expect(groupCtrl.getKiwis).toEqual(jasmine.any(Function));
  });

  it('should have an addKiwis method', function () {
    expect(groupCtrl.addKiwis).toEqual(jasmine.any(Function));
  });

  it('should have a createGroup method', function () {
    expect(groupCtrl.createGroup).toEqual(jasmine.any(Function));
  });

});

describe('Group Controller', function () {

  it('should return group info', function (done) {
    request(app)
    .get('/api/group/info')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(200);
      expect(res.body.group.email).toEqual('test@test.com');
      expect(typeof res.body.group.notified).toEqual('boolean');
      expect(res.body.group.hash_password).toEqual(undefined);
      done();
    });
  });

  it('should return group kiwis', function (done) {
    request(app)
    .get('/api/group/kiwis')
    .set('x-access-token', authData.validJwt)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.statusCode).toEqual(200);
      expect(res.body.kiwis.length).toBeGreaterThan(0);
      expect(res.body.kiwis[0].title).toEqual("Bitcoin Charts / Charts");
      done();
    });
  });
});
