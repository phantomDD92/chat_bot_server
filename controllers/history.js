const HistoryService = require("../services/history");
const { sendError, sendResult } = require("../utils/resp");

const handleLoadHistories = async (req, res) => {
    try {
        const { accountId } = req.params;
        const histories = await HistoryService.loadHistories(accountId);
        sendResult(res, { histories })
    } catch (error) {
        sendError(res, error)
    }
}

const HistoryCtrl = {
    handleLoadHistories
};

module.exports = HistoryCtrl;