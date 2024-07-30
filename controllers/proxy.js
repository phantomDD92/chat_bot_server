const ProxyService = require("../services/proxy")

const handleLoadProxies = async (req, res) => {
    try {
        const proxies = await ProxyService.loadProxies()
        res.json({ success: true, message: "Load Proxies", payload: { proxies } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleAddProxies = async (req, res) => {
    try {
        const { proxies, deadline } = req.body;
        await ProxyService.addProxies(proxies, deadline)
        const newProxies = await ProxyService.loadProxies()
        res.json({ success: true, message: "Add Proxies", payload: { proxies: newProxies } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleClearProxies = async (req, res) => {
    try {
        await ProxyService.clearProxies()
        res.json({ success: true, message: "Clear Proxies", payload: { proxies: [] } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleChangeProxyStatus = async (req, res) => {
    try {
        const { id, status } = req.body
        await ProxyService.setProxyStatus(id, status)
        const proxies = await ProxyService.loadProxies()
        res.json({ success: true, message: "Set Proxy Status", payload: { proxies } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleSetProxyStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        await ProxyService.setProxyStatus(id, status)
        const proxies = await ProxyService.loadProxies()
        res.json({ success: true, message: "Set Proxy Status", payload: { proxies } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const handleDeleteProxy = async (req, res) => {
    try {
        const { id } = req.params
        await ProxyService.deleteProxy(id);
        const proxies = await ProxyService.loadProxies()
        res.json({ success: true, message: "Set Proxy Status", payload: { proxies } })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: error.message })
    }
}

const ProxyCtrl = {
    handleLoadProxies,
    handleAddProxies,
    handleClearProxies,
    handleChangeProxyStatus,
    handleDeleteProxy,
    handleSetProxyStatus,
}

module.exports = ProxyCtrl