const AccountService = require("../services/account");
const ActorService = require("../services/actor");
const DiscordService = require("../services/discord");
const { sendResult, sendError, ApiError } = require("../utils/resp");

const handleLoadAccounts = async (req, res) => {
  try {
    const { platform } = req.params;
    const accounts = await AccountService.loadAccounts(platform);
    sendResult(res, { accounts });
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
};

const handleCreateAccount = async (req, res) => {
  try {
    const { platform } = req.params;
    const { actor, ...params } = req.body;
    let currActor = await ActorService.findById(actor);
    if (!currActor) throw new ApiError(`account is not existed.`);
    const account = await AccountService.createAccount(
      platform,
      currActor,
      params
    );
    await ActorService.appendAccount(actor, account);
    const { discord } = params;
    if (discord) {
      await DiscordService.appendAccount(discord, account._id);
    }
    const accounts = await AccountService.loadAccounts(platform);
    sendResult(res, { accounts });
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
};

const handleDeleteAccount = async (req, res) => {
  try {
    const { id, platform } = req.params;
    const account = await AccountService.findById(id);
    if (!account) throw new ApiError("account is not existed.");
    const discord = account.get("discord");
    if (discord) {
      await DiscordService.removeAccount(discord, account._id);
    }
    await ActorService.removeAccount(account.get("actor"), account);
    await AccountService.deleteAccount(id);
    const accounts = await AccountService.loadAccounts(platform);
    sendResult(res, { accounts });
  } catch (error) {
    sendError(res, error);
  }
};

const handleUpdateAccount = async (req, res) => {
  try {
    const { id, platform } = req.params;
    const { actor, ...params } = req.body;
    const { discord } = params;
    const currActor = await AccountService.findById(actor);
    if (!currActor) throw new ApiError("model is not existed.");
    const account = await AccountService.findById(id);
    if (!account) throw new ApiError("account is not existed.");
    const origDiscord = account.get("discord");
    if (origDiscord && origDiscord != discord) {
      await DiscordService.removeAccount(origDiscord, account._id);
    }
    if (discord && origDiscord != discord) {
      await DiscordService.appendAccount(discord, account._id);
    }
    await AccountService.updateAccount(id, actor, params);
    const accounts = await AccountService.loadAccounts(platform);
    sendResult(res, { accounts });
  } catch (error) {
    sendError(res, error);
  }
};

const handleUpdateStatus = async (req, res) => {
  try {
    const { id, platform } = req.params;
    const { status } = req.body;
    await AccountService.setStatus(id, status);
    const accounts = await AccountService.loadAccounts(platform);
    sendResult(res, { accounts });
  } catch (error) {
    sendError(res, error);
  }
};

const AccountCtrl = {
  handleLoadAccounts,
  handleCreateAccount,
  handleDeleteAccount,
  handleUpdateAccount,
  handleUpdateStatus,
};

module.exports = AccountCtrl;
