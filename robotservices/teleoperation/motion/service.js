/**
 * Initializes the teleoperation motion microservice of the RetraDev framework
 * @param {socketioInstance} socket
 * @param {string} robot
 */

const navigationService = (socket, robot) => {
  socket.on("MOTION", (data) => {
    socket.to(robot).emit("RELAYMOTION", data);
  });
};
const headMotionService = (socket, robot) => {
  socket.on("sendHeadMovement", (data) => {
    socket.to(robot).emit("recHeadMovement", data);
  });
};
const faceTrackService = (socket, robot) => {
  socket.on("FACETRACKDATA", (data) => {
    socket.to(robot).emit("TOFACETRACKDATA", data);
  });
};
const faceTrackStatus = (socket, robot) => {
  socket.on("SENDFACETRACKSTATUS", (data) => {
    socket.to(robot).emit("RELAYFACETRACKSTATUS", data);
  });
};
export const teleoperationService = (socket, robot) => {
  navigationService(socket, robot);
  headMotionService(socket, robot);
  faceTrackService(socket, robot);
  faceTrackStatus(socket, robot);
};
