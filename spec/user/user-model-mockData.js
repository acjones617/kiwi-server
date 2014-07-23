module.exports = exports = data = {};

data.valid = {
  email:          'bobsmith@gmail.com',
  password:       'verysecure password'
};

data.missing = {};

data.missing.email = {
  password:       'verysecure password'
};

data.invalid = {};

data.invalid.email = {
  email:          'bobsmith@gmail.com',
  password:       'invalid password',
};
