const SettingModel = require("../models/setting")

const getSetting = (platform) => {
    return SettingModel.findOne({platform: platform._id});
}

const updateSetting = (platform, {headless, viewWidth, viewHeight}) => {
    return SettingModel.findOneAndUpdate({platform: platform._id}, {$set: {
        "BROWSER.VIEW_OPTION.headless": headless,
        "BROWSER.CONTEXT_OPTION.viewport" : {width: viewWidth, height: viewHeight}
    }})
}

const SettingService = {
    getSetting,
    updateSetting,
}

module.exports = SettingService