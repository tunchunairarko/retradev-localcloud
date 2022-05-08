/**
 * Initializes the teleoperation motion microservice of the RetraDev framework
 * @param {socketioInstance} socket 
 * @param {string} robot 
 */

const navigationService = (socket,robot) =>{
    socket.on("MOTION", function (data) {
        socket.to(robot).emit("RELAYMOTION", data)
    })
}
const headMotionService = (socket,robot) =>{
    socket.on("sendHeadMovement", function (data) {
        socket.to(robot).emit("recHeadMovement", data)
    })
}
export const teleoperationService = (socket,robot) =>{
    navigationService(socket,robot)
    headMotionService(socket,robot)
}