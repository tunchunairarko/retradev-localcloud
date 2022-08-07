/**
 * Initializes the teleoperation interaction service of the RetraDev framework
 * @param {socketioInstance} socket
 * @param {string} robot
 */

const handWaveService = (socket, robot) => {
  socket.on("SENDWAVEHAND", (data) => {
    socket.to(robot).emit("RELAYWAVEHAND", data);
  });
};
const handPointingService = (socket, robot) => {
  socket.on("POINTAT", (data) => {
    socket.to(robot).emit("RELAYPOINTAT", data);
  });
};
export const interactionService = (socket, robot) => {
  handWaveService(socket, robot);
  handPointingService(socket, robot);
};
