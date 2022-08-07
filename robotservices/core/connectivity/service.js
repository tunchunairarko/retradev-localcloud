/**
 * Initializes the connectivity testing microservice of the RetraDev framework
 * @param {socketioInstance} socket
 * @param {string} robot
 */

const sendPing = (socket, robot) => {
  socket.on("SENDPING", (data) => {
    socket.to(robot).emit("HIFROMLOCALCLOUD", data);
  });
};

const receivePing = (socket, robot) => {
  socket.on("RELAYPING", (data) => {
    socket.to(robot).emit("HIFROMREMOTEROBOT", data);
  });
};

export const pingTestingService = (socket, robot) => {
  sendPing(socket, robot);
  receivePing(socket, robot);
};
