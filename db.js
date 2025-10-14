const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://kaam25:Sahil%40191202@cluster0.zffpmuo.mongodb.net/kaamdhaam?retryWrites=true&w=majority"

const connectToMongo = () => {
  mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  });
  console.log("Connected Sucessfully");
};
module.exports = connectToMongo;