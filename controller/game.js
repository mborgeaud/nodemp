let Player = require("./player.js"),
    players = []
            
module.exports = {
    handle: (socket) => {
        let hasGameStarted = () => {
            return players.find(player => player.active == true)
        }	
		socket.on('new player', (name) => {
            if(!hasGameStarted()) {
                players.push(Player.newPlayer(socket.id, name))
                socket.server.emit('update game', players)
            }
        })

        socket.on('pass turn', () => {
            let current = players.findIndex(player => player.active == true),
                next = (current+1) % players.length

            if(current != -1) players[current].active = false
            players[next].active = true
            socket.server.emit('update game', players)
        })       
    }
}