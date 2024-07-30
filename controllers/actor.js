const ActorService = require("../services/actor");
const { sendResult, sendError, ApiError } = require("../utils/resp");

const handleLoadActors = async (req, res) => {
  try {
    const actors = await ActorService.loadActors();
    sendResult(res, { actors });
  } catch (error) {
    console.error(error);
    sendError(res, error);
  }
};

const handleCreateActor = async (req, res) => {
  try {
    const { number, name, ...params } = req.body;
    let actor = await ActorService.findByName(name);
    if (actor) throw new ApiError(`model name(${name}) is already existed.`);
    actor = await ActorService.findByNumber(number);
    if (actor)
      throw new ApiError(`model number(${number}) is already existed.`);
    await ActorService.createActor({ number, name, ...params });
    const actors = await ActorService.loadActors();
    sendResult(res, { actors });
  } catch (error) {
    console.error(error)
    sendError(res, error);
  }
};

const handleDeleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await ActorService.findById(id);
    if (!actor)
        throw new ApiError("model is not existed.")
    const accounts = actor.get("accounts");
    if (accounts.length > 0)
      throw new ApiError(
        `model(${actor.get("number")}, ${actor.get(
          "name"
        )}) still have some accounts.`
      );
    await ActorService.deleteActor(id);
    const actors = await ActorService.loadActors();
    sendResult(res, { actors });
  } catch (error) {
    sendError(res, error);
  }
};

const handleUpdateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, name, ...params } = req.body;
    let actor = await ActorService.findByName(name);
    if (actor && actor._id != id)
      throw new ApiError(`model name(${name}) is already existed.`);
    actor = await ActorService.findByNumber(number);
    if (actor && actor._id != id)
      throw new ApiError(`model number(${name}) is already existed.`);
    await ActorService.updateActor(id, { number, name, ...params });
    const actors = await ActorService.loadActors();
    sendResult(res, { actors });
  } catch (error) {
    sendError(res, error);
  }
};

const ActorCtrl = {
  handleLoadActors,
  handleCreateActor,
  handleDeleteActor,
  handleUpdateActor,
};

module.exports = ActorCtrl;
