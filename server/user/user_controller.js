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

  updateUserInfo: function(req, res, next) {
    res.send(201);
    // unsure with what final functionality will be:
    // dbRequest.queryAsync(query.updateUserInfo(req.user.email, req.body.settings))
    // .then(function () {
    //   res.send(201);
    // })
    // .catch(function (err) {
    //   next({ error: err, status: 500 });
    // })
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

  getUserKiwisAndValues: function (req, res, next) {
    dbRequest.queryAsync(query.getUserKiwisAndValues(req.user.email))
    .then(function (foundKiwis) {
      var id;
      var title;
      var url;
      var values;
      var kiwis = [];
      var lastKiwi;
      for (var i = 0; i < foundKiwis.length; i++) {
        id = foundKiwis[i].kiwiId;
        title = foundKiwis[i].title;
        url = foundKiwis[i].url;
        values = { value: foundKiwis[i].value, date: foundKiwis[i].date };
        lastKiwi = kiwis[kiwis.length - 1];
        // since query ordered by kiwiId, no need to loop through whole array, 
        // just look at last element.
        if (!lastKiwi || lastKiwi.id !== id) {
          kiwis.push({
            id: id,
            title: title,
            url: url,
            values: [values]
          })
        } else {
          lastKiwi.values.push(values);
        }
      }
      res.send({ kiwis: kiwis });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getUserGroups: function (req, res, next) {
    dbRequest.queryAsync(query.getUserGroups(req.user.email))
    .then(function (foundGroups) {
      var id;
      var name;
      var description;
      var kiwis;
      var groups = [];
      var lastGroup;
      for (var i = 0; i < foundGroups.length; i++) {
        id = foundGroups[i].groupId;
        name = foundGroups[i].name;
        description = foundGroups[i].description;
        kiwis = { id: foundGroups[i].kiwiId, title: foundGroups[i].kiwiTitle };
        lastGroup = groups[groups.length - 1];
        // since query ordered by title, no need to loop through whole array, 
        // just look at last element.
        if (!lastGroup || lastGroup.id !== id) {
          groups.push({
            id: id,
            name: name,
            description: description,
            kiwis: [kiwis]
          })
        } else {
          lastGroup.kiwis.push(kiwis);
        }
      }
      res.send({ groups: groups });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getAllData: function (req, res, next) {
    dbRequest.queryAsync(query.getAllData(req.user.email))
    .then(function (foundData) {
      // manipulate foundData into nested JSON object to send
      // [{group1: [{kiwi1:, name:, values:[{date:, value:}]}, kiwi2: {}}]
      // receive array of objects that looks like:
      // [{groupId, groupName, description, kiwiId, kiwiTitle, date, value}]
      // ordered by groupId, then kiwiId
      // left joins so there may be groups with no kiwis in them
      var id;
      var name;
      var description;
      var isPublic;
      var kiwis;
      var lastKiwi;
      var groups = [];
      var lastGroup;
      for (var i = 0; i < foundData.length; i++) {
        id = foundData[i].groupId;
        name = foundData[i].groupName;
        description = foundData[i].description;
        isPublic = foundData[i].is_public;
        if (foundData[i].kiwiId) {
          kiwis = { 
            id: foundData[i].kiwiId, 
            title: foundData[i].kiwiTitle, 
            values: [{ 
              date: foundData[i].date, 
              value: foundData[i].value 
            }]
          };
        } else {
          kiwis = null;
        }
        lastGroup = groups[groups.length - 1];
        // since query ordered by title, no need to loop through whole array, 
        // just look at last element.
        if (!lastGroup || lastGroup.id !== id) {
          groups.push({
            id: id,
            name: name,
            description: description,
            isPublic: isPublic,
            kiwis: kiwis ? [kiwis] : []
          })
        } else {
          lastKiwi = lastGroup.kiwis[lastGroup.kiwis.length - 1];
          if (!lastKiwi || lastKiwi.id !== kiwis.id) {
            lastGroup.kiwis.push(kiwis);
          } else {
            lastGroup.kiwis = [kiwis];
          }
        }
      }
      res.send({ groups: groups });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  }
}
