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

  getUserKiwisAndValues: function (req, res, next) {
    dbRequest.queryAsync(query.getUserKiwisAndValues(req.user.email))
    .then(function (foundKiwis) {
      console.log('FOUND KIWIS', foundKiwis);
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
        // since query ordered by title, no need to loop through whole array, 
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
      console.log('USER KIWIS', kiwis);
      res.send({ kiwis: kiwis });
    })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  },

  getUserGroups: function (req, res, next) {
    dbRequest.queryAsync(query.getUserGroups(req.user.email))
    .then(function (foundGroups) {
      console.log('FOUND GROUPS', foundGroups);
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
      console.log('USER GROUPS', groups);
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
      console.log('FOUND DATA', foundData);
      var id;
      var name;
      var description;
      var kiwis;
      var lastKiwi;
      var groups = [];
      var lastGroup;
      for (var i = 0; i < foundData.length; i++) {
        id = foundData[i].groupId;
        name = foundData[i].name;
        description = foundData[i].description;
        kiwis = { 
          id: foundData[i].kiwiId, 
          title: foundData[i].kiwiTitle, 
          values: [{ 
            date: foundData[i].date, 
            value: foundData[i].value 
          }]
        };
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
          lastKiwi = lastGroup.kiwis[lastGroup.kiwis.length - 1];
          if (!lastKiwi || lastKiwi.id !== kiwis.id) {
            lastGroup.kiwis.push(kiwis);
          } else {
            lastGroup.kiwis = [kiwis];
          }
        }
      }
      console.log('USER GROUPS', groups);
      res.send({ groups: groups });
    })

      // // {group1: kiwi1: [{date: 2, value: 1}], kiwi2: [], group2: ...}
      // var toSend = {};
      // var row;
      // var groupName;
      // var kiwiTitle;
      // var kiwiData;
      // for (var i = 0; i < foundData.length; i++) {
      //   row = foundData[i];
      //   groupName = row.groupName;
      //   kiwiTitle = row.kiwiTitle;
      //   kiwiData = { date: row.date, value: row.value };
      //   // groups
      //   toSend[groupName] = toSend[groupName] || {};
      //   toSend[groupName][kiwiTitle] = toSend[groupName][kiwiTitle] || [];
      //   toSend[groupName][kiwiTitle].push(kiwiData);
      // }
      // res.send(toSend);
    // })
    .catch(function (err) {
      next({ error: err, status: 500 });
    })
  }
}
