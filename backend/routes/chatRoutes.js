const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//for accessing and creating chat
//only loggedin users can access route
router.route("/").post(protect, accessChat);

//to get all chats
router.route("/").get(protect, fetchChats);

// //for craetion of group
router.route("/group").post(protect, createGroupChat);

// //for renaming the group and we use put to update
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

module.exports = router;
