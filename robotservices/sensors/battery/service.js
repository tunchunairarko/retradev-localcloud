/**
 * Initializes the battery sensor microservice of the RetraDev framework
 * @param {socketioInstance} socket
 * @param {string} robot
 */

const batterySocket = (socket, robot) => {
  socket.on("BATTERYDATA", (data) => {
    socket.to(robot).emit("TOBATTERYDATA", data);
  });
};

export const batteryService = (socket, robot) => {
  batterySocket(socket, robot);
};
