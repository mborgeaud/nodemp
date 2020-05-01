const 
  express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  server = http.Server(app)

app.set('port', 5000)
app.use('/', express.static(__dirname + '/client'))
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/client/index.html'))
})

server.listen(8080, function() {
  console.log('Starting server on port 8080')
})
