const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const { Server, Socket } = require('socket.io');

const PORT = 5000;

app.use(cors);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on('connect', (socket) => {
    console.log('connected');

    socket.on('antrian', (nomerAntrian) => {
        console.log('Kirim Nomer Antrian');
        io.emit('antrianMasuk', nomerAntrian)
    })

    socket.on('disconnect', () => {
        console.log('Tidak tersambung');
    })
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});