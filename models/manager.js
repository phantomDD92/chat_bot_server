const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const ManagerModel = mongoose.model("auth", ManagerSchema);
module.exports = ManagerModel
