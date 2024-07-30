const { Status } = require("../config/const")
const ActorModel = require("../models/model")

const getModelStats = (platform) => {
    return Promise.all([
        ActorModel.count({platform: platform._id}),
        ActorModel.count({platform: platform._id, STATUS: Status.ACTIVE})
    ])
}

const loadModels = (platform) => {
    return ActorModel.find({platform: platform._id}, "ALIAS ACCOUNT PASSWORD DISCORD UNIQUE STATUS ERROR LAST").populate("DISCORD", "url")
}

const setModelStatus = (id, status) => {
    return ActorModel.findByIdAndUpdate(id, {$set: {STATUS: status}})
}

const updateModel = (id, {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE}) => {
    return ActorModel.findByIdAndUpdate(id, {$set: {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE}})
}

const appendModel = (platform, {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE}) => {
    return ActorModel.create({
        platform: platform._id,
        ALIAS,
        ACCOUNT,
        PASSWORD,
        DISCORD,
        POST: { INTERVAL: 60, DURATION: 120},
        STORY: {INTERVAL: 10, COUNT: 6, REPLACE: 1},
        COMMENT: {INTERVAL : 6},
        NOTIFICATION: {INTERVAL: 30},
        UNIQUE,
        STATUS: 1
    });
}

const deleteModel = (id) => {
    return ActorModel.deleteOne({_id: id})
}

const findModelsForDiscord = (discordId) => {
    return ActorModel.find({DISCORD: discordId}, "ALIAS ACCOUNT UNIQUE STATUS")
}

const findModel = (alias) => {
    return ActorModel.findOne({ALIAS: alias});
}

const ModelService = {
    getModelStats,
    loadModels,
    setModelStatus,
    updateModel,
    appendModel,
    deleteModel,
    findModel,
    findModelsForDiscord
}

module.exports = ModelService