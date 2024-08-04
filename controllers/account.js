const AccountService = require("../services/account");
const ActorService = require("../services/actor");
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
    if (!currActor) throw new ApiError(`model is not existed.`);
    const account = await AccountService.createAccount(platform, currActor, params);
    await ActorService.appendAccount(actor, account._id)
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
    await ActorService.removeAccount(account.actor, id)
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
    const currActor = await AccountService.findById(actor);
    if (!currActor) throw new ApiError("model is not existed.");
    const account = await AccountService.findById(id);
    if (!account) throw new ApiError("account is not existed.");
    await AccountService.updateAccount(id, currActor, params);
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
