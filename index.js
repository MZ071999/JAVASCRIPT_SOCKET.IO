const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.static("public"));

server.listen(3000, () => {
  console.log("server running..");
});

//run when client connects
io.on("connection", (socket) => {
  console.log("Socket connection established", socket.id);

  socket.on("chat", function (data) {
    //what we wanna do with the message we just received from the client?
    //send to EVERYONE connected to the web socket:
    io.sockets.emit("chat", data);
  });

  //broadcast will emit message to every other signle client except the sender
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
