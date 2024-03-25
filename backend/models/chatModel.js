const mongoose = require("mongoose");

//Defining schema of database
const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        //to contain id of particular user
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //reference to user model
      },
    ],
    //to keep the track of latest messages on screen/upfront and store in db
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    //to add the timestamp for every chat
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
