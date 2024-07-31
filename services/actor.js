const ActorModel = require("../models/actor");

const createActor = ({
  number,
  name,
  birthday,
  height,
  weight,
  phone1,
  phone2,
  birthplace,
}) => ActorModel.create({
  number,
  name,
  birthday,
  height,
  weight,
  phone1,
  phone2,
  birthplace,
});


const updateActor = (
  id,
  { number, name, birthday, height, weight, phone1, phone2, birthplace }
) =>
  ActorModel.findByIdAndUpdate(id, {
    $set: {
      number,
      name,
      birthday,
      height,
      weight,
      phone1,
      phone2,
      birthplace,
    },
  });

const deleteActor = (id) => ActorModel.deleteOne({ _id: id });

const appendAccount = (id, account) =>
  ActorModel.findByIdAndUpdate(id, { $push: { accounts: account._id } });

const removeAccount = (id, account) => {
  ActorModel.findByIdAndUpdate(id, { $pullAll: { accounts: account._id } });
};

const loadActors = () =>
  ActorModel.find({}).populate("accounts", "platform alias").sort("number");

const findByNumber = (number) => ActorModel.findOne({ number });

const findByName = (name) => ActorModel.findOne({ name });

const findById = (id) => ActorModel.findById(id);

const getCount = () => ActorModel.countDocuments()

const setDiscord = (id, discord) => ActorModel.findByIdAndUpdate(id, { $set: { discord } });

const ActorService = {
  createActor,
  updateActor,
  deleteActor,
  appendAccount,
  removeAccount,
  loadActors,
  findByName,
  findByNumber,
  findById,
  getCount,
  setDiscord,
};

module.exports = ActorService;
