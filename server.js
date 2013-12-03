// The main application script, ties everything together.

var express = require('express');
var mongoose = require('mongoose');
var app = express();

var auth = express.basicAuth(function(user, pass, callback) {
 callback(null, (pass === 'bpcpassword'));
});

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

mongoose.connection.on('error', function(err) {
  if (err) { console.log('Mongoose connection error: ' + err); }
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

app.configure(function(){
  app.use(express.compress());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());

app.use(function(req,res,next) {
  if(mongoose.connection.readyState) {
    return next();
  } else {
    console.log("Error: Database Not Connected");
    res.send(500, '<h1>Error 500: Database not connected!</h1>');
  }
});

  app.use(app.router);
  app.use(express.static(__dirname + '/public/'));
  app.use(function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
});

// set up the RESTful API, handler methods are defined in api.js
var api = require('./api.js');
app.get('/api/buildpacks', api.read);
app.post('/api/buildpacks', auth, api.create);
app.get('/api/buildpacks/:id', api.read);
app.put('/api/buildpacks/:id', auth, api.update);
app.del('/api/buildpacks/:id', auth, api.delete);
//app.get('/thread/:title.:format?', api.show);

app.listen(port);
console.log("Express server listening on port %d", port);
