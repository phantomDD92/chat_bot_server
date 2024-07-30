const ModelService = require("../services/model")
const PlatformService = require("../services/platform")

const handleLoadModels = async (req, res) => {
    try {
        const platform = await PlatformService.findPlatform("FNC");
        const models = await ModelService.loadModels(platform)
        res.json({ success: true, message: "Load Models", payload: { models } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleCreateModel = async (req, res) => {
    try {
        const {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE} = req.body
        const platform = await PlatformService.findPlatform("FNC");
        const dupModel = await ModelService.findModel(ALIAS);
        if (dupModel) throw new Error("model is already existed");
        await ModelService.appendModel(platform, {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE});
        const models = await ModelService.loadModels(platform)
        res.json({ success: true, message: "Create Model", payload: { models } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleUpdateModel = async (req, res) => {
    try {
        const {id} = req.params;
        const {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE} = req.body
        await ModelService.updateModel(id, {ALIAS, ACCOUNT, PASSWORD, DISCORD, UNIQUE});
        const platform = await PlatformService.findPlatform("FNC");
        const models = await ModelService.loadModels(platform)
        res.json({ success: true, message: "Update Model", payload: { models } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleSetModelStatus = async (req, res) => {
    try {
        const {id} = req.params;
        const {status} = req.body
        await ModelService.setModelStatus(id, status);
        const platform = await PlatformService.findPlatform("FNC");
        const models = await ModelService.loadModels(platform)
        res.json({ success: true, message: "Set Model Status", payload: { models } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleDeleteModel = async (req, res) => {
    try {
        const {id} = req.params;
        await ModelService.deleteModel(id);
        const platform = await PlatformService.findPlatform("FNC");
        const models = await ModelService.loadModels(platform)
        res.json({ success: true, message: "Create Model", payload: { models } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}


const ModelCtrl = {
    handleLoadModels,
    handleCreateModel,
    handleUpdateModel,
    handleSetModelStatus,
    handleDeleteModel,
}

module.exports = ModelCtrl