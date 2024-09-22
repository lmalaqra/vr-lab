const mongoose = require("mongoose");

exports.connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("succesfully connected to database"))
    .catch((e) => console.log(e));
};