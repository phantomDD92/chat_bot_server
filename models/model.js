const mongoose = require("mongoose");
const { Schema, SchemaTypes, model } = mongoose;

const ModelSchema = new Schema({
  platform: {
    type: SchemaTypes.ObjectId,
    ref: 'platform',
    required: true,
  },
  UNIQUE: {
    type: String,
    required: true
  },
  ALIAS: {
    type: String,
    required: true
  },
  ACCOUNT: {
    type: String,
    required: true
  },
  PASSWORD: {
    type: String,
    required: true
  },
  DISCORD: {
    type: SchemaTypes.ObjectId,
    ref: 'discord'
  },
  STATUS: {
    type: Number,
    default: 0,
  },
  ERROR: { type: String },
  LAST: { type: Date },
  POST: {
    OFFSET: [{
      type: Number,
      required: false
    }
    ],
    INTERVAL: {
      type: Number,
      required: false
    },
    DURATION: {
      type: Number,
      required: false
    },
  },
  COMMENT: {
    INTERVAL: {
      type: Number,
      required: true
    }
  },
  NOTIFICATION: {
    INTERVAL: {
      type: Number,
      required: true
    }
  },
  STORY: {
    INTERVAL: {
      type: Number,
      required: false
    },
    COUNT: {
      type: Number,
      required: false
    },
    REPLACE: {
      type: Number,
      required: false
    },
  },
});

const ActorModel = model('model', ModelSchema);
//export default FModel;
module.exports = ActorModel;