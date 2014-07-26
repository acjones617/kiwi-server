'use strict';

var testData = require('../../server/schema/schema_mockData');

module.exports = exports = data = {};

data.kiwi = {};

data.kiwi.valid = {
  kiwiData: {
    title: "Bitcoin Charts / Charts",
    path: "html>body>div>div>div>div.column>table>tbody>tr>td:eq(1)",
    url: "http://bitcoincharts.com/charts/bitstampUSD#rg60ztgSzm1g10zm2g25zv"
  }
}

data.kiwi.invalid = testData.kiwi;

data.queries = {};

data.queries.deletekiwi =
  "DELETE dbo.kiwi\n" +
  "FROM dbo.kiwi k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "'\n" +
  "AND k.title = " + testData.kiwi.title;

data.queries.getTestKiwi = 
  "SELECT k.*\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = '" + testData.signup.email + "';";
