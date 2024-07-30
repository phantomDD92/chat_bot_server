const DiscordModel = require("../models/discord")

const loadDiscords = () => {
    return DiscordModel.find({}, "url")
}

const createDiscord = (url) => {
    return DiscordModel.create({url})
}

const deleteDiscord = (id) => {
    return DiscordModel.deleteOne({_id: id})
}

const findDiscord = (url) => {
    return DiscordModel.find({url: url})
}

const DiscordService = {
    loadDiscords,
    createDiscord,
    deleteDiscord,
    findDiscord
}

module.exports = DiscordService