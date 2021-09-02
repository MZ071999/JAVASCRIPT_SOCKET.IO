const socket = io("http://localhost:3000");

//take message from js file and emit it to the socket server

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");
const handle = document.getElementById("handle");
const status = document.getElementById("status");
const notif = document.getElementById("notif");

//emit: make a signal/announce that something has happened
message.addEventListener("keypress", function () {
  socket.emit("typing", handle.value);
});

//Emit events to server
btn.addEventListener("click", function () {
  socket.emit("chat", {
    message: message.value,
    handle: handle.value,
  });
});

//listen for events
//listen for chat events from the server:
socket.on("chat", function (data) {
  status.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ":</strong>" + data.message + "</p>";
});

socket.on("typing", function (data) {
  status.innerHTML = "<p><em>" + data + " is typing a message.. </em></p>";
});
