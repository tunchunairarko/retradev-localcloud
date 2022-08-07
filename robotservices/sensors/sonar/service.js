/**
 * Initializes the sonar sensor microservice of the RetraDev framework
 * @param {socketioInstance} socket
 * @param {string} robot
 */

const sonarSocket = (socket, robot) => {
  socket.on("SONARDATA", (data) => {
    socket.to(robot).emit("TOSONARDATA", data);
  });
};

export const sonarService = (socket, robot) => {
  sonarSocket(socket, robot);
};
