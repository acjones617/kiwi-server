module.exports = exports = data = {};

data.auth = {};

data.auth.validJwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE0MDYyNDA0MjAsImV4cCI6MTQzNzc3NjQyMH0.JMfH05QwaszPq_ThaZCIjKBWShyvIQpEnpVGUIoMdns';

data.auth.invalidJwt = 'Invalid JSON Web Token';

data.kiwi = {};

data.kiwi.valid = {
  kiwiData: {
    title: "Bitcoin Charts / Charts",
    path: "html>body>div>div>div>div.column>table>tbody>tr>td:eq(1)",
    url: "http://bitcoincharts.com/charts/bitstampUSD#rg60ztgSzm1g10zm2g25zv"
  }
}

data.queries = {};

data.queries.deleteKiwi =
  "DELETE dbo.kiwis\n" +
  "FROM dbo.kiwis k\n" +
  "JOIN dbo.users u\n" +
  "ON k.user_id = u.id\n" +
  "WHERE u.email = 'test@test.com'\n" +
  "AND k.title = 'Bitcoin Charts / Charts';";
