const HistoryModel = require("../models/history")

const loadHistories = (accountId) =>
    HistoryModel
        .find({ account: accountId })
        .populate({
            path: "account",
            select: "actor number alias",
            populate: {
                path: "actor",
                select: "name"
            }
        })
        .sort("-createdAt");

const HistoryService = {
    loadHistories,
}

module.exports = HistoryService