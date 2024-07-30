const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
require('./account');

const ActorSchema = new Schema({
  number: { type: Number, required: true }, // model number
  name: { type: String, required: true }, // model name
  avatar: { type: String },
  birthday: { type: Date },       // age
  height: { type: Number },
  weight: { type: Number },
  phone1: { type: String },
  phone2: { type: String },
  birthplace: { type: String },
  job: { type: String },
  study: { type: String },
  hobbies: [{ type: String }],
  relationship: { type: String },
  pets: { type: String },
  favorMusic: { type: String },
  favorFood: { type: String },
  description: { type: String },
  accounts: [{ type: SchemaTypes.ObjectId, ref: "Account" }],
  createdAt: { type: Date, default: Date.now },
});

const ActorModel = mongoose.model("Actor", ActorSchema);
module.exports = ActorModel;