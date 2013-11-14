models = [buildpack]

Object.keys(models).forEach(modelName) ->

  app.get "/#{modelName}/", (req,res) ->
    list models[modelName], (err, data) ->
      res.json data

  app.get "/#{modelName}/:id", (req,res) ->
    get models[modelName], req.params.id, (err, data) ->
	res.json data
