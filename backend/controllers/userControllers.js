//To register user

const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  //if there's a query inside it, we will search user in their nameand email
  const keyword = req.query.search
    ? {
        //if either of exp. is true it returns true
        $or: [
          { name: { $regex: req.query.search, $options: "i" } }, //i for case sensitive
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  //Now, to make query to database to search users     //find(()) k andr for searching users other than the logged one(current user id), ne = not equals
  //we have to authorize the user whether logged in or not
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
//To handle errors we use asyncHandler
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body; //this is json data which is parsed by app.use(express.json())

  //if any of these is undefined, we throw an error

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  //To check if user already exist in DB or not
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //if user doesn't exist we will create new user

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  //after creating new user, we willputvaues in schema of userModel
  if (user) {
    res.status(201).json({
      //status 201 for success
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id), //creating a JWT token when a user is created
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //to find user
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { allUsers, registerUser, authUser };
