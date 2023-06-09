const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async() => {
  mongoose.connect(mongoURI,
    await console.log("Connected to Mongo Successfully")
  );
};

module.exports = connectToMongo;
