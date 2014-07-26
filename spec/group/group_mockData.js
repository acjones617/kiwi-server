'use strict';

var testData = require('../../server/schema/schema_mockData');

module.exports = exports = data = {};

data.group = {};

data.group.valid = { 
  name:         "Test Group 2",
  description:  "Dummy group for tests"
};

data.queries = {};

data.queries.getTestGroup = 
  "SELECT g.*\n" +
  "FROM dbo.groups g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "';";

data.queries.deleteGroup =
  "DELETE dbo.group\n" +
  "FROM dbo.group g\n" +
  "JOIN dbo.users u\n" +
  "ON g.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND g.name = " + testData.group.name;
