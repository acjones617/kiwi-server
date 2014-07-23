var qLookupUser = function(email) {
  var query =  
  "SELECT * FROM dbo.users\n" +
  "WHERE email = '" + email + "'";

  return query;
}

var qSignupUser = function(email, hash_password) {
  var query =  
  "INSERT INTO dbo.users (email, hash_password)\n" +
  "VALUES (" + email + ", " + hash_password + ");";

  return query;
}


var queries = {
  lookupUser: qLookupUser,
  signupUser: qSignupUser
};

module.exports = queries;
