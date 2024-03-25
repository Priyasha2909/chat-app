const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

//connecting to the database
const connectDB = async () => {
  try {
    //responsible for connecting to db
    const conn = await mongoose.connect(
      "mongodb+srv://LetsChat:DYvICHfCVX1YK2uE@cluster0.zsiyfex.mongodb.net/LetsChat",
      // "mongodb+srv://Priyasha2909:Priyasha2909@cluster0.zsiyfex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit(1); // Exit with a non-zero status code to indicate an error
  }
};

module.exports = connectDB;
