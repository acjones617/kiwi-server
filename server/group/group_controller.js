'use strict';

var query       = require('./group_queries'),
    dbRequest   = require('../main/db_connection'),
    Promise     = require('bluebird');

module.exports = {

  getGroupInfo: function (req, res, next) {
    dbRequest.queryAsync(query.getGroupInfo(req.user.email, req.params.groupId))
    .then(function (foundGroup) {
      res.send({ group: foundGroup[0] });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    });
  },

  editGroupInfo: function (req, res, next) {
    dbRequest.queryAsync(query.editGroupInfo(req.user.email, req.params.groupId, req.body.groupData))
    .then(function () {
      res.send(201);
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    });
  },

  getData: function(req, res, next) {
    dbRequest.queryAsync(query.getData(req.params.groupId))
    .then(function (foundData) {
      // same as get all data, except we only have one group
      console.log('FOUND DATA', foundData);
      if (foundData.length === 0) {
        return next({ error: 'No public group with groupId = ' + req.params.groupId }, 403);
      }
      var kiwiId;
      var kiwiTitle;
      var value;
      var date;
      var lastKiwi;
      var allData = {
        id: foundData[0].groupId,
        name: foundData[0].groupIdName,
        description: foundData[0].description,
        kiwis: []
      };
      for (var i = 0; i < foundData.length; i++) {
        if (foundData[i].kiwiId) {
          kiwiId = foundData[i].kiwiId;
          kiwiTitle = foundData[i].kiwiTitle;
          value = foundData[i].value;
          date = foundData[i].date;
          lastKiwi = allData.kiwis[allData.kiwis.length - 1];
          if (!lastKiwi || lastKiwi.id !== kiwiId) {
            allData.kiwis.push({
              id: kiwiId,
              title: kiwiTitle,
              values: [{
                date: date,
                value: value
              }]
            });
          } else {
            allData.kiwis.values.push({
              date: date,
              value: value
            });
          }
        }
      }
      console.log('ALL DATA', allData);
      res.send(allData);
    })
  },

  getKiwis: function (req, res, next) {
    dbRequest.queryAsync(query.getKiwisOfGroup(req.params.groupId))
    .then(function (foundKiwis) {
      res.send({ kiwis: foundKiwis });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    });
  },

  addKiwi: function (req, res, next) {
    dbRequest.queryAsync(query.addKiwiToGroup(req.params.groupId, req.body.kiwiId))
    .then(function() {
      res.send(201);
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    });
  },

  removeKiwi: function(req, res, next) {
    dbRequest.queryAsync(query.removeKiwiFromGroup(req.params.groupId, req.body.kiwiId))
    .then(function() {
      res.send(201);
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  createGroup: function (req, res, next) {
    dbRequest.queryAsync(query.lookupGroup(req.user.email, req.body.groupData))
    .then(function (foundGroup) {
      if (foundGroup.length) {
        return new Promise(function (resolve, reject) {
          reject('user already has group by that name')
        });
      } else {
        // if no group exists, move along with group creation
        return dbRequest.queryAsync(query.createGroup(req.user.email, req.body.groupData))
      }
    })
    .then(function() {
      res.send(201);
    })
    .catch(function (err) {
      if (err === 'user already has group by that name') {
        next({ error: err, status: 403 });
      } else {
        next({ error: err, status: 500 });
      }
    });
  },
}
