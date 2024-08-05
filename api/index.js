const express = require("express");
const multer = require('multer')
const { v4: uuidv4 } = require("uuid")
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = uuidv4();
    cb(null, fileName + '.jpg')
  }
})

const upload = multer({ storage: storage })

const authenticate = require("../middleware/auth.js");
const ActorCtrl = require("../controllers/actor.js");
const AccountCtrl = require("../controllers/account.js");
const DiscordCtrl = require("../controllers/discord.js");
const DashboardCtrl = require("../controllers/dashboard.js");
const ProxyCtrl = require("../controllers/proxy.js");
const ManagerCtrl = require("../controllers/manager.js");
const CommentCtrl = require("../controllers/comment.js");
const HistoryCtrl = require("../controllers/history.js");

const router = express.Router();

router.route("/proxy")
  .all(authenticate)
  .get(ProxyCtrl.handleLoadProxies)
  .post(ProxyCtrl.handleAddProxies)
  .put(ProxyCtrl.handleChangeProxyStatus)
  .delete(ProxyCtrl.handleClearProxies);

router.route("/proxy/:id")
  .all(authenticate)
  .put(ProxyCtrl.handleSetProxyStatus)
  .delete(ProxyCtrl.handleDeleteProxy);


router.route("/discord")
  .all(authenticate)
  .get(DiscordCtrl.handleLoadDiscords)
  .post(DiscordCtrl.handleCreateDiscord)
  .delete(DiscordCtrl.handleDeleteDiscord)
router.route("/discord/:id")
  .all(authenticate)
  .post(DiscordCtrl.handleAppendActor)
  .put(DiscordCtrl.handleUpdateDiscord)
  .delete(DiscordCtrl.handleRemoveActor)

// router.route("/setting")
//   .all(authenticate)
//   .get(SettingCtrl.handleLoadSetting)
//   .post(SettingCtrl.handleUpdateSetting)

router.route("/manager")
  .all(authenticate)
  .get(ManagerCtrl.handleLoadManagers)
  .post(ManagerCtrl.handleCreateManager)
  .put(ManagerCtrl.handleChangePassword)
  .delete(ManagerCtrl.handleDeleteManager)

router.route("/auth")
  .post(ManagerCtrl.handleLoginManager)
  .get(authenticate, ManagerCtrl.handleReloadManager)

router.route("/stats")
  .all(authenticate)
  .get(DashboardCtrl.handleGetStats)

router
  .route("/actor")
  .all(authenticate)
  .get(ActorCtrl.handleLoadActors)
  .post(ActorCtrl.handleCreateActor)
  .put(ActorCtrl.handleUpdateActor)
  .delete(ActorCtrl.handleDeleteActor);

router
  .route("/actor/:id")
  .all(authenticate)
  .get(ActorCtrl.handleGetContent)
  .post(upload.single('image'), ActorCtrl.handleAppendContent)
  .delete(ActorCtrl.handleDeleteContent)
  .put(ActorCtrl.handleClearContents)

router
  .route("/account/:platform")
  .all(authenticate)
  .get(AccountCtrl.handleLoadAccounts)
  .post(AccountCtrl.handleCreateAccount);

router
  .route("/account/:platform/:id")
  .all(authenticate)
  .put(AccountCtrl.handleUpdateAccount)
  .post(AccountCtrl.handleUpdateStatus)
  .delete(AccountCtrl.handleDeleteAccount);

router
  .route("/comment")
  .all(authenticate)
  .get(CommentCtrl.handleLoadComments)
  .post(CommentCtrl.handleCreateComment)
  .delete(CommentCtrl.handleClearComments);

router
  .route("/comment/:id")
  .all(authenticate)
  .delete(CommentCtrl.handleDeleteComment);

router
  .route("/history/:accountId")
  .all(authenticate)
  .get(HistoryCtrl.handleLoadHistories);
  
module.exports = router;
