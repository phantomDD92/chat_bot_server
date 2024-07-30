const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProxySchema = new Schema({
  url:  {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  status: {
    type:Number,
    default: 0,
  },
  deadline: {
    type: Date,
  }
}, {collection: "proxies"});

const ProxyModel = model('proxy', ProxySchema);
module.exports =  ProxyModel;