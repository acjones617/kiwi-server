var qLookupUser = function(email) {
  var query =  
  "SELECT * FROM dbo.users\n" +
  "WHERE email = '" + email + "'";

  return query;
}

var queries = {
  lookupUser: qLookupUser,
  
};

module.exports = queries;
