

const setUpSocket = (io) => {

    io.on('connection', socket => {
        socket.emit('online-user')

        socket.on('join-user', (roomId) => {
            // console.log('roomid',roomId)
            socket.join(roomId)
        })

        socket.on('sendMessage', ({ senderId, receiverId, roomId, message }) => {
            // console.log({senderId,receiverId,roomId,message})

            socket.to(roomId).emit('ReceiveMsg', {
                senderId, receiverId, roomId, message
            })

            io.to(socket.id).emit('SendMsg', {
                senderId, receiverId, roomId, message
            })

        })

        socket.on('disconnect', () => {
            console.log('Disconnected')
        })

    })


}

export default setUpSocket
