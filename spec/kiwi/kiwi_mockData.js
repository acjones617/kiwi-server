module.exports = exports = data = {};

data.signup = {
  email:          'test@test.com',
  password:       'verysecure password'
};

data.login = {};

data.login.valid = {
  email:          'test@test.com',
  password:       'verysecure password'
};

data.login.invalid = {
  email:          'test@test.com',
  password:       'incorrect password'
};

data.queries = {};

data.queries.deleteTestUser =
  "DELETE FROM dbo.users\n" +
  "WHERE email = 'test@test.com';";
  