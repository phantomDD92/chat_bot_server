const ModelService = require("../services/model")
const PlatformService = require("../services/platform")
const ProxyService = require("../services/proxy")

const handleLoadStats = async (req, res) => {
    try {
        const platform = await PlatformService.findPlatform("FNC")
        const [totalProxyCount, activeProxyCount] = await ProxyService.getProxyStats()
        const [totalModelCount, activeModelCount] = await ModelService.getModelStats(platform)
        res.json({
            success: true,
            message: "Load Proxies",
            payload: { 
                proxyStats : {
                    total : totalProxyCount,
                    active: activeProxyCount
                },
                modelStats : {
                    total : totalModelCount,
                    active: activeModelCount
                }
            }
        })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const DashboardCtrl = {
    handleLoadStats,
}

module.exports = DashboardCtrl