const DiscordModel = require("../models/discord");

const loadDiscords = () => DiscordModel.find({}).populate({
    path: "accounts",
    select: "actor number alias email",
    populate: { path: "actor", select: "name" },
  });

const createDiscord = (url) => {
  return DiscordModel.create({ url });
};

const deleteDiscord = (id) => {
  return DiscordModel.deleteOne({ _id: id });
};

const findDiscord = (url) => {
  return DiscordModel.find({ url: url });
};

const appendAccount = (id, accountId) => {
  return DiscordModel.findByIdAndUpdate(id, {
    $push: { accounts: accountId },
  });
};

const removeAccount = (id, accountId) =>
  DiscordModel.findByIdAndUpdate(id, { $pullAll: { accounts: accountId } });

const DiscordService = {
  loadDiscords,
  createDiscord,
  deleteDiscord,
  findDiscord,
  appendAccount,
  removeAccount,
};

module.exports = DiscordService;
