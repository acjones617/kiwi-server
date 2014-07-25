module.exports = exports = data = {};

data.auth = {};

data.auth.validJwt = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE0MDYyNDA0MjAsImV4cCI6MTQzNzc3NjQyMH0.JMfH05QwaszPq_ThaZCIjKBWShyvIQpEnpVGUIoMdns';

data.signup = {
  email:          'test_auth@test.com',
  password:       'verysecure password'
};

data.login = {};

data.login.valid = {
  email:          'test_auth@test.com',
  password:       'verysecure password'
};

data.login.invalid = {
  email:          'test_auth@test.com',
  password:       'incorrect password'
};

data.queries = {};

data.queries.deleteTestUser =
  "DELETE FROM dbo.users\n" +
  "WHERE email = 'test_auth@test.com';";
  