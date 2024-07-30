const DiscordModel = require("../models/discord");

const loadDiscords = () => {
  return DiscordModel.find({}, "url");
};

const createDiscord = (url) => {
  return DiscordModel.create({ url });
};

const deleteDiscord = (id) => {
  return DiscordModel.deleteOne({ _id: id });
};

const findDiscord = (url) => {
  return DiscordModel.find({ url: url });
};

const appendAccount = (id, account) => {
  return DiscordModel.findByIdAndUpdate(id, {
    $push: { accounts: account._id },
  });
};

const DiscordService = {
  loadDiscords,
  createDiscord,
  deleteDiscord,
  findDiscord,
  appendAccount,
};

module.exports = DiscordService;
