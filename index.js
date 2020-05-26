const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

let domain = process.env.DOMAIN_SERVER

if (JSON.parse(process.env.DEBUG)) {

    domain = process.env.DOMAIN_TEST
}

app.use(express.static('./public'))

app.use((req, res, next) =>  {
    res.status(404).sendFile(__dirname + '/index.html');
});

io.origins((origin, callback) => {

    console.log(domain)
    
    if (origin !== domain) {
        
        return callback('origin not allowed', false);
    }

    callback(null, true);
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
    socket.on('send_to_room', ({ room, event }) => {

        if (!room) { return; }

        /**
         * El cliente emite al room el evento de crear ticket
         */
        socket.to(room).emit('ticket:created', event);
    })
});

const port = process.env.PORT || 4646;

http.listen(port, () => {
    console.log('listening on http://localhost:' + port);
});