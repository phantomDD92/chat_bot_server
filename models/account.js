const mongoose = require("mongoose");
const { Status } = require("../config/const");
const { Schema, SchemaTypes } = mongoose;

const AccountSchema = new Schema({
  actor: { type: SchemaTypes.ObjectId, ref: "Actor", required: true },
  number: { type: Number, required: true },
  platform: { type: String, required: true },
  alias: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  discord: { type: SchemaTypes.ObjectId, ref: "Discord" },
  status: { type: Number, default: Status.DISABLED },
  lastError: { type: String },
  description: { type: String },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

AccountSchema.index({ platform: 1, number: 1 });

const AccountModel = mongoose.model("Account", AccountSchema);
module.exports = AccountModel;
