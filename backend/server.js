const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
const Message = require("./models/userModel");

dotenv.config(); //Loads .env file contents into process.env by default.
connectDB(); //to make connection with mongoDB
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

app.use("/api/user", userRoutes);
//for chat cretaion
app.use("/api/chat", chatRoutes);
//for sending messages
app.use("/api/message", messageRoutes);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------

// Error Handling middlewares
//error handlers if we go to wrong POSTMAN api :-
app.use(notFound);
app.use(errorHandler);

//To import the port value from env file, if it's not there use 5000
const PORT = process.env.PORT;

//start the server
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`.yellow.bold)
);

const io = require("socket.io")(server, {
  //amount of time it takes while being inactive
  pingTimeout: 60000, //means it takes this time before it goes to switch off( if user doesn't send anything it will wait for 60000 and then switch off)

  //taking origin
  cors: {
    origin: "http://localhost:3000",
  },
});

//creating socket connection
io.on("connection", (socket) => {
  console.log("Connected to Socket.io");

  //craeting new socket: setup and this will take user data from frontend and create a room
  socket.on("setup", (userData) => {
    socket.join(userData._id); //creates a room for that particular user
    socket.emit("Connected");
  });

  async function getLastMessagesFromRoom(room) {
    let roomMessages = await Message.aggregate([
      { $match: { to: room } },
      //grouping the room messages by date
      { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
    ]);
    return roomMessages;
  }

  function sortRoomMessagesByDate(messages) {
    return messages.sort(function (a, b) {
      let date1 = a._id.split("/");
      let date2 = b._id.split("/");

      date1 = date1[2] + date1[0] + date1[1];
      date2 = date2[2] + date2[0] + date2[1];

      return date1 < date2 ? -1 : 1;
    });
  }

  //when we click on any chat this will create a room with that particular user's chat
  //now, creating socket for joining chat
  socket.on("join chat", async (room) => {
    socket.join(room);
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit("room-messages", roomMessages);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  //these msgs are taken and sent to the rooms created above
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    //if that chat doesn't have users
    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved); //"in" means inside that user room
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
