module.exports = exports = data = {};

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
  