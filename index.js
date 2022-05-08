const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const socketio = require("socket.io")

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection established");
  }
);
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("client/build"))

const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// set up routes
app.use("/api/robots", require("./routes/robotRouter"));
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/telecare", require("./routes/TelecareRouter"));

app.get("*", function (req, res) {
  res.sendFile('index.html', { root });
})

app.use(helmet());
// console.log("MongoDB connection established")
const server = app.listen(PORT, () => console.log(`The RetraDev server has started on port: ${PORT}`));

/////////////////////
//////////////////////
///////////////////



const io = socketio(server, {
  pingTimeout: 0, origins: "*:*",
  allowEIO3: true
})

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("pythondata", function (frame) {

    var buff = Buffer.from(frame).toString()
    let base64data = buff.toString('base64');

    socket.broadcast.emit("FROMPYAPI", base64data)

  })


  socket.on("frontenddata", function (data) {
    console.log(data)
    socket.broadcast.emit("FROMNODEAPI", data)
  })

  socket.on("frontendspeechdata", function (data) {
    console.log(data)
    socket.broadcast.emit("FROMNODESPEECHAPI", data)
  })
  socket.on("remoterobotdata", function (data) {
    console.log(data)

    socket.broadcast.emit("FROMREMOTEROBOT", data)

  })
  socket.on("BATTERYDATA", function (data) {
    console.log(data)
    socket.broadcast.emit("TOBATTERYDATA", data)
  })

  socket.on("FACETRACKDATA", function (data) {
    // console.log(data)
    if (data === 0) {
      socket.broadcast.emit("TOFACETRACKDATA", false)
    }
    else {
      if (data === 0) {
        socket.broadcast.emit("TOFACETRACKDATA", true)
      }
    }
  })
  socket.on("SONARDATA", function (data) {
    // console.log(data)
    socket.broadcast.emit("TOSONARDATA", data)
  })

  socket.on("SENDFACETRACKSTATUS", function (data) {
    console.log(data)
    socket.broadcast.emit("RELAYFACETRACKSTATUS", data)
  })

  socket.on("PEPPERCONTEST", function (data) {
    console.log(data)
  })
  
  socket.on("POINTAT",function(data){
    socket.broadcast.emit("RELAYPOINTAT",data)
  })
  ///////////////////////////////////////////////////////////
  ////////////////IP CAMERA RELAY AND RESET/////////////////
  socket.on("STARTIPCAM",function(data){
    socket.broadcast.emit("RELAYSTARTIPCAM",data)
  })
  socket.on("RESETIPCAM",function(data){
    socket.broadcast.emit("RELAYRESETIPCAM",data)
  })
  socket.on("RELAYIPCAMURL",function(data){
    socket.broadcast.emit("IPCAMURL",data)
  })

});

console.log("RetraDev server log established")
console.log("ACTIVE MICROSERVICES: --teleconference --teleoperation")
