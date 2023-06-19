const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://beverlymotorsllc:7ITVw36LnDLGVoBd@cluster0.d8qkwsh.mongodb.net/bm-limo?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
