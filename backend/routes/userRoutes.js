//for authentication

const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//functionality for registering user
//it will go to protect middlewwrae first and then to allUsers
router.route("/").post(registerUser).get(protect, allUsers); //Now, these fun. are created in controllers

// router.route("/").post(registerUser);

//functionality for user login
router.post("/login", authUser);

module.exports = router;
