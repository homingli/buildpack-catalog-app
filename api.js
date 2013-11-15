/* The API controller */
/* CRUD */

var Buildpack = require('./buildpack.js');

exports.create = function(req, res) {
    new Buildpack({
	name: req.body.name,
	date: req.body.date,
        author: req.body.author,
        url: req.body.url,
        tags: req.body.tags 
    }).save(function(err,buildpack) {
        res.send(buildpack);
    });
}

exports.read = function(req, res) {
  if (req.params.id) {
    Buildpack.findOne({_id: req.params.id}, function(error, buildpack) {
        res.json(buildpack);
    });
  }
  else {
    Buildpack.find(function(err, buildpacks) {
      res.json(buildpacks);
    });
  };
}

exports.update = function(req, res) {
	Buildpack.findById(req.params.id, function (err, buildpack) {
	  if (err) return console.log(err);

	  buildpack.name=req.body.name,
	  buildpack.date=req.body.date,
          buildpack.url=req.body.url,
          buildpack.tags=req.body.tags 
          buildpack.save(function(err,buildpack) {
	    if (err) return console.log(err);
            res.send(buildpack);
          });
	});
}

exports.delete = function(req, res) {
    Buildpack.remove({_id: req.params.id}, function(error) {
        if (error) {
            console.log(error);
            res.send(error);
	} else {
            console.log("Buildpack "+req.params.id+" removed.");
            res.send("Buildpack "+req.params.id+" removed.");
        }
    });
}
