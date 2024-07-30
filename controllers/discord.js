const DiscordService = require("../services/discord");
const { sendResult, sendError, ApiError } = require("../utils/resp");

const handleLoadDiscords = async (req, res) => {
  try {
    const discords = await DiscordService.loadDiscords();
    sendResult(res, { discords });
  } catch (error) {
    sendError(res, error);
  }
};

const handleCreateDiscord = async (req, res) => {
  try {
    const { url } = req.body;
    const dup = await DiscordService.findDiscord(url);
    if (dup) throw new ApiError("discord url is already existed");
    await DiscordService.createDiscord(url);
    const discords = await DiscordService.loadDiscords();
    sendResult(res, { discords });
  } catch (error) {
    sendError(res, error);
  }
};

const handleDeleteDiscord = async (req, res) => {
  try {
    const { id } = req.body;
    const discord = await DiscordService.findById(id);
    if (!discord) throw new ApiError("discord is not existed.");
    const accounts = discord.get("accounts");
    if (accounts.length > 0)
      throw new ApiError("discord is using by some accounts.");
    await DiscordService.deleteDiscord(id);
    const discords = await DiscordService.loadDiscords();
    sendResult(res, { discords });
  } catch (error) {
    sendError(res, error);
  }
};

const DiscordCtrl = {
  handleLoadDiscords,
  handleCreateDiscord,
  handleDeleteDiscord,
};

module.exports = DiscordCtrl;
