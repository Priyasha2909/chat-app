//creating express
const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");

//creating router
const router = express.Router();

//fetching messages for a single chat based on chatID
router.route("/:chatId").get(protect, allMessages);

//two routes - this one for sending message but using protect middleware to first ensure chat is accessed by loggedin user
router.route("/").post(protect, sendMessage);

module.exports = router;
