const mongoose = require("mongoose");

const mongoURI =
  "mongodb://localhost:27017/Vrum";
const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  });
  console.log("Connected Sucessfully");
};
module.exports = connectToMongo;