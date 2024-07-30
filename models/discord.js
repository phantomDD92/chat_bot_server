const { Schema, model } = require("mongoose");

const DicordSchema = new Schema({
  name:  {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
  },
});

const DiscordModel = model('discord', DicordSchema);
module.exports = DiscordModel;