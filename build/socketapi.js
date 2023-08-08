module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('A user connected');
    console.log(socket.id)
    
    // Handle socket events
    socket.on('event-name', data => {
      // Handle the event and broadcast to other clients
      socket.broadcast.emit('event-name', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
    
    socket.on('connect_error', (e) => {
      console.log(e) 
    })

    socket.on('set-role', role => {
      console.log("on set-role:",role )
      io.emit('increment-rollcount')
      socket.broadcast.emit('remove-role', role)
    })


    socket.on('error', (e) => {
      console.log(e)
    })
  });

}

