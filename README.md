# Buildpack Catalog App

###The Goal

Help answer these questions:
- How to easily find available buildpacks?
- How are they detecting application types?
- How is the buildpack performing its magic?
- Which PaaS do these buildpacks work on?

Why?
- To rid of deployment issues.
- To understand how things work

###Status
- Basic interface for tagging and viewing buildpack
- Github listing of last updated buildpacks (currently using unauthenticated API, ie low limits)

###TODO
- need backend Cont Deployment for testing buildpacks and updating DB
- sync/pull-in new buildpacks from github instead of manual entries
- more comprehensive auth system?

###Tech

Frontend:
* [AngularJS] - frontend JavaScript MVW Framework
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [jQuery] - duh 

Backend:
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [mongoose] - ODM for [mongoDB]
* backup data to S3 - using [s3] node module, which in turn uses [knox]

###Hosting

Temporarily hosted on [Stackato] at http://buildpack-catalog.stacka.to

###License
MIT

[node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
[@tjholowaychuk]:http://twitter.com/tjholowaychuk
[express]:http://expressjs.com
[AngularJS]:http://angularjs.org/
[mongoose]:http://mongoosejs.com/
[mongoDB]:http://www.mongodb.org/
[s3]:https://github.com/superjoe30/node-s3-client
[knox]:https://github.com/LearnBoost/knox
[Stackato]:http://www.activestate.com/stackato
