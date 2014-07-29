'use strict';

var testData = require('../../server/schema/schema_mockData');

module.exports = exports = data = {};

data.kiwi = {};

data.kiwi.valid = {
  kiwiData: {
    title: "Dokko1230 (Sean)",
    path: "html>body>div>div>div>div>div>div>div>a>strong.vcard-stat-count:eq(0)",
    url: "https://github.com/Dokko1230"
  }
}

data.kiwi.invalid = testData.kiwi;

data.kiwiValues = {
  kiwiData: {
    value: 20
  }
}


data.queries = {};

data.queries.deleteKiwiValues =
  "DELETE dbo.kiwi_values\n" +
  "FROM dbo.kiwi_values kv\n" +
  "JOIN dbo.kiwis k\n" +
  "ON kv.kiwi_id = k.id\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND k.title = '" + data.kiwi.valid.kiwiData.title + "';";

data.queries.deleteKiwi =
  "DELETE dbo.kiwis\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND k.title = '" + data.kiwi.valid.kiwiData.title + "';";

data.queries.getTestKiwi =
  "SELECT k.*\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND k.title = '" + testData.kiwi.kiwiData.title + "';";

data.queries.getNewKiwi =
  "SELECT k.*\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND k.title = '" + data.kiwi.valid.kiwiData.title + "';";

data.queries.deleteKiwiGroups =
  "DELETE dbo.kiwi_group\n" +
  "FROM dbo.kiwi_group kg\n" +
  "JOIN dbo.kiwis k\n" +
  "ON kg.kiwi_id = k.id\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND k.title = '" + data.kiwi.valid.kiwiData.title + "';";
