const mongoose = require("mongoose");

const db = () => {
  try {
    console.log(process.env.DB_CONNETION_STRING);
    mongoose
      .connect(process.env.DB_CONNETION_STRING.toString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
      })
      .then(() => {
        console.log("connected");
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
