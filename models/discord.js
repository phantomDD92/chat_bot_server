const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;

const DicordSchema = new Schema({
  url: { type: String, required: true },
  accounts: [{ type: SchemaTypes.ObjectId }],
});

const DiscordModel = mongoose.model("Discord", DicordSchema);
module.exports = DiscordModel;
