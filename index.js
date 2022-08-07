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

const io = socketio(server, {
  pingTimeout: 0, origins: "*:*",
  allowEIO3: true
})

io.on("connection", (socket) => {
  console.log("New client connected");
  //  

});

console.log("RetraDev server log established")
console.log("ACTIVE MICROSERVICES: --teleconference --teleoperation")
