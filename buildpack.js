// The Buildpack model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var buildpackSchema = new Schema({
    //user: ObjectId,
    name: {type: String, required: true},
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'},
    url: {type: String, required: true},
    works_on: {
	heroku: { type: Boolean, default: false},
	stackato: { type: Boolean, default: false},
	cf: { type: Boolean, default: false}
    },
    tags: [String]
});

module.exports = mongoose.model('Buildpack', buildpackSchema);
