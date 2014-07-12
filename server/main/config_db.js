
module.exports = function (app){
  var config;

  if (app.get('ENV') === 'development') {
    config = require('config_db_development');
  } else {
    config = {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,

      options: {
        encrypt: true // Use this if you're on Windows Azure
      }

    }
  }
}