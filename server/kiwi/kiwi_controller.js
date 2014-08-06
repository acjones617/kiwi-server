'use strict';

var query      = require('./kiwi_queries'),
    Promise    = require('bluebird'),
    dbRequest  = require('../main/db_connection');

module.exports = {

  addKiwi: function (req, res, next) {
    // req.user.email is user email
    dbRequest.queryAsync(query.checkKiwiExistence(req.user.email, req.body.kiwiData))
    .then(function (foundKiwi) {
      if (foundKiwi.length) {
        return new Promise(function (resolve, reject) {
          reject('kiwi already exists');
        });
      } else {
        return dbRequest.queryAsync(query.addKiwi(req.user.email, req.body.kiwiData));
      }
    })
    .then(function () {
      console.log('kiwi added');
      return dbRequest.queryAsync(query.checkKiwiExistence(req.user.email, req.body.kiwiData));
    })
    .then(function (foundKiwi) {
;      return dbRequest.queryAsync(query.addKiwiValue(foundKiwi[0].id, req.body.kiwiData.values[0]));
    })
    .then(function () {
      console.log('kiwi value added');
      var responseObj = {
        message: 'kiwi created',
      };
    
      res.send(201, responseObj);
    })
    .catch(function (err) {
      if (err === 'kiwi already exists') {
        res.send(403, { error: err });
      } else {
        next({ error: err, status: 500 });
      }
    })
    
  },

  addKiwiValue: function (req, res, next) {
    // expect kiwiId, value:
    dbRequest.queryAsync(query.addKiwiValue(req.params.kiwiId, req.body.kiwiData.values[0]))
    .then(function() {
      res.send(201);
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getKiwiValues: function (req, res, next) {
    dbRequest.queryAsync(query.getKiwiValues(req.params.kiwiId))
    .then(function (kiwiValues) {
      res.send({ data: kiwiValues });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getKiwiUpdates: function (req, res, next) {
    // for the crawler to know what kiwis need updating
    dbRequest.queryAsync(query.kiwiNeedingUpdates())
    .then(function (foundKiwis) {
      res.send({ kiwisNeedingUpdate: foundKiwis });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  removeKiwi: function (req, res, next) {
    dbRequest.queryAsync(query.removeKiwi(req.user.email, req.params.kiwiId))
    .then(function() {
      res.send(201);
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  }
};
