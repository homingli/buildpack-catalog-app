/* The API controller */
/* CRUD */

var Buildpack = require('./buildpack.js');

exports.create = function(req, res) {
    return new Buildpack({
	name: req.body.name,
	date: req.body.date,
        author: req.body.author,
        url: req.body.url,
        tags: req.body.tags 
    }).save();
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
}

exports.delete = function(req, res) {
}
