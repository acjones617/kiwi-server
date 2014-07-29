'use strict';

var testData = require('../../server/schema/schema_mockData');

module.exports = exports = data = {};

data.group = {};

data.group.valid = {
  groupData: {
    name:         "Test Group 2",
    description:  "Dummy group for tests"
  }
};

data.group.invalid = testData.group;

data.queries = {};

data.queries.getTestGroup = 
  "SELECT g.*\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND g.name = '" + testData.group.groupData.name + "';";

data.queries.getNewGroup = 
  "SELECT g.*\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND g.name = '" + data.group.valid.groupData.name + "';";

data.queries.deleteGroup =
  "DELETE dbo.groups\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND g.name = '" + data.group.valid.groupData.name + "';";

data.queries.deleteKiwiGroups =
  "DELETE dbo.kiwi_group\n" +
  "FROM dbo.kiwi_group kg\n" +
  "JOIN dbo.groups g\n" +
  "ON kg.group_id = g.id\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND g.name = '" + data.group.valid.groupData.name + "';";
