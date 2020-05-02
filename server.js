const 
  express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  server = http.Server(app),
	socketIO = require('socket.io'),
	io = socketIO(server),
	game = require(__dirname + '/controller/game.js')

app.set('port', 5000)
app.use('/', express.static(__dirname + '/client'))
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/client/index.html'))
})

server.listen(8080, function() {
  console.log('Starting server on port 8080')
})

io.on('connection', (socket) => {
  game.handle(socket)
})