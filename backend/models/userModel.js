const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestaps: true }
);

//for password matching
userSchema.methods.matchPassword = async function (enterPassword) {
  //comparing entered passw. with user's entered passw.
  return await bcrypt.compare(enterPassword, this.password);
};

//To encypt the password during registration and login
//Before saving the details in schema , doing this:
userSchema.pre("save", async function (next) {
  //if it isn't modified then don't run the code after it
  if (!this.isModified) {
    next();
  }

  //generating new password
  const salt = await bcrypt.genSalt(10); //higher the no. more strong passw. will b generated
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
