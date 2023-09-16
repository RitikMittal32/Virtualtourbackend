const mongoose = require('mongoose');

// Replace "your-mongodb-hostname" with the actual hostname or IP address of your MongoDB server
const mongoURI = "mongodb://127.0.0.1:27017/virtual-tour";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
