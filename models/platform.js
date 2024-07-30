const { Schema, model } = require("mongoose");

const PlatformSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
  proxy: {
    type: Boolean,
    required: true
  },
  captcha: {
    type: Boolean,
    required: false,
  },
  bypass: {
    type: Object
  }
});

const PlatformModel = model('platform', PlatformSchema);
module.exports = PlatformModel;