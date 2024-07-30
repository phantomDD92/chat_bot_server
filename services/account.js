const AccountModel = require("../models/account");

const loadAccounts = (platform) =>
  AccountModel.find({ platform })
    .populate("actor", "name")
    .populate("discord", "url")
    .sort("number");

const createAccount = (
  platform,
  actor,
  { alias, email, password, discord, description }
) =>
  AccountModel.create({
    platform,
    actor: actor._id,
    number: actor.number,
    alias,
    email,
    password,
    discord,
    description,
  });

const updateAccount = (
  id,
  actor,
  { alias, email, password, discord, description }
) =>
  AccountModel.findByIdAndUpdate(id, {
    $set: {
      actor: actor._id,
      number: actor.number,
      alias,
      email,
      password,
      discord,
      description,
    },
  });

const setStatus = (id, status) =>
  AccountModel.findByIdAndUpdate(id, { $set: status });

const deleteAccount = (id) => AccountModel.findByIdAndDelete(id);

const findById = (id) => AccountModel.findById(id);

const AccountService = {
  loadAccounts,
  createAccount,
  updateAccount,
  setStatus,
  deleteAccount,
  findById,
};

module.exports = AccountService;
