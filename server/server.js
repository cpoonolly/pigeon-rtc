const io = require('socket.io')(3001);

console.log('Server Started! ...');

io.on('connection', (socket) => {
    console.log('got a connection!');

    socket.on('join_room', async (roomUuid) => {
      // leave any existing rooms
      let rooms = Object.keys(socket.rooms);

      rooms.forEach((room) => socket.leave(room));

      // join room
      socket.join(roomUuid);
    });

    socket.on('ice_candidate', async (roomUuid, candidate) => {
        console.log(`ice_candidate: ${candidate}`);
        socket.broadcast.to(roomUuid).emit('ice_candidate', candidate);
    });

    socket.on('offer', async (roomUuid, desc) => {
        console.log(`offer: ${desc}`);
        socket.broadcast.to(roomUuid).emit('offer', desc);
    });

    socket.on('answer', async (roomUuid, desc) => {
        console.log(`answer: ${desc}`);
        socket.broadcast.to(roomUuid).emit('answer', desc);
    });
});