const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'))

app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/index.html');;
});

io.on('connection', (socket) => {
    
    /**
     * Agregar usuario a canales de equipo
     */
    socket.on('join_room', room => {

        if (!room) { return; }

        socket.join(room);
    })

    /**
     * Canal para el cliente
     */
    socket.on('send_to_channel', ({ room, event }) => {

        if (!room) { return; }

        /**
         * El cliente emite al room el evento de crear ticket
         */
        socket.to(room).emit('ticket:created', event);
    })
});

http.listen(80, () => {
    console.log('listening on *:80');
});