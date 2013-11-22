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
    Buildpack.findOne({_id: req.params.id}, function(err, buildpack) {
        if (!err) {
          res.json(buildpack);
        } else {
          res.send(500,err);
        }
    });
  }
  else {
    Buildpack.find(function(err, buildpacks) {
        if (!err) {
          res.json(buildpacks);
        } else {
          res.send(500,err);
        }
    });
  };
}

exports.update = function(req, res) {

        var bpid;

	if ("_id" in req.body) {
          bpid=req.body._id;
	  delete req.body._id;
	} else {
          bpid = req.params.id;
        };

        Buildpack.findByIdAndUpdate(bpid,{ $set: req.body }, {upsert: true}, function (err, buildpack) {
          if (err) return console.log(err);
          res.send(buildpack);
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
