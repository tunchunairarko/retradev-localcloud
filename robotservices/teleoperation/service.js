const navigationService = (socket) =>{
    socket.on("MOTION", function (data) {
        console.log(data)
        socket.broadcast.emit("RELAYMOTION", data)
    })
}
const headMotionService = (socket) =>{
    socket.on("sendHeadMovement", function (data) {
        socket.broadcast.emit("recHeadMovement", data)
    })
}
export const teleoperationService = (socket) =>{
    navigationService(socket)
    headMotionService(socket)
}