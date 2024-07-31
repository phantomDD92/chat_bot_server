const DiscordModel = require("../models/discord");

const loadDiscords = () => DiscordModel.find().populate({
  path: "actors",
  select: "number name",
});

const createDiscord = ({ url, desc }) => {
  return DiscordModel.create({ url, desc });
};

const updateDiscord = (id, { url, desc }) =>
  DiscordModel.findByIdAndUpdate(id, { $set: { url, desc } });


const deleteDiscord = (id) => {
  return DiscordModel.deleteOne({ _id: id });
};

const findByUrl = (url) =>
  DiscordModel.findOne({ url });


const appendActor = (id, actorId) => {
  return DiscordModel.findByIdAndUpdate(id, {
    $push: { accounts: actorId },
  });
};

const removeActor = (id, actorId) =>
  DiscordModel.findByIdAndUpdate(id, { $pullAll: { accounts: actorId } });

const getCount = () => DiscordModel.countDocuments()

const findById = (id) => DiscordModel.findById(id)

const DiscordService = {
  loadDiscords,
  createDiscord,
  deleteDiscord,
  updateDiscord,
  findByUrl,
  findById,
  appendActor,
  removeActor,
  getCount
};

module.exports = DiscordService;
