const io = require('socket.io')(8080);

console.log('Server Started! ...');

io.on('connection', (socket) => {
    console.log('got a connection!');

    socket.on('ice_candidate', (candidate) => {
        console.log(`ice_candidate: ${candidate}`);
        socket.broadcast.emit('ice_candidate', candidate);
    });

    socket.on('offer', (desc) => {
        console.log(`offer: ${desc}`);
        socket.broadcast.emit('offer', desc);
    });

    socket.on('answer', (desc) => {
        console.log(`answer: ${desc}`);
        socket.broadcast.emit('answer', desc);
    });
});