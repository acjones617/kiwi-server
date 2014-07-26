var config = require('../../server/main/config.js');

describe("config", function () {
  var express,
      app,
      routers;

  beforeEach(function() {
    express = require('express');
    app     = express();

    routers = {};
    routers.SchemaRouter      = express.Router();
    routers.AuthRouter        = express.Router();
    routers.UserRouter        = express.Router();
    routers.KiwiRouter        = express.Router();
    routers.GroupRouter       = express.Router();
  });

  it("check config is a function", function () {
    expect(typeof config).toEqual("function");
  });

  it("check port is set", function () {
    config(app, express, routers);
    expect(app.get('port')).toEqual(3000);
  });

  it("check base url is set", function () {
    config(app, express, routers);
    expect(app.get('base url')).toEqual('http://localhost');
  });

});
