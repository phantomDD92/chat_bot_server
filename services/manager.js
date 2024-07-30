const ManagerModel = require("../models/manager")
const bcrypt = require('bcryptjs')

const createManager = (username, password) => {
    return ManagerModel.create({ username, password: bcrypt.hashSync(password, 12) })
}

const findManager = (username) => {
    return ManagerModel.findOne({ username })
}

const loadManagers = () => {
    return ManagerModel.find({}, 'username date');
}

const deleteManager = (id) => {
    return ManagerModel.deleteOne({_id: id})
}

const findManagerById = (id) => {
    return ManagerModel.findById(id);
}

const changePassword = (id, password) => {
    return ManagerModel.findByIdAndUpdate(id, {$set : {password: bcrypt.hashSync(password, 12)}})
}
const ManagerService = {
    createManager,
    findManager,
    loadManagers,
    deleteManager,
    findManagerById,
    changePassword
}

module.exports = ManagerService