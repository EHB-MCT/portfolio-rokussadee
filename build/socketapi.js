module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('A user connected');
    console.log(socket.id)
  
    // Handle socket events
    socket.on('event-name', (data) => {
      // Handle the event and broadcast to other clients
      socket.broadcast.emit('event-name', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    
    socket.on('conect_error', (e) => {
      console.log(e) 
    })

    socket.on('customevent', (number, string, obj) => {
      console.log(number, string, obj)
    })

    socket.on('error', (e) => {
      console.log(e)
    })
  });

}

