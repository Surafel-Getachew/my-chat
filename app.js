const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");

// Data base
const connectDB = require("./models/db");
const Message = require("./models/Message");
const User = require("./models/User")

// routes

const channel = require("./routes/channel");
const user = require("./routes/user");

// util functions
const { addUsers, getUser } = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = 500 || process.env.PORT;

// const publicDirectoryPath = path.join(__dirname, "./client/src");

app.use(express.json({extended:false}))
// app.use(express.static(publicDirectoryPath));
connectDB();

// routes
app.use("/mychat/channel",channel);
app.use("/mychat/user",user);

const welcomeMessage = "welocme to my-chat";

io.on("connection", (socket) => {


  socket.on("join", async(groupName) => {

    const user = new User({
      channelName:groupName,
      socketid:socket.id
    })
    await user.save()
    
    socket.join(groupName);

    console.log(`user has joined ${groupName}`);

    socket.emit("message", welcomeMessage);
    
    
    socket.broadcast
    .to(groupName)
    .emit("message", `one user has joined ${groupName}`);

  });
  
  socket.on("send",(message) => {
    io.to(message.room).emit("message",message.text);
    
    console.log(socket.id);
  })
  
});

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

