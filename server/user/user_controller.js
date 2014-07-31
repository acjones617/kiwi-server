'use strict';

var query       = require('./user_queries'),
    dbRequest   = require('../main/db_connection');

module.exports = {

  getUserInfo: function (req, res, next) {
    dbRequest.queryAsync(query.getUserInfo(req.user.email))
    .then(function (foundUser) {
      res.send({ user: foundUser[0] });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    });
  },

  getUserKiwis: function (req, res, next) {
    dbRequest.queryAsync(query.getUserKiwis(req.user.email))
    .then(function (foundKiwis) {
      res.send({ kiwis: foundKiwis });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getUserGroups: function (req, res, next) {
    dbRequest.queryAsync(query.getUserGroups(req.user.email))
    .then(function (foundGroups) {
      res.send({ groups: foundGroups });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getAllData: function (req, res, next) {
    dbRequest.queryAsync(query.getAllData(req.user.email))
    .then(function (foundData) {
      // manipulate foundData into nested JSON object to send
      // {group1: kiwi1: [{date: 2, value: 1}], kiwi2: [], group2: ...}
      var toSend = {};
      var row;
      var groupName;
      var kiwiTitle;
      var kiwiData;
      for (var i = 0; i < foundData.length; i++) {
        row = foundData[i];
        groupName = row.groupName;
        kiwiTitle = row.kiwiTitle;
        kiwiData = { date: row.date, value: row.value };
        // groups
        toSend[groupName] = toSend[groupName] || {};
        toSend[groupName][kiwiTitle] = toSend[groupName][kiwiTitle] || [];
        toSend[groupName][kiwiTitle].push(kiwiData);
      }
      res.send(toSend);
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  }
}
