const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public-flutter')));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, 'public-flutter/index.html'));
});


// app.get('/', (req, res) => {
//   res.send('<h1>Hoang Tung</h1>');
// });

io.on('connection', (socket) => {
  socket.join("anomynous_group")
  console.log('a user connected');
  socket.on("sendMsg", (msg) => {
    // console.log(msg, {...msg, type:"otherMsg"});
    // socket.emit("sendMsgServer", {...msg, type:"otherMsg"})
    io.to("anomynous_group").emit("sendMsgServer", {...msg, type:"otherMsg"})
  })
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
