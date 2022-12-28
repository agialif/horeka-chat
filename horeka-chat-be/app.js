const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  pingTimeout: 1000,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // User Connected
  const users = [];
  for (let [id] of io.of("/").sockets) {
    users.push({
      userID: id,
      userName: "Guest" + " " + id,
    });
  }
  io.emit("users-list", users);

  // Send Chat Message to Client
  socket.on("send-chat", (data) => {
    console.log(data);
    const sendUserSocket = data.id;
    if (sendUserSocket) {
      // Send Broadcast Message
      // io.emit("chat-message", data);

      // Send to Current Room
      io.emit("chat-message", data);
    }
  });

  // User Disconnected
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

server.listen(3000);
