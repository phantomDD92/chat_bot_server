const express = require("express");
// const authenticate = require("../middleware/auth.js");
const ActorCtrl = require("../controllers/actor.js");

const router = express.Router();

// router.route("/proxy")
//   .all(authenticate)
//   .get(ProxyCtrl.handleLoadProxies)
//   .post(ProxyCtrl.handleAddProxies)
//   .put(ProxyCtrl.handleChangeProxyStatus)
//   .delete(ProxyCtrl.handleClearProxies);

// router.route("/proxy/:id")
//   .all(authenticate)
//   .put(ProxyCtrl.handleSetProxyStatus)
//   .delete(ProxyCtrl.handleDeleteProxy);

// router.route("/model")
//   .all(authenticate)
//   .get(ModelCtrl.handleLoadModels)
//   .post(ModelCtrl.handleCreateModel)

// router.route("/model/:id")
//   .all(authenticate)
//   .post(ModelCtrl.handleUpdateModel)
//   .put(ModelCtrl.handleSetModelStatus)
//   .delete(ModelCtrl.handleDeleteModel)

// router.route("/discord")
//   .all(authenticate)
//   .get(DiscordCtrl.handleLoadDiscords)
//   .post(DiscordCtrl.handleCreateDiscord)
//   .delete(DiscordCtrl.handleDeleteDiscord)

// router.route("/setting")
//   .all(authenticate)
//   .get(SettingCtrl.handleLoadSetting)
//   .post(SettingCtrl.handleUpdateSetting)

// router.route("/manager")
//   .all(authenticate)
//   .get(ManagerCtrl.handleLoadManagers)
//   .post(ManagerCtrl.handleCreateManager)
//   .put(ManagerCtrl.handleChangePassword)
//   .delete(ManagerCtrl.handleDeleteManager)

// router.route("/auth")
//   .post(ManagerCtrl.handleLoginManager)
//   .get(authenticate, ManagerCtrl.handleReloadManager)

// router.route("/stats")
//   .all(authenticate)
//   .get(DashboardCtrl.handleLoadStats)

router.route("/actor")
  .get(ActorCtrl.handleLoadActors)
  .post(ActorCtrl.handleCreateActor)
router.route("/actor/:id")
  .put(ActorCtrl.handleUpdateActor)
  .delete(ActorCtrl.handleDeleteActor)

module.exports = router;
