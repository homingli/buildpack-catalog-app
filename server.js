// The main application script, ties everything together.

var express = require('express');
var mongoose = require('mongoose');
var app = express();

var port = process.env.VCAP_APP_PORT || 3000;

if(process.env.VCAP_SERVICES){
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var dbcreds = services['mongodb'][0].credentials;
}

if(dbcreds){
  mongoose.connect(dbcreds.host, dbcreds.db, dbcreds.port, {user: dbcreds.username, pass: dbcreds.password});
} else {
  mongoose.connect("127.0.0.1", "bpc", 27017);
}

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.compress());
  app.use(express.static(__dirname + '/public'));
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');
app.post('/api/buildpacks', api.create);
app.get('/api/buildpacks', api.read);
app.get('/api/buildpacks/:id', api.read);
//app.get('/thread/:title.:format?', api.show);

app.listen(port);
console.log("Express server listening on port %d", port);
