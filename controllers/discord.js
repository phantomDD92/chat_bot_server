const DiscordService = require("../services/discord")
const ModelService = require("../services/model")

const handleLoadDiscords = async (req, res) => {
    try {
        const discords = await DiscordService.loadDiscords()
        const discordMap = {}
        for (var discord of discords) {
            const models = await ModelService.findModelsForDiscord(discord._id)
            discordMap[discord._id] = models
        }
        res.json({ success: true, message: "Load Discords", payload: { discords, discordMap } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleCreateDiscord = async (req, res) => {
    try {
        const {url} = req.body;
        const dup = await DiscordService.findDiscord(url);
        if (dup) throw new Error("discord url is already existed");
        await DiscordService.createDiscord(url)
        const discords = await DiscordService.loadDiscords()
        const discordMap = {}
        for (var discord of discords) {
            const models = await ModelService.findModelsForDiscord(discord._id)
            discordMap[discord._id] = models
        }
        res.json({ success: true, message: "Create Discord", payload: { discords, discordMap } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleDeleteDiscord = async (req, res) => {
    try {
        const { id } = req.body
        const models = await ModelService.findModelsForDiscord(id)
        if (models.length > 0) {
            console.log(models.length, id)
            throw new Error("Discord url is being used.")
        }
        await DiscordService.deleteDiscord(id)
        const discords = await DiscordService.loadDiscords()
        const discordMap = {}
        for (var discord of discords) {
            const models = await ModelService.findModelsForDiscord(discord._id)
            discordMap[discord._id] = models
        }
        res.json({ success: true, message: "Delete Discord", payload: { discords, discordMap } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const DiscordCtrl = {
    handleLoadDiscords,
    handleCreateDiscord,
    handleDeleteDiscord,
}

module.exports = DiscordCtrl